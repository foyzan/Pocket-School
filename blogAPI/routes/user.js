const express = require("express");
const { createPostValidator } = require("../validation"); // postIdValidator is not directly used here, assuming it's used within validateId
const route = express.Router();

// Import your Mongoose model
const PostSchema = require("../database/db"); // Assuming this exports your Mongoose Post model
const { validateMiddleware, validateId } = require("../middleware/validator");

// Initialize id. This will be updated from the database.
let currentPostId = 1;

/**
 * @class BlogPost
 * @description Represents a blog post structure.
 * @param {string} title - The title of the blog post.
 * @param {string} content - The content of the blog post.
 * @param {string} author - The author of the blog post.
 */
class BlogPost {
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = new Date();
    }
}

/**
 * @function getHighestId
 * @description Fetches the highest existing 'id' from the database and updates `currentPostId`.
 * This is crucial for preventing ID collisions upon server restart.
 * It sorts by 'id' in descending order and picks the first one.
 */
async function getHighestId() {
    try {
        // Find one document, sort by 'id' in descending order, and select only the 'id' field.
        // Ensure PostSchema is your Mongoose model.
        const latestPost = await PostSchema.findOne({})
            .sort({ id: -1 }) // Sort by 'id' in descending order
            .select('id')    // Select only the 'id' field
            .lean();         // Use .lean() for plain JavaScript objects, faster for reads

        if (latestPost && latestPost.id !== undefined) {
            currentPostId = latestPost.id + 1; // Set currentPostId to be one greater than the highest found
            console.log('Next available ID:', currentPostId);
        } else {
            console.log('No documents found or "id" field is missing. Starting ID from 1.');
            currentPostId = 1; // If no posts exist, start from 1
        }
    } catch (error) {
        console.error('Error finding highest ID during initialization:', error);
        // Depending on your application, you might want to throw the error
        // or handle it more gracefully (e.g., exit the process if critical).
        // For now, we'll just log and proceed, assuming ID will be 1.
        currentPostId = 1; // Fallback in case of DB error during startup
    }
}

// Immediately-invoked async function to initialize currentPostId before routes are used
(async () => {
    await getHighestId();
    console.log("Database ID initialization complete.");
})();


/**
 * @route POST /post
 * @description Creates a new blog post.
 * @middleware validateMiddleware(createPostValidator) - Validates the request body.
 * @param {object} req.body - The request body containing title, content, and author.
 * @returns {object} 201 - Success message and the created post.
 * @returns {object} 400 - Validation error.
 * @returns {object} 404 - Database error.
 */
route.post("/post", validateMiddleware(createPostValidator), async function(req, res) {
    const { title, content, author } = req.body;

    const newPost = new BlogPost(title, content, author);

    try {
        // Assign the currentPostId and then increment it for the next post
        await PostSchema.create({
            id: currentPostId,
            post: newPost
        });

        currentPostId++; // Increment for the next post

        res.status(201).json({
            msg: "Post created successfully",
            post: newPost
        });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ // Changed to 500 for server-side errors
            msg: "DB error creating post",
            error: err.message // Send only the error message for security
        });
    }
});

/**
 * @route GET /post/:id
 * @description Retrieves a blog post by its ID.
 * @middleware validateId - Validates the ID parameter.
 * @param {string} req.params.id - The ID of the post to retrieve.
 * @returns {object} 200 - The retrieved post.
 * @returns {object} 404 - Post not found or database error.
 */
route.get("/post/:id", validateId, async function(req, res) {
    // Convert the ID parameter to an integer, as your database 'id' is likely a number
    const postId = parseInt(req.params.id, 10);

    // Check if the parsed ID is a valid number
    if (isNaN(postId)) {
        return res.status(400).json({
            msg: "Invalid post ID provided. ID must be a number."
        });
    }

    try {
        const post = await PostSchema.findOne({ id: postId }); // Query using the numeric ID
        if (!post) {
            return res.status(404).json({
                msg: "Post not found"
            });
        } else {
            return res.status(200).json({
                post
            });
        }
    } catch (err) {
        console.error("Error fetching post:", err);
        return res.status(500).json({ // Changed to 500 for server-side errors
            msg: "DB error fetching post",
            error: err.message // Send only the error message for security
        });
    }
});

module.exports = route;
