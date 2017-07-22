let mongoose = require('mongoose');
mongoose.connect('mongodb://interuser:t54t62a@ds121622.mlab.com:21622/intersogdb');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => console.log('connected to Mongo') );

let User = require('./usersSchema');
let app = require('express')();
let bodyParser = require('body-parser');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('userTypes', (data)=> {
        console.log('userTypes event with data: ' + data);
    });
    socket.on('userSendsMessage', (data)=> {
        console.log('2 event' + data);
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

server.listen(8080);
