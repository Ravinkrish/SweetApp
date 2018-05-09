webapp.factory('userServices',function($http){
var photoss=[];
 var setwebcameimages=function(photos)
 {
for(var i=0;i<photos.length;i++)
{
photoss=photos[i];
//console.log(photoss)
}
//console.log(photoss)
//return $http.post('/imageslist',photoss);
 }
 var getimages=function()
 {
 return photoss;
 }



   var postAllRegisterDetails = function(data)
        {
           return $http.post('/userRegistration', data);
        };

   var postAllLoginDetails = function(data)
        {
            console.log("testing:::::", data)
           return $http.post('/login', data);
        };
   var postEmployeedetails=function(data)
        {
           return $http.post('/employeeDetails',data);
        }
   var getAllEmployeeDetails = function()
        {
            return $http.get('/allEmployeeDetails');
        }
   var deleteEmployee=function(employeeId)
         {
            return $http.delete('/employeeBymongoId/'+employeeId);
         }
   var getSingleEmployee=function(employeeId)
        {
           return $http.get('/employeeBymongoId/'+employeeId);
        }
   var getSingleEmployeeDetail=function(employeeId)
           {
              return $http.get('/singleemployeeBymongoId/'+employeeId);
           }
   var updateEmployeeDetails=function(editdata)
         {
            return $http.post('/editEmployeeBymongoId',editdata);
         }
   var postLeaveDetails=function(data)
        {
           return $http.post('/leaveDetails',data);
        }
   var getAllLeaveDetails = function()
        {
            return $http.get('/allLeaveDetails');
        }
   var deleteLeave=function(leaveId)
        {
           return $http.delete('/leaveBymongoId/'+leaveId);
        }
   var getSingleleave=function(leaveId)
        {
           return $http.get('/leaveBymongoId/'+leaveId);
        }
   var updateLeaveDetails=function(editdata)
        {
           return $http.post('/editLeaveBymongoId',editdata);
        }
   var postAdvancedetails=function(data)
       {
          return $http.post('/advancePosting',data);
       }
   var getAdvancePaymentsByEmployeeId = function(employeeId)
       {
          return $http.get('/getAdvancePayments/'+employeeId);
       }
   var getLeavePaymentsByEmployeeId = function(employeeId)
       {
         return $http.get('/getSalary/'+employeeId);
       }
   var postVendordetails=function(data)
       {
          return $http.post('/vendorDetails',data);
       }
   var getAllVendorDetails = function()
       {
           return $http.get('/allVendorDetails');
       }
   var deleteVendor=function(vendorId)
       {
           return $http.delete('/vendorBymongoId/'+vendorId);
       }
   var getSingleVendor=function(vendorId)
       {
           return $http.get('/vendorByName/'+vendorId);
       }
   var getVendorPaymentsByVendorName = function(vendorId)
          {
            return $http.get('/getVendorDetails/'+vendorId);
          }


    var getVendorsCostByDateRange = function(obj)
    {
        var startDate=obj.startDate
        var startMilliseconds = startDate.getTime();
        var endDate=obj.endDate
        var endMilliseconds = endDate.getTime();
        return $http.get('/getVendorDetailsBasedOnDate/'+startMilliseconds+'/'+endMilliseconds);
    }

    var getVendorsCostListByDateRange = function(obj)
    {
        var startDate=obj.startDate
        var startMilliseconds = startDate.getTime();
        var endDate=obj.endDate
        var endMilliseconds = endDate.getTime();
        return $http.get('/getVendorDetailsListBasedOnDate/'+startMilliseconds+'/'+endMilliseconds);
    }

return   {
         setwebcameimages: setwebcameimages,
         getimages: getimages,
         postAllRegisterDetails: postAllRegisterDetails,
         postAllLoginDetails: postAllLoginDetails,
         postEmployeedetails: postEmployeedetails,
         getAllEmployeeDetails: getAllEmployeeDetails,
         deleteEmployee: deleteEmployee,
         getSingleEmployee: getSingleEmployee,
         getSingleEmployeeDetail: getSingleEmployeeDetail,
         updateEmployeeDetails: updateEmployeeDetails,
         postLeaveDetails: postLeaveDetails,
         getAllLeaveDetails: getAllLeaveDetails,
         deleteLeave: deleteLeave,
         getSingleleave: getSingleleave,
         updateLeaveDetails:updateLeaveDetails,
         postAdvancedetails: postAdvancedetails,
         getAdvancePaymentsByEmployeeId: getAdvancePaymentsByEmployeeId,
         getLeavePaymentsByEmployeeId: getLeavePaymentsByEmployeeId,
         postVendordetails: postVendordetails,
         getAllVendorDetails: getAllVendorDetails,
         deleteVendor: deleteVendor,
         getSingleVendor: getSingleVendor,
         getVendorPaymentsByVendorName: getVendorPaymentsByVendorName,
        getVendorsCostByDateRange:getVendorsCostByDateRange,
         getVendorsCostListByDateRange:getVendorsCostListByDateRange

        };
   });
