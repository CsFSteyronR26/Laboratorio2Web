export interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
  semester: number;
  status: boolean;
}

export interface CreateCourseRequest extends Course {}

export type UpdateCourseRequest = Omit<Course, "id">;