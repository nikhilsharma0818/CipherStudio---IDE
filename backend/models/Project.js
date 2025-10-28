const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {type:String, required:true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type:Date, default: Date.now},
  rootFileId: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
  metadata: { type: Object }
});

module.exports = mongoose.model('Project', ProjectSchema);
