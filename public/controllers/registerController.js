webapp.controller('registerController', ['$scope','userServices','$state', function($scope,userServices,$state) {
$scope.user = {};

$scope.isValidForm = function(){
    var flag = angular.isDefined($scope.user.firstName) &&
        angular.isDefined($scope.user.lastName) &&
        angular.isDefined($scope.user.userName)&&
        angular.isDefined($scope.user.password);
    return flag;
}

    $scope.saveUserDetails=function()
         {
             userServices.postAllRegisterDetails($scope.user)
                 .then(function (res)
                 {   console.log('asdhasydkhsad',$scope.user)
                     console.log('user detail saved successfully');
                     $state.go('login');
                     alert("Register successful")
                 },
                  function error(err)
                 {
                     alert("ENTER CORRECT DETAILS")
                     console.log('userdetail save failed:', err);
                 });
         };


$scope.login = {};
    $scope.LoginDetails=function()
         {
             userServices.postAllLoginDetails($scope.login)
                 .then(function (e)
                 {
                    console.log('jAKGSKGaksk',e);
                    if(e.data.loginStatus){
                     $state.go('companyprofile');
                    }
                    else{
                     console.log('kdkkdse');
                    }
                    // console.log('user detail saved successfully');
                 },
                  function error(err)
                 {
                  alert("WROND ID OR PASSWORD ENTERED")
                  console.log('userdetail save failed:', err);
                 });
         };















}]);