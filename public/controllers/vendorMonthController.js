webapp.controller('vendorMonthDetailController', ['$scope','userServices','$state','$stateParams', function($scope,userServices,$state,$stateParams) {
var vendorId = $stateParams.vendorId;

$scope.getSingleVendor = function (vendorId) {
                  userServices.getSingleVendor(vendorId).then(function (res) {
                      $scope.vendor = res.data;
                      console.log('asdasdsad',$scope.vendor);
                  });
             };


$scope.getVendorPaymentsDetails = function(vendorId){
 userServices.getSingleVendor(vendorId).then(function (res) {
                      $scope.vendor = res.data;
                      console.log('asdasdsad',$scope.vendor);
                  });

 userServices.getVendorPaymentsByVendorName(vendorId).then(function (res) {
                       $scope.vendorPayments = res.data;
                       console.log('98797979',$scope.vendorPayments);
                   });
};

$scope.getVendorPaymentsDetails(vendorId);
}]);