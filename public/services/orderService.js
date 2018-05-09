webapp.factory("orderService", function ($http) {

       var postOrderSettings = function (data) {
           return $http.post('/orderSetting', data);
       }
      var deleteOrder = function (orderBymongoId) {
           var obj= {
               id: orderBymongoId
           }

          return $http.delete('/orderSubCost/'+orderBymongoId._id);
      }
       var getAllOrderSettings = function () {
           return $http.get('/allOrderSetting');
       }
       var gettingSingleOrder=function(orderId)
           {
              return $http.get('/orderBymongoId/'+orderId);
           }
    var upateBalanceDetails = function (details) {
        return $http.post('/updateBalanceByOrderId', details);
    }

    var getQueryPaymentDetails = function(obj) {
        return $http.post('/querySetting', {params: obj});

    }
               var getQueryDailYProductionDetails  = function(obj)
               {
                   var startDate=obj.startDate
                   var startMilliseconds = startDate.getTime();
                   var endDate=obj.endDate
                   var endMilliseconds = endDate.getTime();
                   return $http.get('/queryDailyProductionDetails/'+startMilliseconds+'/'+endMilliseconds);
               }




return {
        postOrderSettings: postOrderSettings,
    deleteOrder:deleteOrder,
    upateBalanceDetails:upateBalanceDetails,
//        deleteReport: deleteReport,
        getAllOrderSettings: getAllOrderSettings,
        gettingSingleOrder: gettingSingleOrder,
        getQueryPaymentDetails:getQueryPaymentDetails,
    getQueryDailYProductionDetails:getQueryDailYProductionDetails
//        getSingleOrder: getSingleOrder
//        getSingleReport: getSingleReport,
//        updateReport: updateReport

        }


})