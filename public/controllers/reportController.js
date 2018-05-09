webapp.controller('reportController', ['$scope', 'reportService', function ($scope, reportService) {
    $scope.reportSettings = {};
    $scope.amountPaid=0
    $scope.saveReportSettings = function () {
    console.log('oueoueouoe',$scope.reportSettings);
        reportService.postReportSettings($scope.reportSettings)
            .then(function (res) {
                    $scope.getAllReportSettings();
                    console.log('systemSettings detail saved successfully');
                },
                function error(err) {
                    alert("ENTER CORRECT DETAILS")
                    console.log('systemSettings save failed:', err);
                });
    };

    $scope.getAllReportSettings = function () {
        reportService.getAllReportSettings().then(function (res) {
            $scope.getAllProductDetails();
            $scope.reportList = res.data;
            console.log('ththt',res.data);
        });
    };

    $scope.deleteReport = function (reportId) {
        reportService.deleteReport(reportId)
            .then(function (res) {
                    $scope.getAllReportSettings();

                },
                function error(err) {
                    console.log('admin delete failed:', err);
                });
    }

    $scope.getSingleReport = function (reportId) {
        reportService.getSingleReport(reportId).then(function (res) {
            $scope.report = res.data;
            console.log('asdasdsad', $scope.report);
        });
    };

    $scope.updateReport = function () {
        reportService.updateReport($scope.report)
            .then(function (res) {
                    $scope.getAllReportSettings();
                    console.log('system updated.');
                },
                function error(err) {
                    console.log('system update failed:', err);
                });
    }

    $scope.getAllProductDetails = function ()
     {
              reportService.getAllProductSettings().then(function (res)
              {
                 $scope.productList = res.data;
                 console.log('asdasjdas',res.data);
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


    $scope.getAllReportSettings();
}]);