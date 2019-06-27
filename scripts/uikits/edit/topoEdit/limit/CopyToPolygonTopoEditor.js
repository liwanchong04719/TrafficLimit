/**
 * 复制到面TopoEditor
 * @author zhaohang
 * @date   2017/10/16
 * @class  fastmap.uikit.topoEdit.CopyToPolygonTopoEditor
 * @return {undefined}
 */
fastmap.uikit.topoEdit.CopyToPolygonTopoEditor = fastmap.uikit.topoEdit.TopoEditor.extend({
    initialize: function (map) {
        fastmap.uikit.topoEdit.TopoEditor.prototype.initialize.call(this, map);

        // 绑定函数作用域
        FM.Util.bind(this);
        this.eventController = fastmap.uikit.EventController();
    },

    /**
     * 创建工具需要使用的DeleteResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */

    getBatchDeleteResult: function (options) {
        var editResult = new fastmap.uikit.complexEdit.BatchEditLimitResult();
        editResult.geoLiveType = 'COPYTOPOLYGON';
        return editResult;
    },
    /**
     * 创建工具需要使用的BreakResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */
    getBreakResult: function (options) {
        var editResult = new fastmap.uikit.complexEdit.BreakEditLineResult();
        editResult.geoLiveType = 'COPYTOPOLYGON';
        editResult.id = options.originObject.pid;
        editResult.snapActors = [
            {
                id: options.originObject.pid,
                geoLiveType: 'COPYTOPOLYGON'
            }
        ];
        return editResult;
    },
    /**
     * 创建工具需要使用的EditResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */
    getCreateEditResult: function (options) {
        var editResult = new fastmap.uikit.shapeEdit.PathResult();
        editResult.finalGeometry = {
            type: 'LineString',
            coordinates: []
        };
        editResult.geoLiveType = 'COPYTOPOLYGON';
        editResult.snapActors = [{
            geoLiveType: 'COPYTOPOLYGON',
            priority: 1,
            enable: true,
            exceptions: []
        }];
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
        editResult.geoLiveType = 'COPYTOPOLYGON';
        editResult.snapActors = [{
            geoLiveType: 'COPYTOPOLYGON',
            priority: 1,
            enable: true,
            exceptions: [originObject.pid]
        }];
        editResult.finalGeometry = FM.Util.clone(options.originObject.geometry);
        return editResult;
    },

    break: function (editResult) {
        var params = {
            type: 'SCPLATERESFACE',
            command: 'BREAK',
            objId: editResult.id,
            data: {
                longitude: editResult.breakPoint.coordinates[0],
                latitude: editResult.breakPoint.coordinates[1]
            }
        };
        return this.dataServiceFcc.copyToLine(params);
    },

    update: function (editResult) {
        var params = {
            type: 'SCPLATERESFACE',
            command: 'UPDATE',
            geomId: editResult.originObject.pid,
            data: {
                objStatus: 'UPDATE',
                geometry: editResult.finalGeometry
            }
        };
        return this.dataServiceFcc.copyToLine(params);
    },

    /**
     * 创建接口
     * @param {object} editResult 编辑结果
     */

    create: function (editResult) {
        var params = {
            type: 'SCPLATERESFACE',
            command: 'CREATE',
            dbId: App.Temp.dbId,
            data: {
                groupId: App.Temp.groupId,
                geometry: editResult.finalGeometry
            }
        };
        return this.dataServiceFcc.copyToLine(params);
    },

    /**
     * 创建工具需要使用的EditResult
     * @param {object} options 包括选项
     * @returns {object} editResult 编辑结果
     */

    getCopyResult: function (options) {
        var editResult = new fastmap.uikit.complexEdit.CopyResult();
        editResult.geoLiveType = 'COPYTOPOLYGON';
        editResult.types = ['RDLINK', 'ADLINK', 'LCLINK'];
        return editResult;
    },

    /**
     * 创建接口
     * @param {object} editResult 编辑结果
     */

    copy: function (editResult) {
        var rdLinks = [];
        var adLinks = [];
        var lcLinks = [];
        for (var i = 0; i < editResult.links.length; i++) {
            if (editResult.links[i].properties.geoLiveType === 'RDLINK') {
                rdLinks.push(editResult.links[i].properties.id);
            } else if (editResult.links[i].properties.geoLiveType === 'ADLINK') {
                adLinks.push(editResult.links[i].properties.id);
            } else if (editResult.links[i].properties.geoLiveType === 'LCLINK') {
                lcLinks.push(editResult.links[i].properties.id);
            }
        }
        var params = {
            type: 'SCPLATERESFACE',
            command: 'CREATE',
            dbId: App.Temp.dbId,
            data: {
                groupId: App.Temp.groupId
            }
        };
        if (rdLinks.length > 0) {
            params.data.rdlinks = rdLinks;
        }
        if (adLinks.length > 0) {
            params.data.adlinks = adLinks;
        }
        if (lcLinks.length > 0) {
            params.data.lclinks = lcLinks;
        }
        return this.dataServiceFcc.copyToLine(params);
    },

    /**
     * 删除
     * @param {object} id id号
     * @returns {object} params
     */

    deleteLimit: function (id) {
        var params = {
            type: 'SCPLATERESFACE',
            command: 'DELETE',
            objId: [id]
        };
        return this.dataServiceFcc.deleteLine(params);
    },

    /**
     * 查询
     * @param {object} options 包括选项
     * @returns {object} 包括pid、geoLiveType、geometry
     */

    query: function (options) {
        return {
            pid: options.pid,
            geoLiveType: options.geoLiveType,
            groupId: options.groupId,
            geometry: options.geometry
        };
    }
});

