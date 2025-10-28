const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null },
  name: { type: String, required: true },
  type: { type: String, enum: ['file','folder'], default: 'file' },
  s3Key: { type: String },
  content: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', FileSchema);
