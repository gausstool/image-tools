const AdmZip = require('adm-zip');
const path = require('path');
const packageFilePath = path.resolve(__dirname, '../package.json');
const distFolderPath = path.resolve(__dirname, '../dist');
const packageJSON = require(packageFilePath);
const name = packageJSON.name;
const version = packageJSON.version;

function createZipArchive(folder, filename) {
  const zip = new AdmZip();
  zip.addLocalFolder(folder);
  zip.writeZip(filename);
  console.log(`[info] created ${filename} successfully`);
}

createZipArchive(distFolderPath, `out/${name}_v${version}.zip`);
