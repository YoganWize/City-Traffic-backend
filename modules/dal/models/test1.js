let mongoose = require('mongoose');
mongoose.connect('mongodb://interuser:t54t62a@ds121622.mlab.com:21622/intersogdb');
// mongoose.connect('mongodb://interuser:t54t62a@ds127153.mlab.com:27153/messagesdb');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => console.log('connected to Mongo') );

let User = require('./usersSchema');
let Message = require('./messageSchema');
let app = require('express')();
let bodyParser = require('body-parser');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    Message.find({}, (err, messages)=> {
        if(err)console.log(err);
        socket.emit('history', messages);
    });

    socket.on('userTypes', (data)=> {
        console.log('userTypes event with data: ' + data);
    });
    socket.on('userSendsMessage', (data)=> {
        console.log('2 event' + data);
        let message = new Message({message: data});
        message.save((err)=> {if(err)console.log(err);});
        io.emit('newMessage', data);
    });
    console.log('a user connected');
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});
//
// User.find({}, (err, users)=> {
//     if (err) console.log(err);
//     users.forEach((item, i ,arr)=> {
//     //     console.log(item);
//     //     console.log('-----------------');
//         // if(!arr[i].role){
//         //     arr[i].role = 'user';
//         // }
//         // arr[i].save();
//     });
// });


var triggers = require('mongo-triggers');

triggers('db.messages').save(function(document, next) {
    //...
    console.log(222);
    next();
});

triggers('db.messages').insert(function(document, next) {
    //...
    console.log(333);
    next();
});


triggers('db.messages').on('save', function (error, result, query, update, options) {
    // error   : null (unless something went wrong)
    // result  : { ... } (in case of the save command, this will be a lastErrorObject)
    // query   : { _id: "foo" }
    console.log(222);
    // update  : { name: "Anders" }
    // options : undefined (since no options object was passed to the update function)
});

triggers('db.messages').on('insert', function (error, result, query, update, options) {
    // error   : null (unless something went wrong)
    // result  : { ... } (in case of the save command, this will be a lastErrorObject)
    // query   : { _id: "foo" }
    // update  : { name: "Anders" }
    console.log(333);
    // options : undefined (since no options object was passed to the update function)
});

server.listen(7777);
