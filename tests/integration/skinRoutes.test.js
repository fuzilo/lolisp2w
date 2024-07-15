const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const chai = require('chai');
const {expect} = chai.expect;
require('dotenv').config();

const app = express();
app.use(express.json());

// Conectando ao banco de dados de teste
before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
});

// Definindo rotas
const skinRoutes = require('../../routes/skinRoutes');
app.use('/skin', skinRoutes);

// Teste para adicionar uma skin
describe('POST /skin', () => {
    it('deve adicionar uma nova skin', async () => {
        const newSkin = {
            name: "Akali True Damage",
            champion: "Akali",
            theme: "True Damage",
            releaseDate: "2019-11-10T00:00:00.000Z",
            price: 1350,
            rarity: "legendary"
        };

        const res = await request(app)
            .post('/skin')
            .send(newSkin);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('name', newSkin.name);
        expect(res.body).to.have.property('champion', newSkin.champion);
        expect(res.body).to.have.property('theme', newSkin.theme);
        expect(res.body).to.have.property('releaseDate');
        expect(res.body).to.have.property('price', newSkin.price);
        expect(res.body).to.have.property('rarity', newSkin.rarity);
    });

    // Limpando o banco de dados após os testes
    // after(async () => {
    //     await mongoose.connection.db.dropDatabase();
    //     await mongoose.connection.close();
    // });
});
