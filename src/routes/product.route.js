const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const productController = require('../controllers/product.controller');
router.post('/create', productController.createProduct);
router.put('/update/:id', productController.update);
router.get('/get-all', productController.getAll);
router.get('/get-detail/:id', productController.getDetail);
router.post('/delete/:id', authMiddleware, productController.deleteProduct);
router.get('/', (req, res) => {
    res.send('product route');
});
module.exports = router;
