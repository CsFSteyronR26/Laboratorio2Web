export interface Classroom {
  id: number;
  code: string;
  capacity: number;
  status: boolean;
}

export interface CreateClassroomRequest extends Classroom {}

export type UpdateClassroomRequest = Omit<Classroom, "id">;