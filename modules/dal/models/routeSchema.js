let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let routeSchema = new Schema({
    pointA: String,
    pointB: String,
    description: String,
    userid: ObjectId
});

let route = mongoose.model('route', routeSchema);
module.exports = route;
