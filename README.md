## MERN Shop

## Initial Steps
- Run `npm i` or `yarn` to install dependencies
- Add variables to next.config.js (create new one based on next.config_default.js)
    - Create Cloudinary account and use Upload api endpoint: `https://api.cloudinary.com/v1_1/<cloud name>/image,raw,auto/upload`
    - Add MongoDB Cloud Atlas connection string
- Run `npm run dev`

## Details
- Users sign up/login and are given a JWT token that is stored in their cookies
- Token checked for specific role privileges

### Given Roles
- User : given cart and checkout products
- Admin : user privileges + modify products
- Root : all admin privileges + power to choose admins

## Technologies
- NEXT.js
- React
- Mongoose ORM
- Cloudinary API
- Stripe API