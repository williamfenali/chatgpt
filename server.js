const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Configurações do MySQL
const db = mysql.createConnection({
  host: 'br42.hostgator.com.br',
  user: 'itasor36_fenali',
  password: 'Wmf0217Wmf!',
  database: 'itasor36_user'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas do CRUD

// Listar usuários
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao recuperar dados' });
    } else {
      res.json(results);
    }
  });
});

// Criar usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao adicionar usuário' });
    } else {
      res.json({ id: results.insertId, name, email });
    }
  });
});

// Atualizar usuário
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    } else {
      res.json({ id, name, email });
    }
  });
});

// Deletar usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    } else {
      res.json({ message: 'Usuário deletado' });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
