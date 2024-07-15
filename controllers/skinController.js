const Skin = require('../models/skinModel');

// Obter todas as skins
exports.getAllSkins = async (req, res) => {
    try {
        const skins = await Skin.find();
        res.json(skins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Adicionar uma nova skin
exports.addSkin = async (req, res) => {
    const skin = new Skin(req.body);
    try {
        const newSkin = await skin.save();
        res.status(201).json(newSkin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Outros métodos (atualizar, deletar, etc.) podem ser adicionados aqui
