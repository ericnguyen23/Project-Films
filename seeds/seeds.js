const sequelize = require("../config/connection");
const { User, Movies, Likes } = require("../models");

const userData = require("./userData.json");
const moviesData = require("./moviesData.json");
const likesData = require("./likesData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const movie of moviesData) {
    await Movies.create({
      ...movie,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // seed likes table w/ random movie_id
  for (const like of likesData) {
    await Likes.create({
      ...like,
      // movie_id: Math.floor(Math.random() * 3),
    });
  }

  process.exit(0);
};

seedDatabase();
