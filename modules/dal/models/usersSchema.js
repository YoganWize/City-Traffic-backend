let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    routes: [String],
    email: String,
    role: String,
    password: String
});


let user = mongoose.model('user', userSchema);
module.exports = user;