const express=require('express')
const router=new express.Router()
const products=require('../model/productmodel')
const {convChkBox}=require('../utils/conversions')
const {auth,authLogin}=require('../routes/auth')

router.get('/',authLogin,async function(req,res){
    // const prdctArry=[{id:1289,name:'From Array',price:34,avlbl:'N'},{id:1290,name:'From Array new one',price:25,avlbl:'Y'}]
    try{
        const prods=await products.find()
        if(prods.length===0){
            return res.status(404).send({
                error:'Not found'
            })
        }
        res.render('index',{
            inpt:prods
        })
    }catch(e){
        res.status(400).send({
            error:e.message
        })
    }
    
})

router.get('/addproductpage',function(req,res){
    res.render('products')
})


router.post('/productspage',convChkBox,async (req,res)=>{
    const inptbody=req.body
    try{
        const inpobj=new products(inptbody)
        const prodOut=await inpobj.save()
        res.redirect('/')
    }catch(e){
        res.status(400).send({
            error:e.message
        })
    }
})

router.post('/products',async (req,res)=>{
    const inptbody=req.body
    try{
        const inpobj=new products(inptbody)
        const prodOut=await inpobj.save()
        res.send(prodOut)
    }catch(e){
        res.status(400).send({
            error:e.message
        })
    }
})


router.get('/products',auth,async (req,res)=>{
    try{
        const prods=await products.find()
        if(prods.length===0){
            return res.status(404).send({
                error:'Not found'
            })
        }
        res.send(prods)
    }catch(e){
        res.status(400).send({
            error:e.message
        })
    }
})

module.exports=router