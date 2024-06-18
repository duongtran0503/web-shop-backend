const resultType = require('./resultType');
const Product = require('../models/ProductModel');
class ProductService {
    // [POST]
    async createProduct(data) {
        try {
            const check = await Product.findOne({ name: data.name });
            if (check) {
                return resultType.error({
                    status: 'error',
                    message: 'product is existing',
                    success: false,
                    code: 400,
                });
            }
            const create = await Product.create(data);
            if (!create) {
                return resultType.error({ message: 'create product failed' });
            }
            return resultType.success({ data: create });
        } catch (error) {
            return resultType.error();
        }
    }
    // [PUT] update product
    async update(productId, data) {
        try {
            const checkProduct = await Product.findById(productId);

            if (!checkProduct) {
                return resultType.error({ message: 'product is not exist' });
            }

            const updateProduct = await Product.findByIdAndUpdate(
                productId,
                data,
                {
                    new: true,
                }
            );
            if (!updateProduct) {
                return resultType.error({ message: 'update failed' });
            }

            return resultType.success({ data: updateProduct });
        } catch (error) {
            return resultType.error();
        }
    }
    //[POST]
    async deleteProduct(productId) {
        try {
            const checkProduct = await Product.findById(productId);
            if (!checkProduct) {
                return resultType.error({ message: 'product not existing' });
            }
            const del = await Product.findByIdAndDelete(productId);
            if (!del) {
                return resultType.error({ message: 'delete failed' });
            }
            return resultType.success({ message: 'delete success' });
        } catch (error) {
            return resultType.error();
        }
    }
    // [GET]
    async getAll(limit = 2, page = 0, sort = false, filter = false) {
        try {
            const listProduct = await Product.find()
                .limit(limit)
                .skip(page * limit);
            const totalProduct = await Product.countDocuments({});
            if (filter) {
                const label = filter[0];

                const listProduct = await Product.find({
                    [label]: { $regex: filter[1] },
                })
                    .limit(limit)
                    .skip(page * limit);

                const data = {
                    data: listProduct,
                    currentProduct: listProduct.length,
                    totalProduct: totalProduct,
                    currentPage: +page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                };
                return resultType.success({ data: data });
            }
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const listProduct = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                const data = {
                    data: listProduct,
                    currentProduct: listProduct.length,
                    totalProduct: totalProduct,
                    currentPage: +page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                };
                return resultType.success({ data: data });
            }
            const data = {
                data: listProduct,
                currentProduct: listProduct.length,
                totalProduct: totalProduct,
                currentPage: +page + 1,
                totalPage: Math.ceil(totalProduct / limit),
            };
            return resultType.success({ data: data });
        } catch (error) {
            return resultType.error();
        }
    }
    // [GET] detail user
    async getDetail(Productid) {
        try {
            const checkProduct = await Product.findById(Productid);
            if (!checkProduct) {
                return resultType.error({ message: 'product not existing' });
            }
            return resultType.success({ data: checkProduct });
        } catch (error) {
            return resultType.error();
        }
    }
}
module.exports = new ProductService();
