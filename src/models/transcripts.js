const {DataTypes} =require("sequelize")
const {sequelize} =require("../db/index")
const Meetings = require("./meetings")

const Transcripts =sequelize.define('Transcripts',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    //Bu transkriptinin hangi toplantıya ait olduğunu belirtir.
    meeting_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Meetings,
            key:'id'
        },
        allowNull:false
    }
},{
    tableName:'transcripts',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:false
})

Meetings.hasOne(Transcripts,{foreignKey:'meeting_id'})
Transcripts.belongsTo(Meetings,{foreignKey:'meeting_id'})

module.exports=Transcripts;