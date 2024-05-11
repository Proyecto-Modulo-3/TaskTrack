const mongoose = require("mongoose");
const Card = require('../models/card.model');

module.exports.create = (req, res, next) => {
  Card.create({ ...req.body, task: req.params.taskId })
    .then((card) => res.status(201).json(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.viewCards = (req, res, next) => {
  Card.find({ task: req.params.taskId })
    .then((card) => {
      if (card.length > 0) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "You have no cards" });
      }
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
    Card.findById(req.params.cardId)
      .then((card) => {
        if (card) {
          res.status(200).json(card);
        } else {
          res.status(404).json({ message: "You have no cards" });
        }
      })
      .catch(next);
  };

  module.exports.update = (req, res, next) => {
    Card.findByIdAndUpdate(req.params.cardId, req.body, {
        runValidators: true,
        new: true
    })
    .then((card) => {
        if (card) {
            res.status(202).json(card);
        } else {
            res.status(404).json({ message: "You have no cards" });
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
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (card) {
          res.status(202).send();
        } else {
          res.status(404).json({ message: "You have no cards" });
        }
      })
      .catch(next);
  };