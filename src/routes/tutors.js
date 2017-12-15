var express = require('express');
var Tutor = require('models/tutor');

var router = express.Router();

router.get('/tutors', function(req, res) {
    Tutor.find({}, function(err, items) {
        if (err) {
            console.log(err);
        }

        res.render('tutors', {
            tutors: items
            //tutors: true
        })
    });
})

router.post('/tutors', function(req, res) {
    var item = new Tutor(req.body);

    item.save(function(err) {
        if (err) {
            console.log(err);
        }

        console.log('Item saved to db!');
    });

    res.redirect('/tutors');
})

router.get('/tutors/:id', function(req, res) {
    Tutor.findById(req.params.id, function(err, item) {
      if (err) {
        console.log(err)
      }
        res.render('tutors', item);
    });
})

module.exports = router;
