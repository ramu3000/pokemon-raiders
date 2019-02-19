if (window.location.href.includes("localhost")) {
  try {
    module.exports = require("./dev");
  } catch (e) {
    console.error(e);
  }
} else {
  module.exports = require("./prod");
}
