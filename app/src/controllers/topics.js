const Topic = require('../models/topics');
const User = require('../models/users');
class TopicCtl {
    async find(context){
        const {per_page = 10} = context.query;
        const page = Math.max(context.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page, 1);
        context.body = await Topic
            .find({name: new RegExp(context.query.q)})
            .limit(perPage)
            .skip(page * perPage);
    }

    async checkTopicExist(context, next){
        const user = await Topic.findById(context.params.id);
        if(!user)
            context.throw(404, "user doesn't exist")
        await next();
    }

    async findById(context){
        const {fields = ""} = context.query;
        const selectFields = fields.split(";").filter(f => f).map(f => " +" + f).join("");
        const topic = await Topic.findById(context.params.id).select(selectFields);
        if(!topic)
            context.throw(404, "topic doesn't exist")
        context.body = topic;
    }

    async create(context){
        context.verifyParams({
            name: {type: "string", required: true},
            avatar_url: {type: "string", required: false},
            introduction: {type: "string", required: false}
        });

        const topic = await new Topic(context.request.body).save();
        context.body = topic;
    }

    async update(context){
        context.verifyParams({
            name: {type: "string", required: false},
            avatar_url: {type: "string", required: false},
            introduction: {type: "string", required: false}
        })

        const topic = await Topic.findByIdAndUpdate(context.params.id, context.request.body);
        context.body = topic;
    }

    async listTopicFollowers(context){
        const users = await User.find({followingTopics: context.params.id});
        context.body = users;
    }
}

module.exports = new TopicCtl();