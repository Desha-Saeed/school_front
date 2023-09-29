import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/students.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {
  studentForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  studentId!: number;
  student: any;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      full_name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      level_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // Retrieve the student ID from the route
      this.studentId = +params['id'];

      // Fetch student data by ID and populate the form for update
      this.studentService.getStudentById(this.studentId).subscribe(
        (student) => {
          this.studentForm.patchValue({
            full_name: student.data.full_name,
            code: student.data.code,
            date_of_birth: student.data.date_of_birth,
            email: student.data.email,
            level_id: student.data.level.number,
          });
        },
        (error) => {
          this.errorMessage = 'Error loading student data: ' + error;
        }
      );
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const updatedStudent = this.studentForm.value;

      console.log(updatedStudent);

      this.studentService
        .updateStudent(this.studentId, updatedStudent)
        .subscribe(
          () => {
            this.successMessage = 'Student updated successfully.';
            setTimeout(() => {
              this.router.navigate(['/students']); // Redirect to students component
            }, 2000); // Redirect after 2 seconds
          },
          (error) => {
            console.log(error);

            this.errorMessage = 'Error updating student: ' + error;
          }
        );
    }
  }
}
