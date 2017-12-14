var express = require('express');
var Companies = require('models/companies');

var router = express.Router();

router.get('/companies', function(req, res) {
    Companies.find({}, function(err, items) {
        if (err) {
            console.log(err);
        }

        res.render('companies', {
            companies: items
        })
    });
})

router.post('/companies', function(req, res) {
    var item = new Companies(req.body);

    item.save(function(err) {
        if (err) {
            console.log(err);
        }

        console.log('Item saved to db!');
    });

    res.redirect('/companies');
})

router.get('/companies/:id', function(req, res) {
    Companies.findById(req.params.id, function(err, item) {
        res.render('companies', item);
    });
})

module.exports = router;