webapp.controller('advanceController', ['$scope','userServices','$state','$stateParams', function($scope,userServices,$state,$stateParams) {
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

$scope.advance = {};
$scope.saveAdvanceDetails=function() {
    $scope.advance.employeeId = $scope.employee.employeeId;
    $scope.advance.employeeName = $scope.employee.name;
    $scope.advance.monthlySalary = $scope.employee.monthlySalary;
    userServices.postAdvancedetails($scope.advance)
        .then(function (res)
        {
           $state.go('employeedetails');
           console.log('advance detail saved successfully');
        },
        function error(err)
        {
           alert("ENTER CORRECT DETAILS")
           console.log('advance save failed:', err);
        }
    );
};




$scope.getSingleEmployee(employeeId);
}]);