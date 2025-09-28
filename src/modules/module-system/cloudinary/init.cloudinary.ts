import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUNDINARY_API_KEY,
  CLOUNDINARY_API_SECRET,
  CLOUNDINARY_NAME,
} from 'src/common/constant/app.constant';
cloudinary.config({
  cloud_name: CLOUNDINARY_NAME,
  api_key: CLOUNDINARY_API_KEY,
  api_secret: CLOUNDINARY_API_SECRET,
});

export default cloudinary;
