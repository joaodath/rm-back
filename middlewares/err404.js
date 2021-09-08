const router = require("express").Router();

router.all("*", (req, res) => {
  res.status(404).send({ message: "Endpoint was not found" });
});

module.exports = router;
