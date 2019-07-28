const Question = require('../models/questions');
const User = require('../models/questions');
class QuestionCtl {



    async find(context){
        const {per_page = 10} = context.query;
        const page = Math.max(context.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page, 1);
        const q = new RegExp(context.query.q);
        context.body = await Question
            .find({$or:[{title: q}, {description: q}]})
            .limit(perPage)
            .skip(page * perPage);
    }

    async checkQuestioner(context, next){
        const {question} = context.state;
        if(question.questioner.toString() !== context.state.user._id)
            context.throw(403, "you don't have authority to do it")
        await next();
    }

    async checkQuestionExist(context, next){
        const question = await Question.findById(context.params.id).select('+questioner');
        if(!question)
            context.throw(404, "question doesn't exist")
        context.state.question = question;
        await next();
    }

    async findById(context){
        const {fields = ""} = context.query;
        const selectFields = fields.split(";").filter(f => f).map(f => " +" + f).join("");
        const question = await Question.findById(context.params.id).select(selectFields).populate('questioner');
        if(!question)
            context.throw(404, "question doesn't exist")
        context.body = question;
    }

    async create(context){
        context.verifyParams({
            title: {type: "string", required: true},
            description: {type: "string", required: false},
        });

        const question = await new Question({...context.request.body,questioner: context.state.user._id}).save();
        context.body = question;
    }

    async update(context){
        context.verifyParams({
            title: {type: "string", required: true},
            description: {type: "string", required: false},
        })

        await context.state.question.update(context.request.body);
        context.body = context.state.question;
    }

   async delete(context){
        await Question.findByIdAndRemove(context.params.id);
        context.status = 204;
   }
}

module.exports = new QuestionCtl();