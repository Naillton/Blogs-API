const Sequelize = require('sequelize');
const { User } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test'
  ? config.test : config.development,
);

const blogService = {
  async login(email, password) {
    const user = await User.findOne(
      { where: {
          email,
          password,
        },
      },
    );
    return user;
  },

  async insertUser(displayName, email, password, image) {
    const t = await sequelize.transaction();
    await User.create(
      {
        displayName,
        email,
        password,
        image,
      },
      { transaction: t },
    );

    const transactionCorrect = await t.commit();
    return transactionCorrect;
  },

  async exist({ email }) {
    const user = await User.findOne({ where: { email } });
    return user;
  },

  async findUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  async findUserById(id) {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return user;
  },
};

module.exports = blogService;