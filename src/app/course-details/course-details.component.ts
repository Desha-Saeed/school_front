import { Component } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/students.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  courseID!: number;
  data: any;

  students: any[] = []; // Array to store all students
  selectedStudentId!: number; // store the id of selected student

  constructor(
    private courseService: CoursesService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // Retrieve the student ID from the route
      this.courseID = +params['id'];
      this.loadCourseInfo();
    });

    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data.data;

      console.log(this.students);
    });
  }

  loadCourseInfo() {
    // Fetch student data by ID and populate the form for update
    this.courseService.getCourseInfo(this.courseID).subscribe(
      (course) => {
        this.data = course;

        console.log(course);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  enrollStudent() {
    this.courseService
      .enrollStudentToCourse(+this.selectedStudentId, +this.courseID)
      .subscribe((res) => {
        this.loadCourseInfo();
      });
  }

  removeFromCourse(id: number) {
    this.courseService
      .removeStudentFromCourse(id, this.courseID)
      .subscribe((res) => this.loadCourseInfo());
  }
}
