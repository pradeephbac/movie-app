	// create the module and name it scotchApp
	var movieApp = angular.module('movieApp', ['ngRoute']);

	// configure our routes
	movieApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/single', {
				templateUrl : 'pages/single.html',
				controller  : 'singleController'
			}) 
	});

	// create the controller and inject Angular's $scope
	movieApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	movieApp.controller('singleController', function($scope) {
		$scope.message = 'Look! I am an single page.';
	});
