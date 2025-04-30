const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { client, connectToCassandra } = require('./db/cassandra');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const port = 3000;

// Connect to Cassandra
connectToCassandra();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ==================== ROUTES ====================

// Get all students
app.get('/students', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Failed to fetch students');
  }
});

// Get a single student by ID
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM students WHERE id = ?';
  try {
    const result = await client.execute(query, [id], { prepare: true });
    if (result.rowLength === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// Create a new student
app.post('/students', async (req, res) => {
  const id = uuidv4();
  const { name, age, department } = req.body;
  const query = `
    INSERT INTO students (id, name, age, department)
    VALUES (?, ?, ?, ?)
  `;
  try {
    await client.execute(query, [id, name, age, department], { prepare: true });
    res.status(201).json({ id, name, age, department });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Update a student
app.put('/students/:id', async (req, res) => {
  const id = req.params.id;
  const { name, age, department } = req.body;
  const query = `
    UPDATE students SET name = ?, age = ?, department = ?
    WHERE id = ?
  `;
  try {
    await client.execute(query, [name, age, department, id], { prepare: true });
    res.json({ id, name, age, department });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM students WHERE id = ?';
  try {
    await client.execute(query, [id], { prepare: true });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
