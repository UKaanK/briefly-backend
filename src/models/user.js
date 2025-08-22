const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/index");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},
{
    tableName:'users',//Mevcut Tablo Adı
    timestamps:false // // Sequelize'nin created_at ve updated_at kolonlarını otomatik eklemesini engeller
}
);

module.exports=User;