App.Config.map.FeatureLayers = {
    CopyToLine: {
        name: '临时线图层',
        type: 'vector',
        options: {
            source: 'limitSource',
            featureType: 'COPYTOLINE',
            serverFeatureType: 'SCPLATERESLINK',
            render: FM.mapApi.render.renderer.LimitRender,
            minZoom: 10
        }
    },
    CopyToPolygon: {
        name: '编辑线图层',
        type: 'vector',
        options: {
            source: 'limitSource',
            featureType: 'COPYTOPOLYGON',
            serverFeatureType: 'SCPLATERESFACE',
            render: FM.mapApi.render.renderer.LimitRender,
            minZoom: 10
        }
    },
    DrawPolygon: {
        name: '临时面图层',
        type: 'vector',
        options: {
            source: 'limitSource',
            featureType: 'DRAWPOLYGON',
            serverFeatureType: 'SCPLATERESFACE',
            render: FM.mapApi.render.renderer.LimitRender,
            minZoom: 10
        }
    },
    GeometryLine: {
        name: '成果线图层',
        type: 'vector',
        options: {
            source: 'limitSource',
            featureType: 'GEOMETRYLINE',
            serverFeatureType: 'SCPLATERESGEOMETRY',
            render: FM.mapApi.render.renderer.LimitRender,
            minZoom: 10
        }
    },
    GeometryPolygon: {
        name: '成果面图层',
        type: 'vector',
        options: {
            source: 'limitSource',
            featureType: 'GEOMETRYPOLYGON',
            serverFeatureType: 'SCPLATERESGEOMETRY',
            render: FM.mapApi.render.renderer.LimitRender,
            minZoom: 10
        }
    },
    LimitLine: {
        name: '限行图层',
        type: 'vector',
        options: {
            source: 'limitSource',
            featureType: 'LIMITLINE',
            serverFeatureType: 'SCPLATERESRDLINK',
            render: FM.mapApi.render.renderer.LimitRender,
            minZoom: 10
        }
    },
    AdAdmin: {
        name: '行政区划代表点',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'ADADMIN',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    AdFace: {
        name: '行政区划面',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'ADFACE',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    AdLink: {
        name: '行政区划组成线',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'ADLINK',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 10
        }
    },
    LcFace: {
        name: '土地覆盖面',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'LCFACE',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    LcLink: {
        name: '土地覆盖线',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'LCLINK',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    RdGate: {
        name: '大门',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RDGATE',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    RdGsc: {
        name: '立交',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RDGSC',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    RdLink: {
        name: '道路线',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RDLINK',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 1
        }
    },
    RdNode: {
        name: '道路点',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RDNODE',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 17
        }
    },
    RdTollgate: {
        name: '收费站',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RDTOLLGATE',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    RwLink: {
        name: '铁路线',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RWLINK',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 15
        }
    },
    RwNode: {
        name: '铁路点',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RWNODE',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 17
        }
    },
    IxPoi: {
        name: '兴趣点',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'IXPOI',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 17
        }
    },
    RdMileagePile: {
        name: '里程桩',
        type: 'vector',
        options: {
            source: 'objSource',
            featureType: 'RDMILEAGEPILE',
            render: FM.mapApi.render.renderer.FeatureRender,
            minZoom: 17
        }
    }
};
