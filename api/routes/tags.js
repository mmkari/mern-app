const express = require("express");
const router = express.Router();

const tagsController = require("../controllers/tags");

router.route("/").get(tagsController.find).post(tagsController.create);

router
  .route("/:id")
  .get(tagsController.findById)
  .patch(tagsController.create)
  .delete(tagsController.remove);

module.exports = router;
