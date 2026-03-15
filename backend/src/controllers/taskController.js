const Task = require('../models/Task');
const mongoose = require('mongoose');
const { validateTaskCreation, validateTaskUpdate } = require('../utils/validators');
const { HTTP_STATUS } = require('../config/constants');

exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, category, search } = req.query;
    const filter = { assignedTo: req.user._id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'username email')
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'username email')
      .populate('createdBy', 'username')
      .populate('comments.author', 'username avatar');

    if (!task) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.assignedTo._id.toString() !== req.user._id.toString() && 
        task.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: 'Access denied',
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { error, value } = validateTaskCreation(req.body);
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const task = new Task({
      ...value,
      createdBy: req.user._id,
    });

    await task.save();
    await task.populate('assignedTo', 'username email');
    await task.populate('createdBy', 'username');

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { error, value } = validateTaskUpdate(req.body);
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: 'Only task creator can update it',
      });
    }

    Object.assign(task, value);

    if (value.status === 'completed' && !task.completedAt) {
      task.completedAt = new Date();
    } else if (value.status !== 'completed') {
      task.completedAt = null;
    }

    await task.save();
    await task.populate('assignedTo', 'username email');
    await task.populate('createdBy', 'username');

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: 'Only task creator can delete it',
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Comment text is required',
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Task not found',
      });
    }

    const comment = {
      _id: new mongoose.Types.ObjectId(),
      author: req.user._id,
      text,
      createdAt: new Date(),
    };

    task.comments.push(comment);
    await task.save();
    await task.populate('comments.author', 'username avatar');

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Comment added successfully',
      data: task.comments,
    });
  } catch (error) {
    next(error);
  }
};
