webapp.controller("receiptCtrl",function($scope,receiptServices,fileUpload){
$scope.getAllReceiptDetails = function ()
             {
                      receiptServices.getAllReceiptDetails().then(function (res)
                      {
                         $scope.receiptList = res.data;
                      });
             };

    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(
        function(){
            getTodaysAlert()
        }, millisTill10);
    //60 * 1000
    //1000 * 60 * 60
    function callEveryHour() {
        setInterval(getTodaysAlert(), 60 * 1000);
    }

    function getTodaysAlert(){
        receiptServices.getRecepitsAlertBasedOnDate()
            .then(function(res)
                {
                    console.log('wqeqweqweqw',res.data);
                    $scope.notificaionDetails=res.data
                },
                function error(err)
                {
                    console.log('receipt delete failed:', err);
                });
    }
    callEveryHour()

$scope.deleteReceipt = function(receiptId)
           {
               receiptServices.deleteReceipt(receiptId)
                   .then(function(res)
                   {
                    $scope.getAllReceiptDetails();
                      console.log('wqeqweqweqw',res.data);
                       console.log('receipt deleted.');
                   },
                   function error(err)
                   {
                      console.log('receipt delete failed:', err);
                   });
           }

$scope.receiptDetails = {};
              $scope.saveReceiptDetails=function()
                   {
                       $scope.receiptDetails.docUpload=receiptServices.getSettingLogoImage();
                       receiptServices.postReceiptdetails($scope.receiptDetails)
                           .then(function (res)
                           {
                               $scope.getAllReceiptDetails();
                               console.log('receipt detail saved successfully');
                           },
                            function error(err)
                           {
                               alert("ENTER CORRECT DETAILS")
                               console.log('receipt save failed:', err);
                           });
                   };

$scope.uploadfile=function(fliedata)
{
$scope.imagedata=fliedata.base64;
receiptServices.setSettingLogoImage($scope.imagedata);
}

$scope.getSingleReceipt = function (receiptId) {
                  receiptServices.getSingleReceipt(receiptId).then(function (res) {
                      $scope.receipt = res.data;
                      console.log('asdasdsad',$scope.receipt);
                  });
             };

$scope.updateReceipt = function(){
                      receiptServices.updateReceiptDetails($scope.receipt)
                          .then(function(res){
                      $scope.getAllReceiptDetails();
                              console.log('receipt updated.');
                          },
                          function error(err) {
                             console.log('receipt update failed:', err);
                          });
                  }


$scope.getAllReceiptDetails();
});