const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {
    authMiddleware,
    authUserMiddleware,
} = require('../middleware/authMiddleware');
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.put('/update-info/:id', userController.update);
router.post('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/get-all', authMiddleware, userController.getAll);
router.get('/get-detail/:id', authUserMiddleware, userController.getDetail);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);
router.get('/', (req, res) => {
    res.send('user route');
});
module.exports = router;
