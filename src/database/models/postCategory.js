module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
  {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  },
  { 
    tableName: 'PostCategories',
    timestamps: false
  },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,{
      foreignKey: 'categoryId',
      through: PostCategory,
      as: 'categories'
    });
    models.Category.belongsToMany(models.BlogPost,{
      foreignKey: 'postId',
      through: PostCategory,
      as: 'blogPost'
    });
  };
  return PostCategory;
}