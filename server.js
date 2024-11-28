const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection using Mongoose
const mongoURI = 'mongodb://localhost:27017/todolist'; // Replace with your MongoDB URI if using a cloud service
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for todos
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Create a model from the schema
const Todo = mongoose.model('Todo', todoSchema);

// POST route to add a new todo
app.post('/todos', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const newTodo = new Todo({ title, description });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save the todo' });
  }
});

// GET route to retrieve all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Log the request body to see if it contains title and description
  console.log('Request Body:', req.body);

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully', deletedTodo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the todo' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

