const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/register', (req, res) => {
  const { nome, email, senha, cpf, telefone, tipo_conta, area_atuacao } = req.body;

  if (!nome || !email || !senha || !cpf || !tipo_conta) {
    return res.status(400).send('Erro: todos os campos obrigatórios devem ser preenchidos.');
  }

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      return res.status(500).send('Erro ao criptografar a senha.');
    }

    db.beginTransaction(err => {
      if (err) {
        return res.status(500).send('Erro ao iniciar a transação.');
      }

      let freelancer_id = null;
      let contratante_id = null;

      if (tipo_conta === 'Freelancer') {
        if (!area_atuacao) {
          db.rollback(() => {
            return res.status(400).send('Área de atuação é obrigatória para freelancers.');
          });
        }

        db.query('INSERT INTO freelancer (nome, area_atuacao_id) VALUES (?, ?)', [nome, area_atuacao], (err, result) => {
          if (err) {
            db.rollback(() => {
              return res.status(500).send('Erro ao cadastrar freelancer.');
            });
          }
          freelancer_id = result.insertId;
          insertUser();
        });
      } else if (tipo_conta === 'Contratante') {
        db.query('INSERT INTO contratante (nome) VALUES (?)', [nome], (err, result) => {
          if (err) {
            db.rollback(() => {
              return res.status(500).send('Erro ao cadastrar contratante.');
            });
          }
          contratante_id = result.insertId;
          insertUser();
        });
      } else {
        insertUser();
      }

      function insertUser() {
        const query = 'INSERT INTO usuarios (nome, email, senha, cpf, telefone, freelancer_id, contratante_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const params = [nome, email, hash, cpf, telefone, freelancer_id, contratante_id];

        db.query(query, params, (err, result) => {
          if (err) {
            db.rollback(() => {
              return res.status(500).send('Erro ao cadastrar usuário.');
            });
          }

          db.commit(err => {
            if (err) {
              db.rollback(() => {
                return res.status(500).send('Erro ao commitar a transação.');
              });
            }
            res.status(201).send('Cadastro realizado com sucesso!');
          });
        });
      }
    });
  });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios.');
  }

  const query = 'SELECT id_usuario, nome, email, senha, foto_perfil, freelancer_id, contratante_id FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Erro no servidor.');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuário não encontrado.');
    }

    const usuario = results[0];

    bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Erro ao verificar a senha.');
      }

      if (!isMatch) {
        return res.status(401).send('Senha incorreta.');
      }

      const token = jwt.sign(
        {
          id_usuario: usuario.id_usuario,
          nome: usuario.nome,
          tipo: usuario.freelancer_id ? 'Freelancer' : 'Contratante'
        },
        'your_jwt_secret', // TODO: use a secret from environment variables
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login bem-sucedido',
        token,
        user: {
          id_usuario: usuario.id_usuario,
          nome: usuario.nome,
          foto_perfil: usuario.foto_perfil,
          tipo: usuario.freelancer_id ? 'Freelancer' : 'Contratante'
        }
      });
    });
  });
});

module.exports = router;
