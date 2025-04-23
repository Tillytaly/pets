const fs = require("fs");
const path = require("path");
const helperPath = path.join(__dirname, "../pets.json");

class JsonHelper {
  static readPetsFromFile(petsFilePath) {
    if (!petsFilePath) {
      console.error("No file name provided.");
      return;
    }

    if (!fs.existsSync(petsFilePath)) {
      ("error occured in not existing file");
      return [];
    }
    const data = fs.readFileSync(petsFilePath);
    return JSON.parse(data);
  }

  static writePetsToFile = (petsFilePath, pets) => {
    fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2));
  };
}

module.exports = JsonHelper;
