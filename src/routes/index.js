const userRouter = require('./user.route');
const productRouter = require('./product.route');
const router = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.get('/', (req, res) => {
        res.send('hello word');
    });
};
module.exports = router;
