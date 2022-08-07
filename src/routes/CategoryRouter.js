const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const {
  validName,
} = require('../middlewares/CategoryError');
const CategoryController = require('../controllers/CategoryController');

const router = Router();

router.get('/categories', validateJWT, CategoryController.findAll);
router.post('/categories', validName, validateJWT, CategoryController.insertCategory);

module.exports = router;