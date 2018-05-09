webapp.controller('leavedetailController', ['$scope','userServices','$state', function($scope,userServices,$state) {

$scope.getAllLeaveDetails = function ()
             {
                      userServices.getAllLeaveDetails().then(function (res)
                      {
                         $scope.leaveList = res.data;
                      });
             };


$scope.deleteLeave = function(leaveId)
           {
               userServices.deleteLeave(leaveId)
                   .then(function(res)
                   {
                    $scope.getAllLeaveDetails();
                      console.log('wqeqweqweqw',res.data);
                       console.log('leave details deleted.');
                   },
                   function error(err)
                   {
                      console.log('leave delete failed:', err);
                   });
           }





$scope.getAllLeaveDetails();
}]);