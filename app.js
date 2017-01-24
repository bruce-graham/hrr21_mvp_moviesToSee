angular.module('movieApp', [])

.controller('movieController', function($scope) {
    $scope.movieList = [];

    $scope.deleteMovie = function() {
      var previousMovieList = $scope.movieList;
      $scope.movieList = [];

      angular.forEach(previousMovieList, function(n) {
        if (!n.done) {
          $scope.movieList.push(n);
        }
      });
    };

    $scope.addMovie = function() {
      $scope.movieList.push({title:$scope.movieInput, done:false});
      $scope.movieInput = "";
    };
});