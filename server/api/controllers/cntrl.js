var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../../../database/index.js');


// db.connect();
var TWILIO_KEY = process.env.TWILIO_ID || require('./config.js').TWILIO_ID;
var TWILIO_API_KEY = process.env.TWILIO_API_KEY || require('./config').TWILIO_API_KEY;
var STRIPE_KEY = process.env.TWILIO_KEY || require('./config').STRIPE_ID;
var client = require('twilio')(TWILIO_KEY, TWILIO_API_KEY);
var stripe = require('stripe')(STRIPE_KEY);


module.exports.getEvents = function(req, res) {
  var queryString = `SELECT events.name FROM events, comedians WHERE (comedians.email = '${req.query.email}'
    and events.id_comedians = comedians.id and events.status = 'open')`
  db.query(queryString, function (err, result){
    res.json(result);
  })
};

module.exports.getPendingEvents = function(req, res) {
  var queryString = `SELECT * FROM events WHERE (id_comedians = ${req.query.id} AND events.status = 'pending')`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.getBookedEvents = function(req, res) {
  var queryString = `SELECT * FROM events WHERE (id_comedians = ${req.query.id} AND events.status = 'booked')`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.getOpenEvents = function(req, res) {
  var queryString = `SELECT * FROM events WHERE (status = 'open')`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.updateEventStatusBooked = function(req, res) {
  var queryString = `UPDATE events SET status = 'booked' WHERE id = ${req.query.id};`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
}

module.exports.updateEventStatusOpen = function(req, res) {
  var queryString = `UPDATE events SET status = 'open' WHERE id = ${req.query.id};`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.getVenues = function(req, res) {
  var queryString = 'SELECT * FROM venues';
  db.query(queryString, function (err, result){
    res.json(result);
  })
};

module.exports.getComedians = function(req, res) {
  var queryString = `SELECT * FROM comedians`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.getComedian = function(req, res) {
  var queryString = `SELECT username FROM comedians where
  (username = ${req.body.username});`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.getAllEventsForEventPage = function(req, res) {
  var queryString = `SELECT * FROM events WHERE status = 'booked'`;
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.audienceRegistration = function(req, res) {
  let registree = req.body;
  var queryString = `INSERT INTO audience (name, email, phone, id_events) VALUES ('${registree.name}', '${registree.email}', '${registree.phone}', ${registree.id_events})`;
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};

module.exports.getAudienceCount = function(req, res) {
  var queryString = `SELECT * FROM audience WHERE id_events = ${req.query.id}`;
  db.query(queryString, function(err, result) {
    res.json(result);
  })

};

module.exports.signup = function(req, res) {
  var ob = req.body;
  var queryString = `SELECT * FROM comedians where
  (email = '${req.body.email}');`;
  db.query(queryString, function(err, result) {
    console.log('search performed');
    if (result.length > 0) {
      res.json(null);
    } else {
      var queryString = `INSERT INTO comedians
        (name, email, password, website, phone, twitter, photo_url, bio, salt, video_url) VALUES
        ('${ob.name}', '${ob.email}', '${ob.password}', '${ob.website}', '${ob.phone}',
        '${ob.twitter}', '${ob.photo_url}', '${ob.bio}', '${ob.salt}', '${ob.video_url}')`;
      db.query(queryString, function(err, result) {
        console.log('comedian info inserted into comedians table');
        res.json({
          email: ob.email,
          name: ob.name
        })
      })
    }
  })
};

module.exports.updateComedian = (req, res) => {
  let queryString = `SELECT * FROM comedians WHERE email = '${req.body.email}';`;
  db.query(queryString, (error, result) => {
    if (result.length > 0 && result[0].id !== +req.body.id) {
      res.json(null);
    } else {
      queryString = `
        UPDATE comedians
        SET
          name = '${req.body.name}',
          email = '${req.body.email}',
          password = '${req.body.password}',
          salt = '${req.body.salt}',
          website = '${req.body.website}',
          bio = '${req.body.bio}',
          twitter = '${req.body.twitter}',
          photo_url = '${req.body.photo_url}',
          video_url = '${req.body.video_url}',
          phone = '${req.body.phone}'
        WHERE id = ${req.body.id};`;
      db.query(queryString, (error, result) => {
        res.json(result);
      })
    }
  })
}

module.exports.deleteComedian = (req, res) => {
  let queryString = `DELETE FROM comedians WHERE id = ${req.body.id};`;
  db.query(queryString, (error, result) => {
    if (error) console.log('delete comedian error:', error);
    res.json(result);
  })
}

module.exports.bookcomedian = function(req, res) {
  console.log(req.body)
  var hostparams = [];
  for (var key in req.body.host){
    hostparams.push(req.body.host[key])
  }

  var queryString = 'INSERT INTO hosts (name, email, phone) VALUE (?,?,?)'
  db.query(queryString, hostparams, function(err, result) {
    if (err){
      console.log(err)
    } else {
      var queryString = `SELECT id FROM hosts ORDER BY id DESC LIMIT 1`
         db.query(queryString, function(err, result) {
          if (err) {
            console.log(err)
          } else {
            var idHost = (result[0].id);
            //add id of hosts to id_hosts of venues;
            var venueparams = [];
            for (var key in req.body.venue){
              venueparams.push(req.body.venue[key])
            }
            venueparams.push(idHost);
            var queryString = `INSERT INTO venues (address, zipcode, photo_url, capacity, id_hosts) VALUE (?, ?, ?, ?, ?)`
            db.query(queryString, venueparams, function(err, result) {
              if (err){
                console.log(err)
              } else {
                var queryString = `SELECT id FROM venues ORDER BY id DESC LIMIT 1`
                db.query(queryString, function(err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    var idVen = (result[0].id);
                    //add id venues to id_venues of events
                    var eventparams = [];
                    for (var key in req.body.event){
                      eventparams.push(req.body.event[key])
                    }
                    eventparams[6] = ++eventparams[6];
                    eventparams.push(idVen);

                    var queryString = 'INSERT INTO events (date, name, description, photo_url, start_time, end_time, id_comedians, status, id_venues) VALUE (?,?,?,?,?,?,?,?,?)'
                    db.query(queryString, eventparams, function(err, result) {
                      if (err){
                        console.log(err)
                      } else {
                        res.json(result);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
};

module.exports.checkLogin = function(req, res) {
  var info = req.body;
  var email = req.body.email;
  var password = req.body.password;
  var queryString = `SELECT * FROM comedians where
  (email = '${req.body.email}');`
  db.query(queryString, function(err, result) {
    res.json(result)
  })
};

module.exports.getSpecificVenue = function(req, res) {
  console.log(req.query.id);
  var venueId = req.query.id
  var queryString = `SELECT * FROM venues where
  (id = ${venueId});`
  db.query(queryString, function(err, result) {
    res.json(result);
  })
};
module.exports.messageSave = function(req,res) {
  var inputArray = [];
  inputArray.push(req.body.name);
  inputArray.push(req.body.text);
  console.log(inputArray);
  var saveString = `INSERT INTO Messageboard (name, text) VALUES (?,?);`;
  db.query(saveString, inputArray, function(err, result) {
    if (err) {
      console.log(err);
    }
      res.json(result);
  })
};

module.exports.returnAllMessages = function(req, res) {
  var returnString = 'SELECT * FROM Messageboard;'
  db.query(returnString, function(err, result) {
    res.json(result);
  })
};

module.exports.changeEvent = function(req,res) {
  console.log('in change',req.body);
  var updateString0 = `UPDATE events SET status = 'booked' WHERE id = ${req.body.key};`
  var updateString1 = `UPDATE events SET id_comedians = ${req.body.id+1} WHERE id = ${req.body.key};`
  db.query(updateString0, function(err, result) {
    if (err) {
      console.log(err);
    } else {

      db.query(updateString1, function(err,result) {
        if (err) {
          console.log(err);
        } else {
          var queryString2 = `SELECT * FROM events WHERE status = 'open'`;
          db.query(queryString2, function(err, result) {
            res.json(result);
          })
        }
      })
    }
  })
}

module.exports.AcceptedEvent = function(req,res) {
  console.log('here',req.body);
  var firstString = `SELECT * FROM events WHERE id = ${req.body.accept.id_venues}`;
  var queryArray = [];
  var eventName = '';

  db.query(firstString, function(err,result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result[0].name);
      eventName = result[0].name;
      console.log('one',result[0].id_venues)
      var secondString = `SELECT * FROM venues WHERE id = ${result[0].id_venues}`;
      db.query(secondString, function(err,result) {
        if (err) {
          console.log('1',err);
        } else {
            var thirdString = `SELECT * FROM hosts WHERE id = ${result[0].id_hosts}`;
            db.query(thirdString, function(err,result) {
              if(err) {
              console.log('2',err);
              } else {
                console.log('data', result);
              queryArray = result;

              stripe.customers.create({
                email: result[0].email
              })
              .then(function(customer){
                return stripe.customers.createSource(customer.id, {
                  source: {
                    object: 'card',
                    exp_month: 10,
                    exp_year: 2018,
                    number: '4242 4242 4242 4242',
                    cvc: 100
                  }
                })
              })
              .then(function(customer) {

                return stripe.charges.create({
                  description: "Your Event " + eventName + " has been confirmed!",
                  customer: customer.customer,
                  receipt_email: result[0].email,
                  amount: 10000000,
                  currency: "usd"
                })
              .then(function(charge) {
                  console.log('charge', queryArray);
                  var numberString = queryArray[0].phone.toString();
                  queryArray = [];
                  console.log(numberString);
                  client.messages.create({
                      to: '+1' + numberString,
                      from: '+1' + '9712394293',
                      body:'CONGRATS YOUR EVENT' + eventName +'HAS BEEN CONFIRMED!!!'
                      }, function(error, message) {

                            if (!error) {
                              console.log('Success! The SID for this SMS message is:');
                              console.log(message.sid);
                              console.log('Message sent on:');
                              console.log(message.dateCreated);
                            } else {
                              console.log('Oops! There was an error.',error);
                              }
                              res.end();
                            });
                })
              })
            }
          })
        }
      })
    }
  })

}
