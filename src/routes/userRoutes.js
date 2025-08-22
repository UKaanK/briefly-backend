const express = require("express");
const { registerUser } = require("../controllers/userController");

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
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Kullanıcının tam adı.
 *           example: Eren Yılmaz
 *         email:
 *           type: string
 *           description: Kullanıcının benzersiz e-posta adresi.
 *           example: eren.yilmaz@briefly.com
 *         password:
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
 * /register:
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
router.post("/register", registerUser);

module.exports = router;
