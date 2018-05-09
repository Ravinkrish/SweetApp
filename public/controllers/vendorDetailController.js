webapp.controller('vendorDetailController', ['$scope','userServices','$state', function($scope,userServices,$state) {

$scope.getAllvendorDetails = function ()
             {
                      userServices.getAllVendorDetails().then(function (res)
                      {
                         $scope.vendorList = res.data;
                      });
             };


$scope.deleteVendor = function(vendorId)
           {
               userServices.deleteVendor(vendorId)
                   .then(function(res)
                   {
                    $scope.getAllvendorDetails();
                      console.log('wqeqweqweqw',res.data);
                       console.log('vendor deleted.');
                   },
                   function error(err)
                   {
                      console.log('vendor delete failed:', err);
                   });
           }





$scope.getAllvendorDetails();
}]);