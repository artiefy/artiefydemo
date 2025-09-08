export interface User {
  id: string;
  role: string;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  age?: number | null;
  birthDate?: Date | null;
}

// Create a new type for basic course data
export interface BaseCourse {
  id: number;
  title: string;
  description: string | null;
  coverImageKey: string | null;
  categoryid: number;
  instructor: string;
  instructorName?: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  creatorId: string;
  rating: number | null;
  modalidadesid: number;
  nivelid: number;
  category?: Category;
  modalidad?: Modalidad;
  isActive: boolean | null; // Changed from optional boolean to nullable boolean
  is_featured: boolean | null; // Add this new field
  is_top: boolean | null; // Add this new field
}

// Add this type
export type SubscriptionLevel = 'none' | 'pro' | 'premium';

// Add this interface for course-course type relationship
export interface CourseCourseType {
  courseId: number;
  courseTypeId: number;
  courseType?: CourseType;
}

// Add this interface to represent a CourseType
export interface CourseType {
  id?: number;
  name: string;
  description?: string | null;
  requiredSubscriptionLevel: SubscriptionLevel;
  isPurchasableIndividually: boolean | null;
  price?: number | null;
}

// Keep the full Course interface for other uses
export interface Course extends BaseCourse {
  totalStudents: number;
  lessons: Lesson[];
  nivel?: Nivel;
  enrollments?: Enrollment[] | { length: number };
  creator?: User;
  isNew?: boolean;
  requerimientos?: string[];
  materias?: CourseMateria[];
  isFree?: boolean;
  requiresSubscription?: boolean;
  courseTypeId: number | null; // Changed to nullable
  courseType?: CourseType; // Updated to match CourseType interface
  courseTypes?: CourseType[]; // Add this to support multiple course types
  individualPrice: number | null; // Change from optional to required but nullable
  requiresProgram: boolean;
  isActive: boolean;
}

// Add new interface for course materias
export interface CourseMateria {
  id: number;
  title: string;
  description: string | null;
  programaId: number | null; // Changed to allow null
  programa?: {
    id: number | string;
    title: string;
  };
  courseid: number | null; // Changed from number to number | null to match DB schema
  totalStudents?: number; // Made optional
  lessons?: Lesson[]; // Made optional
  category?: Category;
  modalidad?: Modalidad;
  Nivel?: Nivel;
  enrollments?: Enrollment[] | { length: number };
  creator?: User;
  Nivelid?: number; // Made optional
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  courses?: { length: number };
  preferences?: Preference[];
  is_featured: boolean | null;
}

export interface Preference {
  id: number;
  name: string;
  area_cono: string | null;
  userId: string;
  categoryid: number;
  user?: User;
  category?: Category;
}

export interface CourseTaken {
  id: number;
  userId: string;
  courseId: number;
  user?: User;
  course?: Course;
}

export interface Lesson {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  coverImageKey: string;
  coverVideoKey: string;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
  porcentajecompletado: number;
  resourceKey: string;
  userProgress: number;
  isCompleted: boolean;
  lastUpdated: Date;
  course?: Course;
  activities?: Activity[];
  isLocked: boolean | null;
  resourceNames: string[];
  isNew: boolean; // Agregar propiedad isNew
}

export interface LessonWithProgress extends Lesson {
  porcentajecompletado: number;
  isCompleted: boolean;
  isLocked: boolean;
  courseTitle: string;
  resourceNames: string[];
  courseId: number;
  createdAt: Date;
  content?: {
    questions?: Question[];
  };
  isNew: boolean;
}

export interface UserLessonsProgress {
  userId: string;
  lessonId: number;
  progress: number;
  isCompleted: boolean;
  isLocked: boolean | null;
  isNew: boolean;
  lastUpdated: Date;
}

export interface UserActivitiesProgress {
  userId: string;
  activityId: number;
  progress: number;
  isCompleted: boolean;
  lastUpdated: Date;
  revisada: boolean; // Changed to non-nullable boolean
  attemptCount: number;
  finalGrade: number | null;
  lastAttemptAt: Date | null;
}

export interface Modalidad {
  id?: number;
  name: string;
  description?: string | null;
  courses?: Course[];
}

export interface Score {
  id: number;
  score: number;
  userId: string;
  categoryid: number;
  user?: User;
  category?: Category;
}

// Changed from Dificultad to Nivel
export interface Nivel {
  id?: number;
  name: string;
  description?: string;
}

export interface ActivityContent {
  questions: Question[];
  questionsVOF?: Question[];
  questionsOM?: Question[];
  questionsACompletar?: Question[];
  questionsFilesSubida?: Question[]; // Add this new type
}

export interface Activity {
  id: number;
  name: string;
  description: string | null;
  lastUpdated: Date;
  lessonsId: number;
  revisada: boolean | null; // Cambiado de boolean a boolean | null
  porcentaje: number | null;
  parametroId: number | null;
  typeActi?: TypeActi;
  userActivitiesProgress?: UserActivitiesProgress[];
  content?: ActivityContent;
  typeid: number;
  isCompleted: boolean;
  userProgress: number;
  createdAt?: Date; // Make createdAt optional
  attemptLimit: number;
  currentAttempts: number;
  finalGrade?: number;
  lastAttemptAt?: Date;
  pesoPregunta?: number;
  fechaMaximaEntrega: Date | null;
  isLastInLesson?: boolean; // Add this property
}

