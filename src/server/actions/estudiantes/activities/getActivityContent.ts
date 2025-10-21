'use server';

import { Redis } from '@upstash/redis';

import { getRelatedActivities } from '~/server/actions/estudiantes/activities/getRelatedActivities';

import { getUserActivityProgress } from './getUserActivityProgress';

import type { Activity, Question } from '~/types';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const getActivityContent = async (
  lessonId: number,
  userId: string
): Promise<Activity[]> => {
  try {
    console.log(`Fetching related activities for lesson ${lessonId}`);
    const relatedActivities = await getRelatedActivities(lessonId);

    console.log('Related activities:', relatedActivities);

    // Limit to 3 activities per lesson
    if (relatedActivities.length > 3) {
      console.warn(
        `Lesson ${lessonId} has more than 3 activities, limiting to first 3`
      );
      relatedActivities.splice(3);
    }

    // Sort activities by creation date to ensure consistent order
    relatedActivities.sort(
      (a, b) =>
        new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
    );

    if (relatedActivities.length === 0) {
      console.log(`No related activities found for lesson ${lessonId}`);
      return [];
    }

    const userProgress = await getUserActivityProgress(userId);

    const activitiesWithContent = await Promise.all(
      relatedActivities.map(async (activity, index) => {
        const questionTypes = ['VOF', 'OM', 'ACompletar'] as const;
        let allQuestions: Question[] = [];

        for (const type of questionTypes) {
          // --- CAMBIO: Buscar ambos keys para ACompletar ---
          let contentKeys: string[] = [];
          if (type === 'ACompletar') {
            contentKeys = [
              `activity:${activity.id}:questionsACompletar`,
              `activity:${activity.id}:questionsACompletar2`,
            ];
          } else {
            contentKeys = [`activity:${activity.id}:questions${type}`];
          }

          for (const contentKey of contentKeys) {
            console.log(`Fetching ${type} questions with key: ${contentKey}`);
            try {
              const content = await redis.get(contentKey);
              if (content) {
                const parsedQuestions = (
                  typeof content === 'string' ? JSON.parse(content) : content
                ) as Omit<Question, 'type'>[];

                const questionsWithType = parsedQuestions.map(
                  (q) =>
                    ({
                      ...q,
                      type:
                        type === 'VOF'
                          ? 'VOF'
                          : type === 'OM'
                            ? 'OM'
                            : 'COMPLETAR',
                    }) as Question
                );

                allQuestions = [...allQuestions, ...questionsWithType];
              }
            } catch (error) {
              console.error(`Error fetching ${type} questions:`, error);
            }
          }
        }

        const activityProgress = userProgress.find(
          (progress) => progress.activityId === activity.id
        );

        const isLastActivityInLesson = index === relatedActivities.length - 1;

        return {
          ...activity,
          content: {
            questions: allQuestions,
          },
          isCompleted: activityProgress?.isCompleted ?? false,
          userProgress: activityProgress?.progress ?? 0,
          createdAt: activity.lastUpdated,
          isLastInLesson: isLastActivityInLesson, // Add this flag
        } as Activity;
      })
    );

    const validActivities = activitiesWithContent.filter(
      (activity): activity is Activity => activity !== null
    );

    console.log('Final activities with content:', validActivities);
    return validActivities;
  } catch (error) {
    console.error('Error in getActivityContent:', error);
    throw error;
  }
};

export { getActivityContent };
