import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Classroom, CreateClassroom, UpdateClassroom } from "../../../domain/interfaces/classroom.interface";

export class ClassroomService {

    public async getAllClassrooms(): Promise<Classroom[]> {
        const sql = `SELECT * FROM classroom;`;
        const classrooms = await pool.query(sql);
        return classrooms.rows;
    }

    public async getClassroomById(id: number): Promise<Classroom | null> {
        const sql = `SELECT * FROM classroom WHERE id = $1;`;
        const classroom = (await pool.query<Classroom>(sql, [id])).rows[0];
        return classroom ?? null;
    }

    public async createClassroom(classroom: CreateClassroom): Promise<Classroom> {
        const sql = `
            INSERT INTO classroom (
                code,
                capacity,
                status
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [
            classroom.code,
            classroom.capacity,
            classroom.status,
        ];
        const classroomCreated = (await pool.query<Classroom>(sql, values)).rows[0];
        if(!classroomCreated) {
            throw CustomError.internalServer(`No se pudo crear el aula`);
        }
        return classroomCreated;
    }

    public async updateClassroom(
        id: number,
        classroom: CreateClassroom
    ): Promise<Classroom> {
        const existingClassroom = await this.getClassroomById(id);
        if(!existingClassroom) {
            throw CustomError.internalServer(`No existe un aula con ese id`);
        }
        const sql = `
            UPDATE classroom
            SET
                code = $1,
                capacity = $2,
                status = $3
            WHERE id = $4
            RETURNING *;
        `;
        const values = [
            classroom.code,
            classroom.capacity,
            classroom.status,
            id,
        ];
        const classroomUpdated = (await pool.query<Classroom>(sql, values)).rows[0];
        if(!classroomUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el aula`);
        }
        return classroomUpdated;
    }

    public async deleteClassroom(id: number): Promise<boolean> {
        const existingClassroom = await this.getClassroomById(id);
        if(!existingClassroom) {
            throw CustomError.internalServer(`No existe un aula con ese id`);
        }
        const sql = `
            DELETE FROM classroom
            WHERE id = $1
            RETURNING id;
        `;
        const classroomDeleted = await pool.query(sql, [id]);
        if(!classroomDeleted) {
            throw CustomError.internalServer(`No se pudo eliminar el aula`);
        }
        return classroomDeleted.rowCount !== null && classroomDeleted.rowCount > 0;
    }
}