import * as mongoose from 'mongoose';

export interface IUserModel extends mongoose.Document {
    name: string;
    age:number
    createdAt: Date;
    modifiedAt: Date;
}

let userSchema  = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type:String
    }
});


userSchema.statics.getAllOfThem = function(cb) {

   return this.find({},cb)

}

export const UserModel = function() {
    return mongoose.model('User', userSchema)
}

