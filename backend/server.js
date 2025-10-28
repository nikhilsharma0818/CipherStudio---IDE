const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projects');
const fileRoutes = require('./routes/files');
const userRoutes = require('./routes/users');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cipherstudio';

mongoose.connect(MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req,res)=> res.json({ok:true, message:'CipherStudio backend'}));

app.listen(PORT, ()=> console.log('Server running on', PORT));
