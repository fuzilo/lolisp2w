const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'League of Legends Skins API',
            version: '1.0.0',
            description: 'API para buscar skins do League of Legends',
        },
        servers: [
            {
                url: process.env.LOCAL_SERVER_URL || 'http://localhost:5000', // URL do servidor local
                description: 'Servidor local',
            },
            {
                url: process.env.PRODUCTION_SERVER_URL, // URL do servidor de produção
                description: 'Servidor de produção',
            },
        ],
        components: {
            schemas: {
                Skin: {
                    type: 'object',
                    required: ['name', 'champion', 'theme', 'releaseDate', 'price', 'rarity'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID da skin',
                        },
                        name: {
                            type: 'string',
                            description: 'Nome da skin',
                        },
                        champion: {
                            type: 'string',
                            description: 'Campeão associado à skin',
                        },
                        theme: {
                            type: 'string',
                            description: 'Tema da skin',
                        },
                        releaseDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Data de lançamento da skin',
                        },
                        price: {
                            type: 'number',
                            description: 'Preço da skin em RP',
                        },
                        rarity: {
                            type: 'string',
                            description: 'Raridade da skin',
                        },
                    },
                    example: {
                        id: 'd5fE_asz',
                        name: 'Akali True Damage',
                        champion: 'Akali',
                        theme: 'True Damage',
                        releaseDate: '2019-11-10T00:00:00.000Z',
                        price: 1350,
                        rarity: 'legendary',    
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos que contêm as anotações Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
