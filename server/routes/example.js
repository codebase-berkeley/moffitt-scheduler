var express = require('express');
var router = express.Router();

router.get("/hi", function(req, res) {
    res.send("Hi!");
});

router.get("/age", function(req, res) {
    console.log("In /age");
    return res.json({age: 21});
});

module.exports = router;