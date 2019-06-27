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
angular.module('app').controller('temporaryListCtl', ['$window', '$scope', '$timeout', 'NgTableParams', 'dsFcc', 'appPath', 'dsEdit',
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
                '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ' +
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
            var html = '<div class="ui-grid-cell-contents">{{row.entity.geoLiveType === "SCPLATERESLINK" ? "临时线" : "临时面"}}</div>';
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
         * 显示LinkPid
         * @return {object} html  返回页面
         */
        function getLinkPid() {
            var html = '<div class="ui-grid-cell-contents">{{row.entity.linkPid}}</div>';
            return html;
        }
        /**
         * 获取表格数据;
         * @return {undefined}
         */
        function getData() {
            $scope.loadingFlag = true;
            var linkresult = [];
            var faceResult = [];
            dsEdit.gettemporarylinkResultList().then(function (data) {
                linkresult = data.data;
            }).then($timeout(function () {
                dsEdit.gettemporaryfaceResultList().then(function (data1) {
                    faceResult = data1.data;
                    $scope.loadingFlag = false;
                    var temporaryData = linkresult.concat(faceResult);
                    for (var i = 0; i < temporaryData.length; i++) {
                        temporaryData[i].index = i + 1;
                    }
                    $scope.gridOptions.data = temporaryData;
                });
            })
            );
        }
        /**
         * 初始化数据
         * @author Niuxinyi
         * @date   2017-11-20
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
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                noUnselect: false,
                rowTemplate: formatRow(),
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.grid.registerRowsProcessor(myRowProc, 200);
                },
                columnDefs: [
                    { field: 'index', displayName: '序号', enableSorting: false, minWidth: 30, cellTemplate: getIndex() },
                    { field: 'geoLiveType', displayName: '类型', enableSorting: false, minWidth: 50, cellTemplate: getGeoLiveType() },
                    { field: 'geometryId', displayName: '几何ID', enableSorting: false, minWidth: 100, cellTemplate: getGeometryId() },
                    { field: 'linkPid', displayName: 'linkPID', enableSorting: false, minWidth: 70, cellTemplate: getLinkPid() }

                ]
            };
            getData();
        };
        $scope.$on('ReloadData', initialize);
        $scope.$on('refresh-temporaryResultList', function () {
            getData();
        });
        $scope.$on('$destroy', function () {
            clearFeedback();
            feedbackCtrl.del(feedback);
        });
    }
]);
