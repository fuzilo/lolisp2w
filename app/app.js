const express = require('express');
const connectDB = require('./config/db');
const skinRoutes = require('./routes/skinRoutes');
require('dotenv').config();
const { swaggerUi, swaggerDocs } = require('./src/swagger');
const cors= require('cors');
// const logger = require('./src/logger')
// const morgan = require('morgan')

const app = express();

//habilitar CORS para todas as origens
app.use(cors());

// Conectar ao MongoDB
connectDB();



// Middleware
app.use(express.json());

// Configurar Morgan para usar o logger do Winston
// app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));


// Rotas
app.use('/skins', require('./routes/skinRoutes'));

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
