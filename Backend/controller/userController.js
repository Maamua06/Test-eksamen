const User = require('../models/userModels');
const jwt = require('jsonwebtoken');

// Handle error
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // Feil email
    if(err.message === 'Incorrect email') {
        errors.email = 'This email is not registered';
        return errors;
    };

    // Feil passord
    if(err.message  === 'Incorrect password') {
        errors.password = 'This password is incorrect';
    };

    // Duplicate error
    if(err.code === 11000) {
        errors.email = 'That email is already registred';
    };

    // Validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

};


// JWT funkjson
const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign( { id }, 'jegerkul', {
        expiresIn: maxAge
    });
};

// signup funksjon
module.exports = {
    createToken
}