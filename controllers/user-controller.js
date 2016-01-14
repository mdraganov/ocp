// controllers/advert-controller.js

'use strict';
let encryption = require('../helpers/encryption');

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

module.exports = function(User, Advert) {
    let controller = {
        getRegister: function(req, res) {
            res.render('register');
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

                Advert.find()
                    .where('owner.id')
                    .equals(id)
                    .exec(function (err, ads) {
                        console.log(ads);
                        res.render('user-details', {
                            data: ads,
                            user: user
                        });
                    });
            });
        },
        postRegister: function(req, res) {
            var newUserData = req.body;
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            (new User(newUserData)).save(function(err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }
                    else {
                        res.redirect('/');
                    }
                });
            });
        },
        getLogin:function(req,res){
            res.render('login');
        },
        getProfile:function(req,res){
            res.redirect('/users/profile/' + req.user._id);
        }
    };

    return controller;
};