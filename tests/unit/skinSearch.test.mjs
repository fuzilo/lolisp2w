import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { expect } from 'chai';
import dotenv from 'dotenv';
import skinRoutes from '../../routes/skinRoutes.js';
import Skin from '../../models/skinModel.js'

dotenv.config();

const app = express();
app.use(express.json());

// Conectando ao banco de dados de teste
before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {

    });
});

// Definindo rotas

app.use('/skins', skinRoutes);


// Limpando o banco de dados antes e depois dos testes
beforeEach(async () => {
    await Skin.deleteMany({});
});

after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Search Skins', () => {
    // Teste para adicionar uma skin
    beforeEach(async () => {
        const skins = [
            {
                name: "Akali True Damage",
                champion: "Akali",
                theme: "True Damage",
                releaseDate: new Date('2019-11-10'),
                price: 1350,
                rarity: "legendary"
            },
            {
                name: "Lux Elementalist",
                champion: "Lux",
                theme: "Elementalist",
                releaseDate: new Date('2016-11-28'),
                price: 3250,
                rarity: "ultimate"
            },
            {
                name: "Garen Demacia",
                champion: "Garen",
                theme: "Demacia",
                releaseDate: new Date('2011-07-12'),
                price: 975,
                rarity: "epic"
            }
        ];
        await Skin.insertMany(skins);
    });

    it('deve buscar skins por parte do nome', async () => {
        const res = await request(app)
            .get('/skins/search?field=name&value=akali');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('name', 'Akali True Damage');
    });

    it('deve buscar skins por intervalo de preço', async () => {
        const res = await request(app)
            .get('/skins/search?field=price&min=1000&max=2000');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('name', 'Akali True Damage');
    });

    it('deve buscar skins por intervalo de datas', async () => {
        const res = await request(app)
            .get('/skins/search?field=releaseDate&min=2015-01-01&max=2020-01-01');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(2);
        const names = res.body.map(skin => skin.name);
        expect(names).to.include('Akali True Damage');
        expect(names).to.include('Lux Elementalist');
    });

    it('deve buscar skins por campeão', async () => {
        const res = await request(app)
            .get('/skins/search?field=champion&value=lux');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('champion', 'Lux');
    });

    it('deve retornar erro para ObjectId inválido', async () => {
        const res = await request(app)
            .get('/skins/search?field=_id&value=invalidId');

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Invalid ObjectId');
    });
});