const router = require("express").Router();
const moviesRoutes = require("./moviesRoutes");
const signUpRoutes = require("./signUpRoutes");
const userRoutes = require("./userRoutes");
const likesRoutes = require("./likesRoutes");

router.use("/user", userRoutes);
router.use("/movies", moviesRoutes);
router.use("/signup", signUpRoutes);
router.use("/likes", likesRoutes);

module.exports = router;
