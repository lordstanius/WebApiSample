import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from './employee.model';
import { environment } from '../../../environments/environment';
import { Helper } from './helper';
import { MatTableDataSource } from '@angular/material';

@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList: Employee[];
  url: string;

  private _dataSource: MatTableDataSource<Employee>;

  constructor(private http: HttpClient) {
    this.url = Helper.getApiUrlForService(this);
  }

  set dataSource(dataSource: MatTableDataSource<Employee>) {
    this._dataSource = dataSource;
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

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + id);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.url + id);
  }

  refreshList(): void {
    this.getEmployeeList().subscribe(data => {
      if (this._dataSource) {
        this._dataSource.data = data;
      }
    });
  }
}
