/**
 * 限行线TopoEditor
 * @author zhaohang
 * @date   2017/11/15
 * @class  fastmap.uikit.topoEdit.LimitLineTopoEditor
 * @return {undefined}
 */
fastmap.uikit.topoEdit.LimitLineTopoEditor = fastmap.uikit.topoEdit.TopoEditor.extend({
    initialize: function (map) {
        fastmap.uikit.topoEdit.TopoEditor.prototype.initialize.call(this, map);

        // 绑定函数作用域
        FM.Util.bind(this);
        this.eventController = fastmap.uikit.EventController();
    },
    /**
     * 创建工具需要使用的EditResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */
    getBatchEditResult: function (options) {
        var editResult = new fastmap.uikit.complexEdit.BatchEditLimitResult();
        editResult.geoLiveType = 'LIMITLINE';
        return editResult;
    },
    /**
     * 创建工具需要使用的DeleteResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */
    getBatchDeleteResult: function (options) {
        var editResult = new fastmap.uikit.complexEdit.BatchEditLimitResult();
        editResult.geoLiveType = 'LIMITLINE';
        return editResult;
    },

    /**
     * 更新
     * @param {object} geoLiveObject 几何对象
     * @returns {object} params
     */

    updateChanges: function (geoLiveObject) {
        var params = {
            type: 'SCPLATERESRDLINK',
            command: 'UPDATE',
            dbId: App.Temp.dbId,
            limitDir: geoLiveObject.linkDir,
            data: [{
                geometryId: geoLiveObject.geometryId,
                linkPid: geoLiveObject.pid
            }]
        };
        return this.dataServiceFcc.deleteLine(params);
    },

    /**
     * 删除
     * @param {object} id id号
     * @param {object} geoLiveObject 几何对象
     * @returns {object} params
     */

    deleteLimit: function (id, geometryId) {
        var params = {
            type: 'SCPLATERESRDLINK',
            command: 'DELETE',
            dbId: App.Temp.dbId,
            data: [{
                geometryId: geometryId,
                linkPid: id
            }]
        };
        return this.dataServiceFcc.deleteLine(params);
    },

    canDelete: function (geoLiveObject) {
        return false;
    },

    /**
     * 查询
     * @param {object} options 选项
     * @returns {object} 包括pid、geoLiveType、geometry、 linkDir、geometryId
     */

    query: function (options) {
        return {
            pid: options.pid,
            geoLiveType: options.geoLiveType,
            geometry: options.geometry,
            linkDir: options.linkDir,
            geometryId: options.geometryId,
            groupId: options.groupId
        };
    }
});

