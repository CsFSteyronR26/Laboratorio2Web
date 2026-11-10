import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Classroom, UpdateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';


@Component({
  selector: 'app-update-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-classroom.html',
})
export class UpdateClassroom {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private classroomService = inject(ClassroomService);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  classroomForm  = this.fb.group({
    code: ['', Validators.required],
    capacity: ['', Validators.required],
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
    this.getClassroom();
  }

  getClassroom() {
    this.classroomService.getById(this.id).subscribe({
      next: (classroom) => {
        this.setValues(classroom);
      },
      error: (error: any) => {
        console.error('Error fetching classrooms:', error);
        this.alertService.toast('Error al consultar el aula', 'error');
        this.goToList();
      }
    })
  }

  setValues(classroom: Classroom): void {
    this.classroomForm.patchValue({
      code: classroom.code,
      capacity: String(classroom.capacity),
      status: classroom.status
    });
  }

  private formatDate(value: Date | string): string {
    if (typeof value === 'string') {
      return value.substring(0, 10);
    }
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  updateClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const formValue = this.classroomForm.getRawValue();
    const classroom: UpdateClassroomRequest = {
      code: formValue.code!,
      capacity: Number(formValue.capacity),
      status: formValue.status!
    };

    this.classroomService.update(this.id, classroom).subscribe({
      next: () => {
        this.alertService.toast(
          'Aula actualizada correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating classroom:', error);
        this.alertService.toast(
          'Error al actualizar el aula',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('classrooms');
  }

}
