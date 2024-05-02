const mongoose = require("mongoose");
const Task = require("../models/task.model");

module.exports.create = (req, res, next) => {
  Task.create({ ...req.body, list: req.params.listId })
    .then((task) => res.status(201).json(task))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.viewTasks = (req, res, next) => {
  Task.find({ list: req.params.listId })
    .then((task) => {
      if (task.length > 0) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "You have no tasks" });
      }
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Task.findById(req.params.taskId)
    .populate('cards')
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "You have no tasks" });
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Task.findByIdAndUpdate(req.params.taskId, req.body, {
    runValidators: true,
    new: true,
  })
    .then((task) => {
      if (task) {
        res.status(202).json(task);
      } else {
        res.status(404).json({ message: "You have no tasks" });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Task.findByIdAndDelete(req.params.taskId)
    .then((task) => {
      if (task) {
        res.status(202).send();
      } else {
        res.status(404).json({ message: "You have no tasks" });
      }
    })
    .catch(next);
};
