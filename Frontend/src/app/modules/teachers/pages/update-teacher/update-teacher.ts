import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher, UpdateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';
import { UpdateStudentRequest } from '../../../students/interfaces/student';

@Component({
  selector: 'app-update-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-teacher.html',
})
export class UpdateTeacher {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  teacherForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    status: [true]
  });

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getById(this.id).subscribe({
      next: (teacher) => {
        this.setValues(teacher);
      },
      error: (error: any) => {
        console.error('Error fetching teachers:', error);
        this.alertService.toast('Error al consultar el docente', 'error');
        this.goToList();
      }
    })
  }

  setValues(teacher: Teacher): void {
    this.teacherForm.patchValue({
      name: teacher.name,
      phone: teacher.phone,
      email: teacher.email,
      status: teacher.status
    });
  }



  updateTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const formValue = this.teacherForm .getRawValue();
    const teacher: UpdateTeacherRequest = {
      name: formValue.name!,
      phone: formValue.phone!,
      email: formValue.email!,
      status: formValue.status!
    };

    this.teacherService.update(this.id, teacher).subscribe({
      next: () => {
        this.alertService.toast(
          'Docente actualizado correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating teacher:', error);
        this.alertService.toast(
          'Error al actualizar el docente',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('teachers');
  }

}
