// import dependencies
const { Schema, model } = require('mongoose');

// create schema for model - client wants following data stored when users create a pizza:
const PizzaSchema = new Schema(
    {
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        // if no value is provided when user creates new data, the Date.now function will be executed
        default: Date.now
    },
    size: {
        type: String,
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
        },
        // set id to false because this is a virtual that Mongoose returns, it's needed
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create the Pizza model using the Pizza Schema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;