const Skin = require('../models/skinModel');
const { ObjectId } = require('mongoose').Types; // Importar ObjectId do Mongoose


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
// Busca Dinâmica
skinController.searchSkins = async (req, res) => {
    const { field, value, min, max } = req.query;

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

        const skins = await Skin.find(query);
        res.status(200).json(skins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Explicação:
// Rota e Query Parameters: A rota /skins/search aceita parâmetros de consulta (req.query) para field (campo a ser pesquisado) e value (valor a ser procurado).
// Construção da Query: A função constrói dinamicamente o objeto de consulta query, utilizando expressões regulares para permitir buscas parciais e case-insensitive.
// Consulta MongoDB: Skin.find(query) executa a consulta no banco de dados MongoDB com base nos parâmetros fornecidos.
// Exemplo de Uso:
// Buscar por parte do nome: /skins/search?field=name&value=akali
// Buscar por intervalo de preço: /skins/search?field=price&min=1000&max=2000
// Buscar por intervalo de datas: /skins/search?field=releaseDate&min=2019-01-01&max=2020-01-01


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
