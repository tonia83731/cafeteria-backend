const { ImgurClient } = require("imgur");
const fs = require("fs");
const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
  refreshToken: process.env.IMGUR_REFRESH_TOKEN,
});

const imgurFileHandler = async (file) => {
  if (!file) return null;

  try {
    const response = await client.upload({
      image: fs.createReadStream(file.path),
    });

    if (response && response.data.link) {
      return response.data.link;
    } else {
      throw new Error("Image upload failed, no link received.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  // localFileHandler,
  imgurFileHandler,
};
