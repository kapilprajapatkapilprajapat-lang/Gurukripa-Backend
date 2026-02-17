const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
}, { timestamps: true, timeseries: true });

const user=mongoose.model('users',userSchema);
module.exports=user;