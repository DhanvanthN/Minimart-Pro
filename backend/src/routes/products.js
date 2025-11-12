const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { verifyAccessToken, requireAdmin } = require('../middlewares/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', verifyAccessToken, requireAdmin, ctrl.create);
router.put('/:id', verifyAccessToken, requireAdmin, ctrl.update);
router.delete('/:id', verifyAccessToken, requireAdmin, ctrl.remove);

module.exports = router;
