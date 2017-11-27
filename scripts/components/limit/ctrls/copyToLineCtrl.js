/**
 * Created by zhaohang on 2017/11/7.
 */
angular.module('app').controller('copyToLineCtl', ['$scope', '$timeout', 'dsEdit', 'appPath', '$ocLazyLoad', function ($scope, $timeout, dsEdit, appPath, $ocLazyLoad) {
    var eventCtrl = fastmap.uikit.EventController();
    var selectCtrl = fastmap.uikit.SelectController();
    var layerCtrl = fastmap.uikit.LayerController();
    var objCtrl = fastmap.uikit.ObjectEditController();
    var highRenderCtrl = fastmap.uikit.HighRenderController();

    $scope.limit = [{
        id: '1',
        label: '限行'
    }, {
        id: '2',
        label: '不限行'
    }];
    $scope.initializeData = function () {
        $scope.copyToLineDate = objCtrl.data;
    };

    var unbindHandler = $scope.$on('ReloadData', $scope.initializeData);

    $scope.$on('$destroy', function () {
        unbindHandler = null;
    });
}]);
