const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const PORT=5888
const hostName="127.0.0.8"
const userModel=require("./models/userSchema.js")

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/User')

app.post('/login',(req,res)=>{
    const {email,password}=req.body
    userModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("success")
            }
            else{
                res.json("password is incorrect")
            }
        }
        else{
            res.json("account does not exist")
        }
    })
})


app.post('/signup',(req,res)=>{
    userModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.listen(PORT,()=>{
    console.log(`server started http://${hostName}:${PORT}`)
})