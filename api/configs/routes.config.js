const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const lists = require("../controllers/lists.controller");
const tasks = require("../controllers/tasks.controller");
const cards = require("../controllers/cards.controller");
const auth = require("../middlewares/auth.middleware");
const listAuth = require('../middlewares/list.middleware');

// USER
router.post("/users", users.create);
router.post("/login", users.login);
router.get("/profile", auth.checkAuth, users.profile);
// router.post("/logout", auth.checkAuth, users.logout);
router.patch("/users/:id", auth.checkAuth, users.update);
router.delete("/users/:id", auth.checkAuth, users.delete);

// LIST
router.post("/lists", auth.checkAuth, lists.create);
router.get("/lists", auth.checkAuth, lists.viewLists);
router.get("/lists/:listId", auth.checkAuth, lists.detail);
router.patch("/lists/:listId", auth.checkAuth, lists.update);
router.delete("/lists/:listId", auth.checkAuth, lists.delete);

// TASK
router.post("/lists/:listId/tasks", auth.checkAuth, listAuth.ownedBy, tasks.create);
router.get("/lists/:listId/tasks", auth.checkAuth, listAuth.ownedBy, tasks.viewTasks);
router.get("/lists/:listId/tasks/:taskId", auth.checkAuth, listAuth.ownedBy, tasks.detail);
router.patch("/lists/:listId/tasks/:taskId", auth.checkAuth, listAuth.ownedBy, tasks.update);
router.delete("/lists/:listId/tasks/:taskId", auth.checkAuth, listAuth.ownedBy, tasks.delete);

// CARD
router.post("/lists/:listId/tasks/:taskId/cards", auth.checkAuth, listAuth.ownedBy, cards.create);
router.get("/lists/:listId/tasks/:taskId/cards", auth.checkAuth, listAuth.ownedBy, cards.viewCards);
router.get("/lists/:listId/tasks/:taskId/cards/:cardId", auth.checkAuth, listAuth.ownedBy, cards.detail);
router.patch("/lists/:listId/tasks/:taskId/cards/:cardId", auth.checkAuth, listAuth.ownedBy, cards.update);
router.delete("/lists/:listId/tasks/:taskId/cards/:cardId", auth.checkAuth, listAuth.ownedBy, cards.delete);

module.exports = router;
