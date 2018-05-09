webapp.controller('employeeleaveController', ['$scope','userServices','$state','$stateParams', '$q',
    function($scope,userServices,$state,$stateParams, $q) {

var employeeId = $stateParams.employeeId;

/*$scope.getSingleEmployee = function (employeeId) {
                  userServices.getSingleEmployeeDetail(employeeId).then(function (res) {
                      $scope.employee = res.data;
                      conse.log('asdasdsad',$scope.employee);
                  });
             };*/

$scope.getLeavePaymentsByEmployeeId = function (employeeId) {
        $q.all([
            userServices.getSingleEmployee(employeeId),
            userServices.getAdvancePaymentsByEmployeeId(employeeId),
            userServices.getLeavePaymentsByEmployeeId(employeeId)
        ])
        .then(function(result){
            console.log(result);
            $scope.employee = result[0].data;
            var advancePayments = result[1].data;
            $scope.leavePayments = result[2].data;

            var monthlySalary =  $scope.employee.monthlySalary;
            var dailySalary = parseInt(monthlySalary/30);
            console.log("dailySalary", dailySalary);
            $scope.leavePayments.forEach(function(item){
                deductionUnderLeaveTaken = item.totalDays * dailySalary;
                console.log("deductionUnderLeaveTaken", deductionUnderLeaveTaken);
                var totalAdvanceObj = advancePayments.find(function(adv){
                    return item._id == adv._id;
                });
                var totalAdvancePaid = totalAdvanceObj.total;
                console.log("totalAdvancePaid", totalAdvancePaid);
                item.finalPayment = monthlySalary - deductionUnderLeaveTaken - totalAdvancePaid;
                console.log("totalAdvancePaid:", totalAdvancePaid);
            })

        })
        .catch(function(err){
            console.log("Error occured");
            console.log(err);
        });
        /*userServices.getAdvancePaymentsByEmployeeId(employeeId).then(function (res) {
                  $scope.advancePayments = res.data;
                        console.log('asdasdsad',$scope.advancePayments);
              });

      userServices.getLeavePaymentsByEmployeeId(employeeId).then(function (res) {
                $scope.leavePayments = res.data;
                      console.log('asdasdsad',$scope.leavePayments);
            });*/
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



$scope.getLeavePaymentsByEmployeeId(employeeId);
}]);
