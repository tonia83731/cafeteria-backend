const imgur = require("imgur");

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
// console.log(IMGUR_CLIENT_ID);
imgur.setClientId(IMGUR_CLIENT_ID);

// const imgurFileHandler = (file) => {
//   return new Promise((resolve, reject) => {
//     if (!file) return resolve(null);
//     return imgur
//       .uploadFile(file.path)
//       .then((img) => {
//         resolve(img?.link || null); // 檢查 img 是否存在
//       })
//       .catch((err) => reject(err));
//   });
// };

const imgurFileHandler = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);

    imgur
      .uploadFile(file.path)
      .then((img) => {
        if (img && img.link) {
          resolve(img.link);
        } else {
          reject(new Error("Image upload failed, no link received."));
        }
      })
      .catch((err) => {
        console.error("Imgur upload failed:", err);
        reject(err);
      });
  });
};

module.exports = {
  // localFileHandler,
  imgurFileHandler,
};
