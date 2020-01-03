import { Component, OnInit } from '@angular/core';

import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  Employee:any = [];

  //DP
  constructor(private apiService: ApiService) { 
    this.readEmployee();
  }

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  }

  deleteEmp(employee, index){
    if (window.confirm("R U sure?")){
      this.apiService.deleteEmployee(employee._id).subscribe((data)=> {
        this.Employee.splice(index, 1);
      })
    }
  }

  ngOnInit() {
  }

}
