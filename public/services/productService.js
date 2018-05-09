webapp.factory("productService", function ($http) {

       var postProductSettings = function (data) {
           return $http.post('/productDetails', data);
       }
       var deleteProduct = function (productId) {
           return $http.delete('/ProductBymongoId/' + productId);
       }
       var getAllProductSettings = function () {
           return $http.get('/allProductDetails');
       }
       var getSingleProduct = function (productId) {
           return $http.get('/ProductBymongoId/' + productId);
       }
       var updateProduct = function (editdata) {
           return $http.post('/editProductBymongoId', editdata);
       }


return {
        postProductSettings: postProductSettings,
        deleteProduct: deleteProduct,
        getAllProductSettings: getAllProductSettings,
        getSingleProduct: getSingleProduct,
        updateProduct: updateProduct
        }


})