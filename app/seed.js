const mongoose = require('mongoose');
require('dotenv').config();
const Skin = require('./models/skinModel');

// Dados iniciais
const skins = [
    {
        name: "Akali True Damage",
        champion: "Akali",
        theme: "True Damage",
        releaseDate: new Date("2019-11-10"),
        price: 1350,
        rarity: "legendary"
    },
    {
        name: "Yasuo True Damage",
        champion: "Yasuo",
        theme: "True Damage",
        releaseDate: new Date("2019-11-10"),
        price: 1350,
        rarity: "legendary"
    },
    // Adicione mais skins aqui
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB');
        
        await Skin.deleteMany(); // Limpa a coleção
        console.log('Coleção de skins limpa');

        await Skin.insertMany(skins);
        console.log('Banco de dados populado com dados iniciais');

        mongoose.disconnect();
        console.log('Desconectado do MongoDB');
    } catch (error) {
        console.error('Erro ao popular o banco de dados', error);
        mongoose.disconnect();
    }
};

seedDatabase();
