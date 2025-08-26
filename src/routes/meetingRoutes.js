const express=require("express")
const {createMeeting,deleteMeeting,getMettingById,getMettings}=require("../controllers/meetingController")
const {protect} = require("../middlewares/auth")

const router=express.Router()
//Yeni bir toplantı oluşturma toplantısı
//Bu rota, sadece oturum açmış kullanıcılar tarafından kullanılabilir
router.post("/",protect,createMeeting)
router.get("/",protect,getMettings)
router.get("/:id",protect,getMettingById)
router.delete("/:id",protect,deleteMeeting)
module.exports=router

