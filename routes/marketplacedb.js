var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://wf:wf123@172.104.103.251:27017/wfucsd?authSource=wfucsd');

// Get All marketplacedb
router.get('/', function (req, res, next) {
    db.marketplacedb.find(function (err, marketplacedb) {
        if (err) {
            res.send(err);
        }
        res.json(marketplacedb);
    });
});

// Get Single item
router.get('/:id', function (req, res, next) {
    db.marketplacedb.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, item) {
        if (err) {
            res.send(err);
        }
        res.json(item);
    });
});

//Save item
router.post('/', function (req, res, next) {
    var item = req.body;
    if (item.itemName&& item.itemPrice && (item.wfid || item.contact)) {
        if(!item.NumberOfItem){
             item.NumberOfItem = '1'
          }
         db.marketplacedb.save(item, function (err, item) {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    } else {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
 
    }
});

// Delete item
router.delete('/:id', function (req, res, next) {
    db.marketplacedb.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, item) {
        if (err) {
            res.send(err);
        }
        res.json(item);
    });
});

// Update item
router.put('/:id', function (req, res, next) {
    var item = req.body;
    var upditem = {};

    if (item.itemName) {
        upditem.itemName = item.itemName;
    }    
    if (item.itemPrice ) {
        upditem.itemPrice  = item.itemPrice ;
    }    
    if (item.NumberOfItem ) {
        upditem.NumberOfItem  = item.NumberOfItem ;
    }
    if (item.wfid  ) {
        upditem.wfid   = item.wfid  ;
    }
    if (item.contact ) {
        upditem.contact  = item.contact ;
    }

    if (!upditem) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.marketplacedb.update({
            _id: mongojs.ObjectId(req.params.id)
        }, upditem, {}, function (err, item) {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    }
});

module.exports = router;
