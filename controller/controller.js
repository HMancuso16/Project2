var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var picture = require("../models/model.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  picture.all(function(data) {
    var hbsObject = {
      picture: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/script", function(req, res) {
  picture.create([
    "name", "devour"
  ], [
    req.body.name, req.body.devour
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/script/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  picture.update({
    devour: req.body.devour
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/script/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  picture.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
