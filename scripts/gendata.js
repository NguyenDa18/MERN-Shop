/* eslint-disable indent */
const faker = require('faker');
const fs = require('fs');

const genProduct = () => {
    const newProduct = {};
    newProduct.name = faker.commerce.productName();
    newProduct.price = faker.commerce.price();
    newProduct.sku = faker.finance.iban();
    newProduct.description = faker.lorem.sentence();
    newProduct.mediaUrl = faker.random.image();
    return newProduct;
};

const genProductsFile = () => {
    const products = [...Array(10).keys()].map((el) => genProduct());
    try {
        fs.writeFile('../_data/products.json', JSON.stringify(products, null, 4), (err) => {
            if (err) {
                console.error(err);
            }
        });
    } catch (e) {
        console.error(e);
    }
};

console.log(genProductsFile());
