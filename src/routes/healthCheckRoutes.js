import express from 'express';

const router = express.Router();

// Funcion CallBack de tipo GET que responde un OK
const healthCheck = (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'El servidor está funcionando correctamente',});
}

// Endpoint de tipo GET (http://localhost:5000/api/v0/healthCheck)
router.get('/healthCheck', healthCheck);

export default router;