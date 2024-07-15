const Skin = require('../models/skinModel');


const skinController = {};

// Obter todas as skins
skinController.getAllSkins = async (req, res) => {
    try {
        const skins = await Skin.find();
        res.status(200).json(skins);
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

// Outros métodos (atualizar, deletar, etc.) podem ser adicionados aqui
