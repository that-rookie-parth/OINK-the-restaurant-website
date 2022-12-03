const utils = require("./utils")
const ejs = require("ejs")
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const Place = require('./models/place')
const Food = require('./models/food')
const PlaceClass = require('./classes/PlaceClass')


const cart = []
server = utils.readJson("./json/server.json")
app.use(express.static(server["static"]))
app.set("view engine", server["view engine"])
app.set("views", server["views"])



const getAllPlaces = async(key = "placeName") => {
    const result = await Place.find()
    const arr = []
    result.forEach(element => {
        arr.push(element[key])
    });
    return arr
}



const getAllFoods = async(key = "foodPic") => {
    const result = await Food.find()
    const arr = []
    result.forEach(element => {
        arr.push(element[key])
    });

    const temp = arr.length - arr.length % 3
    return arr.slice(0, temp)
}


const home = async(req, res) => {

    const orderNavbar = await getAllPlaces()
    const foods = await getAllFoods()

    data = {
        title: 'home',
        orderNavbar: orderNavbar,
        foods: foods,
        cartLength: Object.keys(cart).length,
        ...utils.readJson('json/home.json')
    }
    console.log(`Size of the info array: ${data['info'].length}`)
    res.render("home", data)
}


const getFoodsForPlaceJson = async(req, res) => {
    const place = new PlaceClass(req.params.placeName)
    const placeData = await place.get()
    const foods = await place.getFoods()
    res.send(JSON.stringify(foods))
}


const place = async(req, res) => {
    const place = new PlaceClass(req.params.placeName)
    const placeData = await place.get()
    const foods = await place.getFoods()

    console.log(foods);

    const orderNavbar = await getAllPlaces()
    data = {
        orderNavbar: orderNavbar,
        place: placeData,
        cartLength: Object.keys(cart).length,
        foods: foods
    }
    res.render("place", data)
}


const addToCart = async (req, res) => {
    const result = await Food.findById(req.params.foodId).exec()
    console.log(result);
    cart.push(result)
    res.send(JSON.stringify({
        'id': req.params.foodId
    }))
}



const cartView = async (req, res) => {
    
    const orderNavbar = await getAllPlaces()

    console.log(`The cart is: ${cart}`);

    data = {
        title: 'cart',
        orderNavbar: orderNavbar,
        foods: cart,
        cartLength: Object.keys(cart).length,
        ...utils.readJson('json/home.json')
    }

    res.render("cart", data)
} 


app.get(["/", "/home"], home)
app.get("/place/:placeName", place)
app.get("/place/js/:placeName", getFoodsForPlaceJson)
app.get("/addToCart/:foodId", addToCart)
app.get("/cart", cartView)

app.get("/emptyCart", (req, res) => {
    cart.length = 0
    res.redirect("/home")
})

app.listen(server["port"], server["hostname"], () => {
    console.log(`Listening on the url http://${server["hostname"]}:${server["port"]}`);
})


mongoose.connect("mongodb://0.0.0.0:27017/oink")
    .then((res) => {
        console.log("Sucessfully connected to the database.");
    })
    .catch((err) => {
        console.log(`There was an error while connecting to the database. ${err}`);
    })