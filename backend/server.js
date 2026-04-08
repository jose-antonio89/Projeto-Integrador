const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');
const usersRoutes = require('./routes/users');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running (felizmente)');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
