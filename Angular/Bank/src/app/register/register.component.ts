import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({

    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registrationForm);


    let name = this.registrationForm.value.name
    let acno = this.registrationForm.value.acno
    let pswd = this.registrationForm.value.pswd

    if (this.registrationForm.valid) {
      
      this.ds.register(name, acno, pswd)
        .subscribe(
          (result: any) => {
            if (result) {
              alert(result.message)
              this.router.navigateByUrl('')
            }

          },
          (result) => {
            alert(result.error.message)

          })
        
    }
    else {
      alert("invalid form")
    }
  }
}

