let mongoose = require('mongoose');
mongoose.connect('mongodb://interuser:t54t62a@ds121622.mlab.com:21622/intersogdb');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => console.log('connected to Mongo'));

let User = require('./usersSchema');
let Message = require('./messageSchema');

var MongoStream = require('mongo-trigger');
var watcher = new MongoStream({format: 'pretty'});

let allMessages = 0;
setInterval(()=> {
    Message.find({}, (err, messages)=> {
        if(err)console.log(err);
        if(messages.length > allMessages){
            console.log(messages.length - allMessages + ' new messages');
            allMessages = messages.length;
        }
    });
}, 100);


// // watch the collection
// watcher.watch('intersogdb.messages', function(event) {
//     // parse the results
//     console.log('something changed:', event);
// });

//var triggers = require('mongo-triggers');
//
// triggers('db.messages').on('save', function (error, result, query, update, options) {
//     // error   : null (unless something went wrong)
//     // result  : { ... } (in case of the save command, this will be a lastErrorObject)
//     // query   : { _id: "foo" }
//     console.log(222);
//     // update  : { name: "Anders" }
//     // options : undefined (since no options object was passed to the update function)
// });
//
// triggers('db.messages').on('insert', function (error, result, query, update, options) {
//     // error   : null (unless something went wrong)
//     // result  : { ... } (in case of the save command, this will be a lastErrorObject)
//     // query   : { _id: "foo" }
//     // update  : { name: "Anders" }
//     console.log(333);
//     // options : undefined (since no options object was passed to the update function)
// });
//
//
// triggers('db.messages').save(function(document, next) {
//     //...
//     console.log(222);
//     next();
// });
//
// triggers('db.messages').insert(function(document, next) {
//     //...
//     console.log(333);
//     next();
// });
