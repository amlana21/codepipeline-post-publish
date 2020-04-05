const jwt=require('jsonwebtoken')
const User=require('../model/usermodel')

const auth=async (req,res,next)=>{
    const hdrs=req.headers.authorization
    const authHdr=hdrs.split(' ')[1]

    console.log(authHdr)

    try{
        const usrId=jwt.verify(authHdr,'jhvasdte')
        const fnd=await User.findById({_id:usrId._id,'tokens.token':authHdr})
        // console.log(fnd)
        if(fnd){
            req.user=fnd
            req.token=authHdr

            next()
        }else{
            throw new Error('Auth Failed..')
        }
    }catch(e){
        res.status(401).send({
            error:e.message
        })
    }

    
}

const authLogin=async (req,res,next)=>{
    const hdrCki=req.headers.cookie
    // console.log(hdrCki)
    if(!hdrCki){
        return res.render('login')
    }
    try{
        let cks=hdrCki.split(';')
        let lgntkn='none'
        cks.forEach(ck=>{
            if (ck.includes('logtkn')){
                console.log(ck.split('=')[1])
                lgntkn=ck.split('=')[1]
            }
        })

        if(lgntkn==='none'){
            return res.render('login')
        }
        const tmptkn=jwt.verify(lgntkn,'jhvasdte')
        const user=await User.findOne({_id:tmptkn._id,'tokens.token':lgntkn})
        if(user){
            req.user=user
            req.token=lgntkn
            next()
        }else{
            throw new Error('Auth failed')
        }
    }catch(e){
        res.status(401).send({
            error:e.message
        })
    }
    // next()

}


module.exports={auth,authLogin}