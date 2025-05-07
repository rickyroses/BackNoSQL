import express from 'express';
import connectDB from './src/config/db.js';
import { port } from './src/config/constants.js';
import { uri } from './src/config/constants.js';
import healthCheckRoutes from './src/routes/healthCheckRoutes.js';

connectDB();

const app = express();

// Nos permitira hacer uso de json en peticiones
app.use(express.json());

app.use(uri, healthCheckRoutes); // TODO: hacer ruta a mi endpoint de prueba

// TODO: hacer ruta a mi endpoint de prueba

const PORT = port || 5000;
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}${uri}`));

