webapp.controller('vendorController', ['$scope','userServices','$state', function($scope,userServices,$state) {

$scope.names = ["KG", "ML", "L","G"];

$scope.vendorDetails = {};
              $scope.saveVendorDetails=function()
                   {

                       $scope.vendorDetails.dateInMillisecond= $scope.vendorDetails.dateOfPurchase.getTime()
                       console.log($scope.vendorDetails)
                       userServices.postVendordetails($scope.vendorDetails)
                           .then(function (res)
                           {
                               $state.go('vendorDetails');
                               console.log('vendor detail saved successfully');
                           },
                            function error(err)
                           {
                               alert("ENTER CORRECT DETAILS")
                               console.log('vendor save failed:', err);
                           });
                   };

$scope.getAllvendorDetails = function ()
             {
                      userServices.getAllVendorDetails().then(function (res)
                      {
                         $scope.employeeList = res.data;
                      });
             };




}]);