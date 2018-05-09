webapp.controller('leaveeditController', ['$scope','userServices','$state','$stateParams', function($scope,userServices,$state,$stateParams) {
var leaveId = $stateParams.leaveId;

$scope.getSingleleave = function (leaveId) {
                  userServices.getSingleleave(leaveId).then(function (res) {
                      $scope.leave = res.data;
                      console.log('asdasdsad',$scope.leave);
                  });
             };
$scope.updateLeaveDetails = function(){
                      userServices.updateLeaveDetails($scope.leave)
                          .then(function(res){
                              $state.go('leavedetails',{leaveId:res._id});
                              console.log('leave updated.');
                          },
                          function error(err) {
                             console.log('leave update failed:', err);
                          });
                  }

$scope.getSingleleave(leaveId);
}]);