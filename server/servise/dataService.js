//import jsonweb token

const jwt = require('jsonwebtoken')
const db = require('./db')


database = {
  1000: { acno: 1000, uname: "arshad", password: "1000", balance: 5000, transaction: [] },
  2000: { acno: 2000, uname: "Ajmal", password: "2000", balance: 10000, transaction: [] },
  3000: { acno: 3000, uname: "Jaleel", password: "3000", balance: 15000, transaction: [] },
  4000: { acno: 4000, uname: "fuad", password: "4000", balance: 20000, transaction: [] }
}



//register function

const register = (uname, acno, password) => {
  // asycronous
  return db.User.findOne({ acno })
    .then(user => {

      console.log(user);

      if (user) {
        return {

          statusCode: 422,
          status: true,
          message: "User already exist ...please login"


        }
      }
      else {
        const newUser = new db.User({
          acno,
          uname,
          password,
          balance: 0,
          transaction: []
        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "Successfully Registerd...."
        }


      }
    })


}


// log in api

const login = (acno, pswd) => {

  return db.User.findOne({ acno, password: pswd })
    .then(user => {
      if (user) {
        loggedUser=user.uname

        currentAcno = acno
        token = jwt.sign({
          currentAcNo: acno
        }, 'superscreateprivatekey12345')
        console.log(loggedUser);




        return {
          statusCode: 200,
          status: true,
          message: "Successfully logged In....",
          token,
          currentAcno,
          loggedUser
          
        }



      }

      else {

        return {
          statusCode: 400,
          status: false,
          message: "Invalid Credential"
        }

      }

    })
}

// deposit

const deposit = (acno, pswd, amt) => {

  var amount = parseInt(amt)
  return db.User.findOne({ acno, password: pswd }).then(
    user => {

      if (user) {

        user.balance += amount
        user.transaction.push({
          amount: amount,
          Type: "CREDIT"
        })
        user.save()
        return {
          statusCode: 200,
          staus: true,
          message: ` Rs ${amount} Successfully Credited ...Available balance is Rs ${user.balance} `
        }

      }
      else {
        return {
          statusCode: 400,
          status: false,
          message: "Invalid  Credential....."
        }
      }

    })

}
//withdraw

const withdraw = (req, acno, pswd, amt) => {


  var amount = parseInt(amt)
  var currentAcNo = req.currentAcNo




   return db.User.findOne({ acno, password: pswd })
   .then( user=> {

      if (user) {

          // cheking account number  is  same or not  in token and 
          if (currentAcNo != acno) {

            return {
              statusCode: 400,
              status: false,
              message: "operation denied"
            }

          }


        if (user.balance > amount) {

              user.balance-=amount
              user.transaction.push({
                amount: amount,
                Type: "DEBIT"
              })
              user.save()

              return {
                statusCode: 200,
                status: true,
                message: "Rs " + amount + " is debited.Available Balance is Rs " + user.balance
              }


        }
        else {
            return {
              statusCode: 200,
              status: true,
              message: "insufficiant balance"
            }
          }
      }
      else {

          return {
            statusCode: 400,
            status: false,
            message: "Invalid Account Credentials..."

          }
      }
    })
  }





const getTransaction = (acno) => {

  return db.User.findOne({acno})
  .then( user=>{

      if(user)
      {
        return {
          statusCode: 200,
          staus: true,
          transaction: user.transaction
        }

      }
      else {
        return {
          statusCode: 400,
          staus: false,
          message: "Invalid Credentials....."
        }
      }

    })
}




module.exports = {
  register, login, deposit, withdraw, getTransaction
}

