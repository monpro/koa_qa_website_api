const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const userSchema = new Schema({
    __v :{type:Number, select: false},
    name: {type: String, required: true},
    password: {type: String, required: true, select: false},
    avatar_url :{type: String},
    gender: {type: String, enum :['male', 'female'], default: 'female', required: true},
    headline: {type: String},
    locations: {type: [{type: Schema.Types.ObjectId, ref: 'Topic'}], select: false},
    business : {type: Schema.Types.ObjectId, ref: 'Topic', select: false},
    employments: {
        type: [
            {
                company: {type: {type: Schema.Types.ObjectId, ref: 'Topic'}},
                job: {type: {type: Schema.Types.ObjectId, ref: 'Topic'}},
            }
        ],
        select: false

    },
    educations: {
        type: [{
            school: {type: {type: Schema.Types.ObjectId, ref: 'Topic'}},
            major: {type: {type: Schema.Types.ObjectId, ref: 'Topic'}},
            diploma: {type: String, enum: [1, 2, 3, 4, 5]},
            entrance_year: {type: Number},
            graduation_year: {type: Number},
        }]
        ,
        select: false
    },
    following: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],
        select: false
    },
    followingTopics:{
        type: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
        select: false
    }
});

module.exports = model('User',userSchema);
