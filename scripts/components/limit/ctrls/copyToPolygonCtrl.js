/**
 * 复制到面
 * @author zhaohang
 * @date   2017/11/8
 * @param  {object} $scope 作用域
 * @param  {object} $timeout 定时
 * @param  {object} dsEdit 编辑
 * @param  {object} appPath app路径
 * @param  {object} $ocLazyLoad 延时加载
 * @return {undefined}
 */
angular.module('app').controller('copyToPolygonCtl', ['$scope', '$timeout', 'dsEdit', 'appPath', '$ocLazyLoad', function ($scope, $timeout, dsEdit, appPath, $ocLazyLoad) {
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
    /**
     * 初始化数据
     * @author Niuxinyi
     * @date   2017-11-20
     * @return {undefined}
     */
    $scope.initializeData = function () {
        $scope.copyToPolygonDate = objCtrl.data;
    };

    var unbindHandler = $scope.$on('ReloadData', $scope.initializeData);

    $scope.$on('$destroy', function () {
        unbindHandler = null;
    });
}]);
