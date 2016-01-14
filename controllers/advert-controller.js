// controllers/advert-controller.js

'use strict';

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

module.exports = function (Advert, app, Category) {
    let controller = {
        get: function (req, res) {
            let page = req.query.page || DEFAULT_PAGE;
            let size = req.query.size || DEFAULT_SIZE;

            Advert.find({})
                .skip((page - 1) * size)
                .limit(size)
                .exec(function (err, adverts) {
                    if (err) {
                        // res.redirect('error')
                        throw err;
                    }
                    Advert.count({})
                        .exec(function (err, count) {
                            res.render('adverts-all', {
                                data: adverts,
                                currentUser: req.user,
                                pages: (count / size) | 0 + 1,
                                page: page
                            });
                        });
                });
        },
        getForm: function (req, res) {
            if (app.locals.currentUser){
        		res.render('advert-add');
     		 }
      		else {
       			 res.redirect('/login');
      		}
        },
        getById: function (req, res) {
            let id = req.params.id;
            var page = req.params.page || DEFAULT_PAGE;
            var size = req.params.page || DEFAULT_SIZE;
            Advert.findById(id, function (err, advert) {
                if (err) {
                    throw err;
                }
                Advert.find({})
                    .skip((page - 1) * size)
                    .limit(size)
                    .exec(function (err, adverts) {
                        if (err) {
                            // res.redirect('error')
                            throw err;
                        }
                        Advert.count({})
                            .exec(function (err, count) {
                                res.render('adverts-all', {
                                    data: adverts,
                                    pages: (count / size) | 0 + 1,
                                    page: page
                                });
                            });
                    });
            })
        },
        post: function (req, res) {
            let reqAdvert = req.body;
            console.log(req.file);
            //validate advert

            if (!reqAdvert.image && req.file) {
                reqAdvert.image = req.file.path.substr('public'.length);
            }
            let advert = new Advert({
                name: reqAdvert.name,
                description: reqAdvert.description,
                price: +reqAdvert.price,
                image: reqAdvert.image,
                category: reqAdvert.category
            });

            Category.findOne({name: advert.category}, function (err, response) {
                response.items.push(advert);
                response.save();
            });

            advert.save(function (err) {
                if (err) {
                    throw err;
                }
                res.status(201)
                    .redirect('/adverts');
            });
        }
    };

    return controller;
};