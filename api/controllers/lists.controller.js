const mongoose = require("mongoose");
const List = require("../models/list.model");

module.exports.create = (req, res, next) => {
  List.create(req.body)
    .then((list) => res.status(201).json(list))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.viewLists = (req, res, next) => {
  const { category } = req.params;

  List.find({ category: category, owner: req.user._id })
    .populate({
      path: "owner",
    })
    .then((list) => {
      if (list.length > 0) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: "List not found" });
      }
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  List.findById(req.params.id)
    .populate("tasks")
    .then((list) => {
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: "List not found" });
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  List.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((list) => {
      if (list) {
        res.status(202).json(list);
      } else {
        res.status(404).json({ message: "List not found" });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  List.findByIdAndDelete(req.params.id)
    .then((list) => {
      if (list) {
        res.status(202).send();
      } else {
        res.status(404).json({ message: "List not found" });
      }
    })
    .catch(next);
};
