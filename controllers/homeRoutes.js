const router = require("express").Router();
const { Movies, User, Likes } = require("../models");
const withAuth = require("../utils/auth");
const { Image } = require("image-js");
// router.get('/', async (req, res) => {
//   res.render('homepage')
// } );

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/likes", withAuth, async (req, res) => {
  try {
    let user = req.session.user_id;
    //find only likes associated with logged in user
    const likesData = await Likes.findAll({
      where: {
        //do not include "unliked"
        is_liked: 1,
        user_id: user,
      },
      include: [Movies],
    });
    const likes = likesData.map((like) => like.get({ plain: true }));
    res.render("likes", {
      likes,
      logged_in: req.session.logged_in,
      title: "likes",
      active: { likes: true },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Movies }],
    });

    const user = userData.get({ plain: true });
    // render user information in handlebar's profile tempalte
    res.render("dashboard", {
      ...user,
      logged_in: true,
      title: "dashboard",
      active: { dashboard: true },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const moviesData = await Movies.findAll({
    include: [User, Likes],
  });
  let movies = moviesData.map((movie) => movie.get({ plain: true }));

  // add new liked property to movies with proper cout
  movies.forEach((movie) => {
    movie.totalLiked = movie.likes.length;
  });

  res.render("homepage", {
    movies,
    logged_in: req.session.logged_in,
    title: "homepage",
    active: { homepage: true },
  });
});

// router.get("/", async (req, res) => {
//   const imageData = await Movies.findAll({
//     where: {
//       image_name: "",
//     },
//   });
//   const images = Image.load(imageData)
//   const imageSize = images
//     .resize({ width: 400 })
//     .grey()
//   res.render('homepage', { imageSize })
// });
// single movie route, when editing
router.get("/movie/:id", async (req, res) => {
  try {
    const movieData = await Movies.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    const movie = movieData.get({ plain: true });
    res.render("editmovie", { movie });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
