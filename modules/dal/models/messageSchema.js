let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    message: String,
    sendTime: {
        type: Date,
        default: Date.now()
    },
    sender: String,
    status: String
});

let message = mongoose.model('message', messageSchema);
module.exports = message;