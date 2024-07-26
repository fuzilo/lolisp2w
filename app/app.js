const express = require('express');
const connectDB = require('./config/db');
const skinRoutes = require('./routes/skinRoutes');
require('dotenv').config();
const { swaggerUi, swaggerDocs } = require('./src/swagger');
const cors= require('cors');
const userRoutes = require('./routes/userRoutes');
// const logger = require('./src/logger')
// const morgan = require('morgan')
const app = express();

//habilitar CORS para todas as origens
app.use(cors());
// Middleware para lidar com solicitações OPTIONS
app.options('*', cors());

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(express.json());

// Configurar Morgan para usar o logger do Winston
// app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Rotas
app.use('/api/users', userRoutes);

app.use('/skins', skinRoutes);

// Rota para a documentação do Swagger
app.use('/api-docs',(req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, api_key, Authorization');
    next();
},swaggerUi.serve, swaggerUi.setup(swaggerDocs) );



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
