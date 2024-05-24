const express = require("express");
const generarProductosFaker = require("../utils/faker.js");
const router = express.Router();

router.get("/mockingproducts",(req,res) => {
    const mockingProducts = []

    for (let i = 0; i<100; i++){
        mockingProducts.push (generarProductosFaker())
    }

    res.json(mockingProducts);

})


module.exports = router;