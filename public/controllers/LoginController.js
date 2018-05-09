webapp.controller('loginController', ['$scope','userServices','$state', function($scope,userServices,$state) {

$scope.login = {};
    $scope.LoginDetails=function()
         {
         if($scope.login.userName && $scope.login.password){
         console.log($scope.login);
          userServices.postAllLoginDetails($scope.login)
                          .then(function (res)
                          {
                             console.log(res);
                             if(res.status==200){
                                 $state.go('employeedetails');
                             }
                          else{
                                 alert("WROND ID OR PASSWORD ENTERED")
                             }
                          },
                           function error(err)
                          {
                           alert("WROND ID OR PASSWORD ENTERED")
                           console.log('userdetail save failed:', err);
                          });
                  };
         }

















}]);