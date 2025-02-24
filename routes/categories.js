var express = require("express");
var router = express.Router();
const isAuthenticated = true;
router.all("*",(req,res,next)=>{
    if(isAuthenticated){
        res.json({
            success:true
        })
    }else {
        res.json({
            success:false,
            error:"Not authenticated"
        })

    }
})

// Örnek endpoint
router.get("/", (req, res) => {
    res.json({
        success:true
    });
});

// **router'ı export etmeyi unutma**
module.exports = router;
