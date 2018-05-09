webapp.controller("productCtrl",function($scope,productService){
$scope.getAllProductDetails = function ()
             {
                      productService.getAllProductSettings().then(function (res)
                      {
                         $scope.productList = res.data;
                      });
             };

$scope.deleteProduct = function(productId)
           {
               productService.deleteProduct(productId)
                   .then(function(res)
                   {
                    $scope.getAllProductDetails();
                      console.log('wqeqweqweqw',res.data);
                       console.log('receipt deleted.');
                   },
                   function error(err)
                   {
                      console.log('receipt delete failed:', err);
                   });
           }

$scope.productDetails = {};
              $scope.saveProductDetails=function()
                   {
//                       $scope.productDetails.docUpload=receiptServices.getSettingLogoImage();
                       productService.postProductSettings($scope.productDetails)
                           .then(function (res)
                           {
                               $scope.getAllProductDetails();
                               console.log('product detail saved successfully');
                           },
                            function error(err)
                           {
                               alert("ENTER CORRECT DETAILS")
                               console.log('product save failed:', err);
                           });
                   };

$scope.uploadfile=function(fliedata)
{

//console.log(fliedata);
$scope.imagedata=fliedata.base64;
receiptServices.setSettingLogoImage($scope.imagedata);

//console.log($scope.imagedata);
}

$scope.getSingleProduct = function (productId) {
                  productService.getSingleProduct(productId).then(function (res) {
                      $scope.product = res.data;
                      console.log('asdasdsad',$scope.product);
                  });
             };

$scope.updateProduct = function(){
                      productService.updateProduct($scope.product)
                          .then(function(res){
                      $scope.getAllProductDetails();
                              console.log('product updated.');
                          },
                          function error(err) {
                             console.log('product update failed:', err);
                          });
                  }


$scope.getAllProductDetails();
});