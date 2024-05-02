const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(404).json(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        user
          .checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              const accessToken = jwt.sign(
                {
                  sub: user.id,
                  exp: Date.now() / 1000 + 7200,
                },
                process.env.JWT_SECRET
              );

              res.json({ accessToken });
            } else {
              res.status(401).json({ error: "Invalid password" });
            }
          })
          .catch(next);
      } else {
        res.status(401).json({ error: "Invalid email" });
      }
    })
    .catch(next);
};

module.exports.profile = (req, res) => res.json(req.user);

// LOGOUT
module.exports.logout = (req, res, next) => {
  res.status(204).send();
};

// UPDATE
module.exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.user.id })
    .then(() => res.status(204).send())
    .catch(next);
};

// DELETE
