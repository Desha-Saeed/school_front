import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  studentForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      full_name: ['', Validators.required],
      code: ['', [Validators.required]],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      level_id: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;

      console.log(newStudent);

      this.studentService.addStudent(newStudent).subscribe(
        () => {
          this.successMessage = 'Student added successfully.';
          setTimeout(() => {
            this.router.navigate(['/students']); // Redirect to students component
          }, 2000); // Redirect after 2 seconds
        },
        (error) => {
          this.errorMessage = 'Error adding student: ' + error;
        }
      );
    }
  }
}
