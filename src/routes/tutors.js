var express = require('express');
var Tutors = require('models/tutors');

var router = express.Router();

router.get('/tutors', function(req, res) {
    Tutors.find({}, function(err, items) {
        if (err) {
            console.log(err);
        }

        res.render('tutors', {
            tutors: items
        })
    });
})

router.post('/tutors', function(req, res) {
    var item = new Tutors(req.body);

    item.save(function(err) {
        if (err) {
            console.log(err);
        }

        console.log('Item saved to db!');
    });

    res.redirect('/tutors');
})

router.get('/tutors/:id', function(req, res) {
    Tutors.findById(req.params.id, function(err, item) {
        res.render('tutors', item);
    });
})

module.exports = router;