webapp.controller('queryDetailController', ['$scope', 'reportService','$stateParams','$state','orderService','userServices',
    function ($scope, reportService,$stateParams,$state,orderService,userServices) {
    var reportId = $stateParams.reportId;



     var productValue;
        $scope.amountPaid=0
    $scope.getSingleReport = function (reportId) {
        reportService.getSingleReport(reportId).then(function (res) {
            $scope.report = res.data;
            console.log('uiuiuiuiu', $scope.report);
            console.log('prod',$scope.report.product);
            productValue = $scope.report.product;
        });
    };

    $scope.dateDetails = {};
                  $scope.saveDateDetails=function()
                       {
//                           $scope.dateDetails.customerId = $scope.order.customerId;
                           orderService.getQueryPaymentDetails($scope.dateDetails)
                               .then(function (res)
                               {
                                   console.log('iuyuyiuy',$scope.dateDetails);
                                   userServices.getVendorsCostByDateRange($scope.dateDetails).then(function (total) {
                                       $scope.totalCost = total.data;
                                       console.log('TotalCost', $scope.totalCost)
                                       userServices.getVendorsCostListByDateRange($scope.dateDetails).then(function (res) {
                                           $scope.reportList = res.data;
                                           console.log('uiuiuiuiu', $scope.reportList)


                                       });

                                   });


                               },
                                function error(err)
                               {
                                   alert("ENTER CORRECT DETAILS")
                                   console.log('receipt save failed:', err);
                               });
                       };

    $scope.getSingleOrder = function (reportId) {
            reportService.getSingleOrder(reportId).then(function (res) {
                $scope.order = res.data;
                console.log('asdasdsad', $scope.order);
            });
        };
//    $scope.ordersettings.cost ={};
    $scope.ordersettings = {};
    $scope.packageCost=0
    $scope.gstPercentage=5
        $scope.saveOrderSettings = function (saveFlag) {
           $scope.total = 0;
           for (var k in productValue){
           var productQuantity = $scope.ordersettings.cost;
           $scope.total = $scope.total + (productValue[k] * productQuantity[k]);
           }
           $scope.total= $scope.packageCost+$scope.total;
           $scope.total= $scope.total+($scope.total*($scope.gstPercentage/100));
             console.log('totaltotaltotal',$scope.total);
            $scope.ordersettings.costOfBig = $scope.report.costOfBig;
            $scope.ordersettings.costOfBig = $scope.report.costOfBig;
            $scope.ordersettings.costOfSmall = $scope.report.costOfSmall;
            $scope.ordersettings.costOfLaddu = $scope.report.costOfLaddu;
            $scope.ordersettings.rupees = $scope.report.rupees;
            $scope.ordersettings.customerId = $scope.report._id;
            $scope.ordersettings.total = $scope.total;
            $scope.ordersettings.amountPaid = $scope.amountPaid;
            $scope.ordersettings.otherstates = $scope.otherstates;
            $scope.ordersettings.packageCost = $scope.packageCost;
            $scope.ordersettings.balanceAmount = $scope.balanceAmount;
            $scope.ordersettings.balanceAmount= $scope.ordersettings.total - $scope.ordersettings.amountPaid;
            if(saveFlag==1){
                reportService.postOrderSettings($scope.ordersettings)
                    .then(function (res) {
                            $scope.getSingleOrder(reportId);
                            console.log('systemSettings detail saved successfully');
                        },
                        function error(err) {
                            alert("ENTER CORRECT DETAILS")
                            console.log('systemSettings save failed:', err);
                        });
            }

        };

$scope.deleteOrder=function (orderID) {
    orderService.deleteOrder(orderID).then(function (res) {
        $scope.getSingleOrder(reportId);
    });

}


$scope.setOrderBalance=function (orderDetails) {
    console.log("*payBalancepayBalancepayBalance")
    $scope.orderDetailsByCustomerId=orderDetails
}

$scope.payBalance=function (balancePaid) {
    console.log("*payBalancepayBalancepayBalance")
    var obj={}
    obj.id=reportId;
    obj.balancePaid=balancePaid;
    obj.orderDetails=$scope.orderDetailsByCustomerId;
    orderService.upateBalanceDetails(obj).then(function (res) {
        $scope.getSingleOrder(reportId);
    });

}

$scope.getSingleReport(reportId);
$scope.getSingleOrder(reportId);

}]);