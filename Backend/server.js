const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()


const app = express();


// Import fra andre filer
const blogRoutes = require('./routes/blog'); 

// Middelware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})




app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(console.log('db conect'))
        .catch(err => console.log(err))
});

app.use('/api/blogs', blogRoutes);


