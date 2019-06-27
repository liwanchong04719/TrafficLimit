/**
 * 限行线
 * @class FM.mapApi.render.data.LimitLine
 * @author zhaohang
 * @date   2017/11/15
 *
 * @copyright @Navinfo, all rights reserved.
 */
FM.mapApi.render.data.LimitLine = FM.mapApi.render.data.Limit.extend({
    /**
     * 模型转换主函数，将接口返回的数据转换为前端数据模型
     * @method setAttribute
     * @author LiuZhe
     * @date   2017-09-12
     * @param  {object} data 接口返回的数据
     * @return {undefined}
     */
    setAttribute: function (data) {
        this.geometry.type = 'LineString';
        this.properties.geoLiveType = 'LIMITLINE';
        this.properties.linkDir = data.m.b;
        this.properties.geometryId = data.m.c;
        this.properties.groupId = data.m.d;
    }
});
