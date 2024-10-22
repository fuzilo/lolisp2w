const Skin = require('../models/skinModel');
const { ObjectId } = require('mongoose').Types; // Importar ObjectId do Mongoose


const skinController = {};

// Obter todas as skins

skinController.getAllSkins = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from the query string, default to 1
        const limit = parseInt(req.query.limit) || 10; // Get the limit from the query string, default to 10
        const startIndex = (page - 1) * limit;

        const skins = await Skin.find().skip(startIndex).limit(limit);
        const totalSkins = await Skin.countDocuments();

        res.status(200).json({
            skins,
            currentPage: page,
            totalPages: Math.ceil(totalSkins / limit),
            totalSkins,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Adicionar uma nova skin
skinController.addSkin = async (req, res) => {
    const skin = new Skin(req.body);
    try {
        const newSkin = await Skin.create(req.body);
        res.status(201).json(newSkin);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obter uma skin pelo ID
skinController.getSkinById = async (req, res) =>{
    try {
        const skin = await Skin.findById(req.params.id);
        if(!skin){
            return res.status(404).json({message: "Skin não encontrada"})
        }
        res.status(200).json(skin)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
// Busca Dinâmica
skinController.searchSkins = async (req, res) => {
    const { field, value, min, max } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    if (!field) {
        return res.status(400).json({ message: 'Field is required' });
    }

    try {
        const query = {};

        if (field === 'price' || field === 'releaseDate') {
            if (min && max) {
                query[field] = { $gte: min, $lte: max };
            } else if (min) {
                query[field] = { $gte: min };
            } else if (max) {
                query[field] = { $lte: max };
            } else {
                return res.status(400).json({ message: 'For price or releaseDate, min or max value is required' });
            }
        } else {
            // Verifica se é um ID válido antes de realizar a consulta
            if (field === '_id' && !ObjectId.isValid(value)) {
                return res.status(400).json({ message: 'Invalid ObjectId' });
            }
            query[field] = { $regex: new RegExp(value, 'i') }; // 'i' para case-insensitive
        }
        const skins = await Skin.find(query).skip(startIndex).limit(limit);
        const totalSkins = await Skin.countDocuments(query);

        res.status(200).json({
            skins,
            currentPage: page,
            totalPages: Math.ceil(totalSkins / limit),
            totalSkins,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Atualizar uma skin existente
skinController.updateSkin = async(req, res) =>{
    try {
        const updatedSkin = await Skin.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (!updatedSkin){
            return res.status(404).json({message:'Skin não encontrada'})
        }
        res.status(200).json(updatedSkin)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Deletar uma skin Existente
skinController.deleteSkin = async(req, res) =>{
    try {
        const deletedSkin = await Skin.findByIdAndDelete(req.params.id)
        if(!deletedSkin){
            return res.status(404).json({message:'Skin não encontrada'})
        }
        res.status(200).json({message:'Skin deletada com sucesso'})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

module.exports = skinController;
