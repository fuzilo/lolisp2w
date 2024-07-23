import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { expect } from 'chai';
import dotenv from 'dotenv';
import skinRoutes from '../../routes/skinRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Conectando ao banco de dados de teste
before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {

    });
});

// Definindo rotas
app.use('/skin', skinRoutes);

describe('CRUD /skin', () => {
    let createdSkinId;

    // Teste para adicionar uma skin
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
        createdSkinId = res.body._id; // Armazena o ID da skin criada para testes posteriores
    });

    // Teste para obter todas as skins
    it('deve obter todas as skins', async () => {
        const res = await request(app).get('/skin');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    // Teste para obter uma skin pelo ID
    it('deve obter uma skin pelo ID', async () => {
        const res = await request(app).get(`/skin/${createdSkinId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('name', 'Akali True Damage');
    });

    // Teste para atualizar uma skin
    it('deve atualizar uma skin existente', async () => {
        const updatedSkin = {
            price: 1820,
        };
        const res = await request(app)
            .put(`/skin/${createdSkinId}`)
            .send(updatedSkin);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('price', 1820);
    });

    // Teste para deletar uma skin
    it('deve deletar uma skin existente', async () => {
        const res = await request(app).delete(`/skin/${createdSkinId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Skin deletada com sucesso');
    });

    // Limpando o banco de dados após os testes
    after(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });
});
