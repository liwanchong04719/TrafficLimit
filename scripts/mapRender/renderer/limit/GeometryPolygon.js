/**
 * 几何成果面
 * @author zhaohang
 * @date   2017/10/18
 * @class  FM.mapApi.render.renderer.GeometryPolygon
 * @return {undefined}
 */
FM.mapApi.render.renderer.GeometryPolygon = FM.mapApi.render.Renderer.extend({
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
            color: 'pink',
            opacity: 0.5,
            outLine: {
                type: 'CompositeLineSymbol',
                symbols: [
                    {
                        type: 'SimpleLineSymbol',
                        color: 'pink',
                        width: 3,
                        style: 'solid'
                    }
                ]
            }
        };
        if (this._feature.properties.boundaryLink === '2') {
            symbolData.outLine.symbols[0] = {
                type: 'CartoLineSymbol',
                pattern: [10, 10],
                color: 'pink',
                width: 3,
                style: 'solid'
            };
        }
        if (this._feature.properties.groupId === App.Temp.groupId) {
            symbolData.outLine.symbols.push({
                type: 'MarkerLineSymbol',
                marker: {
                    type: 'TiltedCrossMarkerSymbol',
                    size: 6,
                    color: 'blue',
                    width: 1,
                    opacity: 1
                },
                pattern: [10, 10]
            });
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
