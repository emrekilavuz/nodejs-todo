const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask
} = require("../controllers/taskController");

router.post("/", createTask);
router.put("/:id", updateTask);
router.get("/", getTasks);

module.exports = router;
