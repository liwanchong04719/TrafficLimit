/**
 * Created by zhaohang on 2017/10/12.
 */
angular.module('app').controller('infoListPanelCtl', ['$window', '$scope', '$timeout', 'NgTableParams', 'dsFcc', 'appPath', 'dsEdit',
    function ($window, $scope, $timeout, NgTableParams, dsFcc, appPath, dsEdit) {
        var infoData = App.Temp.infoToGroupData;
        var groupId = App.Temp.groupId;
        $scope.statusData = [
            {
                id: 1,
                label: '未处理'
            },
            {
                id: 2,
                label: '已处理'
            },
            {
                id: 3,
                label: '无法处理'
            }
        ];
        $scope.groupId = groupId;
        $scope.cityName = infoData.cityName;
        $scope.saveInfo = function () {
            var params = {
                command: 'UPDATE',
                type: 'SCPLATERESINFO',
                infoIntelId: infoData.infoId,
                data: {
                    objStatus: 'UPDATE',
                    complete: $scope.complete,
                    memo: $scope.memo
                }
            };
            var params1 = [{
                infoIntelId: infoData.infoId,
                complete: $scope.complete,
                memo: $scope.memo
            }];
            dsFcc.updateToInfoDepartments(params1).then(function (data) {
                dsFcc.updateInfoList(params).then(function (data1) {
                    swal('提示', '修改成功', 'success');
                    $scope.getData();
                });
            });
        };
        var typeJson = {
            1: '新增',
            2: '删除',
            3: '修改',
            4: '已制作'
        };

        $scope.getData = function () {
            var paramGroup = {
                type: 'SCPLATERESGROUP',
                condition: {
                    adminArea: infoData.cityId,
                    groupId: groupId
                }
            };
            var paramInfo = {
                type: 'SCPLATERESINFO',
                condition: {
                    adminArea: infoData.cityId,
                    infoIntelId: infoData.infoId,
                    pageSize: 20,
                    pageNum: 1
                }
            };
            dsFcc.getGroupList(paramGroup).then(function (res) {
                if (res !== -1) {
                    var item = res.data[0]; //  主键查询，查询成功只会有一条数据
                    $scope.groupType = typeJson[item.groupType];
                    $scope.principle = item.principle;
                    dsFcc.getInfoListData(paramInfo).then(function (res1) {
                        if (res1 !== -1) {
                            var item1 = res1.data[0]; //  主键查询，查询成功只会有一条数据
                            $scope.infoCode = item1.infoCode;
                            $scope.url = item1.url.split(';');
                            $scope.newsTime = item1.newsTime;
                            $scope.publicTime = item1.publicTime;
                            $scope.infoContent = item1.infoContent;
                            $scope.condition = item1.condition === 'S' ? '长期' : '短期';
                            $scope.complete = item1.complete;
                            $scope.memo = item1.memo;
                            $scope.projectType = item1.projectType;
                        }
                    });
                }
            });
        };

        var initialize = function () {
            $scope.getData();
        };

        // 关闭面板;
        $scope.closePanel = function () {
            $scope.$emit('closeLeftInfoListPanel');
        };

        var unbindHandler = $scope.$on('infoListPanelReload', initialize);

        $scope.$on('$destroy', function () {
            unbindHandler = null;
        });
    }
]);
