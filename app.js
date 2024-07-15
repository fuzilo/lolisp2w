const express = require('express');
const connectDB = require('./config/db');
const skinRoutes = require('./routes/skinRoutes');
require('dotenv').config();

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rotas
app.use('/api/skins', skinRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
