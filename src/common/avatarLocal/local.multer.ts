import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';

export const multerDiskConfig = {
  storage: diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
};
