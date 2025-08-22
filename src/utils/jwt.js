const jwt =require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + "/../../.env" });

const generateToken=(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1h" //Token Geçerlilik Süresi
    })
}

const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports={generateToken,verifyToken}