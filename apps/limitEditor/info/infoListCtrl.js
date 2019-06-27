/**
 * 作业项界面
 * @author zhaohang
 * @date   2017/9/15
 * @param  {object} $window 窗口
 * @param  {object} $scope 作用域
 * @param  {object} $timeout 定时
 * @param  {object} NgTableParams 构造函数
 * @param  {object} dsFcc 接口服务
 * @param  {object} appPath app路径
 * @param  {object} $ocLazyLoad 延迟加载
 * @param  {object} dsLazyload 延迟加载
 * @return {undefined}
 */
angular.module('app').controller('infoListCtrl', ['$window', '$scope', '$timeout', 'NgTableParams', 'dsFcc', 'appPath', '$ocLazyLoad', 'dsLazyload',
    function ($window, $scope, $timeout, NgTableParams, dsFcc, appPath, $ocLazyLoad, dsLazyload) {
        if (!$scope.testLogin()) {
            return;
        }
        $scope.childListFlag = true; // 当前作业项折叠flag;
        $scope.showFlag = true;
        $scope.selectId = true;
        $scope.regionObj = {
            provinceName: null,
            cityId: null
        };
        /**
         * 显示作业项子内容
         * @method openChildList
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        $scope.openChildList = function () {
            $scope.childListFlag = !$scope.childListFlag;
        };
        $scope.searchModel = {
            pageNum: 1,
            pageSize: 20,
            infoId: '',
            sPublicTime: '',
            ePublicTime: '',
            status: [false, false, false],
            period: [false, false],
            project: [false, false, false, false],
            sortype: '',
            sortord: ''
        };
        $scope.statusData = [
            {
                id: 2,
                label: '已处理'
            },
            {
                id: 1,
                label: '未处理'
            },
            {
                id: 3,
                label: '无法处理'
            }
        ];
        /**
         * 根据实际的行高设置每行的height属性，主要处理grid高度改变后，canvas的高度没有自动变化的问题
         * @author Niuxinyi
         * @date   2017-11-16
         * @param  {object} rows 主要为要显示的信息行列
         * @param  {object} columns 主要为要显示的信息行列
         * @return {object} rows 包含行高
         */
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
        /**
         * 获取数据，对开始、结束、下发时间用正则表达式进行转换
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        function getData() {
            var status = [];
            var period = [];
            var projectType = [];
            var sPublicTime = $scope.searchModel.sPublicTime;
            var ePublicTime = $scope.searchModel.ePublicTime;
            var params = {
                type: 'SCPLATERESINFO',
                condition: {
                    adminArea: $scope.regionObj.cityId,
                    infoCode: $scope.searchModel.infoId,
                    pageSize: $scope.searchModel.pageSize,
                    pageNum: $scope.searchModel.pageNum,
                    sortype: $scope.searchModel.sortype,
                    sortord: $scope.searchModel.sortord
                }
            };
            if (sPublicTime && ePublicTime) {
                sPublicTime = sPublicTime.replace(new RegExp(/(-)/g), '');
                ePublicTime = ePublicTime.replace(new RegExp(/(-)/g), '');
                params.condition.ePublicTime = ePublicTime;
                params.condition.sPublicTime = sPublicTime;
            }
            if ($scope.searchModel.status[0]) {
                status.push(1);
            }
            if ($scope.searchModel.status[1]) {
                status.push(2);
            }
            if ($scope.searchModel.status[2]) {
                status.push(3);
            }
            if ($scope.searchModel.period[0]) {
                period.push('S');
            }
            if ($scope.searchModel.period[1]) {
                period.push('D');
            }
            if ($scope.searchModel.project[0]) {
                projectType.push('新增');
            }
            if ($scope.searchModel.project[1]) {
                projectType.push('改属性');
            }
            if ($scope.searchModel.project[2]) {
                projectType.push('删除');
            }
            if ($scope.searchModel.project[3]) {
                projectType.push('改扩建');
            }
            params.condition.complete = status;
            params.condition.condition = period;
            params.condition.projectType = projectType;
            dsFcc.getInfoListData(params).then(function (data) {
                var ret = [];
                var total = 0;
                if (data.data && data.data.length !== 0 && data != -1) {
                    for (var i = 0, len = data.data.length; i < len; i++) {
                        var temp = data.data[i];
                        temp.pageIndex = i + 1;
                        for (var j = 0; j < $scope.cityList.length; j++) {
                            if ($scope.regionObj.cityId == $scope.cityList[j].id) {
                                temp.cityName = $scope.cityList[j].name;
                            }
                        }
                        ret.push(temp);
                    }
                    total = data.total;
                }
                $scope.gridOptions.totalItems = total;
                $scope.gridOptions.data = ret;
            });
        }
        /**
         * 行政区划选择数据
         * @method changeCityId
         * @author Niuxinyi
         * @date   2017-11-16
         * @param  {object} value 行政区划里选择的值
         * @return {undefined}
         */
        $scope.changeCityId = function (value) {
            if (value) {
                $scope.regionObj.cityId = value;
            }
        };
        /**
         * 行政区划选择数据
         * @method changeProvince
         * @author Niuxinyi
         * @date   2017-11-16
         * @param  {object} value 行政区划里选择的值
         * @return {undefined}
         */
        $scope.changeProvince = function (value) {
            $scope.regionObj.provinceName = value;
            for (var i = 0; i < CityList.length; i++) {
                if (CityList[i].province === $scope.regionObj.provinceName) {
                    $scope.cityList = CityList[i].city;
                    $scope.regionObj.cityId = CityList[i].city[0].id;
                }
            }
        };
        /**
         * 查询数据
         * @method searchList
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        $scope.searchList = function () {
            getData();
        };
        /**
         * 获取数据行内信息
         * @method searchGroupList
         * @author Niuxinyi
         * @date   2017-11-16
         * @param  {object} row 每行数据
         * @return {undefined}
         */
        $scope.searchGroupList = function (row) {
            App.Temp.infoToGroupData = {
                infoId: row.entity.infoIntelId,
                cityId: $scope.regionObj.cityId,
                cityName: row.entity.cityName,
                condition: row.entity.condition
            };
            var sessionData = {
                infoToGroupData: App.Temp.infoToGroupData
            };
            App.Util.setSessionStorage('infoData', sessionData);
            window.location.href = '#/group?access_token=' + App.Temp.accessToken + '&random=' + Math.floor(Math.random() * 100);
        };
        /**
         * 显示序号;
         * @method getIndex
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {object} html 包括序号，显示在页面
         */
        function getIndex() {
            var html = '<div class="ui-grid-cell-contents">{{(grid.appScope.searchModel.pageNum - 1) * grid.appScope.searchModel.pageSize + row.entity.pageIndex}}</div>';
            return html;
        }
        /**
         * 获取来源网址
         * @method getUrl
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {object} html 包含来源网址，显示在页面
         */
        function getUrl() {
            var html = '<div class="ui-grid-cell-contents" ng-repeat="item in row.entity.url.split(\';\') track by $index"><a href="{{item}}" target="_blank">{{item}}</a></div>';
            return html;
        }
        /**
         * 获取限行长短期
         * @method getPeriod
         * @author Niuxinyi
         * @date   2017-11-16
         *@return {object} html 包含限行长短期的值，显示在页面
         */
        function getPeriod() {
            var html = '<div class="ui-grid-cell-contents">{{row.entity.condition === "S" ? "长期" : "短期"}}</div>';
            return html;
        }
        /**
         * 获取完成状态
         * @method getStatus
         * @author Niuxinyi
         * @date   2017-11-16
         *@return {object} html 包含完成状态的内容，显示在页面
         */
        function getStatus() {
            var html = '<div class="ui-grid-cell-contents">{{row.entity.complete === 1 ? "未处理" : row.entity.complete === 2 ? "已处理" : " "}}</div>';
            return html;
        }
        /**
         * 获取新闻内容
         * @method getContent
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {object} html 包含内容截取0至19，显示在页面
         */
        function getContent() {
            var html = '<div class="ui-grid-cell-contents" title="{{row.entity.infoContent}}">{{row.entity.infoContent.substring(0, 19)}}</div>';
            return html;
        }
        /**
         * 获取更多，进行数据查看
         * @method more
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {object} html 包含内容查看图片，显示在页面
         */
        function more() {
            var html = '<div class="ui-grid-cell-contents">' +
                '<div class="search-icon" title="查看" ng-click="grid.appScope.searchGroupList(row)"></div></div>';
            return html;
        }
        /**
         * 显示加载
         * @method showLoading
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        $scope.showLoading = function () {
            if (!$scope.loading.flag) {
                $scope.loading.flag = true;
            }
        };
        /**
         * 隐藏加载
         * @method showLoading
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        $scope.hideLoading = function () {
            if ($scope.loading.flag) {
                $scope.loading.flag = false;
            }
        };
        /**
         * 初始化数据
         * @method showLoading
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        var initialize = function () {
            $scope.provinceList = [];
            $scope.regionObj.provinceName = '北京市';
            for (var i = 0; i < CityList.length; i++) {
                $scope.provinceList.push(CityList[i].province);
                if (CityList[i].province === $scope.regionObj.provinceName) {
                    $scope.cityList = CityList[i].city;
                    $scope.regionObj.cityId = CityList[i].city[0].id;
                }
            }
            var date = new Date();
            var preDate = new Date();
            preDate.setDate(new Date().getDate() - 30);
            var year = date.getFullYear();
            var preYear = preDate.getFullYear();
            var month = date.getMonth() + 1;
            var preMonth = preDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month.toString();
            } else {
                month = month.toString();
            }
            if (preMonth < 10) {
                preMonth = '0' + preMonth.toString();
            } else {
                preMonth = preMonth.toString();
            }
            var day = date.getDate();
            var preDay = preDate.getDate();
            if (day < 10) {
                day = '0' + day.toString();
            } else {
                day = day.toString();
            }
            if (preDay < 10) {
                preDay = '0' + preDay.toString();
            } else {
                preDay = preDay.toString();
            }
            var time = year.toString() + '-' + month + '-' + day.toString();
            var preTime = preYear.toString() + '-' + preMonth + '-' + preDay.toString();
            $scope.searchModel.sPublicTime = preTime;
            $scope.searchModel.ePublicTime = time;
            $scope.gridOptions = {
                useExternalSorting: true,
                enableColumnMenus: false,
                useExternalPagination: true,
                paginationPageSizes: [10, 20, 50], // 每页显示个数选项
                paginationCurrentPage: $scope.searchModel.pageNum, // 当前的页码
                paginationPageSize: $scope.searchModel.pageSize, // 每页显示个数
                paginationTemplate: appPath.tool + 'uiGridPager/uiGridPagerTmpl.htm',
                enableFullRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                noUnselect: false,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    // 处理改变列表高度后，滚动条跳动的问题
                    gridApi.grid.registerRowsProcessor(myRowProc, 200);
                    // 分页事件;
                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $scope.searchModel.pageNum = newPage;
                        $scope.searchModel.pageSize = pageSize;
                        getData();
                        getData(function (data) {
                            // 翻页后自动滚动到第一条数据
                            $timeout(function () {
                                gridApi.core.scrollTo(data[0]);
                            });
                        });
                    });
                    $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        if (sortColumns.length) {
                            var sortord = sortColumns[0].sort.direction;
                            var sortype = sortColumns[0].field;
                            $scope.searchModel.sortord = sortord;
                            $scope.searchModel.sortype = sortype;
                            getData();
                        }
                    });
                },
                columnDefs: [
                    {
                        field: 'id',
                        displayName: '序号',
                        enableSorting: false,
                        maxWidth: 50,
                        cellTemplate: getIndex()
                    },
                    {
                        field: 'infoCode',
                        displayName: '情报编码',
                        enableSorting: false,
                        minWidth: 100,
                        cellClass: 'center'
                    },
                    {
                        field: 'adminCode',
                        displayName: '行政区划',
                        enableSorting: false,
                        minWidth: 50,
                        cellClass: 'center'
                    },
                    {
                        field: 'url',
                        displayName: '来源网址',
                        enableSorting: false,
                        minWidth: 100,
                        cellClass: 'center',
                        cellTemplate: getUrl()
                    },
                    {
                        field: 'infoContent',
                        displayName: '新闻内容',
                        enableSorting: false,
                        minWidth: 100,
                        cellClass: 'center',
                        cellTemplate: getContent()
                    },
                    {
                        field: 'projectType',
                        displayName: '工程类型',
                        enableSorting: false,
                        minWidth: 100,
                        cellClass: 'center'
                    },
                    {
                        field: 'newsTime',
                        displayName: '发布日期',
                        enableSorting: true,
                        minWidth: 50,
                        cellClass: 'center'
                    },
                    {
                        field: 'publicTime',
                        displayName: '下发日期',
                        enableSorting: true,
                        minWidth: 50,
                        cellClass: 'center'
                    },
                    {
                        field: 'condition',
                        displayName: '限行长短期',
                        enableSorting: true,
                        minWidth: 50,
                        maxWidth: 100,
                        cellClass: 'center',
                        cellTemplate: getPeriod()
                    },
                    {
                        field: 'complete',
                        displayName: '完成状态',
                        enableSorting: true,
                        minWidth: 50,
                        cellClass: 'center',
                        maxWidth: 100,
                        cellTemplate: getStatus()
                    },
                    {
                        field: 'more',
                        displayName: '查看',
                        enableSorting: false,
                        minWidth: 30,
                        cellClass: 'center',
                        cellTemplate: more()
                    },
                    {
                        field: 'memo',
                        displayName: '备注',
                        enableSorting: false,
                        minWidth: 30,
                        cellClass: 'center'
                    }
                ]
            };
            getData();
        };
        initialize();
        $scope.$on('$destroy', function () {

        });
    }
]);
