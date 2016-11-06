'use strict';

/* Setting up new module with its corresponding dependencies */
angular.module('bharatConnect', [
	'ngRoute',
	'ngMessages',
	'toaster',
	'ngAnimate',
	'angular-loading-bar',
	'app.controllers',
	'app.factories',
	'app.directives',
	'LocalStorageModule'
])
.config(['$routeProvider', 'cfpLoadingBarProvider',function($routeProvider, cfpLoadingBarProvider){
	cfpLoadingBarProvider.includeSpinner = false;
	$routeProvider
	.when('/', {
		controller: 'authCtrl',
		templateUrl: 'app/views/login.html',
		access: {requiredLogin: false}
	})
	.when('/register', {
		controller: 'authCtrl',
		templateUrl: 'app/views/register.html',
		access: {requiredLogin: false}
	})
	.when('/shop', {
		controller: 'authCtrl',
		templateUrl: 'app/views/shop.html',
		access: {requiredLogin: true}
	})
	.otherwise({
		redirectTo: '/'
	});	
}])	
.run(['$location','$rootScope', 'localStorageService', function($location, $rootScope, localStorageService){
	$rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        
		if ( nextRoute !== null && nextRoute.access !== null && nextRoute.access.requiredLogin && !localStorageService.get('user')) {
		    $location.path("/");
		}
	});	
	
	
	/* This will logout the user from the application */
	$rootScope.logout = function () {
        localStorageService.remove('user');
        delete $rootScope.user;
        $location.path('/');
    };
    
    /* Set user for entire application */
	$rootScope.user = localStorageService.get('user');
}])



angular.module('app.controllers', []);
angular.module('app.factories', []);
angular.module('app.directives', []);