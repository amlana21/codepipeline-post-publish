const mongoose=require('mongoose')

const prodctSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    available:{
        type:String,
        required:true,
        default:'N'
    }
})




const prodmodel=mongoose.model('Products',prodctSchema)

module.exports=prodmodel