import 'dotenv/config';

export const PORT = process.env.PORT || 5712;

export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const CLOUNDINARY_NAME = process.env.CLOUNDINARY_NAME;
export const CLOUNDINARY_API_KEY = process.env.CLOUNDINARY_API_KEY;
export const CLOUNDINARY_API_SECRET = process.env.CLOUNDINARY_API_SECRET;

export const IS_PUBLIC_KEY = process.env.IS_PUBLIC_KEY;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
export const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

export const URL_IMAGE_IN_CLOUD = process.env.PUBLIC_URL_IMAGE;
