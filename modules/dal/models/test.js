let mongoose = require('mongoose');
mongoose.connect('mongodb://interuser:t54t62a@ds121622.mlab.com:21622/intersogdb');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => console.log('connected to Mongo'));

let User = require('./usersSchema');
let app = require('express')();
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.cookie('admin', '');
    res.cookie('user', '');
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', (req, res)=> {
    if(req.cookies.admin == 'yes'){
        res.sendFile(__dirname + '/admin.html');
    }else{
        res.sendStatus(401);
    }
});

app.get('/users', (req, res)=> {
     User.find({}, (err, users)=> {
         if(err) console.log(err);
         res.send(users);
     });
});

app.post('/', (req, res)=> {
    console.log(req.cookies);
    User.find({email: req.body.email, password: req.body.password}, (err, users)=> {
        if(err) console.log(err);
        if(users.length <= 0){
            res.sendStatus(401);
        }else {
          if(users[0].role == 'admin'){
              res.cookie('admin', 'yes');
              res.send(200);
          }else {
              res.cookie('user', 'yes');
              res.send(200);
          }
        };
    });
    // if( req.body.email && req.body.password){
    //     // let user = new User({name: req.body.name, email: req.body.email, password: req.body.password, role: 'user'});
    //     // user.save((err)=> {
    //     //     if(err) console.log(err);
    //     //     res.cookie('user', 'yes');
    //     //     res.send(200);
    //     // });
    // }else {
    //     res.send(400);
    // }
});

app.post('/admin', (req, res)=> {
    if(req.cookies.admin == 'yes'){
        if( req.body.email && req.body.password){
            let user = new User({name: req.body.name, email: req.body.email, password: req.body.password, role: 'admin'});
            user.save((err)=> {
                if(err) console.log(err);
                res.send(200);
            });
        }else {
            res.send(400);
        }
    }else{
        res.sendStatus(401);
    }
});


app.listen(8080);
//let Route = require('./routeSchema');
/*
r = ['5944e36f61175111a4903eea'];
User.findByIdAndUpdate('5944e36f61175111a4903ee9', {$push: { routes: r[0] }}, (err, u)=> {
    if(err) console.log(err);
    console.log(u);
});
console.log('-----------------------------------------');
*/
//let u = new User({name: '',email:''});

//let u = new User({});

//let years = keyup.('Сколько вам лет?', '100');

// u.name = prompt('кАК вАСЗОВУТ?', 'ваНО');
//let str = prompt('Input your mail', 'user@hg.com');
/*
if (str!=='')
 u.email=str;
    else
{

    console.log('Input Error');

}
*/
//let u = new User({name: '',email:''});

//console.log(u);

/*if ('' === u.email) {
    console.log('А вот и неправильно!');
} else {
    u.save((err, u) => {
        if (err) console.log(err);
        console.log(u);

    });

}*/
/*let u = new User({name: 'Petro',email:'it@ua.fm'});
if ('  ' !== u.email) {
    u.save((err, u) => {
        if (err) console.log(err);
        console.log(u);

    });

}*/
/*
let r = new Route({pointA:'112,323', pointB:'76,123', description: 'abc123'});
r.save((err, r)=> {
    if(err) console.log(err);
    console.log(r);
});
*/