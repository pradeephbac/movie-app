// create the module and name it scotchApp
var movieApp = angular.module('movieApp', ['ngRoute', 'ngAnimate', 'ui.router']);

// configure our routes
movieApp.config(function ($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})

		// route for the about page
		.when('/single', {
			templateUrl: 'pages/single.html',
			controller: 'singleController'
		})
});
movieApp.config(function ($stateProvider) {
	var singleState = {
		name: 'single',
		url: '/single',
		templateUrl: 'pages/single.html'
	}

	$stateProvider.state(singleState);
});
// create the controller and inject Angular's $scope
movieApp.controller('mainController', function ($scope, $state, MyService) {
	$scope.loaded = false;
	$scope.main_movies = [];
	$scope.sub_movies = [];
	MyService.getAllSystems().then(function (movies) {
		movies.forEach(movie => {
			if (movie.is_main) {
				movie.visible = false;
				$scope.main_movies.push(movie);

			} else {
				$scope.sub_movies.push(movie);
			}
		});
		$scope.loaded = true;
	});
	$scope.images = $scope.main_movies;

	$scope.showMovie = function (movie) {
		$state.go('single', { movie: movie });
	}

});

movieApp.controller('singleController', function ($scope, $rootScope, $stateParams, $state) {
	$scope.message = 'Look! I am an single page.';
	console.log($state.params.movie)
});

movieApp.service('MyService', function ($rootScope, $http, $q) {
	this.getAllSystems = function () {
		$rootScope.loading = true;
		var deferred = $q.defer();
		$http.get('/getAllMovies').
			success(function (response, status, headers, config) {
				$rootScope.loading = false;
				deferred.resolve(response);
			});
		return deferred.promise;
	};
});

movieApp.filter('trusted', ['$sce', function ($sce) {
	return function (url) {
		return $sce.trustAsResourceUrl(url);
	};
}]);

movieApp.directive("slide", function ($timeout) {
	return {
		restrict: 'AE',
		templateUrl: '../pages/slide.html',
		scope: {
			images: '=',

		},

		link: function (scope, elem, attrs) {
			scope.currentIndex = 0;
			scope.next = function () {
				scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;

			}
			scope.prev = function () {
				scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1

			}
			scope.$watch('currentIndex', function () {
				if (scope.images.length > 0) {
					scope.images.forEach(function (image) {
						image.visible = false;
					})
					scope.images[scope.currentIndex].visible = true;
				}

			})

			var timer;
			var sliderFunc = function () {
				timer = $timeout(function () {
					scope.next();
					timer = $timeout(sliderFunc, 4000);
				}, 4000)
			}
			sliderFunc();
			scope.$on('$destroy', function () {
				$timeout.cancel(timer);
			})

		}
	}
});
