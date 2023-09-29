import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/students.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  students!: any[];
  levels: number[] = [1, 2, 3, 4];
  searchText: string = '';
  selectedLevel: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data.data;

      console.log(this.students);
    });
  }

  deleteStudent(student: any) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(student.id).subscribe(() => {
        this.loadStudents(); // Refresh the student list after deletion
      });
    }
  }

  search() {
    if (this.searchText) {
      this.studentService.searchStudents(this.searchText).subscribe(
        (results) => {
          console.log(results);

          this.students = results.data; // Update the students array with search results
        },
        (error) => {
          console.error('Error searching students:', error);
        }
      );
    } else {
      // If the search term is empty, load the default students
      this.loadStudents();
    }
  }

  filter() {
    console.log(this.selectedLevel);

    if (this.selectedLevel) {
      this.studentService.filterByLevel(+this.selectedLevel).subscribe(
        (results) => {
          console.log(results);

          this.students = results.data; // Update the students array with search results
        },
        (error) => {
          console.error('Error filtering students:', error);
        }
      );
    } else {
      // If the search term is empty, load the default students
      this.loadStudents();
    }
  }
}
