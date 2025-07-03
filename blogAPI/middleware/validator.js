const express = require('express');
const { postIdValidator } = require('../validation');

// Import mongoose for ObjectId check if not using refine


const validateMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Validate request body for POST/PUT
    next();
  } catch (error) {
    // Zod provides detailed error messages
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors.map(err => ({ path: err.path.join('.'), message: err.message }))
    });
  }
};
// Middleware for ID parameter validation
const validateId = (req, res, next) => {
  try {
    // Validate req.params.id using postIdSchema
    postIdValidator.parse(req.params);
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid ID format',
      errors: error.errors.map(err => ({ path: err.path.join('.'), message: err.message }))
    });
  }
};

module.exports = {
  validateMiddleware,
  validateId
};


