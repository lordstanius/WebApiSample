import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from './employee.model';
import { environment } from '../../../environments/environment';
import { Helper } from './helper';

@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList: Employee[];
  url: string;

  constructor(private http: HttpClient) {
    this.url = Helper.getApiUrlForService(this);
  }

  postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee);
  }

  putEmployee(id: number, employee) {
    return this.http.put(this.url + employee.EmployeeID, employee);
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.url + id);
  }
}
