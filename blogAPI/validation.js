const { z } = require('zod');

// Schema for creating a new post (POST /posts)
const createPostValidator = z.object({
  title: z.string()
    .min(3, { message: 'Title must be at least 3 characters long.' })
    .max(255, { message: 'Title cannot exceed 255 characters.' }),
  content: z.string()
    .min(10, { message: 'Content must be at least 10 characters long.' }),
  author: z.string()
    .min(1, { message: 'Author field cannot be empty.' })
    .max(100, { message: 'Author name cannot exceed 100 characters.' }),
});

// Schema for validating the post ID in URL parameters (GET /posts/:id)
// UPDATED: Now validates for a 24-digit numeric string
const postIdValidator = z.object({
  id: z.string().refine(val => /^\d{1,9}$/.test(val), { // \d is equivalent to [0-9]
    message: 'Invalid Post ID format. Must be a 24-digit numeric string.',
  }),
});

module.exports = {
  createPostValidator,
  postIdValidator,
};