(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.myMessage = '';
        $scope.dishes = '';
        $scope.messageStyle = {};
        $scope.boxStyle = {};

        $scope.check = function () {
            if ($scope.dishes.trim().length === 0) {
                $scope.myMessage = 'Please enter data first';
                $scope.messageStyle = {
                    color: "red"
                };
                $scope.boxStyle = {
                    border: "1px solid red"
                };
            } else {
                $scope.messageStyle = {
                    color: "green"
                };
                $scope.boxStyle = {
                    border: "1px solid green"
                };
                var arr = $scope.dishes.split(',').filter(dish => dish.trim() != '');
                if (arr.length === 0) {
                    $scope.myMessage = 'Please enter data first';
                } else if (arr.length < 4) {
                    $scope.myMessage = 'Enjoy';
                } else {
                    $scope.myMessage = 'Too Much';
                }
            }
        }
    }
})();