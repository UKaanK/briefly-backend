const Redis=require("ioredis")
const dotenv=require("dotenv")
dotenv.config({ path: __dirname + "/../../.env" });

const redisClient=new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
})

redisClient.on("connect",()=>console.log("Redis'e Başarı İle Bağlandı"))
redisClient.on("error",(err)=>console.error("Redis Bağlantı Hatası:",err))

module.exports=redisClient