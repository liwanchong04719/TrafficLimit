/**
 * 批量删除
 * @author zhaohang
 * @date   2017/11/1
 * @param  {object} $window 窗口
 * @param  {object} $scope 作用域
 * @param  {object} $timeout 定时
 * @param  {object} NgTableParams 构造函数
 * @param  {object} dsFcc 接口服务
 * @param  {object} appPath app路径
 * @param  {object} $ocLazyLoad 延时加载
 * @return {undefined}
 */
angular.module('app').controller('dataDifferenceCtrl', ['$window', '$scope', '$timeout', 'NgTableParams', 'dsFcc', 'appPath', 'dsEdit', '$ocLazyLoad', '$compile',
    function ($window, $scope, $timeout, NgTableParams, dsFcc, appPath, dsEdit, $ocLazyLoad, $compile) {
        var eventCtrl = new fastmap.uikit.EventController();
        var feedbackCtrl = fastmap.mapApi.FeedbackController.getInstance();
        var symbolFactory = fastmap.mapApi.symbol.GetSymbolFactory();
        var linkSymbol = symbolFactory.getSymbol('ls_link_selected');
        var faceSymbol = symbolFactory.getSymbol('pt_face');
        var feedback = new fastmap.mapApi.Feedback();
        feedbackCtrl.add(feedback);
        var myRowProc = function (rows, columns) {
            if (rows.length > 0) {
                $timeout(function () {
                    var rowElems = rows[0].grid.element.find('.ui-grid-canvas').children();
                    rows.forEach(function (item, i) {
                        var t = angular.element(rowElems[i]);
                        item.height = t.height();
                    });
                });
            }
            return rows;
        };
        var clearFeedback = function () {
            feedback.clear();
            feedbackCtrl.refresh();
        };
        /**
         * 定位并高亮显示要素
         * @author Niuxinyi
         * @date   2017-11-20
         * @param  {object} row 包括获取的数据的行
         * @return {undefined}
         */
        $scope.showOnMap = function (rdlinkData) {
            $scope.$emit('LocateObject', { feature: rdlinkData });  //  定位

            var symbol = rdlinkData.geometry.type === 'LineString' ? linkSymbol : faceSymbol;
            feedback.clear();
            feedback.add(rdlinkData.geometry, symbol);
            feedbackCtrl.refresh();
        };
        /**
         * 获取高亮定位数据
         * @author Niuxinyi
         * @date   2017-11-20
         * @param  {object} row 包括获取的数据的行
         * @return {undefined}
         */
        $scope.location = function (linkPid, geometryId, type) {
            var rdlinkData = null;
            // 新增数据需要查询母库数据
            if (type == 'add') {
                dsEdit.getByPids([linkPid], 'RDLINK').then(function (data) {
                    rdlinkData = data[0];
                    $scope.showOnMap(rdlinkData);
                });
            } else {
                // 删除或者修改需要查询 元数据rdlink表
                dsEdit.getMetaDataByCondition(linkPid, geometryId).then(function (data) {
                    rdlinkData = data.data[0];
                    rdlinkData.geometry = rdlinkData.geometryRdlink;
                    $scope.showOnMap(rdlinkData);
                });
            }
        };
        // 获取表格数据
        var getTableData = function () {
            var dataList = [];
            dsEdit.getdataDifferenceResultList().then(function (data) {
                var delData = data.del;
                for (var i = 0; i < delData.length; i++) {
                    var obj = delData[i];
                    for (var p1 in obj) {
                        if (obj.hasOwnProperty(p1)) {
                            obj.geometryId = p1;
                            obj.linkPid = obj[p1];
                        }
                    }
                    obj.type = 'delete';
                    dataList.push(obj);
                }

                var addData = data.add;
                for (var k = 0; k < addData.length; k++) {
                    var ob = addData[k];
                    for (var p2 in ob) {
                        if (ob.hasOwnProperty(p2)) {
                            ob.geometryId = p2;
                            ob.linkPid = ob[p2];
                        }
                    }
                    ob.type = 'add';
                    dataList.push(ob);
                }
                var changeData = data.change;
                for (var j = 0; j < changeData.length; j++) {
                    var object = changeData[j];
                    for (var p3 in object) {
                        if (object.hasOwnProperty(p3)) {
                            object.geometryId = p3;
                            object.linkPid = object[p3];
                        }
                    }
                    object.type = 'change';
                    dataList.push(object);
                }

                for (var n = 0; n < dataList.length; n++) {
                    dataList[n].index = n + 1;
                }
                $scope.gridOptions.data = dataList;
            });
        };

        /**
         * 显示序号
         * @author Niuxinyi
         * @date   2017-11-20
         * @return {object} html  返回页面
         */
        function getIndex() {
            var html = '<div class="ui-grid-cell-contents">{{ row.entity.index}}</div>';
            return html;
        }

        /**
         * 获取数据类型
         * @returns {object} html  返回页面
         */
        function getType() {
            var html = '<div class="ui-grid-cell-contents">{{row.entity.type === "add" ? "新增数据" : row.entity.type === "delete" ? "删除数据" : "修改数据"}}</div>';
            return html;
        }
        /**
         * 获取LInkPID
         * @returns {object} html  返回页面
         */
        function getLinkPID() {
            var html = '<div class="ui-grid-cell-contents" ng-repeat="item in row.entity.linkPid track by $index"><a href="javascript:void(0)" ng-click="grid.appScope.location(item, row.entity.geometryId, row.entity.type)" >{{item}}</a></div>';
            return html;
        }

        /**
         * 显示几何Id
         * @return {object} html  返回页面
         */
        function getGeometryId() {
            var html = '<div class="ui-grid-cell-contents">{{row.entity.geometryId}}</div>';
            return html;
        }
        /**
         * 初始化数据
         * @author Niuxinyi
         * @date   2017-11-20
         * @param  {object} event 包括事件
         * @param  {object} data 包括数据
         * @return {undefined}
         */
        var initialize = function () {
            clearFeedback();
            $scope.groupID = App.Temp.groupId;
            // 初始化表格;
            $scope.gridOptions = {
                useExternalSorting: true,
                enableColumnMenus: false,
                useExternalPagination: false,
                paginationTemplate: appPath.tool + 'uiGridPager/uiGridPagerTmpl.htm',
                enableFullRowSelection: true,
                enableRowHeaderSelection: false,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.grid.registerRowsProcessor(myRowProc, 200);
                },
                columnDefs: [
                    { field: 'index', displayName: '序号', enableSorting: false, minWidth: 50, cellTemplate: getIndex() },
                    { field: 'type', displayName: '类型', enableSorting: false, minWidth: 80, cellTemplate: getType() },
                    { field: 'linkPid', displayName: 'LinkPID', enableSorting: false, minWidth: 120, cellTemplate: getLinkPID() },
                    { field: 'geometryId', displayName: 'GeometryID', enableSorting: false, minWidth: 120, cellTemplate: getGeometryId() }

                ]
            };
            getTableData();
        };
        var unbindHandler = $scope.$on('ReloadData-datadifference', initialize);
        $scope.$on('$destroy', function (event, data) {
            clearFeedback();
            feedbackCtrl.del(feedback);
        });
    }
]);
