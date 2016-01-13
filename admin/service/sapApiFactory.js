app.config(['$httpProvider', function($httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;   
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
    $httpProvider.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
    }
]); 

app.factory("apiFactory", ['$http','$rootScope','SAP_CONFIG',
    function ($http,$rootScope, SAP_CONFIG) { // This service connects to our REST API
        var serviceBase = SAP_CONFIG.API_PATH;
        $rootScope.globals = {
                currentUser: {
                    token: "5KYMazddSTCz4j8EHg2052MH0KN4NJtoqWN9FtO2cyXGLU61fW4Ym1tYdJVA0NhGwxyUYmgYRNAyShTBP1TcDoaGTKWkOswkLbRX2OIaxHFoixPeUN9d9wsZv9clUVSh7UspF9vZfKyyKFbNQVJQ3XeBc4C21GhLyxl8VSvBiS9H9HzGfWDlPAVF0Rn50Po0528Ron5YNGN2wz9LAQEuLFoj8zFwZcNn80akZjucasihcdTG5aKC6xViHGrhNskl"
                }
            };
        
        var transform = function(data){
            return $.param(data);
        }
                
        var obj = {};
        obj.get = function (q) {
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'bearer ' + $rootScope.globals.currentUser.token; 
            }
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        obj.post = function (q, object) {
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'bearer ' + $rootScope.globals.currentUser.token; 
            }
            return $http.post(serviceBase + q, object.data,{transformRequest: transform}).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'bearer ' + $rootScope.globals.currentUser.token; 
            }
            if(object != undefined){
                return $http.put(serviceBase + q, object.data,{transformRequest: transform}).then(function (results) {
                    return results.data;
                });
            }else{
                return $http.put(serviceBase + q).then(function (results) {
                    return results.data;
                });
                
            }
        };
        obj.delete = function (q) {
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'bearer ' + $rootScope.globals.currentUser.token; 
            }
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);