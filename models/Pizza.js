// import dependencies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create schema for model - client wants following data stored when users create a pizza:
const PizzaSchema = new Schema(
    {
    pizzaName: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        // if no value is provided when user creates new data, the Date.now function will be executed
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large',
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    // '[]' indicates array
    toppings: [],

    // association (in mongoose, w can instruct the parent to keep track of its children)
    comments: [
        {
            // tell mongoose to expect an ObjectId
            type: Schema.Types.ObjectId,
            // tell it that its data comes from the Comment model
            ref: 'Comment'
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // set id to false because this is a virtual that Mongoose returns, it's needed
        id: false
    }
);

// virtual to get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the Pizza Schema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;