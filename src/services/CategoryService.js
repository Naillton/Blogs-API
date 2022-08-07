// const Sequelize = require('sequelize');
const { Category } = require('../database/models');
// const config = require('../database/config/config');

/* const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test'
  ? config.test : config.development,
); */

const CategoryService = {
  async insertCategory(name) {
    // const t = await sequelize.transaction();
    const r = await Category.create(
      {
        name,
      },
    );

    // const transactionCorrect = r;
    return r;
  },

  async findCategories() {
    const category = await Category.findAll();
    return category;
  },
};

module.exports = CategoryService;