var express = require('express');
var Student = require('models/student');

var router = express.Router();

router.get('/students', function(req, res) {
    Student.find({}, function(err, items) {
        if (err) {
            console.log(err);
        }

        res.render('students', {
            students: items,
            navigation: {
              students: true
            }
          })
    });
})

router.post('/students', function(req, res) {
    var item = new Student(req.body);

    item.save(function(err) {
        if (err) {
            console.log(err);
        }

        console.log('Item saved to db!');
    });

    res.redirect('/students');
})

router.get('/students/:id', function(req, res) {
    Student.findById(req.params.id, function(err, item) {
        if (err) {
            console.log(err);
        }
        res.render('student', item);
    });
});

module.exports = router;
