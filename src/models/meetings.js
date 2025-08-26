const {DataTypes} =require("sequelize")
const {sequelize}=require("../db/index")
const User=require("./user")
const Meetings=sequelize.define('Meeting',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    audio_file_path:{
        type:DataTypes.STRING,
        allowNull:true
    },
    //Toplantıyı Oluşturan Kullanıcıya referans
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id'
        },
        allowNull:false
    }
},{
tableName:'meetings',
timestamps:true, //created_at ve updated_at kolonlarını otomatik olarak ekle
createdAt:'created_at', //created_at kolonu kullanılır
updatedAt:false //updated_at kolonu devre dışı bırakılır.
}
)

//Kullanıcı ve Toplantı arasında ilişki tanımla
Meetings.belongsTo(User,{foreignKey:'userId'})
User.hasMany(Meetings,{foreignKey:'userId'})

module.exports=Meetings