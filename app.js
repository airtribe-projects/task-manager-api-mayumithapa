const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory task storage
let tasks = [
    {
      id: 1,
      title: "Set up environment",
      description: "Install Node.js, npm, and git",
      completed: true,
    },
    {
      id: 2,
      title: "Create Express App",
      description: "Initialize Express application with middleware",
      completed: false,
    },
  ];

let nextId = 3;

// Validation middleware
const validateTaskInput = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Description is required and must be a string' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  next();
};



// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET task by ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  });


// POST create task
app.post("/tasks", (req, res) => {
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid task data" });
    }
    const newTask = {
      id: nextId++,
      title,
      description,
      completed,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });

// PUT update task
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
  
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid task data" });
    }
  
    task.title = title;
    task.description = description;
    task.completed = completed;
  
    res.json(task);
  });

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
  
    const deleted = tasks.splice(index, 1);
    res.json(deleted[0]);
  });


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;