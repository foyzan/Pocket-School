const mongoose = require('mongoose');
const { number } = require('zod');

const mongooseUrl = require("./dbcredintiality")

// 2. Connect to MongoDB (optional, but good for testing the schema)
mongoose.connect(mongooseUrl + "blogAPI")
    .then(() => console.log('MongoDB connected successfully for BlogPost schema test!'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- Define the Mongoose Schema for BlogPost ---
const blogPostSchema = new mongoose.Schema({
    // Corresponds to this.title in your class
    id:{
        type : Number,
        required: true,
        unique: true 
    },
    post : {
        type : Object,
        required : true
    }
    // You can add more fields here later, e.g., comments, tags, views, etc.
});

const PostSchema = mongoose.model('post', blogPostSchema);

module.exports = PostSchema;