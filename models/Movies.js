const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Movies extends Model {}

Movies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movie_description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    image_name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    likes_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "likes",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "movies",
  }
);

module.exports = Movies;
