import express from 'express';
import connectDB from './src/config/db.js';
import { port } from './src/config/constants.js';
import { uri } from './src/config/constants.js';
import healthCheckRoutes from './src/routes/healthCheckRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

connectDB();

const app = express();

// Nos permitira hacer uso de json en peticiones
app.use(express.json());

app.use(uri, healthCheckRoutes); // TODO: hacer ruta a mi endpoint de prueba

// http://localhost:5001/api/v0/users
app.use(`${uri}/users`, userRoutes); 

// TODO: hacer ruta a mi endpoint de prueba

const PORT = port || 5000;
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}${uri}`));

