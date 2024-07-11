const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para analisar JSON
app.use(bodyParser.json());

// Endpoint para salvar dados
app.post('/save-data', (req, res) => {
    const data = req.body;

    // Cria um arquivo com o nome baseado na data e hora atual
    const filePath = path.join(__dirname, 'data', `data-${Date.now()}.json`);

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return res.status(500).json({ message: 'Erro ao salvar o arquivo' });
        }

        res.status(200).json({ message: 'Dados salvos com sucesso' });
    });
});

// Cria a pasta 'data' se não existir
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
