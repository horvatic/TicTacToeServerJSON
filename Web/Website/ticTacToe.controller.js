angular.module('ticTacToeApp', [])
    .controller('ticTacToeController', function ($scope, $http) {
        $http.get("http://127.0.0.1:8080")
            .then(function (response) {
                $scope.board = [];
                setTicTacToeBoard($scope, response.data.board);
            });

        $scope.makeMove = function (id) {
            var jsonPackage =
                JSON.stringify({
                    "board": window.board,
                    "move": id.toString()
                });

            $http.post("http://127.0.0.1:8080", jsonPackage)
           .then(function (response) {
               $scope.board = [];
               setTicTacToeBoard($scope, response.data.board);
           });
        }
    });

function setTicTacToeBoard(scope, ticTacToeData) {
    window.board = [];
    while (ticTacToeData.length)
        scope.board.push(ticTacToeData.splice(0, 3));
    for (var row = 0; row < scope.board.length; row++)
        window.board = window.board.concat(scope.board[row]);
}