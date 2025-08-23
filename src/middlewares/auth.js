const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
dotenv.config({ path: __dirname + "/../../.env" });

const protect= (req,res,next)=>{
    let token;

    //1.İsteğin başlığındaki auth kısmını kontrol et
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //2.Token'ı başık kısmına al   
            token = req.headers.authorization.split(" ")[1]

            //3.Token'ı doğrula
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            //4.Doğrulanmış Kullanıcı ID'sini isteğe ekle
            req.userId=decoded.id;

            next();//bir sonraki middleware ve ya route geç
        } catch (error) {
            res.status(401).json({
                message:"Geçersiz Token"
            })
        }
    }
    if (!token) {
        res.status(401).json({
            message:"Erişim Reddedildi token bulunamadı"
        })
    }
}

module.exports={protect}

