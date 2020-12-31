const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username: { type: String },
    googleID: String,
    image:String
})

let User = mongoose.model("User", userSchema);

module.exports = User;