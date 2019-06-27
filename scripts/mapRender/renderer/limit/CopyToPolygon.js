/**
 * 复制到面
 * @author zhaohang
 * @date   2017/10/17
 * @class  FM.mapApi.render.renderer.CopyToPolygon
 * @return {undefined}
 */
FM.mapApi.render.renderer.CopyToPolygon = FM.mapApi.render.Renderer.extend({
    initialize: function (feature, zoom) {
        FM.mapApi.render.Renderer.prototype.initialize.call(this, feature, zoom);

        // 绑定函数作用域
        FM.Util.bind(this);
        this._symbol = null;
    },
    /**
     * 渲染几何
     * @method getSymbol
     * @author Niuxinyi
     * @date   2017-11-20
     * @return {object} symbol 几何
     */
    getSymbol: function () {
        var compositeSymbol = this._symbolFactory.createSymbol({ type: 'CompositeLineSymbol' });
        compositeSymbol.geometry = this._geometryFactory.fromGeojson(this._feature.geometry);
        this._symbol = compositeSymbol;
        this._addBasicSymbol();
        if (this._feature.properties.groupId === App.Temp.groupId) {
            this._addMarkerSymbol();
        }
        return this._symbol;
    },
    _addBasicSymbol: function () {
        var symbolData = {
            type: 'SimpleLineSymbol',
            color: 'green',
            width: 3
        };
        var symbol = this._symbolFactory.createSymbol(symbolData);
        this._symbol.symbols.push(symbol);
    },
    _addMarkerSymbol: function () {
        var symbolData = {
            type: 'MarkerLineSymbol',
            marker: {
                type: 'TiltedCrossMarkerSymbol',
                size: 6,
                color: 'green',
                width: 1,
                opacity: 1
            },
            pattern: [10, 10]
        };
        var symbol = this._symbolFactory.createSymbol(symbolData);
        this._symbol.symbols.push(symbol);
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
            type: 'SimpleLineSymbol',
            color: '#00ffff',
            width: 3
        };
        var symbol = this._symbolFactory.createSymbol(symbolData);
        symbol.geometry = this._geometryFactory.fromGeojson(this._feature.geometry);
        return symbol;
    }
});
