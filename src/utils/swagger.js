const swaggerJsdoc=require('swagger-jsdoc')
const path = require('path');
const options={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title:"Briefly API Dökümantasyonu",
            version:'1.0.0',
            description:'Kurumsal toplantı yönetim uygulaması için API endpointleri'
        },
        servers:[
            {
                url:'http://localhost:3000/api', //apinin temel url si
                description:'Yerel Gelitşirme Sunucusu'
            },
        ],
        components:{
            securitySchemes:{
                //JWT Tabanlı kimlik doğrulama şeması
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat:'JWT'
                }
            }
        },
        security:[
            {
                bearerAuth:[]
            }
        ]

    },
  apis: [path.join(__dirname, "../routes/*.js")],
}

const swaggerSpec=swaggerJsdoc(options)

module.exports=swaggerSpec