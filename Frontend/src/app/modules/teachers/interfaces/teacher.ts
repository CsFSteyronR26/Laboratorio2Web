export interface Teacher {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: boolean;
}

export interface CreateTeacherRequest extends Teacher {}

export type UpdateTeacherRequest = Omit<Teacher, "id">;