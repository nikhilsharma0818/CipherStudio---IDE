const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req,res)=>{
  try{
    const u = new User(req.body);
    await u.save();
    res.json(u);
  }catch(err){ res.status(500).json({error:err.message}) }
});

router.get('/:id', async (req,res)=>{
  const u = await User.findById(req.params.id);
  res.json(u);
});

module.exports = router;
