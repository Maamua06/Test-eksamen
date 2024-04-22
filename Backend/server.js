const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

// Import fra andre filer
const blogRoutes = require('./routes/blog'); 
const userRoutes = require('./routes/user');

const app = express();


// Middelware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})




app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(console.log('db conect'))
        .catch(err => console.log(err))
});

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes);


