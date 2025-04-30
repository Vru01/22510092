const express = require('express');
const { Client } = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

const cassandraClient = new Client({
  contactPoints: ['127.0.0.1'], 
  localDataCenter: 'datacenter1', 
  keyspace: 'todolist', 
});


app.use(bodyParser.json());

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;

  const newTaskId = uuidv4();

  const insertQuery = 'INSERT INTO tasks (id, completed, text) VALUES (?, ?, ?)';
  const params = [newTaskId, false, text];

  try {
    await cassandraClient.execute(insertQuery, params, { prepare: true });
    res.status(200).json({ message: 'Task added successfully', taskId: newTaskId });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/todos', async (req, res) => {
  const query = 'SELECT id, text, completed FROM tasks';
  try {
    const result = await cassandraClient.execute(query);
    
    // Modify the result to rename `id` to `_id`
    const tasksWithIdAsUnderscore = result.rows.map(task => {
      return {
        _id: task.id, // Rename id to _id
        text: task.text,
        completed: task.completed
      };
    });

    res.status(200).json(tasksWithIdAsUnderscore); // Send the modified response
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params; 
  const query = 'SELECT completed FROM tasks WHERE id = ?';
  try {
    const result = await cassandraClient.execute(query, [id], { prepare: true });
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const currentCompletedStatus = result.rows[0].completed;
    const updateQuery = 'UPDATE tasks SET completed = ? WHERE id = ?';
    await cassandraClient.execute(updateQuery, [!currentCompletedStatus, id], { prepare: true });

    res.status(200).json({ id, completed: !currentCompletedStatus });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params; 

  console.log(id)
  const query = 'DELETE FROM tasks WHERE id = ?';
  try {
    await cassandraClient.execute(query, [id], { prepare: true });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
