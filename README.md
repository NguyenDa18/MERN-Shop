## MERN Shop
### Based on MERN Stack - The Complete Guide course by Reed Barger

[![Netlify Status](https://api.netlify.com/api/v1/badges/2f5b650a-c423-43b0-994d-4d930ca83c6d/deploy-status)](https://app.netlify.com/sites/mern-shop/deploys)

## Initial Steps
- Run `npm i` or `yarn` to install dependencies
- Add variables to next.config.js (create new one based on next.config_default.js)
    - Create Cloudinary account and use Upload api endpoint: `https://api.cloudinary.com/v1_1/<cloud name>/image,raw,auto/upload`
    - Add MongoDB Cloud Atlas connection string
- Run `npm run dev`

## Run E2E Tests
- Run `npm run cypress` to start Cypress UI and view user story tests

## Details
- Users sign up/login and are given a JWT token that is stored in their cookies
- Token checked for specific role privileges
- A quantity of items can be selected and added to cart
- Checkout done with Stripe API, orders stored in MongoDB
- Users can view their past order details in Account page

### Given Roles
- User : given cart and checkout products
- Admin : user privileges + modify products
- Root : all admin privileges + power to choose admins (Have access to AccountPermissions)

## Technologies
- NEXT.js
- React
- MongoDB & Mongoose ORM
- Cloudinary API
- Stripe API