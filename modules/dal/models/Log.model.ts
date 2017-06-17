import * as mongoose from 'mongoose';

export interface ILogModel extends mongoose.Document {
    name: string;
    power: string;
    amountPeopleSaved: number;
    createdAt: Date;
    modifiedAt: Date;
}

let LogSchema  = mongoose.Schema({
    message: {
        type: String,
        required: true

    },
    module: String,
    createdAt: Date // can be auto created http://mongoosejs.com/docs/guide.html#validateBeforeSave
});


LogSchema.statics.getAllOfThem = function(cb) {

   return this.find({},cb)

}
LogSchema.pre('save',function(next){
    console.log(this);
    next();
});
export const LogModel = function(obj?) {


    return mongoose.model('Log', LogSchema)
}

