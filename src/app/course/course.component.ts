import { Component } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  courses: any[] = [];
  searchTerm: string = '';

  constructor(private courseService: CoursesService) {}
  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;

      console.log(this.courses);
    });
  }
  search() {
    if (this.searchTerm) {
      this.courseService.searchCourses(this.searchTerm).subscribe(
        (results) => {
          console.log(results);

          this.courses = results; // Update the students array with search results
        },
        (error) => {
          console.error('Error searching students:', error);
        }
      );
    } else {
      // If the search term is empty, load the default students
      this.loadCourses();
    }
  }
}
