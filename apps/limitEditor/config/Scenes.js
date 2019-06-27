/**
 * Created by chenx on 2017-5-12
 */

/** 背景图层配置 **/
App.Config.map.Background = [];

/** 参考图层配置 **/
App.Config.map.Overlay = ['mesh', 'feedback', 'overlay'];

/** 场景图层配置 **/
App.Config.map.Scenes = {
    defaultScene: 'BaseInfoScene',
    scenes: {
        /** 常规场景配置 **/
        BaseInfoScene: {
            type: 'feature',
            label: 'roadFeature',
            name: '基础信息场景',
            layers: ['RdLink', 'RdNode', 'AdLink', 'RwLink', 'CopyToLine', 'CopyToPolygon', 'DrawPolygon', 'GeometryLine', 'GeometryPolygon']
        }
    }
};
