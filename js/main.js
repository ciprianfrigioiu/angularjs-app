// Creating the flickrApp and loading the nrRoute module
var flickrApp = angular.module('flickrApp', ['ngRoute']);

// Configuring the routes
flickrApp.config(function($locationProvider, $routeProvider) {
    // Set $$locationProvider to HTML5 mode
    $locationProvider.html5Mode(true);

    $routeProvider
        // Route for the home page
        .when('/', { templateUrl : 'home.html', controller  : 'mainController' })
        // Route for the details page passing the photoID as a parameter
        .when('/details/:photoID', { templateUrl : 'details.html', controller  : 'mainController' })
        // Otherwise redirect to the home page
        .otherwise({ redirectTo: '/' });
});

// Creating the mainController
flickrApp.controller('mainController', ['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
    // Performing the JSONP request on the Flickr feed
    $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(response) {
            $scope.photos = response;
    });

    // Retrieve the photoID to use it in the details page
    $scope.photo_id = $routeParams.photoID;

    // Back button function that redirects to previous page
    $scope.back = function() {
        window.history.back();
    };

}]);

// Filter used to obtain the author name and photo ID from the JSON feed
flickrApp.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
    }
});

// Filter used to trim the author's name
flickrApp.filter('rtrim', function () {
    return function(input, chars) {
      var trim = chars || '\\s';
      return input ? input.replace(new RegExp(trim + '+$'), '') : input;
    }
});