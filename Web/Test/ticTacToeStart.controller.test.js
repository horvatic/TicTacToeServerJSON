describe('ticTacToeApp', function () {
		
    beforeEach(angular.mock.module('ticTacToeApp'));

    var $controller, $httpBackend;

    beforeEach(angular.mock.inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        authRequestHandler = $httpBackend.when('GET', 'http://127.0.0.1:8080')
                               .respond({ board: ["-1-", "-2-", "-3-", "-4-", "-5-", "-6-", "-7-", "-8-", "-9-"] });
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('Setting Scope', function () {
        it('Read Json Form Server', function () {
            var $scope = {};
            $controller('ticTacToeStartController', { $scope: $scope });
            $httpBackend.expectGET('http://127.0.0.1:8080');
            $httpBackend.flush();
            expect($scope.board).toEqual([["-1-", "-2-", "-3-"], ["-4-", "-5-", "-6-"], ["-7-", "-8-", "-9-"]]);
        });
    });


});