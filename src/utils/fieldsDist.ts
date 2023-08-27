import { UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const distFile = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, './uploadedFiles/images');
      }
      if (file.originalname.match(/\.(mp3)$/)) {
        cb(null, './uploadedFiles/tracks');
      }
    },

    filename: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp3)$/)) {
        return cb(
          new UnsupportedMediaTypeException('Only image files are allowed!'),
          file.filename,
        );
      }

      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      cb(null, `${file.fieldname}-${Date.now()}-${randomName}${fileExtName}`);
    },
  }),
};

export default distFile;
