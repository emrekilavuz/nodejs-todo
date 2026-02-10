const { v4: uuidv4 } = require("uuid");

// In-memory storage
const tasks = [];

// POST /tasks
const createTask = (req, res) => {
  const { title, completed } = req.body;

  // Validation
  if (!title || typeof title !== "string") {
    return res.status(400).json({
      error: "title is required and must be a string"
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      error: "completed must be a boolean"
    });
  }

  const newTask = {
    id: uuidv4(),
    title,
    completed: completed ?? false,
    createdAt: new Date()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// GET /tasks
const getTasks = (req, res) => {
  res.json(tasks);
};

// PUT /tasks/:id
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  // If title is going to be updated then it must be a string with value
  if (title !== undefined && (!title || typeof title !== "string")) {
    return res.status(400).json({
      error: "title must be a string"
    });
  }

  // If completed is going to be updated then it must be a boolean
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      error: "completed must be a boolean"
    });
  }

  const foundTask = tasks.find(x => x.id == id);

  if(!foundTask){
    return res.status(404).json({
      error: "task not found"
    });
  }

  if(title !== undefined || completed !== undefined){
    foundTask["updatedAt"] = new Date();
  }

  if(title){
    foundTask.title = title;
  }

  if(completed !== undefined){
    foundTask.completed = completed;
  }

  res.status(200).json(foundTask);
};

module.exports = {
  createTask,
  updateTask,
  getTasks
};
