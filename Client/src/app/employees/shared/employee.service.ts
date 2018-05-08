import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from './employee.model';
import { environment } from '../../../environments/environment';
import { Helper } from './helper';
import { MatTableDataSource } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';
import { List } from './list';

@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  url: string;
  employeeList: List<Employee>;

  constructor(private http: HttpClient) {
    this.url = Helper.getApiUrlForService(this);
  }

  postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee);
  }

  putEmployee(id: number, employee) {
    return this.http.put(this.url + employee.EmployeeID, employee);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + id);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.url + id);
  }

  loadList(): void {
    this.getEmployees().subscribe(data => this.employeeList = new List<Employee>(data));
  }
}
