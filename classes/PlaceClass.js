const mongoose = require('mongoose')
const Place = require("../models/place")
const Food = require("../models/food")


class PlaceClass{
    constructor(placeName){
        this.placeName = placeName
    }

    async get(){
        let result = await Place.find({'placeName': this.placeName}).exec()
        result = result[0]
        return result;
    }

    async getFoods(){
        const result = await Food.find({'placeName': this.placeName}).exec()
        return result;
    }
}


module.exports = PlaceClass