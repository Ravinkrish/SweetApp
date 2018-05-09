webapp.factory('receiptServices',function($http){
var logodata;

    var setSettingLogoImages=function(logodetails)
   {
   setlogo={}
    setlogo.SettingLogo=logodetails
  return $http.post('/setLogo',setlogo);
   }
   var logoimage;
   var setSettingLogoImage=function(image)
   {
   logoimage=image;
   }
    var getSettingLogoImage=function()
      {
    return logoimage
      }


    var getSettingLogoImages=function()
    {
    return logodata;
    }

    var postReceiptdetails=function(data)
    {
       return $http.post('/receiptDetails',data);
    }
    var getAllReceiptDetails = function()
    {
        return $http.get('/allReceiptDetails');
    }
    var deleteReceipt=function(receiptId)
     {
        return $http.delete('/receiptBymongoId/'+receiptId);
     }
     var getSingleReceipt=function(receiptId)
    {
       return $http.get('/receiptBymongoId/'+receiptId);
    }
    var updateReceiptDetails=function(editdata)
     {
        return $http.post('/editReceiptBymongoId',editdata);
     }
    var getRecepitsAlertBasedOnDate=function()
    {
        return $http.get('/getAlertsForEveryDay');
    }

      return{
      setSettingLogoImages:setSettingLogoImages,
      getSettingLogoImages:getSettingLogoImages,
      setSettingLogoImage:setSettingLogoImage,
      getSettingLogoImage:getSettingLogoImage,
      postReceiptdetails:postReceiptdetails,
      getAllReceiptDetails:getAllReceiptDetails,
      deleteReceipt:deleteReceipt,
      getSingleReceipt:getSingleReceipt,
      updateReceiptDetails:updateReceiptDetails,
      getRecepitsAlertBasedOnDate:getRecepitsAlertBasedOnDate
}

});