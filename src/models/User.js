import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    admin: {type: Boolean, default: false}
});

const UserBase = mongoose.model('User', UserSchema);

export default class User extends UserBase {

    constructor(args){
        for(key in Object.keys(args)){
            this[key] = args[key];
        }
    }

    async save(){
        let user = await UserBase.create(this);
        this._id = user._id;
    }

    async updateToken(token){
        this.token = token;

        await UserBase.update({_id: this._id}, {$set: {token}});
    }

    static async findOne(criteria){
        let user = await UserBase.findOne(criteria);

        return new User(user);
    }

}
