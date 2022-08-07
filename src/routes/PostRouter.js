const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const {
  validatePost,
} = require('../middlewares/PostError');
const PostController = require('../controllers/PostController');

const router = Router();

router.get('/post', validateJWT, PostController.findPosts);
router.post('/post', validateJWT, validatePost, PostController.insertPost);

module.exports = router;