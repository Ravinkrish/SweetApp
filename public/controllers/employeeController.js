webapp.controller('employeeController', ['$scope','userServices','$state','$log', function($scope,userServices,$state,$log) {

                $scope.employeeDetails = {};

              $scope.saveEmployeeDetails=function()
                   {
                       userServices.postEmployeedetails($scope.employeeDetails)
                           .then(function (res)
                           {
                               $state.go('employeedetails');
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
                          $scope.employeeDetails.employeeId=$scope.employeeList.length+1
                          console.log("37379587")
                          console.log($scope.employeeDetails.employeeId )
                      });
             };



function init() {
    $scope.getAllEmployeeDetails()
}
init()
$scope.cameraOnCondition=function()
             {
             console.log(" hai i am inside");
            $scope.$broadcast('webcamstart');
             }


             $scope.config = {
               delay: 1,
               shots: 1,
               flashFallbackUrl: 'vendors/webcamjs/webcam.swf',
               shutterUrl: 'shutter.mp3',
               flashNotDetectedText: 'Seu browser não atende os requisitos mínimos para utilização da camera. ' +
               'Instale o ADOBE Flash player ou utilize os browsers (Google Chrome, Firefox ou Edge)'
             };

             $scope.showButtons = false;
             $scope.captureButtonEnable = false;
             $scope.progress = 0;

             $scope.onCaptureComplete = function(src) {
               $log.log('webcamController.onCaptureComplete :',src);
               $scope.employeeDetails.employeePhoto=src[0];
               $scope.src=src;
               $scope.progress = 100;
               var el = document.getElementById('result');
               var img = document.createElement('img');
               img.src = src[$scope.config.shots-1];
               img.width = 240;
               img.height = 180;
               el.appendChild(img);
                console.log("sending images");
               userServices.setwebcameimages(src);
             };
             $scope.onError = function(err) {
               $log.error('webcamController.onError : ', err);
               $scope.showButtons = false;
             };
             $scope.onLoad = function() {
               $log.info('webcamController.onLoad');
               $scope.showButtons = true;
             };
             $scope.onLive = function() {
               $log.info('webcamController.onLive');
               $scope.captureButtonEnable = true;
             };
             $scope.onCaptureProgress = function(src, progress) {
             //console.log('hagjdgajd',src);
               $scope.progress = progress;
               var result = {
                 src: src,
                 progress: progress
               }
                userPhoto=src;
               var el = document.getElementById('result');
               var img = document.createElement('img');
               img.src = src;
               img.width = 240;
               img.height = 180;
               el.appendChild(img);
               $log.info('webcamController.onCaptureProgress : ', result);
             };
             $scope.capture = function() {
               $scope.$broadcast('ngWebcam_capture');
             };
             $scope.on = function() {
               $scope.$broadcast('ngWebcam_on');
             };
             $scope.off = function() {

              $scope.$broadcast('ngWebcam_off');

               $scope.captureButtonEnable = false;
             };



}]);