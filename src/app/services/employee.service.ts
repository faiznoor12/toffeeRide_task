import { Injectable } from '@angular/core';
import { Employees } from '../model/employee.model';
import { dummyEmployees } from '../model/dummyEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeeArray: Employees[] = [];
  lastId:number=0

  constructor() {
    if(!localStorage.getItem('array')){
        this.employeeArray = [...dummyEmployees]
        this.lastId = dummyEmployees.length
        this.saveTolocalstorage()
       }
  }

  getAllEmployee():Employees[] {
     return JSON.parse(localStorage.getItem('array')!);
  }
  getEmployee(id: number) {
    let array: Employees[] = JSON.parse(localStorage.getItem('array')!);
    return array.find((val) => val.id == id);
  }
  addEmployee(val: Employees) {
    val.id = this.lastId += 1
    this.employeeArray.push(val);
    this.saveTolocalstorage();
  }
  editEmployee(id: number, updateValue: Employees) {
    let index:number = this.findIndex(id)
    this.employeeArray[index] = updateValue;
    this.saveTolocalstorage();
  }
  deleteEmployee(id: number) {
    let index:number = this.findIndex(id)
    this.employeeArray.splice(index, 1);
    this.saveTolocalstorage();
  }
  saveTolocalstorage(){
    localStorage.setItem('array', JSON.stringify(this.employeeArray));
  }
  findIndex(id:number):number{
    let data: Employees[] = this.getAllEmployee();
    return data.indexOf(data.find((val) => val.id == id)!)
  }
}
