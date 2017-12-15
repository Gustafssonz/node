var express = require('express');
var Courses = require('models/course');

var router = express.Router();

router.get('/courses', function(req, res) {
    Companies.find({}, function(err, items) {
        if (err) {
            console.log(err);
        }

        res.render('courses', {
            courses: items
        })
    });
})

router.post('/courses', function(req, res) {
    var item = new Courses(req.body);

    item.save(function(err) {
        if (err) {
            console.log(err);
        }

        console.log('Item saved to db!');
    });

    res.redirect('/courses');
})

router.get('/courses/:id', function(req, res) {
    Courses.findById(req.params.id, function(err, item) {
        res.render('courses', item);
    });
})

module.exports = router;
