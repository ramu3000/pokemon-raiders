console.log(process.env.NODE_ENV);

if (window.location.href.includes("localhost")) {
  module.exports = require("./dev");
} else {
  module.exports = require("./prod");
}
