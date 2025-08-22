const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');

dotenv.config({ path: __dirname + "/../../.env" });

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        dialect: 'postgres',
        logging: false, // Konsolda SQL sorgularını göstermez
        dialectOptions: {
            // SSL ayarlarını burada yapabilirsiniz (kurumsal projeler için önemli)
        },
        pool: {
            max: 5, // Bağlantı havuzundaki maksimum bağlantı sayısı
            min: 0, // Minimum bağlantı sayısı
            acquire: 30000, // Bağlantı elde etmeye çalışırken maksimum süre (ms)
            idle: 10000 // Bir bağlantının boşta kalabileceği süre (ms)
        }
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL bağlantısı Sequelize ile başarılı!");
    } catch (error) {
        console.error("❌ Veritabanı bağlantı hatası:", error);
    }
}

module.exports = { sequelize, connectDB };