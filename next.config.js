// must restart server whenever you make changes in next.config
module.exports = {
  distDir: 'build',
  env: {
    MONGO_SRV: process.env.MONGO_SRV,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
};
