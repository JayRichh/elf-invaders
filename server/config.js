require("dotenv").config();
module.exports = {
  MONGO_URI: process.env.VUE_APP_MONGO_URI,
  PORT: process.env.VUE_APP_PORT || 3000,
};
