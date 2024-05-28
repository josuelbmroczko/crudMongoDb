import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

// Estas duas linhas são necessárias para usar __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Servir os arquivos estáticos do aplicativo React
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Rota de API para fornecer dados
app.get('/api/data', (req, res) => {
  const data = { message: "Hello from the server!" };
  res.json(data);
});

// Rota principal - Servir o aplicativo React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
