var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://wf:wf123@172.104.103.251:27017/wfucsd?authSource=wfucsd');

// Get All winners
router.get('/', function (req, res, next) {
    db.winners.find(function (err, winners) {
        if (err) {
            res.send(err);
        }
        res.json(winners);
    });
});

// Get Single winner
router.get('/:id', function (req, res, next) {
    db.winners.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, winner) {
        if (err) {
            res.send(err);
        }
        res.json(winner);
    });
});

//Save winner
router.post('/', function (req, res, next) {
    var winner = req.body;
    if (!winner.wfid ||!winner.lotteryKey|| !winner.diff) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.winners.save(winner, function (err, winner) {
            if (err) {
                res.send(err);
            }
            res.json(winner);
        });
    }
});

// Delete winner
router.delete('/:id', function (req, res, next) {
    db.winners.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, winner) {
        if (err) {
            res.send(err);
        }
        res.json(winner);
    });
});

// Update winner
router.put('/:id', function (req, res, next) {
    var winner = req.body;
    var updwinner = {};


    if (winner.wfid) {
        updwinner.wfid = winner.wfid;
    }
    if (winner.lotteryKey) {
        updwinner.lotteryKey = winner.lotteryKey;
    }
    if (winner.diff) {
        updwinner.diff = winner.diff;
    }

    if (!updwinner) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.winners.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updwinner, {}, function (err, winner) {
            if (err) {
                res.send(err);
            }
            res.json(winner);
        });
    }
});

module.exports = router;
