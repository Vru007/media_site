const express = require('express');
const router = express.Router();
const cloudinary=require('../utils/cloudinaryConfig');
const upload=require('../utils/multerConfig')
const Media=require('../models/media');


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, 
      async (error, cloudinaryResult) => {
        if (error) return res.status(500).json({ message: 'Upload error', error });

        const media = new Media({
          fileName: file.originalname,
          fileUrl: cloudinaryResult.secure_url,
          public_id: cloudinaryResult.public_id,
          fileType: cloudinaryResult.resource_type,
        });

        await media.save();
        res.status(201).json(media);
      }
    ).end(file.buffer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// to fetch all the medias
router.get('/all', async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// fecth the media as per userId
router.get('/user/:userId', async (req, res) => {
  try {
    const media = await Media.find({ uploadedBy: req.params.userId });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Delete media
router.post('/delete/:id', async (req, res) => {
    try {
      const mediaId=req.params.id
      if (!mediaId) return res.status(400).json({ message: 'Media ID is required' });
  
      const media = await Media.findById(mediaId);
      if (!media) return res.status(404).json({ message: 'Media not found' });
  
      await cloudinary.uploader.destroy(media.public_id, { resource_type: media.fileType });
      await media.deleteOne();
  
      res.json({ message: 'File deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
module.exports = router;
