var express = require('express');
var router = express.Router();
var cntrl = require('../controllers/cntrl.js');

router.get('/', function (req, res) {
  res.send('Hello World from root');
});

router.get('/getEvents', cntrl.getEvents);
router.get('/getVenues', cntrl.getVenues);
router.get('/getComedian', cntrl.getComedian);
router.get('/getComedians', cntrl.getComedians);
router.get('/getAllEventsForEventPage', cntrl.getAllEventsForEventPage);
router.get('/updateStatusToBooked', cntrl.updateEventStatusBooked);
router.get('/updateStatusToOpen', cntrl.updateEventStatusOpen);
router.get('/getPendingEvents', cntrl.getPendingEvents);
router.get('/getBookedEvents', cntrl.getBookedEvents);

router.post('/loginCheck', cntrl.checkLogin);
router.post('/audienceRegistration', cntrl.audienceRegistration);
router.post('/signup', cntrl.signup);
router.post('/bookcomedian', cntrl.bookcomedian);




module.exports = router;
