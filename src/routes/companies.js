var express = require('express');
var Companies = require('models/company');

var router = express.Router();

router.get('/companies', function(req, res) {
    Companies.find({}, function(err, items) {
        if (err) {
            console.log(err);
        }

        res.render('companies', {
            companies: items,
            navigation: {
              companies: true
            }
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
      if (err) {
          console.log(err);
      }
        res.render('company', item);
    });
})

module.exports = router;
