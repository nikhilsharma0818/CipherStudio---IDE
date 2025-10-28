const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create project
router.post('/', async (req,res)=>{
  try{
    const p = new Project(req.body);
    await p.save();
    res.json(p);
  }catch(err){ res.status(500).json({error:err.message}) }
});

// Get projects by owner
router.get('/user/:userId', async (req,res)=>{
  const projects = await Project.find({ owner: req.params.userId });
  res.json(projects);
});

// Get project by id
router.get('/:id', async (req,res)=>{
  const p = await Project.findById(req.params.id);
  res.json(p);
});

// Delete
router.delete('/:id', async (req,res)=>{
  await Project.findByIdAndDelete(req.params.id);
  res.json({ok:true});
});

module.exports = router;
