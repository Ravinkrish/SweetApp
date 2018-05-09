webapp.controller('leaveController', ['$scope','userServices','$state','$stateParams', function($scope,userServices,$state,$stateParams) {

var employeeId = $stateParams.employeeId;

$scope.getSingleEmployee = function (employeeId) {
                  userServices.getSingleEmployeeDetail(employeeId).then(function (res) {
                      $scope.employee = res.data;
                      console.log('asdasdsad',$scope.employee);
                  });
             };


$scope.leaves = {};
              $scope.saveLeaveDetails=function()
                   {
                       $scope.leaves.employeeId = $scope.employee.employeeId;
                       $scope.leaves.employeeName = $scope.employee.name;
                       userServices.postLeaveDetails($scope.leaves)
                           .then(function (res)
                           {
                               $state.go('employeedetails');
                               console.log('leave detail saved successfully');
                           },
                            function error(err)
                           {
                               alert("ENTER CORRECT DETAILS")
                               console.log('leave save failed:', err);
                           });
                   };

$scope.getAllLeaveDetails = function ()
             {
                      userServices.getAllLeaveDetails().then(function (res)
                      {
                         $scope.leaveList = res.data;
                      });
             };



$scope.getSingleEmployee(employeeId);
}]);