angular.module('ticTacToeApp', [])
    .controller('ticTacToeStartController', function ($scope, $http) {
        $http.get("http://127.0.0.1:8080")
            .then(function (response) {
                $scope.board = [];
                while (response.data.board.length)
                    $scope.board.push(response.data.board.splice(0, 3));
            });
});