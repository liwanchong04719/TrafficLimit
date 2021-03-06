/**
 * Created by 123 on 2016/12/6.
 */
fastmap.dataApi.TipDrivewayLimit = fastmap.dataApi.Tip.extend({
    /*
     * 返回参数赋值
     */
    setAttributes: function (data) {
        this.geoLiveType = 'TIPDRIVEWAYLIMIT';
        this.code = '1113'; // 车道限速 *

        if (data.deep) {
            this.deep = {
                id: data.deep.id || '',
                f: data.deep.f || {},
                agl: data.deep.agl || 0,
                rdDir: data.deep.rdDir || 0,
                value: data.deep.value || []
            };
            if (this.deep.f.type === 1 && this.deep.f.id) {
                this.deep.f.id = parseInt(this.deep.f.id, 10);
            }
        } else {
            this.deep = {
                id: '',
                f: {
                    id: '',
                    type: 1
                },
                agl: 0,
                rdDir: 0,
                value: []
            };
        }
    },

    getIntegrate: function () {
        var data = {};
        data.deep = this.deep;
        return data;
    },

    getSnapShot: function () {
        var data = {};
        data.deep = this.deep;
        return data;
    }
});

fastmap.dataApi.tipDrivewayLimit = function (data, options) {
    return new fastmap.dataApi.TipDrivewayLimit(data, options);
};
