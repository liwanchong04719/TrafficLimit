/**
 * 车道限速 的前端数据模型
 * @class FM.mapApi.render.data.TipDrivewayLimit
 * @author LiuZhe
 * @date   2017-09-12
 *
 * @copyright @Navinfo, all rights reserved.
 */
FM.mapApi.render.data.TipDrivewayLimit = FM.mapApi.render.data.Tip.extend({
    geometry: {},
    properties: {},
    /**
     * 模型转换主函数，将接口返回的数据转换为前端数据模型
     * @method setAttribute
     * @author LiuZhe
     * @date   2017-09-12
     * @param  {object} data 接口返回的数据
     * @return {undefined}
     */
    setAttribute: function (data) {
        this.geometry.coordinates = data.g;
        this.properties.geoLiveType = 'TIPDRIVEWAYLIMIT';
        this.properties.angle = data.m.c;
        this.guideLink = this.getGuideLinkGeometry(data.g, data.m.h);
    },

    /**
     * 获取要素模型的引导线几何对象
     * @method getGuideLinkGeometry
     * @author LiuZhe
     * @date   2017-09-12
     * @param  {object} geo 接口返回的数据
     * @param  {object} guide 接口返回的数据
     * @return {object} 引导线几何对象
     */
    getGuideLinkGeometry: function (geo, guide) {
        var geometry = {
            type: 'LineString',
            coordinates: []
        };
        geometry.coordinates.push(geo);
        geometry.coordinates.push(guide);
        return geometry;
    }
});
