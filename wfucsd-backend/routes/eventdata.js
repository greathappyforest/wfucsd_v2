var express = require('express');
var router = express.Router();
var path = require('path');
var eventdata= require(path.resolve(__filename,'../../eventdata.json'))
// Get All marketplacedb
router.get('/', function (req, res, next) {
    res.json(eventdata);
});

router.get('/countdown', function (req, res, next) {
    var endTime = new Date(eventdata.eventEndTime).getTime()

    var d = new Date();
    var currTime = d.getTime();

    var countdown;
    console.log( endTime-currTime)
    if(endTime-currTime>0){
        countdown = endTime-currTime;
    }
    else{
        countdown=0;
    }
     res.json({'countdown':countdown});


});




module.exports = router;
