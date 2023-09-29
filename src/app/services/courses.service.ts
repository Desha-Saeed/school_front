import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // replace your api url here

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/course`);
  }

  searchCourses(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/course?search=${query}`);
  }

  getCourseInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${id}/grades`);
  }

  enrollStudentToCourse(student_id: number, course_id: number) {
    return this.http.post<any>(`${this.apiUrl}/enroll`, {
      student_id,
      course_id,
    });
  }
  removeStudentFromCourse(student_id: number, course_id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
    });

    // Create a data object to send in the request body
    const data = {
      student_id: student_id,
      course_id: course_id,
    };

    console.log(data);

    // Define the HTTP options with the body
    const options = {
      headers: headers,
      body: data, // Include the data object as the request body
    };

    return this.http.delete<any>(`${this.apiUrl}/enroll`, options);
  }
}
