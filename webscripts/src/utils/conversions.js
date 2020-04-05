

const convChkBox=function(req,res,next){
    if (req.body.available==='on'){
        req.body.available='Y'
    }
    next()
}


module.exports={convChkBox}