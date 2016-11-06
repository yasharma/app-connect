'use strict';

angular.module('app.controllers')
.controller('authCtrl', ['$scope', 'RestSvr', 'toaster', '$location','localStorageService', '$rootScope',function ($scope, RestSvr, toaster, $location, localStorageService, $rootScope) {
	
	// User registration 
	$scope.register = function(isValid){
		if(!isValid){
			return;
		}
		RestSvr.post('/register', $scope.user).then(function(response){
			if(response.errors){
				toaster.pop({type: 'error', title: "Error", body:response.errors.email.message, showCloseButton:true});
			} else {
				$location.path('/');
				toaster.pop({type: 'success', title: "Success", body:'Registration successful, you can now login ', showCloseButton:true});
			}
		});
	};

	// User login
	$scope.login = function(isValid){
		if(!isValid){
			return;
		}
		RestSvr.post('/login', $scope.user).then(function(response){
			if(response.errors){
				toaster.pop({type: 'error', title: "Error", body:response.errors.message, showCloseButton:true});
			} else {
				localStorageService.set('user', response.data);
				$rootScope.user = localStorageService.get('user');
				$location.path('/shop');
			}
		});
	};

}]);