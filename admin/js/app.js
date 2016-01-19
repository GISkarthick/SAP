var app = angular.module('greatInnovusModule', 
    ['ngRoute', 'oc.lazyLoad', 'ui.router', 'ui.bootstrap', 'sap.environmentConfigs','toaster']);

app.config(function($stateProvider, $ocLazyLoadProvider, $locationProvider) {

    $stateProvider
    .state('office-add',{
        url:'/office/add',
        controller: 'officeAddCtrl',
        templateUrl:'views/office-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/officeController.js',
                  ]
                })
            }
        }
    })
    .state('office-edit',{
        url:'/office/edit?id',
        controller: 'officeAddCtrl',
        templateUrl:'views/office-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/officeController.js',
                  ]
                })
            }
        }
    })
    .state('office-list',{
        url:'/office',
        controller: 'officeCtrl',
        templateUrl:'views/office.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/officeController.js',
                  ]
                })
            }
        }
    })
    .state('practice-add',{
        url:'/practice/add',
        controller: 'practiceAddCtrl',
        templateUrl:'views/practice-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/practiceController.js',
                  ]
                })
            }
        }
    })
    .state('practice-edit',{
        url:'/practice/edit?id',
        controller: 'practiceAddCtrl',
        templateUrl:'views/practice-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/practiceController.js',
                  ]
                })
            }
        }
    })
    .state('practice-list',{
        url:'/practice',
        controller: 'practiceCtrl',
        templateUrl:'views/practice.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/practiceController.js',
                  ]
                })
            }
        }
    })
    .state('region-add',{
        url:'/region/add',
        controller: 'regionAddCtrl',
        templateUrl:'views/region-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/regionController.js',
                  ]
                })
            }
        }
    })
    .state('region-edit',{
        url:'/region/edit?id',
        controller: 'regionAddCtrl',
        templateUrl:'views/region-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/officeController.js',
                  ]
                })
            }
        }
    })
    .state('region-list',{
        url:'/region',
        controller: 'regionCtrl',
        templateUrl:'views/region.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/regionController.js',
                  ]
                })
            }
        }
    })
    .state('initiative-add',{
        url:'/initiative/add',
        controller: 'initiativeAddCtrl',
        templateUrl:'views/initiative-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/initiativeController.js',
                  ]
                })
            }
        }
    })
    .state('initiative-edit',{
        url:'/initiative/edit?id',
        controller: 'initiativeAddCtrl',
        templateUrl:'views/initiative-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/initiativeController.js',
                  ]
                })
            }
        }
    })
    .state('initiative-list',{
        url:'/initiative',
        controller: 'initiativeCtrl',
        templateUrl:'views/initiative.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/initiativeController.js',
                  ]
                })
            }
        }
    })
    .state('user-add',{
        url:'/user/add',
        controller: 'userAddCtrl',
        templateUrl:'views/user-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/userController.js',
                  ]
                })
            }
        }
    })
    .state('user-edit',{
        url:'/user/edit?id',
        controller: 'userAddCtrl',
        templateUrl:'views/user-add.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/userController.js',
                  ]
                })
            }
        }
    })
    .state('user-list',{
        url:'/user',
        controller: 'userCtrl',
        templateUrl:'views/user.html',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'greatInnovusModule',
                  files:[
                    'controller/userController.js',
                  ]
                })
            }
        }
    });

});

app.directive('menuToggle', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.parent().children().removeClass('active');
                element.addClass('active');
            })
        },
    }
})


