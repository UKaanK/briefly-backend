const express=require('express')
const swaggerUi=require('swagger-ui-express')
const swaggerSpec=require('./utils/swagger')
const {connectDB,sequelize}=require("./db/index")
const userRoutes=require("./routes/userRoutes")

const app=express();
const PORT=process.env.PORT || 3000

app.use(express.json())

app.use("/api",userRoutes)

console.log(swaggerSpec);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

// Veritabanı bağlantısını kur ve sunucuyu başlat
async function startServer() {
  await connectDB();
  await sequelize.sync(); // Modelleri senkronize eder (ilk kez çalıştırmak için)
  app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
  });
}

startServer();