export interface Question {
  id: string;
  text: string;
  type: 'VOF' | 'OM' | 'COMPLETAR' | 'FILE_UPLOAD';
  correctOptionId?: string;
  options?: Option[];
  correctAnswer?: string;
  answer?: string;
  pesoPregunta: number;
  parametros?: string; // Add this for file upload parameters
}

export interface Option {
  id: string;
  text: string;
}

export interface TypeActi {
  id: number;
  name: string;
  description: string | null;
  activities?: Activity[];
}

export interface Enrollment {
  id: number;
  userId: string;
  courseId: number;
  enrolledAt: Date;
  completed: boolean | null;
  isPermanent: boolean; // Added this field
}

export interface Project {
  id: number;
  name: string;
  planteamiento: string;
  justificacion: string;
  objetivo_general: string;
  coverImageKey: string | null;
  type_project: string;
  userId: string;
  categoryId: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: number;
    name: string;
  };
}

export interface ProjectTaken {
  id: number;
  userId: string;
  projectId: number;
  createdAt: Date;
  project?: Project;
}

export interface PaginatedCourses {
  courses: Course[];
  total: number;
  page: number;
  pageSize: number;
}

export interface GetCoursesResponse {
  courses: Course[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetCoursesParams {
  pagenum?: number;
  pageSize?: number;
  categoryId?: number;
  searchTerm?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string | null;
  coverImageKey: string | null;
  createdAt: Date | null; // Allow null
  updatedAt: Date | null; // Allow null
  creatorId: string;
  rating: number | null; // Allow null
  categoryid: number;
  creator?: User;
  category?: Category;
  materias?: MateriaWithCourse[];
  enrollmentPrograms?: EnrollmentProgram[];
}

// New interface for Materia with optional course
export interface MateriaWithCourse {
  id: number;
  title: string;
  description: string | null;
  programaId: number | null;
  programa?: {
    id: number;
    title: string;
  };
  courseid: number | null;
  curso?: BaseCourse;
}

export type UserWithEnrollments = User & { enrollments: Enrollment[] };
export type UserWithCreatedCourses = User & { createdCourses: Course[] };
export type CourseWithEnrollments = Course & { enrollments: Enrollment[] };
export type CategoryWithPreferences = Category & { preferences: Preference[] };

export interface SavedAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  pesoPregunta: number;
}

export interface ActivityResults {
  score: number;
  answers: Record<string, SavedAnswer>;
  passed: boolean;
  submittedAt: string;
  attemptCount?: number; // Add attempt counter
  finalGrade: number;
  parameterId?: number;
  revisada?: boolean;
  courseId?: number;
}

export interface ActivityResult {
  id: number;
  name: string;
  grade: number;
  porcentaje: number; // Agregamos el porcentaje
}

// Original Materia interface
export interface Materia {
  id: number;
  title: string;
  description: string | null;
  programaId: number;
  courseid: number | null;
  curso: Course; // Make curso required instead of optional
}

export interface EnrollmentProgram {
  id: number;
  programaId: number;
  userId: string;
  enrolledAt: Date;
  completed: boolean;
  user?: User;
  programa?: Program;
}

// Add new interface for grades
export interface GradeReport {
  materiaId: number;
  materiaName: string;
  grade: number;
  activities: {
    activityId: number;
    name: string;
    grade: number;
    weight: number;
  }[];
  parameters: ParameterGrade[];
}

export interface MateriaGrade {
  id: number;
  materiaId: number;
  userId: string;
  grade: number;
  updatedAt: Date;
  materia?: Materia;
  user?: User;
}

export interface ParameterGrade {
  id: number;
  parameterId: number;
  userId: string;
  grade: number;
  updatedAt: Date;
  parameterName: string;
  weight: number;
  parameter?: Parameter;
  user?: User;
}

export interface Parameter {
  id: number;
  name: string;
  description: string;
  porcentaje: number;
  courseId: number;
  course?: Course;
}

// Add new type for enrollment response
export interface EnrollmentResponse {
  success: boolean;
  message: string;
  requiresSubscription?: boolean;
}

export type NotificationType =
  | 'PROGRAM_ENROLLMENT'
  | 'COURSE_ENROLLMENT'
  | 'LESSON_UNLOCKED'
  | 'COURSE_COMPLETED'
  | 'PLAN_PURCHASED'
  | 'TICKET_CREATED'
  | 'TICKET_UPDATED'
  | 'TICKET_ASSIGNED'
  | 'NEW_COURSE_ADDED'
  | 'ACTIVITY_COMPLETED'
  | 'COURSE_UNENROLLMENT'
  | 'CERTIFICATE_CREATED';

export interface NotificationMetadata {
  programId?: number;
  courseId?: number;
  lessonId?: number;
  planId?: string;
  ticketId?: number;
  creatorId?: string;
  activityId?: number;
  certificateId?: number;
  openModal?: boolean; // <-- agrega esta línea para permitir el flag openModal
}

export interface Notification {
  id: number;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  isMarked?: boolean; // <-- nuevo campo
  createdAt: Date;
  metadata?: NotificationMetadata;
}

export interface Certificate {
  id: number;
  userId: string;
  courseId: number;
  grade: number;
  createdAt: Date;
  publicCode?: string | null;
  studentName?: string | null;
  user?: User;
  course?: Course;
}

export interface ClassMeeting {
  id: number;
  courseId: number;
  title: string;
  startDateTime: string; // ISO string
  endDateTime: string; // ISO string
  joinUrl?: string | null;
  weekNumber?: number | null;
  createdAt?: string | null;
  meetingId: string;
  video_key?: string | null;
  progress?: number | null;
}
