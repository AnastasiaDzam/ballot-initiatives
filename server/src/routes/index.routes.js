const router = require("express").Router();
const authRoutes = require("./auth.routes");
const formatResponse = require("../utils/formatResponse");
const initiativeRouter = require("./initiative.routes");

router
.use("/initiative", initiativeRouter)
.use("/auth", authRoutes);


router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
