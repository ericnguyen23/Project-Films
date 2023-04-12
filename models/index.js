const User = require("./User");
const Movies = require("./Movies");
const Likes = require("./Likes");

//movies belongsTo user
User.hasMany(Movies, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//likes belongsTo movies
Movies.belongsTo(User, {
  foreignKey: "user_id",
});

// User.hasMany(Movies, {
//   through: Likes,
//   foreignKey: "user_id",
// })

Movies.belongsToMany(User, {
  through: Likes,
  foreignKey: "movie_id",
});

// Movies.hasMany(Likes, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
//   });

Movies.hasMany(Likes, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
});

User.hasMany(Likes, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Likes.belongsTo(User, {
  foreignKey: "user_id",
});

Likes.belongsTo(Movies, {
  foreignKey: "movie_id",
});

module.exports = { User, Movies, Likes };
