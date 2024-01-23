import { Component } from '@angular/core';
import { Employees } from 'src/app/model/employee.model';
// import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  allEmployees!: Employees[];

  searchInp!: string;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.allEmployees = this.employeeService.getAllEmployee();
    console.log(this.allEmployees);
  }
}
