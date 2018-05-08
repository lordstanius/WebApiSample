import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    this.employeeService.selectedEmployee = new Employee();
    if (form != null) {
      form.reset();
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      form.value.EmployeeID = 0;
      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.employeeService.employeeList.add(data);
          this.resetForm(form);
          this.router.navigate(['home']);
          this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        });
    } else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
        .subscribe(data => {
          this.employeeService.employeeList.update(form.value, empl => empl.EmployeeID === form.value.EmployeeID);
          this.resetForm(form);
          this.router.navigate(['home']);
          this.toastr.info('Record Updated Successfully!', 'Employee Register');
        });
    }
  }
}
