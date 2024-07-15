const mongoose = require('mongoose');

const SkinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    champion: {
        type: String,
        required: true
    },
    theme: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    price: {
        type: Number
    },
    rarity: {
        type: String
    }
});

module.exports = mongoose.model('Skin', SkinSchema);
