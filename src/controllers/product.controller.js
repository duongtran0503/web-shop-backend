const productService = require('../services/product.service');
class ProductController {
    //[POST]
    async createProduct(req, res) {
        try {
            const data = req.body;
            const { name, image, type, price } = data;
            const isNumeric = (value) => {
                return /^-?\d+$/.test(value);
            };
            if (!name || !image || !type || !price) {
                return res.status(400).json({
                    status: 'error',
                    message: 'invalid data',
                });
            }
            if (!isNumeric(price)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'invalid data',
                });
            }

            const response = await productService.createProduct(data);
            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [PUT] :: update info user pareme: id user
    async update(req, res) {
        try {
            const productId = req.params.id;
            const data = req.body;

            if (!data) {
                return res.status(500).json({
                    status: 'failed',
                    message: 'Internal Server Error',
                    success: false,
                    code: 500,
                });
            }
            const response = await productService.update(productId, data);
            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [POST]
    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res
                    .status(400)
                    .json({ message: 'product id is required' });
            }
            const response = await productService.deleteProduct(productId);

            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [GET]
    async getAll(req, res) {
        try {
            const limit = req.query.limit;
            const page = req.query.page;
            const sort = req.query.sort;
            const filter = req.query.filter;

            const response = await productService.getAll(
                limit,
                page,
                sort,
                filter
            );

            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
    // [GET] detail
    async getDetail(req, res) {
        try {
            const productId = req.params.id;
            if (!productId) {
                return res.status(400).json({ message: 'user id is required' });
            }
            const response = await productService.getDetail(productId);
            return res.status(response.code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 'failed',
                message: 'Internal Server Error',
                success: false,
                code: 500,
            });
        }
    }
}
module.exports = new ProductController();
