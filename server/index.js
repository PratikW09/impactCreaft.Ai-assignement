import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/database/db.js';

import taskRoutes from './src/routes/task.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


// Connect to MongoDB
connectDB();

app.get('/health-check', (req, res) => {
  res.status(200).json({ message: "The server is running fine...!" });
});

//task routes
app.use('/api',taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});