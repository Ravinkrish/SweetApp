var webapp = angular.module('webapp', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'angularUtils.directives.dirPagination', 'ng-webcam','naif.base64']);

angular.module('webapp').directive('exportTable', function () {
var link = function ($scope, element, attr) {
$scope.$on('export-pdf',function(e,d){
element.exportDetails({ type:'pdf', escape: false });
})

$scope.$on('export-excel', function(e,d){
element.exportDetails({ type:'excel', escape: false });
});
$scope.$on('export-doc',function(e,d){
element. exportDetails({ type:'doc', escape: false});
});
$scope.$on('export-csv', function(e,d){
element. exportDetails({ type:'csv', escape:false });
});
}
return {
restrict:'A',
link:link
};
});

webapp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerController'
        })

        .state('query', {
            url: '/query',
            templateUrl: 'templates/query.html',
            controller: 'queryDetailController'
        })

        .state('advance', {
            url: '/advance/:employeeId',
            templateUrl: 'templates/advance.html',
            controller: 'advanceController'
        })

        .state('advancedetails', {
            url: '/advancedetails/:employeeId',
            templateUrl: 'templates/advancedetails.html',
            controller: 'advanceDetailsController'
        })

        .state('vendors', {
            url: '/vendors',
            templateUrl: 'templates/vendor.html',
            controller: 'vendorController'
        })

        .state('report', {
            url: '/report',
            templateUrl: 'templates/report.html',
            controller: 'reportController'
        })

        .state('products', {
            url: '/products',
            templateUrl: 'templates/product.html',
            controller: 'productCtrl'
        })

        .state('reportDetail', {
            url: '/reportDetail/:reportId',
            templateUrl: 'templates/reportDetail.html',
            controller: 'reportDetailController'
        })

        .state('vendorDetails', {
            url: '/vendorDetails',
            templateUrl: 'templates/vendordetails.html',
            controller: 'vendorDetailController'
        })

        .state('vendorMonthDetails', {
            url: '/vendorMonthDetails/:vendorId',
            templateUrl: 'templates/vendormonthdetails.html',
            controller: 'vendorMonthDetailController'
        })

        .state('employees', {
            url: '/employees',
            templateUrl: 'templates/employees.html',
            controller: 'employeeController'
        })

        .state('employeedetails', {
            url: '/employeedetails',
            templateUrl: 'templates/employeedetails.html',
            controller: 'employeedetailController'
        })

        .state('employeeedit', {
            url: '/employeeedit/:employeeId',
            templateUrl: 'templates/employeeedit.html',
            controller: 'employeeeditController'
        })

        .state('leaves', {
            url: '/leaves/:employeeId',
            templateUrl: 'templates/leaves.html',
            controller: 'leaveController'
        })

        .state('employeeleavedetails', {
            url: '/employeeleavedetails/:employeeId',
            templateUrl: 'templates/employeeleavedetails.html',
            controller: 'employeeleaveController'
        })


        .state('leavedetails', {
            url: '/leavedetails',
            templateUrl: 'templates/leavedetails.html',
            controller: 'leavedetailController'
        })

        .state('leaveedit', {
            url: '/leaveedit/:leaveId',
            templateUrl: 'templates/leaveedit.html',
            controller: 'leaveeditController'
        })

        .state('receipts', {
            url: '/receipts',
            templateUrl: 'templates/receipts.html',
            controller: 'receiptCtrl'
        })

        .state('sales', {
            url: '/sales',
            templateUrl: 'templates/sales.html',
            controller: 'dailySalesCtrl'
        })
        .state('salesItemDetails', {
            url: '/salesItemDetails/:salesMongodbId',
            templateUrl: 'templates/salesItemDetails.html',
            controller: 'salesCtrl'
        })
        .state('notificationDetails', {
            url: '/notificationDetails',
            templateUrl: 'templates/notificationDetails.html',
            controller: 'receiptCtrl'
        })

        .state('queryDailyProduction', {
            url: '/queryDailyProduction',
            templateUrl: 'templates/queryDailyProduction.html',
            controller: 'queryDailyProduction'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        });





});