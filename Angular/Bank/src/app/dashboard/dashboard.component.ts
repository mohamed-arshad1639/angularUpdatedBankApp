import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // acno=""
  // pswd=""
  // amt=""

  // acno1=""
  // pswd1=""
  // amt1=""

  user = ""
  acno: any
  ldate: any
  token:any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.user =JSON.parse(localStorage.getItem("currentUname")||'') 
    this.ldate = new Date()
  }

  depositForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amt: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  withdrawForm = this.fb.group({

    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amt1: ['', [Validators.required, Validators.pattern('[0-9]*')]]


  })


  ngOnInit(): void {

    this.token=JSON.parse(localStorage.getItem("token")||'')
    {
       if(!localStorage.getItem("token")){
         alert("please log in")
         this.router.navigateByUrl("")
       }
    }

  }

  deposit() {



    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amt = this.depositForm.value.amt

    if (this.depositForm.valid) {
      this.ds.deposit(acno, pswd, amt)
        .subscribe((result: any) => {
          if (result) 
          {
            alert(result.message)
          }
        },
          (result) =>
           {
            alert(result.error.message)
          })

    }



    else {
      alert("Invalid Form")
    }
  }








  withdraw() {



    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amt = this.withdrawForm.value.amt1
    if (this.withdrawForm.valid) {
      this.ds.withdraw(acno, pswd, amt)
      .subscribe((result:any)=>{
        if(result)
        {
          alert(result.message)
        }

      },
      (result)=>{
        alert(result.error.message)
      }
      )

     




  }
  else{
    alert("invalid form")
  }
}

  logOut() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")

  }
  deleteAcc() {
    this.acno = localStorage.getItem("currentAcno")

  }
  cancelFromParent() {
    this.acno = ""
  }


}
