var DEFAULT_PAGE = 1;
var DEFAULT_SIZE = 10;

module.exports = function(Category){

    function get(request,response){
        Category.find({},function(err,categories){
            if(err){
                throw {
                    msg : err.message
                }
            }
            response.json({
                result:categories
            });
        });
    }

   function getAll(req, res) {
        var page = req.query.page || DEFAULT_PAGE;
        var size = req.query.size || DEFAULT_SIZE;
        Category.find({})
            .skip((page - 1) * size)
            .limit(size)
            .exec(function (err, categories) {
                if (err) {
                    // res.redirect('error')
                    throw err;
                }
                Category.count({})
                    .exec(function (err, count) {
                        console.log(categories);
                        res.render('categories-list', {
                            data: categories,
                            pages: (count / size) | 0 + 1,
                            page: page
                        });
                    });
            });
    }

    function getById(req, res) {
        var id = req.params.id;
        Category.findById(id, function (err, category) {
            if (err) {
                throw err;
            }

            if (!category) {
                res.redirect('error-not-found');
                return;
            }
            console.log(category);
            res.render('category-id', {
                data: category
            });
        });
    }

    function post(request,response){
    var category = new Category(request.body);
        category.save(function(error){
            if(error){
                throw error;
            }
            response.redirect('/categories/all');
        });
    }

    function getForm(request,response){
        response.render('categories-list');
    }

    function getAddForm(request,response){
        response.render('categories-add');
    }

    var controller = {
        get:get,
        getById:getById,
        post:post,
        getForm:getForm,
        getAll:getAll,
        getAddForm:getAddForm
    }

    return controller;
}