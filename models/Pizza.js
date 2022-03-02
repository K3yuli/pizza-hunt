// import dependencies
const { Schema, model } = require('mongoose');

// create schema for model - client wants following data stored when users create a pizza:
const PizzaSchema = new Schema({
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
    toppings: []
});

// create the Pizza model using the Pizza Schema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;