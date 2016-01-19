var app = angular.module('greatInnovusModule', 
    ['ngRoute', 'ui.bootstrap', 'sap.environmentConfigs','toaster']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'loginCtrl'
        })
        .when('/view', {
            templateUrl: 'view.html',
            controller: 'officeCtrl'
        })
        .when('/', {
            templateUrl: 'views/office.html',
            controller: 'officeCtrl'
        })
        .when('/office', {
            templateUrl: 'views/office.html',
            controller: 'officeCtrl'
        })
        .when('/office-add', {
            templateUrl: 'views/office-add.html',
            controller: 'officeAddCtrl'
        })
        .when('/practice', {
            templateUrl: 'views/practice.html',
            controller: 'practiceCtrl'
        })
        .when('/practice-add', {
            templateUrl: 'views/practice-add.html',
            controller: 'practiceAddCtrl'
        })
        .when('/region', {
            templateUrl: 'views/region.html',
            controller: 'regionCtrl'
        })
        .when('/region-add', {
            templateUrl: 'views/region-add.html',
            controller: 'regionAddCtrl'
        })
        .when('/initiative', {
            templateUrl: 'views/initiative.html',
            controller: 'initiativeCtrl'
        })
        .when('/initiative-add', {
            templateUrl: 'views/initiative-add.html',
            controller: 'initiativeAddCtrl'
        })
        .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'userCtrl'
        })
        .when('/user-add', {
            templateUrl: 'views/user-add.html',
            controller: 'userAddCtrl'
        })
		
		.otherwise('/');
		;

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


