import { Pipe, PipeTransform } from '@angular/core';
import { Employees } from '../model/employee.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: string) {
    if(!value) return null
    if(!args) return value
    return value.filter((val:any)=>{
      return JSON.stringify(val).toLowerCase().includes(args.toLowerCase())
    })
  }
}
