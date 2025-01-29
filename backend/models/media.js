const mongoose = require('mongoose');
const mediaSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Cloudinary URL
  public_id: { type: String, required: true }, // Cloudinary public_id for deletion
  fileType: { type: String, required: true }, // image/jpeg, video/mp4, etc.
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Link to User
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', mediaSchema);
