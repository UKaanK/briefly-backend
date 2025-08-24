const express = require("express");
const { registerUser ,loginUser,getProfile,logoutUser} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - pwd
 *       properties:
 *         name:
 *           type: string
 *           description: Kullanıcının tam adı.
 *           example: Eren Yılmaz
 *         email:
 *           type: string
 *           description: Kullanıcının benzersiz e-posta adresi.
 *           example: eren.yilmaz@briefly.com
 *         pwd:
 *           type: string
 *           description: Güvenli kullanıcı parolası.
 *           example: Parola123!
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Kullanıcı yönetimi işlemleri
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Yeni bir kullanıcı kaydı oluşturur.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterRequest'
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Geçersiz istek.
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/user/register", registerUser);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Kullanıcı giriş yapar.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - pwd
 *             properties:
 *               email:
 *                 type: string
 *                 description: Kullanıcının e-posta adresi.
 *                 example: eren.yilmaz@briefly.com
 *               pwd:
 *                 type: string
 *                 description: Kullanıcının şifresi.
 *                 example: Parola123!
 *     responses:
 *       200:
 *         description: Giriş başarılı, JWT token döner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Geçersiz giriş bilgileri.
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/user/login", loginUser);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Giriş yapan kullanıcının profil bilgilerini getirir.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı profili başarıyla getirildi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Yetkisiz erişim, token gerekli.
 *       500:
 *         description: Sunucu hatası.
 */
router.get("/user/profile", protect, getProfile);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Kullanıcının oturumunu kapatır.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla çıkış yaptı.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Çıkış işlemi başarılı.
 *       401:
 *         description: Yetkisiz erişim, geçerli bir token gerekli.
 *       500:
 *         description: Sunucu hatası.
 */
router.post("/user/logout",protect,logoutUser)
module.exports = router;
