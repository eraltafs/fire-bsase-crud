const firebase = require("firebase")
require("dotenv").config()

const firebaseConfig = process.env.firebaseConfig

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = db.collection("Users")
module.exports = {User}