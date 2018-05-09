
webapp.service('fileUpload', function ($http) {
    this.uploadFileToUrl = function (file) {
    console.log("inides serivede ***************************");
        console.log(file)

        var fd = new FormData();
        fd.append('file', file);
        return $http.post('/uploadCompanyLogo', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })

    }

})


