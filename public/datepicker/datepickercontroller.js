webapp.controller('datepicker.controller',function($scope) {
        $scope.formEle.modelValue = $scope.todaydate;
        $scope.today = moment().toDate();
        todaydate = new Date();
        console.log("todaydate",todaydate);
        //$scope.setVlaue=function () {
        //    console.log("*********************")
            console.log( $scope.formEle.modelValue)

        //}


    });

