webapp.factory("reportService", function ($http) {

       var postReportSettings = function (data) {
           return $http.post('/reportSetting', data);
       }
       var deleteReport = function (reportId) {
           return $http.delete('/reportBymongoId/' + reportId);
       }
       var getAllReportSettings = function () {
           return $http.get('/allReportSetting');
       }
       var getSingleReport = function (reportId) {
           return $http.get('/reportBymongoId/' + reportId);
       }
       var updateReport = function (editdata) {
           return $http.post('/editReportBymongoId', editdata);
       }
       var postOrderSettings = function (data) {
          return $http.post('/orderSetting', data);
       }
       var getAllOrderSettings = function () {
          return $http.get('/allOrderSetting');
       }
       var getSingleOrder = function (reportId) {
          return $http.get('/customerBymongoId/'+ reportId);
       }
       var getAllProductSettings = function () {
                  return $http.get('/allProductDetails');
              }

return {
        postReportSettings: postReportSettings,
        deleteReport: deleteReport,
        getAllReportSettings: getAllReportSettings,
        getSingleReport: getSingleReport,
        updateReport: updateReport,
        postOrderSettings:postOrderSettings,
        getAllOrderSettings:getAllOrderSettings,
        getSingleOrder:getSingleOrder,
        getAllProductSettings:getAllProductSettings

    }


})