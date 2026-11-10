import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../../students/services/student.service';

@Component({
  selector: 'app-create-teacher',
  imports: [
    Back, 
    ReactiveFormsModule
  ],
  templateUrl: './create-teacher.html',
})
export class CreateTeacher {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  teacherForm = this.fb.group({
    
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    status: [true]
  });

  createTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const teacher: CreateTeacherRequest = {
      name: this.teacherForm.value.name!,
      phone: this.teacherForm.value.phone!,
      email: this.teacherForm.value.email!,
      status: this.teacherForm.value.status!
    };
    console.log('Docente para enviar al backend:', teacher);
    this.teacherService.create(teacher).subscribe({
      next: () => {
        this.alertService.toast(
          'Docente   registrado correctamente',
          'success'
        );
        this.router.navigateByUrl('/teachers');
      },
      error: () => {
        this.alertService.toast('Error al crear el docente', 'error');
      }
    })

  }
  
}
