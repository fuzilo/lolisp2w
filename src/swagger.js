const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "League of Legends Skins API",
      version: "1.0.0",
      description: "API para gerenciar skins do League of Legends",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  apis: ["./routes/*.js"], // Caminho para os arquivos de rotas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
