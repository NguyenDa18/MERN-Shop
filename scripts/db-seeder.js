/* eslint-disable indent */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config({ path: '../.env.local' });

// Connect to DB
mongoose.connect('mongodb+srv://shopuser:PexjIg691BxA97RA@mern-shop-api-qgf5p.mongodb.net/shop-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const users = JSON.parse(fs.readFileSync(`${__dirname}/../_data/users.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/../_data/products.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await User.create(users);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await User.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};


if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
