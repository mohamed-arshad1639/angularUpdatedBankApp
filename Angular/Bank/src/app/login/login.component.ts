import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  loginForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]




  })




  ngOnInit(): void {
  }

  // get_acno(event: any) {
  //   this.acno = event.target.value


  // }

  // get_password(event: any) {
  //   this.pswd = event.target.value

  // }

  login() {
    let acno = this.loginForm.value.acno
    let pswd = this.loginForm.value.pswd

    if (this.loginForm.valid) {

      this.ds.login(acno, pswd)
        .subscribe((result: any) =>
         {
          if (result) {

            localStorage.setItem("currentUname",JSON.stringify(result.loggedUser))
            localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
            localStorage.setItem("token",JSON.stringify(result.token))


            alert(result.message)
            this.router.navigateByUrl("dashboard")
          }
        },
          (result)=>{
            alert(result.error.message)
          }
        )
    }
    else{
      alert("in valid Form")
    }

}




    // login(a:any,p:any)
    // {

    //   console.log(a);



    //   var acno=a.value
    //   var pswd=p.value                                                              
    //   var db=this.database



    //   if(acno in db)
    //   {
    //      if(pswd==db[acno]["password"])
    //      {
    //        alert("You are successfully Logged In ")
    //      }
    //      else{
    //        alert("Invalid Password")
    //      }
    //   }
    //   else{
    //     alert("invalid Account Number")
    //   }
    // }



  }
