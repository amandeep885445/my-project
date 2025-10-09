import express from 'express';
import adminRouter from './route.js';


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/admin', adminRouter);

let users = [];

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


// Create a user (POST /users)
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json({ message: 'User added', user });
});

// Get all users (GET /users)
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Update a user (PUT /users/:id)
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  users = users.map(user => (user.id === id ? updatedUser : user));
  res.status(200).json({ message: 'User updated', updatedUser });
});

// Delete a user (DELETE /users/:id)
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  users = users.filter(user => user.id !== id);
  res.status(200).json({ message: 'User deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
