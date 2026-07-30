// @desc    Upload image file to Cloudinary
// @route   POST /api/upload
// @access  Private
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload an image file" });
    }

    res.json({
      success: true,
      url: req.file.path,
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadImage };
