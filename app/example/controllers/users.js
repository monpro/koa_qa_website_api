const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const {secret} = require('../config');
class UserCtl {
    async find(context){
        context.body = await User.find();
    }
    async findById(context){
        const {fields} = context.query;
        const selectFields = fields.split(";").filter(f => f).map(f => ' +' + f).join('');
        const user = await User.findById(context.params.id).select(selectFields);
        if(!user)
            context.throw(404,"user doesn't exist")
        context.body = user;
    }

    async checkOwner(context, next){
        if(context.params.id !== context.state.user._id)
            context.throw(403, "you don't have authority to do this operation")
        await next();
    }

    async create(context){
        context.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: true}
        });
        const {name} = context.request.body;
        const repeatedUser = await User.findOne({name});
        if(repeatedUser)
            context.throw(409, "User is already existed");
        const user = await new User(context.request.body).save();
        context.body = user;
    }

    async update(context){
        context.verifyParams({
            name: {type: 'string', required: false},
            password: {type: 'string', required: false},
            avatar_url: {type: 'string', required: false},
            gender: {type: 'string', required: false},
            headline: {type: 'string', required: false},
            locations: {type: 'array', itemType: 'string', required: false},
            business: {type: 'string', required: false},
            employments: {type: 'array', itemType: 'object', required: false},
            educations: {type: 'array', itemType: 'object', required: false},


        });
        const user = await User.findByIdAndUpdate(context.params.id, context.request.body);
        if(!user){
            context.throw(404, "User doesn't exist")
        }
        context.body = user;
    }

    async delete(context){
        console.log("you here")
        const user = await User.findByIdAndRemove(context.params.id);
        if(!user){
            context.throw(404)
        }
        context.status = 204;
    }

    async login(context){
        context.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: true}
        })
        const user = await User.findOne(context.request.body);
        if(!user)
            context.throw(401, "username or password is not correct");
        const {_id, name} = user;
        const token = jsonwebtoken.sign({_id, name}, secret, {expiresIn: '1d'});
        context.body = {token};

    }
}

module.exports = new UserCtl();