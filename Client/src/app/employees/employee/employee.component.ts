import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

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
          this.resetForm(form);
          this.employeeService.refreshList();
          this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        });
    } else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.refreshList();
          this.toastr.info('Record Updated Successfully!', 'Employee Register');
        });
    }
  }
}
