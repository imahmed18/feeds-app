const path = require("path");

function getPath(directory) {
  return path.resolve(__dirname, directory);
}

module.exports = {
    getPath
}
