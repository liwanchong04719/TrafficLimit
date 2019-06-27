/**
 * 渲染面
 * @author zhaohang
 * @date   2017/10/17
 * @class  FM.mapApi.render.renderer.DrawPolygon
 * @return {undefined}
 */
FM.mapApi.render.renderer.DrawPolygon = FM.mapApi.render.Renderer.extend({
    initialize: function (feature, zoom) {
        FM.mapApi.render.Renderer.prototype.initialize.call(this, feature, zoom);

        // 绑定函数作用域
        FM.Util.bind(this);
    },
    /**
     * 渲染几何
     * @method getSymbol
     * @author Niuxinyi
     * @date   2017-11-20
     * @return {object} symbol 几何
     */
    getSymbol: function () {
        var symbolData = {
            type: 'SimpleFillSymbol',
            color: 'red',
            opacity: 0.5
        };
        if (this._feature.properties.groupId === App.Temp.groupId) {
            symbolData.outLine = {
                type: 'MarkerLineSymbol',
                marker: {
                    type: 'TiltedCrossMarkerSymbol',
                    size: 6,
                    color: 'blue',
                    width: 1,
                    opacity: 1
                },
                pattern: [10, 10]
            };
        }
        var symbol = this._symbolFactory.createSymbol(symbolData);
        symbol.geometry = this._geometryFactory.fromGeojson(this._feature.geometry);
        return symbol;
    },
    /**
     * 高亮几何
     * @method getHighlightSymbol
     * @author Niuxinyi
     * @date   2017-11-20
     * @return {object} symbol 几何
     */
    getHighlightSymbol: function () {
        var symbolData = {
            type: 'SimpleFillSymbol',
            color: '#00ffff',
            opacity: 0.5
        };
        var symbol = this._symbolFactory.createSymbol(symbolData);
        symbol.geometry = this._geometryFactory.fromGeojson(this._feature.geometry);
        return symbol;
    }
});
