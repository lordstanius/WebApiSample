import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dataSource = new MatTableDataSource<Employee>();
  displayedColumns = ['EmployeeID', 'FirstName', 'LastName', 'Position', 'Office'];

  constructor(public employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe(data =>
      this.dataSource.data = data
    );
  }

  showForEdit(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.employeeService.deleteEmployee(id)
        .subscribe(x => {
          this.employeeService.getEmployeeList();
          this.toastr.warning('Deleted Successfully', 'Employee Register');
        });
    }
  }
}
