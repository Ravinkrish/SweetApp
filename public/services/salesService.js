webapp.factory('salesServices',function($http){



    var postSalesDetails=function(data)
    {
        return $http.post('/salesDetails',data);
    }
    var getAllSalesDetails = function()
    {
        return $http.get('/salesDetails');
    }
    var deleteSalesDetailsByID=function(mongodbId)
    {
        return $http.delete('/salesDetails/'+mongodbId);
    }

    var getSalesDetailsByID=function(mongodbId)
    {
        return $http.get('/salesDetails/'+mongodbId);
    }
    var saveItemSalesDetails=function(obj)
    {
        return $http.post('/saveItemSalesDetails',obj);
    }


    return   {
        postSalesDetails: postSalesDetails,
        getAllSalesDetails: getAllSalesDetails,
        deleteSalesDetailsByID: deleteSalesDetailsByID,
        getSalesDetailsByID:getSalesDetailsByID,
        saveItemSalesDetails:saveItemSalesDetails
    };
});
