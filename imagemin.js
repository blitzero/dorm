const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

imagemin(["src/static/dormSchemes/*.{jpg,png,JPG}"], "src/build/images", {
  use: [imageminWebp({ quality: 10 })]
}).then(() => {
  console.log("Images optimized");
});
