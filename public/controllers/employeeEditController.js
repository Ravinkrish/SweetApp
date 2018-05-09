webapp.controller('employeeeditController', ['$scope','userServices','$state','$stateParams', function($scope,userServices,$state,$stateParams) {
var employeeId = $stateParams.employeeId;

$scope.getSingleEmployee = function (employeeId) {
                  userServices.getSingleEmployeeDetail(employeeId).then(function (res) {
                      $scope.employee = res.data;
                      console.log('asdasdsad',$scope.employee);
                  });
             };
$scope.updateEmployeeDetails = function(){
                      userServices.updateEmployeeDetails($scope.employee)
                          .then(function(res){
                              $state.go('employeedetails',{employeeId:res._id});
                              console.log('employee updated.');
                          },
                          function error(err) {
                             console.log('employee update failed:', err);
                          });
                  }



$scope.getSingleEmployee(employeeId);
}]);