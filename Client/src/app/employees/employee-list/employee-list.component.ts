import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadStart, Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = ['EmployeeID', 'FirstName', 'LastName', 'Position', 'Office', 'Actions'];

  constructor(
    public employeeService: EmployeeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.employeeService.loadList();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeService.getEmployee(params['id']).subscribe(employee =>
          this.employeeService.selectedEmployee = employee);
      } else {
        this.employeeService.selectedEmployee = new Employee();
      }
    });
  }

  showForEdit(employee: Employee) {
    this.router.navigate(['home', { id: employee.EmployeeID }]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record ?')) {
      this.employeeService.deleteEmployee(id)
        .subscribe(x => {
          this.employeeService.employeeList.remove(empl => empl.EmployeeID === id);
          this.router.navigate(['home']);
          this.toastr.warning('Deleted Successfully', 'Employee Register');
        });
    }
  }
}
