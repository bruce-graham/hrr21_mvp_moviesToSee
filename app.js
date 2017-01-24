angular.module('movieApp', [])

.controller('movieController', function($scope, $http) {
    $scope.movieList = [];

    $scope.getAllMovies = function () {
      $http({
        method: 'GET',
        url: '/movies'
      }).then(function(resp) {
        return resp.data;
      }).then(function(movies) {
        $scope.movieList = movies;
      })
    }
    $scope.getAllMovies();

    $scope.deleteMovie = function(title) {
      var previousMovieList = $scope.movieList;
      $scope.movieList = [];

      $http({
        method: 'POST',
        url: '/movies:delete',
        data: {
          title: title,
          done: false
        }
      }).then(function(resp) {
        return resp.data;
      })

      angular.forEach(previousMovieList, function(n) {
        if (n.done === false) {
          $scope.movieList.push(n);
        }
      });
    };

    $scope.addMovie = function(title) {
      $scope.movieList.push({title:$scope.movieInput, done:false});
      $scope.movieInput = "";

      $http({
        method: 'POST',
        url: '/movies',
        data: {
          title: title,
          done: false
        }
      }).then(function(resp) {
        return resp.data;
      });
    };
});