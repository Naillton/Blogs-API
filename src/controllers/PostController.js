const PostService = require('../services/PostService');

const PostController = {
  async findPosts(_req, res) {
    const posts = await PostService.findPosts();
    return res.status(200).json(posts);
  },

  async insertPost(req, res) {
    try {
      const { title, content, categoryIds } = req.body;
      const check = await PostService.checkCategory(categoryIds);
      if (!check) return res.status(400).json({ message: '"categoryIds" not found' });
      const post = await PostService.insertPost(title, content, categoryIds, req.userId);
      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).json({ message: 'erro' });
    }
  },
};

module.exports = PostController;