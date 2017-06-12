import * as mongoose  from 'mongoose';
import * as models from './models';





export default class DAL {
    public static init() {
        mongoose.connect('mongodb://localhost/BELABS');

        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open',() => console.log('connected to Mongo') );
    }


    static get LogModel() { return models.LogModel() }


}