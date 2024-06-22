const ProductModel = require("../models/product.model.js");

class ProductRepository {
    async agregarProducto({ title, description, price, img, code, stock, category, thumbnails }) {
        try {
            if (!title || !description || !price || !code || !stock || !category) {
                req.logger.warn ("todos los campos son obligatorios");;
                return;
            }

            const existeProducto = await ProductModel.findOne({ code: code });

            if (existeProducto) {
                req.logger.warn ("codigo repetido");;
                return;
            }

            console.log("Owner", owner);

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || [],
                owner
            });

            await newProduct.save();

            return newProduct;

        } catch (error) {
            throw new Error("Error");
        }
    }

    async obtenerProductos(limit = 10, page = 1, sort, query) {
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);
            
            const totalPages = Math.ceil(totalProducts / limit);
            
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            throw new Error("Error");
        }
    }

    async obtenerProductoPorId(id) {
        try {
            const producto = await ProductModel.findById(id);

            if (!producto) {
                req.logger.debug("prodcuto no encontrado");
                return null;
            }

            req.logger.debug ("producto encontrado");
            return producto;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async actualizarProducto(id, productoActualizado) {
        try {
            const actualizado = await ProductModel.findByIdAndUpdate(id, productoActualizado);
            if (!actualizado) {
                req.logger.debug ("no se encuentra el producto");
                return null;
            }

            req.logger.debug ("producto actualizado con exito");
            return actualizado;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async eliminarProducto(id) {
        try {
            const deleteado = await ProductModel.findByIdAndDelete(id);

            if (!deleteado) {
                req.logger.debug ("producto no se encuentra");;
                return null;
            }

            req.logger.debug ("producto eliminado exitosamente");
            return deleteado;
        } catch (error) {
            throw new Error("Error");
        }
    }
}

module.exports = ProductRepository;