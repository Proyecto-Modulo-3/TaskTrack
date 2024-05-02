const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const lists = require("../controllers/lists.controller");
const tasks = require("../controllers/tasks.controller");
const cards = require("../controllers/cards.controller");
const auth = require("../middlewares/auth.middleware");

// USER
router.post("/users", users.create);
router.get("/login", users.login);
router.get("/profile", auth.checkAuth, users.profile);
// router.post("/logout", auth.checkAuth, users.logout);
router.patch("/users/:id", auth.checkAuth, users.update);
router.delete("/users/:id", auth.checkAuth, users.delete);

// LIST
router.post("/lists", auth.checkAuth, lists.create);
router.get("/lists", auth.checkAuth, lists.viewLists);
router.get("/lists/:id", auth.checkAuth, lists.detail);
router.patch("/lists/:id", auth.checkAuth, lists.update);
router.delete("/lists/:id", auth.checkAuth, lists.delete);

// TASK
router.post("/tasks", auth.checkAuth, tasks.create);
router.get("/tasks", auth.checkAuth, tasks.viewTasks);
router.get("/tasks/:id", auth.checkAuth, tasks.detail);
router.patch("/tasks/:id", auth.checkAuth, tasks.update);
router.delete("/tasks/:id", auth.checkAuth, tasks.delete);

// CARD
router.post("/cards", auth.checkAuth, cards.create);
router.get("/cards", auth.checkAuth, cards.viewCards);
router.get("/cards/:id", auth.checkAuth, cards.detail);
router.patch("/cards/:id", auth.checkAuth, cards.update);
router.delete("/cards/:id", auth.checkAuth, cards.delete);

module.exports = router;
