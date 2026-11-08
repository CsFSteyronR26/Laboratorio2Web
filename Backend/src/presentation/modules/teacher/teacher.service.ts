import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Course } from "../../../domain/interfaces/course.interface";
import { Teacher, CreateTeacher, UpdateTeacher } from "../../../domain/interfaces/teacher.interface";

export class TeacherService {

    public async getAllTeachers(): Promise<Teacher[]> {
        const sql = `SELECT * FROM teachers;`;
        const courses = await pool.query(sql);
        return courses.rows;
    }

    public async getTeacherById(id: number): Promise<Teacher | null> {
        const sql = `SELECT * FROM teachers WHERE id = $1;`;
        const teacher = (await pool.query<Teacher>(sql, [id])).rows[0];
        return teacher ?? null;
    }

    public async createTeacher(teacher: CreateTeacher): Promise<Teacher> {
        const sql = `
            INSERT INTO teachers (
                name,
                phone,
                email,
                status
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [
            teacher.name,
            teacher.phone,
            teacher.email,
            teacher.status
        ];
        const teacherCreated = (await pool.query<Teacher>(sql, values)).rows[0];
        if(!teacherCreated) {
            throw CustomError.internalServer(`No se pudo crear el profesor`);
        }
        return teacherCreated;
    }

    public async updateTeacher(
        id: number,
        teacher: UpdateTeacher
    ): Promise<Teacher> {
        const existingTeacher = await this.getTeacherById(id);
        if(!existingTeacher) {
            throw CustomError.internalServer(`No existe un profesor con ese id`);
        }
        const sql = `
            UPDATE teachers
            SET
                name = $1,
                phone = $2,
                email = $3,
                status = $4
            WHERE id = $5
            RETURNING *;
        `;
        const values = [
            teacher.name,
            teacher.phone,
            teacher.email,
            teacher.status,
            id
        ];
        const teacherUpdated = (await pool.query<Teacher>(sql, values)).rows[0];
        if(!teacherUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el profesor`);
        }
        return teacherUpdated;
    }

    public async deleteTeacher(id: number): Promise<boolean> {
            const existingTeacher = await this.getTeacherById(id);
            if(!existingTeacher) {
                throw CustomError.internalServer(`No existe un profesor con ese id`);
            }
            const sql = `
                DELETE FROM teachers
                WHERE id = $1
                RETURNING id;
            `;
            const teacherDeleted = await pool.query(sql, [id]);
            if(!teacherDeleted) {
                throw CustomError.internalServer(`No se pudo eliminar el profesor`);
            }
            return teacherDeleted.rowCount !== null && teacherDeleted.rowCount > 0;
        }

    }