const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},
{timestamps:true})





userSchema.statics.getCreds=async (usr,pswrd)=>{
    // try{
        const user1=await User.findOne({username:usr})
        if (user1){
            const matched=await bcryptjs.compare(pswrd,user1.password)
            if(matched){
                
                return user1
            }else{
                throw new Error('Auth Failed')
            }
        }else{
            throw new Error('Auth Failed')
        }
    // }catch(e){

    // }
}

userSchema.methods.saveAuth=async function(){
    const usr=this
    console.log(usr)
    const token=jsonwebtoken.sign({_id:usr._id.toString()},'jhvasdte')
    // console.log(usr)
    usr.tokens.push({token})
    await usr.save()
    return {user:usr,token}
}

userSchema.pre('save',async function(next){
    const user=this
    
    if(user.isModified('password')){
        const salt=await bcryptjs.genSalt(10)
        const hsh=await bcryptjs.hash(user.password,salt)
        user.password=hsh
    }
    next()
})

const User=mongoose.model('User',userSchema)
module.exports=User