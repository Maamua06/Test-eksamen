const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
});

// Funksjon som blir utført før dataen blir lagret

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Statisk måte å logge in user

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        } throw Error('Incorrect password');

    } throw Error('Incorrect email')
};

const User = mongoose.model('user', userSchema);

module.exports = User;