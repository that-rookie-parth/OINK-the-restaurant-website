const mongoose = require('mongoose')
const Schema = mongoose.Schema


const foodSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    foodDesc: {
        type: String,
        required: true
    },
    foodPic: {
        type: String,
        required: true
    },
    placeName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


const Food = new mongoose.model('Food', foodSchema)
module.exports = Food