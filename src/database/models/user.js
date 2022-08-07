module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    },
    {
      timestamps: false,
      tableName: 'Users',
    });

    User.associate = (models) => {
      User.hasMany(models.BlogPost,
        { foreignKey: 'userId', as: 'user' });
    };

  return User;
}