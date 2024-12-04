const router = require("express").Router();
const InitiativeRouter = require("./initiative.route");
const formatResponse = require("../utils/formatResponse");

router.use("/initiative", InitiativeRouter);

router.use("*", (req, res) => {
  res.status(404).json(formatResponse(404, "Not found"));
});

module.exports = router;
