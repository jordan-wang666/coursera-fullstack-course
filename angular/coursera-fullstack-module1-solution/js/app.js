(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.message = '';
        $scope.dishes = '';
        $scope.messageStyle = {};
        $scope.boxStyle = {};

        $scope.check = function () {
            if ($scope.dishes.trim().length === 0) {
                $scope.message = 'Please enter data first';
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
                    $scope.message = 'Please enter data first';
                } else if (arr.length < 4) {
                    $scope.message = 'Enjoy';
                } else {
                    $scope.message = 'Too Much';
                }
            }
        }
    }
})();