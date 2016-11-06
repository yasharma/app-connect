'use strict';

angular.module('app.factories')
.factory('RestSvr', ['$http', function ($http) {
	return{
		login: function(apiUrl, data){
			return $http.post(apiUrl, data).then(function(response){
				return { 
					result: response.data.success, 
					user: response.data.user,
					token: response.data.token
				};
			}, function(response){
				return {
					errors: response.data.errors
				};
			});
		},
		paginate: function(apiUrl, params, queryString){
			var p = !angular.isUndefined(params) ? params : '';
			var q = !angular.isUndefined(queryString) ? queryString : '';
			return $http.get(apiUrl, p).then(function(response){
				return {
					records: response.data.records,
					paging: response.data.paging
				};
			});
		},
		get: function(apiUrl, params){
			var p = !angular.isUndefined(params) ? params : null;
			return $http.get(apiUrl, params).then(function(response){
				return {
					records: response.data.records
				};
			});
		},
		getById: function(apiUrl, id){
			return $http.get(apiUrl + id).then(function(response){
				return {
					record: response.data
				};
			});	
		},
		post: function(apiUrl, data){
			return $http.post(apiUrl, data).then(function(response){
				return {
					result: response.data.success, 
					message: response.data.message, 
					data: response.data.user
				};
			}, function(response){
				return {
					errors: response.data.errors
				};
			});
		},
		put: function(apiUrl, id, data){
			return $http.put((apiUrl + id), data).then(function(response){
				return {
					result: response.data.success, 
					message: response.data.message, 
					data: response.data.user
				};
			}, function(response){
				return {
					errors: response.data.errors
				};
			});
		},
		delete: function(apiUrl, id){
			return $http.delete(apiUrl + id).then(function(response){
				return {
					message: response.data.message,
					result: response.data.result
				};
			});	
		}
	};
}]);