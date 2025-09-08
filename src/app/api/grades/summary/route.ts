import { type NextRequest, NextResponse } from 'next/server';

import { sql } from 'drizzle-orm';

import { db } from '~/server/db';

export const dynamic = 'force-dynamic';

// Define strict types for query results
interface DBRow {
  [key: string]: unknown;
  name: string;
  weight: number;
  grade: number | null;
  activities: string | null;
  final_grade: number | null;
}

interface DBQueryResult extends Record<string, unknown> {
  rows: DBRow[];
}

interface ActivityResult {
  id: number;
  name: string;
  grade: number;
  weight: number;
}

interface GradeParameter {
  name: string;
  grade: number;
  weight: number;
  activities: ActivityResult[];
}

interface GradeResponse {
  finalGrade: number;
  parameters: GradeParameter[];
  isCompleted: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const userId = searchParams.get('userId');

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 }
      );
    }

    const queryResult = (await db.execute(sql`
      WITH parameter_activities AS (
        -- First get all activities and their grades for each parameter
        SELECT 
          p.id as parameter_id,
          p.name as parameter_name,
          p.porcentaje as parameter_weight,
          a.id as activity_id,
          a.name as activity_name,
          a.porcentaje as activity_weight,
          COALESCE(uap.final_grade, 0) as activity_grade
        FROM parametros p
        LEFT JOIN activities a ON a.parametro_id = p.id
        LEFT JOIN user_activities_progress uap 
          ON uap.activity_id = a.id 
          AND uap.user_id = ${userId}
        WHERE p.course_id = ${courseId}
      ),
      parameter_grades_calc AS (
        -- Then calculate weighted average for each parameter
        SELECT 
          parameter_id,
          parameter_name,
          parameter_weight,
          CAST(
            COALESCE(
              SUM(activity_grade * activity_weight) / NULLIF(SUM(activity_weight), 0),
              0
            ) AS DECIMAL(10,2)
          ) as grade,
          json_agg(
            json_build_object(
              'id', activity_id,
              'name', activity_name,
              'grade', activity_grade,
              'weight', activity_weight
            )
          ) as activities
        FROM parameter_activities
        GROUP BY parameter_id, parameter_name, parameter_weight
      )
      SELECT 
        parameter_name as name,
        parameter_weight as weight,
        grade,
        activities::text,
        CAST(
          SUM(grade * parameter_weight / 100.0) OVER ()
          AS DECIMAL(10,2)
        ) as final_grade
      FROM parameter_grades_calc
      ORDER BY parameter_id;
    `)) as unknown as DBQueryResult;

    // Debug logs for grade calculation
    console.log('Grade Calculation Debug:');
    console.log('Raw Query Result:', queryResult);

    // Single declaration of rows
    const dbRows = queryResult?.rows ?? [];
    console.log(
      'Parameter Rows:',
      dbRows.map((row) => ({
        name: row.name,
        weight: row.weight,
        grade: row.grade,
        contribution: (((row.grade ?? 0) * (row.weight ?? 0)) / 100).toFixed(2),
      }))
    );

    // Transform results with proper type safety
    const parameters: GradeParameter[] = dbRows.map((row) => {
      const activities = JSON.parse(row.activities ?? '[]') as ActivityResult[];

      return {
        name: String(row.name),
        grade: Number(row.grade ?? 0),
        weight: Number(row.weight),
        activities: activities.map((act) => ({
          id: Number(act.id),
          name: String(act.name),
          grade: Number(act.grade),
          weight: Number(act.weight),
        })),
      };
    });

    // Get final grade with proper type casting
    const finalGrade = Number(dbRows[0]?.final_grade ?? 0);

    // Update materias grades with the correct final grade
    if (finalGrade > 0) {
      console.log('Updating materia grades with final grade:', finalGrade);

      await db.execute(sql`
			  WITH course_materias AS (
				SELECT m.id as materia_id
				FROM materias m
				WHERE m.courseid = ${courseId}
			  )
			  INSERT INTO materia_grades (materia_id, user_id, grade, updated_at)
			  SELECT 
				cm.materia_id,
				${userId},
				${finalGrade},
				NOW()
			  FROM course_materias cm
			  ON CONFLICT (materia_id, user_id)
			  DO UPDATE SET 
				grade = EXCLUDED.grade,
				updated_at = EXCLUDED.updated_at
			`);

      // Verify the update
      const updatedGrades = await db.execute(sql`
			  SELECT m.title, mg.grade
			  FROM materia_grades mg
			  JOIN materias m ON m.id = mg.materia_id
			  WHERE m.courseid = ${courseId} AND mg.user_id = ${userId}
			`);
      console.log('Updated materia grades:', updatedGrades);
    }

    const response: GradeResponse = {
      finalGrade,
      parameters,
      isCompleted: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error calculating grades:', error);
    return NextResponse.json(
      { error: 'Failed to calculate grades' },
      { status: 500 }
    );
  }
}
