const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 5000;
const dbURI = 'mongodb://10.12.13.30:27017/test-eksamen?directConnection=true&appName=mongosh+2.2.2';

app.listen(PORT, () => {
    mongoose.connect(dbURI)
        .then(console.log('db conect'))
        .catch(err => console.log(err))
});