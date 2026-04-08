const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/perfis/');
  },
  filename: function (req, file, cb) {
    const id_usuario = req.user.id_usuario;
    cb(null, 'perfil_' + id_usuario + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/profile', auth, (req, res) => {
  const id_usuario = req.user.id_usuario; 

  const userQuery = 'SELECT * FROM usuarios WHERE id_usuario = ?';
  db.query(userQuery, [id_usuario], (err, userResults) => {
    if (err) {
      return res.status(500).send('Erro ao buscar usuário.');
    }
    if (userResults.length === 0) {
      return res.status(404).send('Usuário não encontrado.');
    }

    const user = userResults[0];
    const freelancer_id = user.freelancer_id;

    if (!freelancer_id) {
      return res.json({ user });
    }

    const servicesQuery = `
      SELECT 
          s.id_servico,
          s.nome,
          s.descricao,
          s.preco,
          s.extra,
          s.imagem_servico,
          g.nome_genero
      FROM servicos s
      INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
      INNER JOIN generos g ON g.id_genero = s.genero_id
      WHERE sf.freelancer_id = ?
    `;
    db.query(servicesQuery, [freelancer_id], (err, servicesResults) => {
      if (err) {
        return res.status(500).send('Erro ao buscar serviços.');
      }
      res.json({ user, services: servicesResults });
    });
  });
});

router.put('/profile', auth, (req, res) => {
  const id_usuario = req.user.id_usuario;
  const { nome, email, telefone, professional_title, bio, location, website, linkedin, github, instagram } = req.body;

  const query = `
    UPDATE usuarios 
    SET 
      nome = ?, 
      email = ?, 
      telefone = ?, 
      professional_title = ?, 
      bio = ?, 
      location = ?, 
      website = ?, 
      linkedin = ?, 
      github = ?, 
      instagram = ? 
    WHERE id_usuario = ?
  `;

  const params = [nome, email, telefone, professional_title, bio, location, website, linkedin, github, instagram, id_usuario];

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar perfil.');
    }
    res.send('Perfil atualizado com sucesso!');
  });
});

router.post('/profile/photo', auth, upload.single('nova_foto'), (req, res) => {
  const id_usuario = req.user.id_usuario;
  const caminhoBanco = 'img/perfis/' + req.file.filename;

  const query = 'UPDATE usuarios SET foto_perfil = ? WHERE id_usuario = ?';
  db.query(query, [caminhoBanco, id_usuario], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar a foto de perfil.');
    }
    res.send({ message: 'Foto de perfil atualizada com sucesso!', filePath: caminhoBanco });
  });
});

router.delete('/profile', auth, (req, res) => {
  const id_usuario = req.user.id_usuario;

  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id_usuario], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao excluir a conta.');
    }
    res.send('Conta excluída com sucesso!');
  });
});

module.exports = router;
