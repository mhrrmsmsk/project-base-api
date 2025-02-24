var express = require("express");
var router = express.Router();

// Örnek endpoint
router.get("/", (req, res) => {
    res.send("Hello from Roles!");
});

// **router'ı export etmeyi unutma**
module.exports = router;
