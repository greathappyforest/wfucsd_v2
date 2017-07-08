var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var mongojs = require('mongojs');

var db = mongojs('mongodb://wf:wf123@172.104.103.251:27017/wfucsd?authSource=wfucsd');
var index = require('./routes/index');
var lotteries = require('./routes/lotteries');
var luckyNumberdb = require('./routes/luckyNumberdb');
var marketplacedb = require('./routes/marketplacedb');
var winners = require('./routes/winners');
var eventdata = require('./routes/eventdata');
var schedule = require('node-schedule');
var eventdatajson = require(path.resolve(__filename, '../eventdata.json'));
var history = require('connect-history-api-fallback');

var app = express();
app.use(history());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('dist'))
app.use(cors())

app.use('/', index);
app.use('/api/lotteries', lotteries);
app.use('/api/luckyNumberdb', luckyNumberdb);
app.use('/api/winners', winners);
app.use('/api/marketplacedb', marketplacedb);
app.use('/api/eventdata', eventdata);

 



//console.log(newluckyNumber)
// node-schedule set up a schedule for auto run something
var eventStartTime = eventdatajson.eventStartTime;
var eventEndTime = eventdatajson.eventEndTime;
//start event/ 1. update a new luckynumber 2.clean lotteries, winners
schedule.scheduleJob(eventStartTime, function() {
    console.log('Event started: ' + eventStartTime);
    db.lotteries.remove({})
    db.winners.remove({})
    newluckyNumber = Math.floor((Math.random() * 1000) + 1)
    db.luckyNumberdb.update({}, { $set: { "luckyNumber": newluckyNumber } })

});

//1. lotteries add diff save to lotteries db,
//2. calulate winner list,order by calulating lotteries diff
schedule.scheduleJob(eventEndTime, function() {
    console.log('Event passed: ' + eventEndTime);
    db.lotteries.find().sort({diff:1},function(err, lotteries){
    	 db.winners.save(lotteries, function (err, winner) {
    	//	console.log(lotteries)
	})
    })
    //eventdatajson.resetday days after eventEndTime, reset

    var resetTime =1000*60*60*24*(eventdatajson.resetday);
    //var resetTime =1000*60;
    setTimeout(function(){ 
    console.log("resetTime:" +resetTime)
    db.lotteries.remove({})
    db.winners.remove({})
    }, resetTime);
    
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
