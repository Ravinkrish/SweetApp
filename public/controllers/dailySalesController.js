/**
 * Created by dhanalakshmi on 7/4/18.
 */
webapp.controller('dailySalesCtrl', ['$scope','salesServices','$state','$stateParams',
    'reportService', function($scope,salesServices,$state,$stateParams,reportService) {

    $scope.items = [];
    $scope.itemsToAdd = [{
        trays: ''
      }];
    $scope.add = function(itemToAdd) {

        var index = $scope.itemsToAdd.indexOf(itemToAdd);

        $scope.itemsToAdd.splice(index, 1);

        $scope.items.push(angular.copy(itemToAdd))
      }
    $scope.addNew = function() {

        $scope.itemsToAdd.push({
          trays: ''
        })
      }
    $scope.saveCoconutSalesDetails=function (salesCoconutCategoryDetails) {
        console.log("872387109salesCoconutCategoryDetails77423748234")
        console.log(salesCoconutCategoryDetails)

        reportService.getAllProductSettings().then(function (res)
        {
            var productsList=[]
            for(var l=0;l<res.data.length;l++){
                for (var key in salesCoconutCategoryDetails.product) {
                    console.log(key, salesCoconutCategoryDetails.product[key])
                    if(salesCoconutCategoryDetails.product[key]!==null){
                        if(res.data[l].productName===key){
                            var obj={}
                            obj.productName=res.data[l].productName
                            obj.noOfTrays=salesCoconutCategoryDetails.product[res.data[l].productName]
                            obj.noOfPices=salesCoconutCategoryDetails.product[res.data[l].productName +'NoOfPices']
                            obj.costPerPiece=res.data[l].costPerProduct
                            obj.TotalCostOfDay=salesCoconutCategoryDetails.product[res.data[l].productName]*
                                salesCoconutCategoryDetails.product[res.data[l].productName +'NoOfPices']*
                                res.data[l].costPerProduct
                            productsList.push(obj)
                        }
                    }
                }
                if(l==res.data.length-1){
                    console.log("costtttt7777777777777777777777777")
                    console.log(productsList)
                    salesCoconutCategoryDetails.timeInMilliSecond=salesCoconutCategoryDetails.dateOfAddition.getTime();
                    salesCoconutCategoryDetails.product=productsList
                    console.log(salesCoconutCategoryDetails)
                    salesServices.postSalesDetails(salesCoconutCategoryDetails)
                        .then(function (res)
                            {
                                getAllSales();

                            },
                            function error(err)
                            {

                                console.log('employee save failed:', err);
                            });
                }

            }



        })


    }

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


    
    $scope.deleteSales=function (sales) {
        console.log("***************sales***************")
        console.log(sales)
        salesServices.deleteSalesDetailsByID(sales._id).then(function (res)
        {
            console.log('deleteSalesDetailsByID',res);
            getAllSales();
        });
    }
   function getAllSales() {
            salesServices.getAllSalesDetails()
                .then(function (res)
                {

                    $scope.salesDetails=res.data

                })
        }

        function getAllFromProductsSales() {
            var rest=[]
            reportService.getAllProductSettings().then(function (res)
            {
                for(var h=0;h<res.data.length;h++){
                    console.log('employee detresresresail saved successfully');
                    console.log(res.data[h])
                    console.log(res.data[h].productName)
                    rest.push(res.data[h])
                    var obj={}
                    obj.productName=res.data[h].productName+'NoOfPices';
                    obj.productDescription=res.data[h].productDescription+'NoOfPices';
                    obj.costPerProduct=res.data[h].costPerProduct+'NoOfPices';
                    rest.push(obj)
                }
                $scope.productList =rest
                  /*  console.log("**********getAllFromProductsSales****************")
                console.log(rest)
                console.log("**********getAllFromProductsSales****************")*/

            });


        }

        function init(){
            getAllFromProductsSales()
            getAllSales();

        }
        init()
}]);