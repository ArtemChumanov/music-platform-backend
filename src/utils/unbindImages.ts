import * as fs from 'fs';

async function unbindImageByAddress(imageAddress) {
  const fileExist = fs.existsSync(`./uploadedFiles/avatars/${imageAddress}`);
  if (imageAddress && fileExist) {
    fs.unlink(`./uploadedFiles/avatars/${imageAddress}`, (err) => {
      if (err) {
        throw err;
      }
    });
  }
  return;
}

export default unbindImageByAddress;
