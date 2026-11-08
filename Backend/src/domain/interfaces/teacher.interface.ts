export interface Teacher {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: boolean;
}

export type CreateTeacher = Omit<Teacher, "id">;

export type UpdateTeacher = Omit<Teacher, "id">;