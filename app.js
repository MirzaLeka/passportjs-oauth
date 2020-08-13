require('dotenv').config()
require('./config/passport-setup');
require('./db/mongoose');
const express = require('express');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.set('view engine', 'ejs');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
   res.send('hello world');
});

app.listen(3000, () => console.log('listenin on port 3000'));
