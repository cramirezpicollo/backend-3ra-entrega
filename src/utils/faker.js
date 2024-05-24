const faker = require("@faker-js/faker");

const generarProductosFaker = () => {
    console.log ("generando producto con faker");
    return {
        producto: faker.commerce.product(),
        precio: faker.commerce.price(),
        descripcion: faker.commerce.productDescription (),
        image: faker.image.avatar()
    }
}

module.exports = generarProductosFaker;


