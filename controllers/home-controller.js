// controllers/home-controller.js
'use strict';

module.exports = function (Advert, User) {
    let controller = {
        get: function (req, res) {
            let query = {};
            let selectedProperties = {};
            let adCount;
            let userCount;

            User.count({}, function (err, countRes) {
                userCount = countRes;
            });

            Advert.count({}, function (err, countRes) {
                adCount = countRes;
            });

            Advert.find(query, selectedProperties, {
                skip: 0, // Starting Row
                limit: 10, // Ending Row
                sort: {
                    date: -1
                }
            }, function (err, adverts) {
                res.render('home', {
                    data: adverts,
                    userCount: userCount,
                    adCount: adCount,
                    currentUser: req.user
                });
            });
        }
    };

    return controller;
};