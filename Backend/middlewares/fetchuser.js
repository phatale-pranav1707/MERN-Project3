var jwt = require('jsonwebtoken');
const JWT_SECRET="pranavisagoodcoder"

const fetchuser= async(req,res,next)=>{
    const token=req.header('auth-token')

    if(!token){
        res.send(400).json({error:"not valid token"})
    }

    try {
        const data= jwt.verify(token, JWT_SECRET);
        req.user=data.user
        next();
        
    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })

    }
}

module.exports=fetchuser