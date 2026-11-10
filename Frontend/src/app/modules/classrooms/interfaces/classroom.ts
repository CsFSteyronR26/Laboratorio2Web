export interface Classroom {
  id: number;
  code: string;
  capacity: number;
  status: boolean;
}

export type CreateClassroomRequest = Omit<Classroom, "id">;

export type UpdateClassroomRequest = Omit<Classroom, "id">;