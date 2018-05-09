/**
 * Created by dhanalakshmi on 5/4/18.
 */
webapp.controller('salesCtrl', ['$scope','salesServices','$state','$stateParams', function($scope,salesServices,$state,$stateParams) {
    $scope.user = {};
    $scope.salesDetails=[]


    $scope.saveSalesDetails=function (salesCategoryDetails) {
        console.log(salesCategoryDetails)
        salesServices.postSalesDetails(salesCategoryDetails)
            .then(function (res)
                {
                    getAllSales();

                },
                function error(err)
                {

                    console.log('employee save failed:', err);
                });
    }

    function getAllSales() {
        salesServices.getAllSalesDetails()
            .then(function (res)
            {
                console.log('employee detresresresail saved successfully');
                console.log(res)
                $scope.salesDetails=res.data

            })
    }

    $scope.itemSalesDetails=[];
    $scope.saveItemSalesDetails=function (saveItemSalesDetails) {
        console.log(saveItemSalesDetails)
        $scope.itemSalesDetails.push(saveItemSalesDetails)
    }

    $scope.saveItemSalesDetailsToDB=function () {
        salesServices.getSalesDetailsByID($stateParams.salesMongodbId)
            .then(function (res)

            {

                var objDetails={}
                objDetails.mongoDbId= $stateParams.salesMongodbId;
                var obj={}
                obj.dateOfAddition=res.data.dateOfAddition
                obj.numberOfBatches=res.data.numberOfBatches
                obj.numberOfCoconut=res.data.numberOfCoconut
                obj.Items=$scope.itemSalesDetails
                objDetails.details=obj
                salesServices.saveItemSalesDetails(objDetails)
                    .then(function (res)
                        {
                            getAllSales();

                        },
                        function error(err)
                        {

                            console.log('employee save failed:', err);
                        });
            })
    }

    function init() {
        getAllSales()
    }
    init()

}]);