const express = require('express');
const Tesseract = require('tesseract.js');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  const imageUrl = req.query.image;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Parâmetro "image" ausente na URL' });
  }

  Tesseract.recognize(
    imageUrl,
    'eng',
    { logger: (info) => console.log(info) }
  )
    .then(({ data: { text } }) => {
      res.json({ text });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Erro durante o OCR' });
    });
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
