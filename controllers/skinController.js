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
skinController.searchSkins = async (req, res) =>{
    const {field, value} = req.query;

    if(!field || !value){
        return res.status(400).json({message: 'Field and Value are required'})
    }
    try {
                // Verifica se é um ID válido antes de realizar a consulta
        if (field === '_id' && !ObjectId.isValid(value)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
        }

        const query ={};
        query[field] = { $regex: new RegExp(value, 'i')}
        const skins = await Skin.find(query);
        res.status(200).json(skins);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// Explicação:
// Rota e Query Parameters: A rota /skins/search aceita parâmetros de consulta (req.query) para field (campo a ser pesquisado) e value (valor a ser procurado).
// Construção da Query: A função constrói dinamicamente o objeto de consulta query, utilizando expressões regulares para permitir buscas parciais e case-insensitive.
// Consulta MongoDB: Skin.find(query) executa a consulta no banco de dados MongoDB com base nos parâmetros fornecidos.
// Exemplo de Uso:
// Para buscar skins com o campeão "Akali", faça uma requisição GET para /skins/search?field=champion&value=akali.
// Para buscar skins com preço igual a 1350, faça uma requisição GET para /skins/search?field=price&value=1350.


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
