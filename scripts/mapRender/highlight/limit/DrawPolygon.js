/**
 * Created by zhaohang on 2017/10/18.
 */
/**
 * 定义‘渲染面’要素选中时的高亮规则
 * @file      DrawPolygon.js
 * @author    LiuZhe
 * @date      2017-09-12
 *
 * @copyright @Navinfo, all rights reserved.
 */

FM.mapApi.render.highlight.DRAWPOLYGON = {
    topo: [{
        joinKey: 'geometry',
        highlight: {
            type: 'geometry',
            zIndex: 1,
            defaultSymbol: 'py_face'
        }
    }]
};
