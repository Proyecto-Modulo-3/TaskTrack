const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const lists = require("../controllers/lists.controller");
const auth = require("../middlewares/auth.middleware");

// USER
router.post("/users", users.create);
router.get("/login", users.login);
router.get("/users/:id", auth.checkAuth, users.profile);
router.post("/logout", auth.checkAuth, users.logout);

// LIST
router.post("/lists", auth.checkAuth, auth.checkRole("admin"), lists.create);
router.get("/lists", auth.checkAuth, lists.viewLists);
router.get("/lists/:id", auth.checkAuth, lists.detail);
router.patch('/lists/:id', auth.checkAuth, auth.checkRole('admin'), lists.update);
router.delete('/lists/:id', auth.checkAuth, auth.checkRole('admin'), lists.delete);

// TASK


// CARD


module.exports = router;
