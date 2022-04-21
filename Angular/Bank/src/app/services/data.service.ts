import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';
import { Router } from '@angular/router';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // database: any = {
  //   1000: { acno: 1000, uname: "arshad", password: "1000", balance: 5000,transaction:[]},
  //   2000: { acno: 2000, uname: "Ajmal", password: "2000", balance: 10000 ,transaction:[]},
  //   3000: { acno: 3000, uname: "Jaleel", password: "3000", balance: 15000 ,transaction:[]},
  //   4000: { acno: 4000, uname: "fuad", password: "4000", balance: 20000 ,transaction:[]}
  // }
  loggedUser=""
  currentAcno=""

  constructor(private router: Router, private Http:HttpClient) { 
    // this.getDetails()
  }

  // registration function

  // saveDetails()
  // {
  //   if(this.database)
  //   {
  //     localStorage.setItem("database",JSON.stringify(this.database))
  //   }
  //   if(this.loggedUser)
  //   {
  //     localStorage.setItem("currentUname",JSON.stringify(this.loggedUser))
  //   }
  //   if(this.currentAcno)
  //   {
  //     localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  //   }
  // }

  // getDetails()
  // {
  //   if(localStorage.getItem("database")){
  //     this.database=JSON.parse(localStorage.getItem("database" ) || "")
  //   }
  //   if(localStorage.getItem("currentUname")){
  //     this.loggedUser=JSON.parse(localStorage.getItem("currentUname") || "")
  //   }

  // }

  getTransaction(acno:any)
  {
    const data={
      acno
    }
    //transaction Api

    return this.Http.post("http://localhost:4000/transaction",data,this.getOption())

  }




  register(uname:any,acno:any,password:any) {

    const data={
      acno,
      uname,
      password
    }
    return this.Http.post("http://localhost:4000/register",data)

  
  }


  // login function

  login(acno:any, pswd:any) {
    const data={
      acno,
      pswd
    }
    
   return this.Http.post("http://localhost:4000/login",data)

  }


  //deposit

deposit(acno:any,pswd:any,amt:any)
{ 
 
  const data={
    acno,
    pswd,
    amt
  }

  

  return this.Http.post("http://localhost:4000/deposit",data,this.getOption())


}

//to add token inside the http header 
getOption()
{
  const token= JSON.parse(localStorage.getItem("token")||'')
  let headers = new HttpHeaders()
  if(token)
  {
    headers=headers.append('x-access-token',token)
    options.headers=headers
  }
  return options
}


//withdraw

withdraw(acno:any,pswd:any,amt:any)
{ 
  const data={
    acno,
    pswd,
    amt
  }

  

  return this.Http.post("http://localhost:4000/withdraw",data,this.getOption())


}
}


