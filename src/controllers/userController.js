const User=require('../models/user')
const {hashPassword, comparePassword}=require("../utils/bcrypt")
const {generateToken,verifyToken}=require('../utils/jwt')

const registerUser=async (req,res)=>{
    try {
        const{name,email,pwd}=req.body
        const hashedPassowrd=await hashPassword(pwd)

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

const loginUser=async (req,res)=>{
    try {
        const{email,pwd}=req.body
        //1.kullanıcı eposta adresini bul
        const user=await User.findOne({where:{email}})

        if (!user) {
            return res.status(401).json({error:"Geçersiz Eposta Adresi veya parola"})
        }

        //2.Girilen parola hashlenmiş parola ile karılaştır.
        const isMatch=await comparePassword(pwd,user.pwd)
        if (!isMatch) {
            return res.status(401).json({error:"Geçersiz Eposta Adresi veya parola"})
        }

        //3.Eşleşme başarılı ise jwt oluştur
        const token=generateToken(user.id)
        //4. Token ve kulanıcı bilgilerini döndür
        res.status(200).json({
            message:"Giriş Başarılı",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        console.error("Kullanıcı Giriş Hatası",error)
        res.status(500).json({
            error:"Sunucu Hatası"
        })
    }
}

const getProfile=async (req,res)=>{
    try {
        //JWT middleware'i (auth.js) tarafından eklenen kullanıcı ID'sine erişiyoruz
        const user=await User.findByPk(req.userId,{
            attributes:{exclude:["pwd"]}
        })

        if (!user) {
            return res.status(404).json({
                message:"Kullanıcı Bulunamadı"
            })
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        console.error("Profil alma hatası:",error)
        res.status(500).json({
            message:"Sunucu Hatası"
        })
    }
}

module.exports={registerUser,loginUser,getProfile}