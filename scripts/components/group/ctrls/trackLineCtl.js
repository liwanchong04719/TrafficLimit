/**
 * Created by lingLong on 2017/1/12.
 * 批量选择结果
 */
angular.module('app').controller('trackLineCtrl', function ($scope, dsFcc, NgTableParams) {
    var sceneController = fastmap.mapApi.scene.SceneController.getInstance();
    var symbolFactory = fastmap.mapApi.symbol.GetSymbolFactory();
    var symbol = symbolFactory.getSymbol('track_num');
    var feedbackCtrl = fastmap.mapApi.FeedbackController.getInstance();
    var topoEditFactory = fastmap.uikit.topoEdit.TopoEditFactory.getInstance();

    var feedback = new fastmap.mapApi.Feedback();
    feedbackCtrl.add(feedback);

    var clearFeedback = function () {
        feedback.clear();
        feedbackCtrl.refresh();
    };
    /**
     * 复制到线
     * @author Niuxinyi
     * @date   2017-11-20
     * @return {undefined}
     */
    $scope.copyToLine = function () {
        var linkData = $scope.results;
        var links = [];
        for (var i = 0; i < linkData.rows.length; i++) {
            links.push(linkData.rows[i].pid);
        }
        if (links.length === 0) {
            swal('提示', '没有可以复制的link', 'warning');
            return;
        }
        var params = {
            type: 'SCPLATERESLINK',
            command: 'CREATE',
            dbId: App.Temp.dbId,
            data: {
                groupId: App.Temp.groupId,
                links: links
            }
        };
        dsFcc.copyToLine(params).then(function (data) {
            if (data === '属性值未发生变化') {
                swal('提示', '重复复制，请重新选择', 'warning');
                return;
            }
            if (data !== -1) {
                swal('提示', '复制成功', 'success');
                sceneController.redrawLayerByGeoLiveTypes(['COPYTOLINE']);
                $scope.closeAdvanceSearchPanel();
            }
        });
    };
    /**
     * 复制到面
     * @author Niuxinyi
     * @date   2017-11-20
     * @return {undefined}
     */
    $scope.copyToPolygon = function () {
        var linkData = $scope.results;
        var links = [];
        for (var i = 0; i < linkData.rows.length; i++) {
            links.push(linkData.rows[i].pid);
        }
        if (links.length === 0) {
            swal('提示', '没有可以复制的link', 'warning');
            return;
        }
        var params = {
            type: 'SCPLATERESFACE',
            command: 'CREATE',
            dbId: App.Temp.dbId,
            data: {
                groupId: App.Temp.groupId,
                rdlinks: links
            }
        };
        dsFcc.copyToLine(params).then(function (data) {
            if (data === '属性值未发生变化') {
                swal('提示', '重复复制，请重新选择', 'warning');
                return;
            }
            if (data !== -1) {
                swal('提示', '复制成功', 'success');
                sceneController.redrawLayerByGeoLiveTypes(['COPYTOPOLYGON']);
                $scope.closeAdvanceSearchPanel();
            }
        });
    };
    /**
     * 初始化数据
     * @author Niuxinyi
     * @date   2017-11-20
     * @param  {object} event 包括事件
     * @param  {object} data 包括数据
     * @return {undefined}
     */
    var initialize = function (event, data) {
        $scope.results = data;
        $scope.selectedNums = $scope.results.rows.length;
        $scope.highlightRoad($scope.results.rows);   //  默认高亮第一条数据
    };

    $scope.highlightRoad = function (item) {
        var len = item.length;
        if (len === 0) {
            return;
        }

        $scope.$emit('LocateObject', { feature: {
            geometry: item[0].geometry
        } });  //  定位到第一个点的位置

        feedback.clear();

        for (var i = 0; i < len; i++) {
            var cloneSymbol = FM.Util.clone(symbol);
            cloneSymbol.symbols[1].text = i + 1;
            feedback.add(item[i].geometry, cloneSymbol);
        }

        feedbackCtrl.refresh();
    };

    $scope.positionLine = function (item) {
        $scope.$emit('LocateObject', { feature: {
            geometry: item.geometry
        } });  //  定位到第一个点的位置
       // 查询全量数据并数据高亮
        var topoEditor = topoEditFactory.createTopoEditor('TRACKLINE');
        item.geoLiveType = 'RDLINK';
        topoEditor.query(item)
            .then(function (res) {
                if (res) {
                    $scope.$emit('trackLink-HighlightObject', res);
                } else {
                    throw new Error('未查询到任何信息');
                }
            })
            .catch(function (errMsg) {
                swal('提示', errMsg, 'error');
            });
    };
    /**
     * 关闭搜索面板;
     * @author Niuxinyi
     * @date   2017-11-20
     * @return {undefined}
     */
    $scope.closeAdvanceSearchPanel = function () {
        $scope.$emit('CloseInfoPage', { type: 'trackLinePanel' });
    };

    var unbindHandler = $scope.$on('ReloadData', initialize);

    $scope.$on('$destroy', function () {
        clearFeedback();
        feedbackCtrl.del(feedback);
        unbindHandler = null;
    });
});
