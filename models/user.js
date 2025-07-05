const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true, // <- spelling corrected from "require" to "required"
    },
});

userSchema.plugin(passportLocalMongoose); // <- this is the correct way

module.exports = mongoose.model("User", userSchema);


