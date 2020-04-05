const User=require('../model/usermodel')
const express=require('express')
const router =new express.Router()
const {auth,authLogin}=require('../routes/auth')

router.post('/users',async (req,res)=>{
    const inpt=req.body
    // console.log(inpt)
    try{
        let userobj=new User(inpt)
        const userOut=await userobj.saveAuth()
        res.send(userOut)
    }catch(e){
        res.status(400).send({
            error:e.message
        })
    }
})

router.get('/loginpage',(req,res)=>{
    res.render('login')
})

router.post('/login',async (req,res)=>{
    const usr=req.body.username
    const pswrd=req.body.password

    try{
        const usr1=await User.getCreds(usr,pswrd)
        console.log(usr1)
        const loggedIn=await usr1.saveAuth()
        res.cookie('logtkn',loggedIn.token)
        res.send(loggedIn)
    }catch(e){
        res.status(401).send({
            error:e.message
        })
    }
})


router.get('/logout',authLogin,async (req,res)=>{
    console.log(req.user)
    let user=req.user
    try{
        user.tokens=[]
        await user.save()
        // res.send(user)
        res.render('login')
    }catch(e){

    }
})

module.exports=router