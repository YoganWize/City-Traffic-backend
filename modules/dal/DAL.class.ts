import * as mongoose  from 'mongoose';
import * as models from './models';


export default class DAL {
    public static init() {
        // mongoose.connect('mongodb://localhost/BELABS');
        mongoose.connect('mongodb://interuser:t54t62a@ds121622.mlab.com:21622/intersogdb');
        mongoose.Promise=global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open',() => console.log('connected to Mongo') );
    }


    static get LogModel() { return models.LogModel() }
    static get UserModel() { return models.UserModel() }




}