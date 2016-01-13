// controllers/home-controller.js

'use strict';

module.exports = function(Advert) {
  let controller = {
    get: function(req, res) {

      let query = {};
      let selectedProperties = {};

      Advert.find(query, selectedProperties, {
        skip: 0, // Starting Row
        limit: 10, // Ending Row
        sort: {
          date: -1
        }
      }, function(err, adverts) {
        res.render('adverts-all', {
          data: adverts
        });
      });
    }
  };

  return controller;
};