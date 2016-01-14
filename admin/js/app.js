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
        .when('/practice', {
            templateUrl: 'views/practice.html',
            controller: 'practiceCtrl'
        })
        .when('/region', {
            templateUrl: 'views/region.html',
            controller: 'regionCtrl'
        })
        .when('/initiative', {
            templateUrl: 'views/initiative.html',
            controller: 'initiativeCtrl'
        })
        .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'userCtrl'
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


