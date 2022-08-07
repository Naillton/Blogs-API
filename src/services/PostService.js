const Sequelize = require('sequelize');
const { User, Category, BlogPost, PostCategory } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test'
  ? config.test : config.development,
);

const objUser = { model: User, as: 'user', attributes: { exclude: ['password'] } };
const objCategory = { model: Category, as: 'categories', through: { attributes: [] } };

const PostService = {
  async findPosts() {
    const posts = await BlogPost.findAll({
      include: [objUser, objCategory],
    });
    return posts;
  },

  async checkCategory(categoryIds) {
    const { count } = await Category.findAndCountAll({
      where: { id: categoryIds },
    });
    if (categoryIds.length !== count) {
      return false;
    }
    return true;
  },

  async insertPost(title, content, categoryIds, userId) {
    const transaction = await sequelize.transaction(async (t) => {
      const posts = await BlogPost.create(
        {
          userId, title, content,
        }, { transaction: t },
      );
      const categories = categoryIds.map((categoryId) => ({ postId: posts.id, categoryId }));
      await PostCategory.bulkCreate(categories, { transaction: t });
      return posts;
    });
    return transaction;
  },
};

module.exports = PostService;