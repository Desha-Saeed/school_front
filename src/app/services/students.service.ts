import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student`, student);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/${id}`);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/student/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/student/${id}`);
  }

  searchStudents(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student?search=${query}`);
  }
  filterByLevel(level: number): Observable<any> {
    console.log(level);

    return this.http.get<any>(`${this.apiUrl}/student?level_id=${level}`);
  }
}
