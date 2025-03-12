const { ImgurClient } = require("imgur");
const client = new ImgurClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});

const imgurFileHandler = async (file) => {
  if (!file) return null;

  try {
    const response = await client.upload({
      image: file.path, // Assuming 'file.path' is the URL or file path for the image
      // title: "Meme", // You can set a dynamic title if needed
      // description: "Dank Meme", // You can set a dynamic description if needed
    });

    if (response && response.link) {
      return response.link;
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
