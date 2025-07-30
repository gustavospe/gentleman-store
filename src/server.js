const express = require('express');
const path = require('path');
const produtos = require('./produtos.js');
const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));
app.use(express.json());

// Rotas da API
app.get('/api/produtos', (req, res) => {
  res.json(produtos); // Corrigido para 'produtos'
});

app.get('/api/produtos/categoria/:categoria', (req, res) => {
  const { categoria } = req.params;
  
  if (categoria === 'todos') {
    res.json(produtos);
  } else {
    const filteredprodutos = produtos.filter(product => product.categoria === categoria);
    res.json(filteredprodutos);
  }
});

app.get('/api/produtos/search/:term', (req, res) => {
  const { term } = req.params;
  const filteredprodutos = produtos.filter(product => 
    product.nome.toLowerCase().includes(term.toLowerCase())
  );
  res.json(filteredprodutos);
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
