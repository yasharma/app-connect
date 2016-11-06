'use strict';

angular.module('app.controllers')
.controller('shopCtrl', ['$scope', 'RestSvr', 'toaster', '$location','localStorageService', '$rootScope',function ($scope, RestSvr, toaster, $location, localStorageService, $rootScope) {

	/*get all the pets*/
	RestSvr.get('/pets').then(function(result){
		if(result.records){
			$scope.pets = result.records;
		}
	});

	$scope.buy = function(index){
		var selectedPet, user;
		selectedPet = $scope.pets[index];

		/* extract the user id from localstorage */
		user = localStorageService.get('user');

		RestSvr.put('/update/', user._id, {petId: selectedPet._id}, function(result){
			console.log(result);
		});
	};

}]);