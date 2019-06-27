/**
 * 返回情报列表中新增记录
 * @author zhaohang
 * @date   2017/9/22
 * @param  {object} $window 窗口
 * @param  {object} $scope 作用域
 * @param  {object} $timeout 定时
 * @param  {object} NgTableParams 构造函数
 * @param  {object} dsFcc 接口服务
 * @param  {object} appPath app路径
 * @return {undefined}
 */
angular.module('app').controller('addGroupCtrl', ['$window', '$scope', '$timeout', 'NgTableParams', 'dsFcc', 'appPath',
    function ($window, $scope, $timeout, NgTableParams, dsFcc, appPath) {
        /**
         * 初始化数据
         * @author Niuxinyi
         * @date   2017-11-16
         * @param  {object} none
         * @return none
         */
        $scope.cityName = App.Temp.infoToGroupData.cityName;
        $scope.row = [
            {
                time: '',
                target: '',
                range: '',
                strategy: ''
            }
        ];
        /**
         * 弹出框添加数据功能
         * @method addItem
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        $scope.addItem = function () {
            $scope.row.push({
                time: '',
                target: '',
                range: '',
                strategy: ''
            });
        };
        /**
         * 弹出框删除数据功能
         * @method deleteItem
         * @author Niuxinyi
         * @date   2017-11-16
         * @param  {object} index 当前数据索引
         * @return {undefined}
         */
        $scope.deleteItem = function (index) {
            if ($scope.row.length === 1) {
                return;
            }
            $scope.row.splice(index, 1);
        };
        /**
         * 弹出框数据内容输入限制，禁止输入“|”
         * @method limit
         * @author Niuxinyi
         * @date   2017-11-16
         * @param  {object} event 包括事件
         * @param  {object} index 包括索引
         * @param  {object} name 包括命名
         * @return {undefined}
         */
        $scope.limit = function (event, index, name) {
            if (event.keyCode === 220) {
                swal('提示', '不能输入"|"', 'warning');
                $scope.row[index][name] = $scope.row[index][name].substring(0, $scope.row[index][name].length - 1);
            }
        };
        /**
         * 弹出框数据进行保存操作
         * @method saveGroup
         * @author Niuxinyi
         * @date   2017-11-16
         * @return {undefined}
         */
        $scope.saveGroup = function () {
            var principle = '';
            for (var i = 0; i < $scope.row.length; i++) {
                if (!$scope.row[i].time) {
                    swal('提示', '请输入限制时间', 'warning');
                    return;
                }
                if (!$scope.row[i].target) {
                    swal('提示', '请输入限行对象', 'warning');
                    return;
                }
                if (!$scope.row[i].range) {
                    swal('提示', '请输入限行范围', 'warning');
                    return;
                }
                if (!$scope.row[i].strategy) {
                    swal('提示', '请输入限行策略', 'warning');
                    return;
                }
                var str = '限行时间:' + $scope.row[i].time + '|限行对象:' + $scope.row[i].target + '|限行范围:' + $scope.row[i].range + '|限行策略:' + $scope.row[i].strategy;

                // 转换非法字符（自定义范围内）
                var str1 = $scope.replaceIllegalChar(str);
                // 非中文的字符全角转半角
                str = $scope.ToCDB(str1);
                // 校验字符串格式
                if ($scope.matchResult(str)) {
                    var result = str.match(/[^a-z0-9A-Z\u4e00-\u9fa5-;,:()\\|]/g);
                    swal('提示', '存在非法字符 ' + result.toString(), 'warning');
                    return;
                }
                if (i + 1 === $scope.row.length) {
                    principle += str;
                } else {
                    principle = principle + str + '||';
                }
                if (principle.length >= 600) {
                    swal('提示', '超出最大字段长度', 'warning');
                    return;
                }
            }
            var params = {
                command: 'CREATE',
                type: 'SCPLATERESGROUP',
                data: {
                    infoIntelId: App.Temp.infoToGroupData.infoId,
                    adAdmin: App.Temp.infoToGroupData.cityId,
                    groupType: 1,
                    principle: principle,
                    condition: App.Temp.infoToGroupData.condition
                }
            };
            dsFcc.addGroup(params).then(function (data) {
                $scope.$emit('closeGroupDialog', 'addGroup');
                swal('提示', '保存成功', 'success');
            });
        };
        var initialize = function () {
            $scope.principle = '';
        };

        var unbindHandler = $scope.$on('ReloadData-addGroup', initialize);
        $scope.$on('$destroy', function (event, data) {

        });
        $scope.replaceIllegalChar = function (str) {
            var regex1 = /[→—―\-\-]/g;
            str = str.replace(regex1, '-');
            var regex2 = /[“”"《》\s\t\n]/g;
            str = str.replace(regex2, '');
            var regex3 = /[、。；]/g;
            str = str.replace(regex3, ';');
            str = str.replace(/[<]/g, '小于');
            str = str.replace(/[>]/g, '大于');
            str = str.replace(/[︰]/g, ':');
            str = str.replace(/[Ⅰ]/g, 'I');
            str = str.replace(/[Ⅱ]/g, 'II');
            str = str.replace(/[Ⅲ]/g, 'III');
            str = str.replace(/[Ⅳ]/g, 'IV');
            str = str.replace(/[Ⅴ]/g, 'V');
            str = str.replace(/[〉]/g, ')');
            str = str.replace(/[〈]/g, '(');

            return str;
        };
        // 匹配字符
        $scope.matchResult = function (str) {
            var regex = /[^a-z0-9A-Z\u4e00-\u9fa5-;,:()\\|]/;
            if (regex.test(str)) {
                return true;
            }
            return false;
        };
        // 全角自动转成半角
        $scope.ToCDB = function (str) { // 全角转半角
            var tmp;
            if (str) {
                tmp = '';
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) == 12288) {
                        tmp += String.fromCharCode(32);
                    } else if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
                    } else {
                        tmp += str[i];
                    }
                }
            } else {
                tmp = str;
            }
            return tmp;
        };
    }
]);
