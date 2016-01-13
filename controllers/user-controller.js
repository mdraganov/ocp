// controllers/advert-controller.js

'use strict';

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

module.exports = function(User) {
    let controller = {
        getForm: function(req, res) {
            //check if user is authenticated
            res.render('advert-add');
            //else
            //res.redirect('login');
        },
        getById: function(req, res) {
            let id = req.params.id;
            User.findById(id, function(err, user) {
                if (err) {
                    throw err;
                }

                if (!user) {
                    res.redirect('error-not-found');
                    return;
                }

                res.render('user-details', {
                    data: user
                });
            });
        },
        post: function(req, res) {
            let reqUser = req.body;
            console.log(req.file);
            //validate advert

            let user = new User({
                name: reqUser.name
            });

            user.save(function(err) {
                if (err) {
                    throw err;
                }

                res.status(201)
                    .redirect('/users/' + user._id);
            });
        }
    };

    return controller;
};