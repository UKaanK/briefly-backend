const{DataTypes} =require("sequelize")
const {sequelize} = require("../db/index")
const Meetings=require('./meetings')

const Summary=sequelize.define('Summaries',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    meeting_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Meetings,
            key:'id'
        },
        allowNull:false
    },
    summary:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    action_items:{
        type:DataTypes.JSONB,
        allowNull:true
    }
},
{
    tableName:'summaries'
})

Meetings.hasOne(Summary,{foreignKey:'meeting_id'})
Summary.belongsTo(Meetings,{foreignKey:'meeting_id'})

module.exports=Summary