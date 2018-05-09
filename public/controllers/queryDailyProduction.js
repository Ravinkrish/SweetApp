webapp.controller('queryDailyProduction', ['$scope', 'reportService','$stateParams'
    ,'$state','orderService','userServices',
    function ($scope, reportService,$stateParams,$state,orderService,userServices) {
        $scope.dateDetails = {};
        $scope.querySalesDetails=function()
        {
            
            orderService.getQueryDailYProductionDetails($scope.dateDetails)
                .then(function (res)
                    {
                        console.log('iuyuyiuy',$scope.dateDetails);
                        $scope.reportList = res.data;


                    },
                    function error(err)
                    {
                        alert("ENTER CORRECT DETAILS")
                        console.log('receipt save failed:', err);
                    });
        };

        $scope.exportAction = function (option) {
                 switch (option) {
                 case 'pdf': $scope.$broadcast('export-pdf', {});
                 break;
                 case 'excel': $scope.$broadcast('export-excel', {});
                 break;
                 case 'doc': $scope.$broadcast('export-doc', {});
                 break;
                 case 'csv': $scope.$broadcast('export-csv', {});
                 break;
                 default: console.log('no event caught');
                 }
                 }




    }]);