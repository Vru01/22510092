const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://jagtapshweta26:DXXIB89k8jxmmnjY@cluster0.whkdn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection failed:', err));


const TaskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/api/todos', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/todos', async (req, res) => {
  const newTask = new Task({ text: req.body.text, completed: false });
  await newTask.save();
  res.json(newTask);
});

app.put('/api/todos/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
