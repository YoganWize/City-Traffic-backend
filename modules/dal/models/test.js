let mongoose = require('mongoose');
mongoose.connect('mongodb://interuser:t54t62a@ds121622.mlab.com:21622/intersogdb');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => console.log('connected to Mongo') );

let User = require('./usersSchema');
let Route = require('./routeSchema');

r = ['5944e36f61175111a4903eea'];
User.findByIdAndUpdate('5944e36f61175111a4903ee9', {$push: { routes: r[0] }}, (err, u)=> {
    if(err) console.log(err);
    console.log(u);
});
console.log('-----------------------------------------');
/*
let u = new User({name: 'vasya'});
u.save((err, u)=> {
    if(err) console.log(err);
    console.log(u);
});

let r = new Route({pointA:'112,323', pointB:'76,123', description: 'abc123'});
r.save((err, r)=> {
    if(err) console.log(err);
    console.log(r);
});
*/