/**
 * 几何成果列表
 * @author zhaohang
 * @date   2017/10/12
 * @param  {object} $window 窗口
 * @param  {object} $scope 作用域
 * @param  {object} $timeout 定时
 * @param  {object} NgTableParams 构造函数
 * @param  {object} dsFcc 接口服务
 * @param  {object} appPath app路径
 * @param  {object} dsEdit 编辑
 * @return {undefined}
 */
angular.module('app').controller('dealfailurelListCtl', ['$window', '$scope', '$timeout', 'NgTableParams', 'dsFcc', 'appPath', 'dsEdit',
    function ($window, $scope, $timeout, NgTableParams, dsFcc, appPath, dsEdit) {
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
        $scope.showOnMap = function (row) {
            if (!row.isSelected) {
                return;
            }

            $scope.$emit('LocateObject', { feature: row.entity });  //  定位

            var symbol = row.entity.geometry.type === 'LineString' ? linkSymbol : faceSymbol;
            feedback.clear();
            feedback.add(row.entity.geometry, symbol);
            feedbackCtrl.refresh();
        };
        /**
         * 格式化row(为了给row绑定事件)
         * @author Niuxinyi
         * @date   2017-11-20
         * @return {object} html 返回页面
         */
        function formatRow() {
            var html = '<div ng-click="grid.appScope.showOnMap(row)">' +
                '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by colRenderIndex" ' +
                'class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';
            return html;
        }

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
         * 获取几何类型
         * @returns {object} html  返回页面
         */
        function getGeoLiveType() {
            var html = '<div class="ui-grid-cell-contents">{{row.entity.geometry.type === "Polygon" ? "面" : "线"}}</div>';
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
         * 获取表格数据;
         * @return {undefined}
         */
        function getData() {
            $scope.loadingFlag = true;
            dsEdit.getdealfailureResultList().then(function (data) {
                var dealfailureData = [];
                if (data !== -1) {
                    dealfailureData = data.data;
                    for (var i = 0; i < dealfailureData.length; i++) {
                        dealfailureData[i].index = i + 1;
                    }
                }
                $scope.gridOptions.data = dealfailureData;
            }).finally(function () {
                $scope.loadingFlag = false;
            });
        }
        /**
         * 初始化数据
         * @author Niuxinyi
         * @date   2017-11-20
         * @return {undefined}
         */
        var initialize = function () {
            clearFeedback();
            // 初始化表格;
            $scope.gridOptions = {
                useExternalSorting: true,
                enableColumnMenus: false,
                useExternalPagination: false,
                paginationTemplate: appPath.tool + 'uiGridPager/uiGridPagerTmpl.htm',
                enableFullRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                noUnselect: false,
                rowTemplate: formatRow(),
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.grid.registerRowsProcessor(myRowProc, 200);
                },
                columnDefs: [
                    { field: 'index', displayName: '序号', enableSorting: false, minWidth: 50, cellTemplate: getIndex() },
                    { field: 'geoLiveType', displayName: '类型', enableSorting: false, minWidth: 80, cellTemplate: getGeoLiveType() },
                    { field: 'geometryId', displayName: '几何ID', enableSorting: false, minWidth: 150, cellTemplate: getGeometryId() }

                ]
            };
            // 初始化表格;
            $timeout(function () {
                getData();
            }, 100);
        };
        $scope.$on('ReloadData', initialize);

        $scope.$on('refresh-dealFailureList', function () {
            getData();
        });
        $scope.$on('$destroy', function () {
            clearFeedback();
            feedbackCtrl.del(feedback);
        });
    }
]);
