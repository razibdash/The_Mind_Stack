const { uploadMediaToCloudinary,deleteMediaFromCloudinary } = require("../../helpers/cloudinary");

const mediaUploadController = async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    res.status(500).json({ error: "Error uploading media" });
  }
};

const mediaDeleteController = async (req, res) => {
  try {
    const result = await deleteMediaFromCloudinary(req.params.id);
    res.status(200).json({ message: "Media deleted successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Error deleting media" });
  }
};
module.exports = {
  mediaUploadController,
  mediaDeleteController,
};