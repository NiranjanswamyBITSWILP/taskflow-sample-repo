const joi = require('joi');

const validateUserRegistration = (data) => {
  const schema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    firstName: joi.string().max(50),
    lastName: joi.string().max(50),
  });

  return schema.validate(data);
};

const validateUserLogin = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return schema.validate(data);
};

const validateTaskCreation = (data) => {
  const schema = joi.object({
    title: joi.string().max(200).required(),
    description: joi.string().max(2000),
    priority: joi.string().valid('low', 'medium', 'high', 'urgent'),
    category: joi.string().max(50),
    dueDate: joi.date(),
    assignedTo: joi.string().required(),
    tags: joi.array().items(joi.string()),
  });

  return schema.validate(data);
};

const validateTaskUpdate = (data) => {
  const schema = joi.object({
    title: joi.string().max(200),
    description: joi.string().max(2000),
    status: joi.string().valid('pending', 'in_progress', 'completed'),
    priority: joi.string().valid('low', 'medium', 'high', 'urgent'),
    category: joi.string().max(50),
    dueDate: joi.date(),
    assignedTo: joi.string(),
    tags: joi.array().items(joi.string()),
  });

  return schema.validate(data);
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateTaskCreation,
  validateTaskUpdate,
};
