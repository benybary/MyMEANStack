import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Employee} from '../model/Employee'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // uniform reasource indicator
  baseUri: String = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type','application/json');
  emp = new Employee;
  //DI
  constructor(private http: HttpClient) { }
  // Get all employees
  getEmployees(){
    return this.http.get(`${this.baseUri}`);
  }
  //Create Employee
  createEmployee(data) : Observable<any>{
    let url = `${this.baseUri}/create`; 
    return this.http.post(url, data).pipe(catchError(this.errorMgt));
  }

  // Get employee by ID
  getEmployeeByID(id): Observable<any>{
    let url = `${this.baseUri}/empid/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:Response)=> {
        return res ||{}
      }),catchError(this.errorMgt)
    );
  }

  // Update Employee
  updateEmployee(id, data): Observable<any>{
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, {headers:this.headers}).pipe(
      catchError(this.errorMgt)
    );
  }

  //Delete Employee
  deleteEmployee(id): Observable<any>{
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, {headers:this.headers}).pipe(
      catchError(this.errorMgt)
    );
  }
  //Error Handeling
  errorMgt(error: HttpErrorResponse){
    let errorMsg = '';
    if(error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code: ${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMsg);
    return throwError(errorMsg);
  }
    
}
