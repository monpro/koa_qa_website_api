const User = require('../models/users');

class UserCtl {
    async find(context){
        context.body = await User.find();
    }
    async findById(context){
        const user = await User.findById(context.params.id);
        if(!user)
            context.throw(404,"user doesn't exist")
        context.body = user;
    }

    async create(context){
        context.verifyParams({
            name: {type: 'string', required: true},
        });

        const user = await new User(context.request.body).save();
        context.body = user;
    }

    async update(context){
        context.verifyParams({
            name: {type: 'string', required: true}
        });
        const user = await User.findByIdAndUpdate(context.params.id, context.request.body);
        if(!user){
            context.throw(404, "User doesn't exist")
        }
        context.body = user;
    }

    async delete(context){
        const user = await User.findByIdAndRemove(context.params.id);
        if(!user){
            context.throw(404)
        }
        context.status = 204;
    }
}

module.exports = new UserCtl();