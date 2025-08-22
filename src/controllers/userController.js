const User=require('../models/user')
const {hashPassword}=require("../utils/bcrypt")

const registerUser=async (req,res)=>{
    try {
        const{name,email,password}=req.body
        const hashedPassowrd=await hashPassword(password)

        const newUser=await User.create({
            name,email,pwd:hashedPassowrd
        });

        res.status(201).json({
            message:"Kullanıcı Başarıyla Oluşturuldu",
            user:{
                id:newUser.id,
                name:newUser.name,
                email:newUser.email
            }
        })
    } catch (error) {
        console.error("Kullanıcı Kayıt Hatası",error)
        res.status(500).json({
            error:"Sunucu Hatası"
        })
    }
}

module.exports={registerUser}