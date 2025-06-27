
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://jintops2003:qwerty123@cluster0.dgcgz.mongodb.net/devTinder")
};

module.exports = connectDB;
