const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

const authMiddleware = require('../middleware/auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'img/servicos/');
    },
    filename: function (req, file, cb) {
      const id_usuario = req.user.id_usuario;
      cb(null, 'servico_' + id_usuario + '_' + Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  const query = `
    SELECT s.*, g.nome_genero, u.nome AS nome_freelancer, u.foto_perfil
    FROM servicos s
    INNER JOIN generos g ON g.id_genero = s.genero_id
    INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
    INNER JOIN usuarios u ON u.freelancer_id = sf.freelancer_id
    ORDER BY s.id_servico DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar serviços.');
    }
    res.json(results);
  });
});

router.get('/category/:id', (req, res) => {
    const id_categoria = req.params.id;
    const query = `
      SELECT s.*, g.nome_genero, u.nome AS nome_freelancer, u.foto_perfil
      FROM servicos s
      INNER JOIN generos g ON g.id_genero = s.genero_id
      INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
      INNER JOIN usuarios u ON u.freelancer_id = sf.freelancer_id
      WHERE s.genero_id = ?
      ORDER BY s.id_servico DESC
    `;
    db.query(query, [id_categoria], (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao buscar serviços por categoria.');
      }
      res.json(results);
    });
  });

  router.post('/', authMiddleware, upload.single('imagem_servico'), (req, res) => {
    const id_usuario = req.user.id_usuario;

    const freelancerQuery = 'SELECT freelancer_id FROM usuarios WHERE id_usuario = ?';
    db.query(freelancerQuery, [id_usuario], (err, result) => {
        if (err || result.length === 0 || !result[0].freelancer_id) {
            return res.status(403).send('Acesso negado. Este usuário não é um freelancer.');
        }

        const id_freelancer = result[0].freelancer_id;
        const { nome, descricao, preco, genero_id, extra } = req.body;
        const imagem_servico = 'img/servicos/' + req.file.filename;

        if (!nome || !descricao || !preco || !genero_id) {
            return res.status(400).send('Campos incompletos.');
        }

        const insertServiceQuery = 'INSERT INTO servicos (nome, descricao, preco, extra, imagem_servico, genero_id) VALUES (?, ?, ?, ?, ?, ?)';
        const params = [nome, descricao, preco, extra, imagem_servico, genero_id];

        db.query(insertServiceQuery, params, (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao criar o serviço.');
            }

            const id_servico = result.insertId;
            const linkServiceQuery = 'INSERT INTO servicos_freelancer (servico_id, freelancer_id) VALUES (?, ?)';
            db.query(linkServiceQuery, [id_servico, id_freelancer], (err, result) => {
                if (err) {
                    return res.status(500).send('Erro ao associar o serviço ao freelancer.');
                }
                res.status(201).send('Serviço criado com sucesso!');
            });
        });
    });
});

router.get('/:id', (req, res) => {
    const id_servico = req.params.id;
    const query = `
      SELECT 
          s.*, 
          g.nome_genero,
          f.id_freelancer,
          u.nome AS nome_freelancer,
          u.foto_perfil,
          u.id_usuario
      FROM servicos s
      INNER JOIN generos g ON g.id_genero = s.genero_id
      INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
      INNER JOIN freelancer f ON f.id_freelancer = sf.freelancer_id
      INNER JOIN usuarios u ON u.freelancer_id = f.id_freelancer
      WHERE s.id_servico = ?
    `;
    db.query(query, [id_servico], (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao buscar serviço.');
      }
      if (results.length === 0) {
        return res.status(404).send('Serviço não encontrado.');
      }
      res.json(results[0]);
    });
  });

module.exports = router;
