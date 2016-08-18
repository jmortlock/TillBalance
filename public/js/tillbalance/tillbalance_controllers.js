'use strict';

/* Controllers */

var tillBalanceControllers = angular.module('hal.sysnet.tillbalance.controllers', []);

tillBalanceControllers.controller('TillBalanceDetailCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {

    $http.get('json/tillbalance/' + $stateParams.id + '.json').success(function (data) {
        $scope.item = data;
    });

}]);

tillBalanceControllers.controller('ModalDemoCtrl', ['$scope', '$http', '$uibModal', '$log', '$filter', function ($scope, $http, $uibModal, $log, $filter) {

    $http.get('json/tillbalance/denominations.json').success(function (data) {
        $scope.items = data;
    });

    $scope.animationsEnabled = true;
    $scope.editTender = {};

    $scope.open = function (size, tender) {
        $scope.editTender = tender;

        var modalInstance = $uibModal.open({

            animation: $scope.animationsEnabled,
            templateUrl: 'partials/tillbalance/cash_entry_modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            $scope.editTender.amount.actual = selectedItem;

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !scope.animationsEnabled;
    };
}]);


tillBalanceControllers.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$log', 'items', function ($scope, $uibModalInstance, $log, items) {
    $scope.items = items;

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.calculateTotalAmount = function (input) {
        var totalSum = 0;
        for (var x = 0; x < $scope.items.length; x++) {
            totalSum += $scope.items[x].quantity * $scope.items[x].value;
        }
        return Number(totalSum);
    };

    $scope.ok = function () {

        $uibModalInstance.close($scope.calculateTotalAmount());
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);


tillBalanceControllers.controller('TillBalanceListTableCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('json/tillbalance/read_list.json').success(function (data) {
        $scope.data = data;
    });

    $scope.orderProp = "Station";
    $scope.showProcessed = true;

    $scope.showProcessedFilter = function (item) {
        return $scope.showProcessed || item && item.Processed == false;
    }
}]);



tillBalanceControllers.controller('NavBarCtrl', ['$scope', function ($scope) {
    $scope.isCollapsed = true;

    $scope.module = 'Till Balance';

    $scope.actions = [
      { 'name': 'Till Reads', 'route': 'tillread' },
      { 'name': 'Floats', 'route': 'floats' },
      { 'name': 'Float Templates', 'route': 'float_templates' },
    ];

}]);



