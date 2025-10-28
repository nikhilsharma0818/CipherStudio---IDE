const express = require('express');
const router = express.Router();
const File = require('../models/File');

// Create or update file
router.post('/', async (req,res)=>{
  const { projectId, parentId, name, type, content } = req.body;
  const file = new File({ projectId, parentId, name, type, content });
  await file.save();
  res.json(file);
});

// Update content or rename
router.put('/:id', async (req,res)=>{
  const f = await File.findById(req.params.id);
  if(!f) return res.status(404).json({error:'not found'});
  Object.assign(f, req.body);
  await f.save();
  res.json(f);
});

// Get files for project
router.get('/project/:projectId', async (req,res)=>{
  const files = await File.find({ projectId: req.params.projectId });
  res.json(files);
});

// Delete
router.delete('/:id', async (req,res)=>{
  await File.findByIdAndDelete(req.params.id);
  res.json({ok:true});
});

module.exports = router;
