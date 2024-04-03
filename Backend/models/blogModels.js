const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;