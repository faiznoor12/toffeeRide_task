import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Employees } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

let formType: 'Add' | 'Edit';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  constructor(
    public employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: HotToastService,
    private activeRoute: ActivatedRoute
  ) {}

  empId!: number;
  err: boolean = false;
  employee!: Employees;
  formType!: 'Add' | 'Edit';

  employeeForm: FormGroup = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['',[Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
      dateOfJoining: ['',[Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      adderssLine1: ['', Validators.required],
      adderssLine2: ['', Validators.required],
      street: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pinCode: ['', Validators.required],
      id: [''],
    },
    { validators: [checkEmail, checkNumber] }
  );

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (res) => ((formType = res['type']), (this.empId = res['id']))
    );
    this.formType = formType;

    if (formType === 'Edit') {
      this.employee = this.employeeService.getEmployee(this.empId)!;

      this.fc['firstName'].setValue(this.employee.firstName);
      this.fc['lastName'].setValue(this.employee.lastName);
      this.fc['gender'].setValue(this.employee.gender);
      this.fc['dateOfBirth'].setValue(this.employee.dateOfBirth);
      this.fc['dateOfJoining'].setValue(this.employee.dateOfJoining);
      this.fc['phoneNumber'].setValue(this.employee.phoneNumber);
      this.fc['emailId'].setValue(this.employee.emailId);
      this.fc['adderssLine1'].setValue(this.employee.adderssLine1);
      this.fc['adderssLine2'].setValue(this.employee.adderssLine2);
      this.fc['street'].setValue(this.employee.street);
      this.fc['district'].setValue(this.employee.district);
      this.fc['state'].setValue(this.employee.state);
      this.fc['country'].setValue(this.employee.country);
      this.fc['pinCode'].setValue(this.employee.pinCode);
      this.fc['id'].setValue(this.employee.id);
    }
  }

  get fc() {
    return this.employeeForm.controls;
  }

  submit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.toaster.error('all fields are required');
      return;
    }
    if (formType === 'Add') {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.toaster.success('employee added successfully');
      this.employeeForm.reset();
      return;
    }

    this.employeeService.editEmployee(this.employeeForm.get('id')?.value, this.employeeForm.value);
    this.router.navigateByUrl(`/employee/${this.empId}`);
  }
}

function checkNumber(data: AbstractControl): ValidationErrors | null {
  if (formType === 'Edit') return null;
  let array: Employees[] = JSON.parse(localStorage.getItem('array')!);
  return array.find((val) => val.phoneNumber === data.get('phoneNumber')!.value)
    ? { numberUsed: true }
    : null;
}
function checkEmail(data: AbstractControl): ValidationErrors | null {
  if (formType === 'Edit') return null;
  let array: Employees[] = JSON.parse(localStorage.getItem('array')!);
  return array.find((val) => val.emailId === data.get('emailId')!.value)
    ? { emailUsed: true }
    : null;
}
