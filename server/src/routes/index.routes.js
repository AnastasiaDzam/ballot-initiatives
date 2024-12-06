const router = require("express").Router();
const authRoutes = require("./auth.routes");
const formatResponse = require("../utils/formatResponse");
const initiativeRouter = require("./initiative.routes");
const voteRouter = require('./vote.routes')

router
.use("/initiative", initiativeRouter)
.use("/auth", authRoutes)
.use('/vote', voteRouter);
// .use("/users", usersRoutes);


router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
