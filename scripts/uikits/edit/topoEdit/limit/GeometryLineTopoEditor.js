/**
 * 几何成果线TopoEditor
 * @author zhaohang
 * @date   2017/10/19
 * @class fastmap.uikit.topoEdit.GeometryLineTopoEditor
 * @return {undefined}
 */
fastmap.uikit.topoEdit.GeometryLineTopoEditor = fastmap.uikit.topoEdit.TopoEditor.extend({
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
        editResult.geoLiveType = 'GEOMETRYLINE';
        return editResult;
    },
    /**
     * 创建工具需要使用的DeleteResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */
    getBatchDeleteResult: function (options) {
        var editResult = new fastmap.uikit.complexEdit.BatchEditLimitResult();
        editResult.geoLiveType = 'GEOMETRYLINE';
        return editResult;
    },
    /**
     * 创建工具需要使用的ModifyEditResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */
    getModifyEditResult: function (options) {
        var originObject = options.originObject;
        var editResult = new fastmap.uikit.shapeEdit.PathResult();
        editResult.originObject = originObject;
        editResult.geoLiveType = 'GEOMETRYLINE';
        editResult.finalGeometry = FM.Util.clone(options.originObject.geometry);
        editResult.snapActors = [
            {
                id: options.originObject.pid,
                geoLiveType: 'RDNODE',
                priority: 4,
                enable: true,
                exceptions: []
            },
            {
                id: options.originObject.pid,
                geoLiveType: 'COPYTOLINE',
                priority: 2,
                enable: true,
                exceptions: []
            },
            {
                id: options.originObject.pid,
                geoLiveType: 'GEOMETRYLINE',
                priority: 1,
                enable: true,
                exceptions: []
            },
            {
                id: options.originObject.pid,
                geoLiveType: 'GEOMETRYPOLYGON',
                priority: 0,
                enable: true,
                exceptions: []
            }
        ];
        return editResult;
    },
    /**
     * 创建工具需要使用的BreakResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */
    getBreakResult: function (options) {
        var editResult = new fastmap.uikit.complexEdit.BreakEditLineResult();
        editResult.geoLiveType = 'GEOMETRYLINE';
        editResult.id = options.originObject.pid;
        editResult.snapActors = [
            {
                id: options.originObject.pid,
                geoLiveType: 'GEOMETRYLINE'
            }
        ];
        return editResult;
    },
    /**
     * 更新
     * @param {object} editResult 编辑结果
     * @returns {object} params
     */

    update: function (editResult) {
        var params = {
            type: 'SCPLATERESGEOMETRY',
            command: 'UPDATE',
            objId: editResult.originObject.pid,
            data: {
                geometry: editResult.finalGeometry,
                objStatus: 'UPDATE'
            }
        };
        return this.dataServiceFcc.copyToLine(params);
    },

    break: function (editResult) {
        var params = {
            type: 'SCPLATERESGEOMETRY',
            command: 'BREAK',
            objId: editResult.id,
            data: {
                longitude: editResult.breakPoint.coordinates[0],
                latitude: editResult.breakPoint.coordinates[1]
            }
        };
        return this.dataServiceFcc.copyToLine(params);
    },

    updateChanges: function (geoLiveObject) {
        var params = {
            type: 'SCPLATERESGEOMETRY',
            command: 'UPDATE',
            objId: geoLiveObject.pid,
            data: {
                boundaryLink: geoLiveObject.boundaryLink,
                objStatus: 'UPDATE'
            }
        };
        return this.dataServiceFcc.deleteLine(params);
    },
    /**
     * 删除
     * @param {object} id id号
     * @returns {object} params
     */
    deleteLimit: function (id) {
        var params = {
            type: 'SCPLATERESGEOMETRY',
            command: 'DELETE',
            objIds: [id]
        };
        return this.dataServiceFcc.deleteLine(params);
    },

    canDelete: function (geoLiveObject) {
        return false;
    },
    /**
     * 查询
     * @param {object} options 包括选项
     * @returns {object} 包括pid、geoLiveType、geometry、boundaryLink
     */
    query: function (options) {
        return {
            pid: options.pid,
            geoLiveType: options.geoLiveType,
            geometry: options.geometry,
            groupId: options.groupId,
            boundaryLink: options.boundaryLink
        };
    }
});

