const faker = require("@faker-js/faker");

const generarProductosFaker = () => {
    req.logger.debug("generando productos con faker");
    return {
        producto: faker.commerce.product(),
        precio: faker.commerce.price(),
        descripcion: faker.commerce.productDescription (),
        image: faker.image.avatar()
    }
}

module.exports = generarProductosFaker;


