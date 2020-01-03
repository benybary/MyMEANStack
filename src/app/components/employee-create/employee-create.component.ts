import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

 
@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  frmEmployee: FormGroup;
  EmployeeDepartment: any = ['Sales', 'Dev', 'QA']

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {
  }

  mainForm() {
    this.frmEmployee = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
        department: ['',[Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      //active: ['', [Validators.required]]
    })
  }


// choose department with dropdown
dropDownDept(e){
  this.frmEmployee.get('department').setValue(e, {
    myValue: true
  });
}

// Getter to access form control
get myForm(){
  return this.frmEmployee.controls;
}

onSubmit(){
  this.submitted = true;
  if(!this.frmEmployee.valid){
    return false;
  }else {
    this.apiService.createEmployee(this.frmEmployee.value).subscribe(
    (res) => {
      console.log('Employee successfully created!');
      this.router.navigateByUrl('/list-employee');
      // ngZone later?      
    }
    )
  }
    
}

  ///// write code for radio buttons selection

}
