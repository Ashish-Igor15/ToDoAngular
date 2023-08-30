const express= require('express')
const router=express.Router()
const User= require('../models/user')

const mongoose= require('mongoose')
const db= "mongodb+srv://Ashish1805:Putin1@cluster0.ncjydwd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db)
.then(()=>{
    console.log("connected to mongoose atlas")
})
.catch((e)=>{
    console.log("Error!"+e)
})
   
router.get('/',(req,res)=>{
    res.send("from api route")
})

router.post('/register', (req,res)=>{
    let userData= req.body
    let user= new User(userData)
   user.save((error,registeredUser)=>{
    if(error){
        console.log(error)
    }
    else{
        res.status(200).send(registeredUser)
    }
   })
       

})

router.post('/login', (req,res)=>{


 let userData = req.body
 User.findOne({email: userData.email}, (err, user) => {
   if (err) {
     console.log(err)    
   } else {
     if (!user) {
       res.status(401).send('Invalid Email')
     } else 
     if ( user.password !== userData.password) {
       res.status(401).send('Invalid Password')
     } else {
      
       res.status(200).send(user)
     }
}
})
})


module.exports=router