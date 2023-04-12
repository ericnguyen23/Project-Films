const router = require("express").Router();
const { Movies, User, Likes } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Movies.findAll({ include: [User], include: [Likes] })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  Movies.findOne({
    where: {
      id: req.params.id,
    },
    include: [User],
  })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.log(err);
    });
});

// create new movie with Auth
router.post("/", withAuth, async (req, res) => {
  try {
    const newMovie = await Movies.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMovie);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a movie
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movies.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  Movies.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
