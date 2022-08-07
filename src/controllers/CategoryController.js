const CategoryService = require('../services/CategoryService');

const CategoryController = {
  async insertCategory(req, res) {
    const { name } = req.body;
    const category = await CategoryService.insertCategory(name);
    res.status(201).json(category);
  },

  async findAll(_req, res) {
    const category = await CategoryService.findCategories();
    res.status(200).json(category);
  },
};

module.exports = CategoryController;