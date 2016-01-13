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

    function getById(request,response){
        Category.findById(request.params.id,function(err,category){
            if(err || !category){
                response.status(404);
            }
            response.json({
                result:category
            });
        });
    }

    function post(request,response){
    var category = new Category(request.body);
        category.save(function(error){
            if(error){
                throw error;
            }
            response.status(201).json({
                result:category
            });
        });
    }

    var controller = {
        get:get,
        getById:getById,
        post:post
    }

    return controller;
}