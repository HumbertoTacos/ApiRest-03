const express = require("express");
const controller = require("../controllers/tasks.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticate, controller.findAll);
router.get("/:id", authenticate, controller.findById);
router.post("/", authenticate, controller.addTask);
router.put("/:id", authenticate, controller.updateTask);
router.delete("/:id", authenticate, controller.deleteTask);

module.exports = router;