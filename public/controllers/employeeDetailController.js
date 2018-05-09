webapp.controller('employeedetailController', ['$scope','userServices','$state', function($scope,userServices,$state) {

$scope.employeeDetails = {};
              $scope.saveEmployeeDetails=function()
                   {
                       userServices.postEmployeedetails($scope.employeeDetails)
                           .then(function (res)
                           {
                               console.log('employee detail saved successfully');
                           },
                            function error(err)
                           {
                               alert("ENTER CORRECT DETAILS")
                               console.log('employee save failed:', err);
                           });
                   };

$scope.getAllEmployeeDetails = function ()
             {
                      userServices.getAllEmployeeDetails().then(function (res)
                      {
                         $scope.employeeList = res.data;
                      });
             };

$scope.deleteEmployee = function(employeeId)
           {
               userServices.deleteEmployee(employeeId)
                   .then(function(res)
                   {
                    $scope.getAllEmployeeDetails();
                      console.log('wqeqweqweqw',res.data);
                       console.log('employee deleted.');
                   },
                   function error(err)
                   {
                      console.log('employee delete failed:', err);
                   });
           }





$scope.getAllEmployeeDetails();
}]);