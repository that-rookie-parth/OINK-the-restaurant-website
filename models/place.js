const mongoose = require('mongoose')
const Schema = mongoose.Schema


const placeSchema = new Schema({
    placeName: {
        type: String,
        required: true
    },
    placeDesc: {
        type: String,
        required: true
    },
    placePic: {
        type: String,
        required: true
    }
})


const Place = new mongoose.model('Place', placeSchema)
module.exports = Place