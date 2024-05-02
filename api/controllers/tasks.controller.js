const mongoose = require('mongoose');
const Task = require('../models/task.model');

module.exports.create = (req, res, next) => {
    Task.create(req.body)
    .then((task) => res.status(201).json(task))
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json(error.errors);
        } else {
            next(error);
        }
    });
}