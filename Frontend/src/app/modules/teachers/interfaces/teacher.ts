export interface Teacher {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: boolean;
}

export type CreateTeacherRequest = Omit<Teacher, "id">;

export type UpdateTeacherRequest = Omit<Teacher, "id">;