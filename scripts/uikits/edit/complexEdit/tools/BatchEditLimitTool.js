/**
 * Created by zhaohang on 2017/10/31.
 */

fastmap.uikit.complexEdit.BatchEditLimitTool = fastmap.uikit.complexEdit.ComplexTool.extend({
    initialize: function () {
        fastmap.uikit.complexEdit.ComplexTool.prototype.initialize.call(this);

        // 绑定函数作用域
        FM.Util.bind(this);

        this.name = 'BatchEditLimitTool';

        this.selectFeedback = null;
        this.stepFeedback1 = null;
        this.stepFeedback2 = null;
        this.startPoint = null;
        this.endPoint = null;
        this.isDragging = false;
    },

    startup: function () {
        this.resetStatus();

        fastmap.uikit.complexEdit.ComplexTool.prototype.startup.apply(this, arguments);

        this.editResult = this.options.editResult.clone();
        this.selectFeedback = new fastmap.mapApi.Feedback();
        this.stepFeedback1 = new fastmap.mapApi.Feedback();
        this.stepFeedback2 = new fastmap.mapApi.Feedback();
        this.selectFeedback.priority = 0;
        this.stepFeedback1.priority = 2;
        this.stepFeedback2.priority = 1;
        this.installFeedback(this.selectFeedback);
        this.installFeedback(this.stepFeedback1);
        this.installFeedback(this.stepFeedback2);

        this.refresh();
    },

    shutdown: function () {
        fastmap.uikit.complexEdit.ComplexTool.prototype.shutdown.apply(this, arguments);

        this.resetStatus();
    },

    resetStatus: function () {
        fastmap.uikit.complexEdit.ComplexTool.prototype.resetStatus.apply(this, arguments);

        this.selectFeedback = null;
        this.stepFeedback1 = null;
        this.stepFeedback2 = null;
        this.startPoint = null;
        this.endPoint = null;
        this.isDragging = false;
    },

    onRedo: function (oldEditResult, newEditResult) {
        this.editResult = newEditResult;
        this.refresh();
    },

    onUndo: function (oldEditResult, newEditResult) {
        this.editResult = oldEditResult;
        this.refresh();
    },

    refresh: function () {
        this.resetSelectFeedback();
        this.resetMouseInfo();
        this.drawLinks();
    },

    resetSelectFeedback: function () {
        if (!this.selectFeedback) {
            return;
        }

        this.selectFeedback.clear();

        if (this.isDragging && this.startPoint && this.endPoint) {
            var box = this.getSelectBox(this.startPoint, this.endPoint);
            var symbol = this.symbolFactory.getSymbol('selectTool_py_rectSelect');
            this.selectFeedback.add(box, symbol);
        }

        this.refreshFeedback();
    },

    resetMouseInfo: function () {
        this.setMouseInfo('请框选需要编辑的要素,按住ctrl支持反选和追加,按空格结束选择！');
    },

    drawLinks: function () {
        var links = this.editResult.links;
        this.stepFeedback2.clear();
        if (!links || links.length === 0) {
            return;
        }

        var lineSymbol = this.symbolFactory.getSymbol('ls_link');
        var polygonSymbol = this.symbolFactory.getSymbol('py_face');
        for (var i = 0; i < links.length; ++i) {
            var link = links[i];
            if (link.properties.groupId == App.Temp.groupId) {
                var linkGeometry = null;
                linkGeometry = link.geometry;
                if (linkGeometry.type === 'Polygon') {
                    this.stepFeedback2.add(linkGeometry, polygonSymbol);
                } else {
                    this.stepFeedback2.add(linkGeometry, lineSymbol);
                }
            } else {
                links.splice(i);
            }
        }
    },

    onLeftButtonDown: function (event) {
        if (!fastmap.uikit.complexEdit.ComplexTool.prototype.onLeftButtonDown.apply(this, arguments)) {
            return false;
        }

        this.startPoint = this.mousePoint;
        this.isDragging = true;

        return true;
    },

    onMouseMove: function (event) {
        if (!fastmap.uikit.complexEdit.ComplexTool.prototype.onMouseMove.apply(this, arguments)) {
            return false;
        }

        if (!this.isDragging) {
            return false;
        }

        this.endPoint = this.mousePoint;

        this.resetSelectFeedback();

        return true;
    },

    onLeftButtonUp: function (event) {
        if (!fastmap.uikit.complexEdit.ComplexTool.prototype.onLeftButtonUp.apply(this, arguments)) {
            return false;
        }

        if (!this.isDragging) {
            return false;
        }

        this.isDragging = false;

        var box = this.getSelectBox(this.startPoint, this.endPoint);

        var selectedFeatures = this.featureSelector.selectByGeometry(box, [this.editResult.geoLiveType]);
        if (event.originalEvent.ctrlKey) {
            this.modifyLinkFeatures(selectedFeatures);
        } else {
            this.replaceLinkFeatures(selectedFeatures);
        }

        return true;
    },

    modifyLinkFeatures: function (selectedFeatures) {
        var newEditResult = this.editResult.clone();
        var addItems = FM.Util.differenceBy(selectedFeatures, newEditResult.links, 'properties.id');
        var remainItems = FM.Util.differenceBy(newEditResult.links, selectedFeatures, 'properties.id');
        newEditResult.links = remainItems.concat(addItems);
        this.createOperation('修改选中link', newEditResult);
    },

    replaceLinkFeatures: function (selectedFeatures) {
        var newEditResult = this.editResult.clone();
        newEditResult.links = selectedFeatures;
        this.createOperation('替换选中link', newEditResult);
    },

    getSelectBox: function (point1, point2) {
        var geojson = {
            type: 'GeometryCollection',
            geometries: [point1, point2]
        };
        var bbox = this.geometryAlgorithm.bbox(geojson);
        var polygon = this.geometryAlgorithm.bboxToPolygon(bbox);
        return polygon;
    }
});
