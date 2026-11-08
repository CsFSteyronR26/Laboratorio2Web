export interface Classroom {
  id: number;
  code: string;
  capacity: number;
  status: boolean;
}

export type CreateClassroom = Omit<Classroom, "id">;

export type UpdateClassroom = Omit<Classroom, "id">;