const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, taskController.getAllTasks);
router.post('/', authenticate, taskController.createTask);
router.get('/:id', authenticate, taskController.getTaskById);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);
router.post('/:id/comments', authenticate, taskController.addComment);

module.exports = router;
