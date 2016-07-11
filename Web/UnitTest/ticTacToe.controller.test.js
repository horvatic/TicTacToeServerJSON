describe('ticTacToeApp', function () {
		
    beforeEach(angular.mock.module('ticTacToeApp'));

    var $controller, $httpBackend;

    beforeEach(angular.mock.inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        authRequestHandler = $httpBackend.when('GET', 'http://127.0.0.1:8080')
                               .respond({
                                   board: ["-1-", "-2-", "-3-", "-4-", "-5-", "-6-", "-7-", "-8-", "-9-"],
                                   gameOver: "false"
                               });
        authRequestHandler = $httpBackend.when('POST', 'http://127.0.0.1:8080')
                               .respond({
                                   board: ["x", "@", "-3-", "-4-", "-5-", "-6-", "-7-", "-8-", "-9-"],
                                   gameOver: "true"
                               });
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('Setting Scope', function () {
        it('Read Json Form Server', function () {
            var $scope = {};
            $controller('ticTacToeController', { $scope: $scope });
            $httpBackend.expectGET('http://127.0.0.1:8080');
            $httpBackend.flush();
            expect($scope.gameOver).toEqual("false");
            expect($scope.board).toEqual([["-1-",
                "-2-", "-3-"],
                ["-4-", "-5-", "-6-"],
                ["-7-", "-8-", "-9-"]]);
            expect(window.board).toEqual(["-1-",
                "-2-", "-3-",
                "-4-", "-5-", "-6-",
                "-7-", "-8-", "-9-"]);
            window.board = null;
        });
    });

    describe('Making Move', function () {
        it('Read Json Form Server', function () {
            var $scope = {};
            $controller('ticTacToeController', { $scope: $scope });
            $scope.makeMove(1);
            $httpBackend.expectPOST('http://127.0.0.1:8080');
            $httpBackend.flush();
            expect($scope.gameOver).toEqual("true");
            expect($scope.board).toEqual([["x",
                "@", "-3-"],
                ["-4-", "-5-", "-6-"],
                ["-7-", "-8-", "-9-"]]);
            expect(window.board).toEqual(["x",
            "@", "-3-",
            "-4-", "-5-", "-6-",
            "-7-", "-8-", "-9-"]);
            window.board = null;
        });
    });
});