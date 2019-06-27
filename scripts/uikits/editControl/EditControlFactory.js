/**
 * Created by xujie3949 on 2016/12/28.
 */

fastmap.uikit.editControl.EditControlFactory = L.Class.extend({
    initialize: function () {
        // 绑定函数作用域
        FM.Util.bind(this);

        this.currentControl = null;
    },

    selectControl: function (map, geoLiveType, options) {
        return new fastmap.uikit.editControl.SelectControl(map, geoLiveType, options);
    },

    batchEditLimitControl: function (map, geoLiveType, options) {
        return new fastmap.uikit.editControl.BatchEditLimitControl(map, geoLiveType, options);
    },

    batchDeleteLimitControl: function (map, geoLiveType, options) {
        return new fastmap.uikit.editControl.BatchDeleteLimitControl(map, geoLiveType, options);
    },

    batchSelectControl: function (map, geoLiveType, options) {
        return new fastmap.uikit.editControl.BatchSelectControl(map, geoLiveType, options);
    },

    startupPanToolControl: function (map) {
        return new fastmap.uikit.editControl.StartupPanToolControl(map);
    },

    createLineDimensions: function (map, geoLiveType) {
        return new fastmap.uikit.editControl.CreateLineDimensionsControl(map, geoLiveType);
    },

    createControl: function (map, geoLiveType) {
        switch (geoLiveType) {
            case 'COPYTOPOLYGON':
            case 'RDNODE':
            case 'RDLINK':
            case 'IXPOI':
            case 'ADADMIN':
            case 'LUNODE':
            case 'LULINK':
            case 'LUFACE':
            case 'CMGBUILDNODE':
            case 'CMGBUILDLINK':
            case 'CMGBUILDFACE':
            case 'LCNODE':
            case 'LCLINK':
            case 'LCFACE':
            case 'ZONENODE':
            case 'ZONELINK':
            case 'ZONEFACE':
            case 'RWLINK':
            case 'RWNODE':
            case 'ADNODE':
            case 'ADLINK':
            case 'ADFACE':
                return new fastmap.uikit.editControl.CreateSimpleFeatureControl(map, geoLiveType);
            case 'RDCROSS':
            case 'RDLINKWARNING':
            case 'RDHIGHSPEEDBRANCH':
            case 'RDASPECTBRANCH':
            case 'RDICBRANCH':
            case 'RD3DBRANCH':
            case 'RDCOMPLEXSCHEMA':
            case 'RDREALIMAGE':
            case 'RDSIGNASREAL':
            case 'RDSERIESBRANCH':
            case 'RDSCHEMATICBRANCH':
            case 'RDSIGNBOARD':
            case 'RDRESTRICTION':
            case 'RDRESTRICTIONTRUCK':
            case 'RDMILEAGEPILE':
            case 'RDTRAFFICSIGNAL':
            case 'RDSLOPE':
            case 'RDSPEEDBUMP':
            case 'RDELECTRONICEYE':
            case 'RDSE':
            case 'RDSPEEDLIMIT':
            case 'RDGATE':
            case 'RDTOLLGATE':
            case 'RDHGWGLIMIT':
            case 'RDVARIABLESPEED':
            case 'RDVOICEGUIDE':
            case 'RDDIRECTROUTE':
            case 'RDLANECONNEXITY':
            case 'RDINTER':  // crf交叉点
            case 'RDROAD':   // crf道路
            case 'RDOBJECT': // crf对象
            case 'RDSAMENODE':
            case 'RDSAMELINK':
            case 'RDGSC':
            case 'RDLINKSPEEDLIMIT':
            case 'RDLINKSPEEDLIMIT_DEPENDENT':
            case 'CMGBUILDING':
                return new fastmap.uikit.editControl.CreateRelationFeatureControl(map, geoLiveType);
            case 'TIPBORDER':
                return new fastmap.uikit.editControl.CreateTipsControl(map, geoLiveType);
            default:
                return null;
        }
    },

    createBuffer: function (map, geoLiveType) {
        switch (geoLiveType) {
            case 'RDMULTIDIGITIZED':
            case 'RDSIDEROAD':
                return new fastmap.uikit.editControl.CreateLineBufferControl(map, geoLiveType);
            default:
                return null;
        }
    },

    createAdminJoinFaces: function (map, geoLiveType) {
        return new fastmap.uikit.editControl.CreateAdminJoinFacesControl(map, geoLiveType);
    },

    modifyControl: function (map, options) {
        switch (options.originObject.geoLiveType) {
            case 'COPYTOPOLYGON':
            case 'DRAWPOLYGON':
            case 'GEOMETRYPOLYGON':
            case 'GEOMETRYLINE':
            case 'RDNODE':
            case 'RDLINK':
            case 'IXPOI':
            case 'ADADMIN':
            case 'LUNODE':
            case 'LULINK':
            case 'LUFACE':
            case 'CMGBUILDNODE':
            case 'CMGBUILDLINK':
            case 'LCNODE':
            case 'LCLINK':
            case 'ZONENODE':
            case 'ZONELINK':
            case 'RWLINK':
            case 'RWNODE':
            case 'ADNODE':
            case 'ADLINK':
                return new fastmap.uikit.editControl.ModifySimpleFeatureControl(map, options);
            case 'RDRESTRICTION':
            case 'RDRESTRICTIONTRUCK':
            case 'RDSE':
            case 'RDMILEAGEPILE':
            case 'RDSPEEDBUMP':
            case 'RDLINKWARNING':
            case 'RDELECTRONICEYE':
            case 'RDSLOPE':
            case 'RDSPEEDLIMIT':
            case 'RDHGWGLIMIT':
            case 'RDBRANCH':
            case 'RDVARIABLESPEED':
            case 'RDHIGHSPEEDBRANCH':// 高速分歧
            case 'RDASPECTBRANCH':// 方面分歧
            case 'RDICBRANCH':// IC分歧
            case 'RD3DBRANCH':// 3d分歧
            case 'RDCOMPLEXSCHEMA':// 复杂路口模式图
            case 'RDREALIMAGE':// 实景图
            case 'RDSIGNASREAL':// 实景看板
            case 'RDSERIESBRANCH':// 连续分歧
            case 'RDSCHEMATICBRANCH':// 交叉点大路口模式图
            case 'RDSIGNBOARD':// 方向看板
            case 'RDVOICEGUIDE':
            case 'RDDIRECTROUTE':
            case 'RDINTER': // crf交叉点
            case 'RDROAD': // crf道路
            case 'RDOBJECT': // crf对象
            case 'RDLANECONNEXITY':
            case 'RDGSC':
            case 'RDCROSS':
            case 'RDLINKSPEEDLIMIT':
            case 'RDLINKSPEEDLIMIT_DEPENDENT':
                return new fastmap.uikit.editControl.ModifyRelationFeatureControl(map, options);
            default:
                return null;
        }
    },

    modifyViaControl: function (map, geoLiveType) {
        return new fastmap.uikit.editControl.ModifyViaControl(map, geoLiveType);
    },

    addPairElectronicEyeControl: function (map, geoLiveType) {
        return new fastmap.uikit.editControl.AddPairElectronicEyeControl(map, geoLiveType);
    },

    breakTipLinksControl: function (map, options) {
        return new fastmap.uikit.editControl.BreakTipLinksControl(map, options);
    },

    copyTipLinksControl: function (map, options) {
        return new fastmap.uikit.editControl.TipLinkUpDownDepartControl(map, options);
    },

    adjustImageControl: function (map, options) {
        return new fastmap.uikit.editControl.AdjustImageControl(map, options);
    },

    batchModifyControl: function (map, options) {
        switch (options.originObject.geoLiveType) {
            case 'BATCHMODIFYTIPS':
                return new fastmap.uikit.editControl.BatchModifyTipsControl(map, options);
            case 'TMC':
                return new fastmap.uikit.editControl.BatchModifyTmcControl(map, options);
            default:
                return null;
        }
    },

    copyLineControl: function (map, geoLiveType) {
        switch (geoLiveType) {
            case 'COPYTOLINE':
            case 'COPYTOPOLYGON':
            case 'DRAWPOLYGON':
                return new fastmap.uikit.editControl.CopyLineControl(map, geoLiveType);
            default:
                return null;
        }
    },

    trackToolControl: function (map, geoLiveType, options) {
        return new fastmap.uikit.editControl.TrackControl(map, geoLiveType, options);
    },

    deleteLimitControl: function (map, options) {
        switch (options.originObject.geoLiveType) {
            case 'COPYTOLINE':
            case 'COPYTOPOLYGON':
            case 'DRAWPOLYGON':
            case 'GEOMETRYLINE':
            case 'GEOMETRYPOLYGON':
            case 'LIMITLINE':
                return new fastmap.uikit.editControl.DeleteLimitControl(map, options);
            default:
                return null;
        }
    },

    breakEditLineControl: function (map, options) {
        switch (options.originObject.geoLiveType) {
            case 'COPYTOPOLYGON':
            case 'COPYTOLINE':
            case 'GEOMETRYLINE':
                return new fastmap.uikit.editControl.BreakEditLineControl(map, options);
            default:
                return null;
        }
    },

    createTipsControl: function (map, geoLiveType) {
        switch (geoLiveType) {
            case 'TIPTOLLGATE':
            case 'TIPROADTYPE':
            case 'TIPLINKS':
            case 'TIPROADDIRECTION':
            case 'TIPDRIVEWAYMOUNT':
            case 'TIPROADNAME':
            case 'TIPDELETETAG':
            case 'TIPCONNECT':
            case 'TIPLANECONNEXITY':
            case 'TIPFC':
            case 'TIPROADSA':
            case 'TIPROADPA':
            case 'TIPRAMP':
            case 'TIPRESTRICTION':
            case 'TIPTRAFFICSIGNAL':
            case 'TIPSKETCH':
            case 'TIPHIGHWAYCONNECT':
            case 'TIPNOMALRESTRICTION':
            case 'TIPDELETEPROPERTYINPROGRESS':
                return new fastmap.uikit.editControl.CreateSimpleTipsControl(map, geoLiveType);
            case 'TIPRAILWAYCROSSING':
            case 'TIPROUNDABOUT':
            case 'TIPPEDESTRIANSTREET':
            case 'TIPREGIONROAD':
            case 'TIPBRIDGE':
            case 'TIPTUNNEL':
            case 'TIPMAINTENANCE':
            case 'TIPBUSLANE':
            case 'TIPMULTIDIGITIZED':
            case 'TIPGPSDOT':
            case 'TIPGSC':
            case 'TIPBUILDTIMECHANGE':
                return new fastmap.uikit.editControl.CreateRelationTipsControl(map, geoLiveType);
            default:
                return null;
        }
    },

    selectTipsAndPOIControl: function (map, geoLiveType) {
        switch (geoLiveType) {
            case 'REGIONSELECT':
                return new fastmap.uikit.editControl.SelectTipsAndPOIControl(map, geoLiveType);
            case 'DATAPLAN':
                return new fastmap.uikit.editControl.DataPlanControl(map, geoLiveType);
            default:
                return null;
        }
    },

    drawCircleControl: function (map, geoLiveType) {
        switch (geoLiveType) {
            case 'DRAWSUBTASK':
                return new fastmap.uikit.editControl.DrawCircleControl(map, geoLiveType);
            case 'MERGESUBTASK':
                return new fastmap.uikit.editControl.MergeCircleControl(map, geoLiveType);
            case 'DRAWQUALITYCIRCLE':
                return new fastmap.uikit.editControl.DrawQualityCircleControl(map, geoLiveType);
            case 'UPDATEQUALITYCIRCLE':
                return new fastmap.uikit.editControl.UpdateQualityCircleControl(map, geoLiveType);
            default:
                return null;
        }
    },

    modifyTipsControl: function (map, options) {
        switch (options.originObject.geoLiveType) {
            case 'TIPTOLLGATE':
            case 'TIPROADTYPE':
            case 'TIPROADDIRECTION':
            case 'TIPDRIVEWAYMOUNT':
            case 'TIPLINKS':
            case 'TIPROADNAME':
            case 'TIPDELETETAG':
            case 'TIPCONNECT':
            case 'TIPLANECONNEXITY':
            case 'TIPFC':
            case 'TIPROADSA':
            case 'TIPROADPA':
            case 'TIPRAMP':
            case 'TIPRESTRICTION':
            case 'TIPTRAFFICSIGNAL':
            case 'TIPSKETCH':
            case 'TIPHIGHWAYCONNECT':
            case 'TIPNOMALRESTRICTION':
            case 'TIPDELETEPROPERTYINPROGRESS':
                return new fastmap.uikit.editControl.ModifySimpleTipsControl(map, options);
            case 'TIPRAILWAYCROSSING':
            case 'TIPROUNDABOUT':
            case 'TIPPEDESTRIANSTREET':
            case 'TIPREGIONROAD':
            case 'TIPBRIDGE':
            case 'TIPTUNNEL':
            case 'TIPMAINTENANCE':
            case 'TIPBUSLANE':
            case 'TIPMULTIDIGITIZED':
            case 'TIPGPSDOT':
            case 'TIPGSC':
            case 'TIPBUILDTIMECHANGE':
                return new fastmap.uikit.editControl.ModifyRelationTipsControl(map, options);
            default:
                return null;
        }
    },

    selectPoiParentControl: function (map, geoLiveType) {
        return new fastmap.uikit.editControl.ModifyPoiParentControl(map, geoLiveType);
    },

    samePoiControl: function (map, geoLiveType) {
        return new fastmap.uikit.editControl.ModifySamePoiControl(map, geoLiveType);
    },

    linkDirectControl: function (map, options) {
        return new fastmap.uikit.editControl.ChangeLinkDirectControl(map, options);
    },

    deleteControl: function (map, editType, geoLiveType, options) {
        // 待实现
        throw new Error('未实现');
    },

    deleteClosedVertexControl: function (map, options) {
        return new fastmap.uikit.editControl.DeleteClosedVertexControl(map, options);
    },

    startupToolControl: function (map, toolName, options) {
        return new fastmap.uikit.editControl.StartupToolControl(map, toolName, options);
    },

    autoBreakControl: function (map, geoLiveType) {
        return new fastmap.uikit.editControl.BreakLinksControl(map, geoLiveType);
    },

    batchTranslatePoiLocationControl: function (map, options) {
        return new fastmap.uikit.editControl.BatchTranslatePoiLocationControl(map, options);
    },

    batchConvergePoiLocationControl: function (map, options) {
        return new fastmap.uikit.editControl.BatchConvergePoiLocationControl(map, options);
    },

    batchPoiGuideAutoControl: function (map, options) {
        return new fastmap.uikit.editControl.BatchPoiGuideAutoControl(map, options);
    },

    batchPoiGuideManualControl: function (map, options) {
        return new fastmap.uikit.editControl.BatchPoiGuideManualControl(map, options);
    },

    destroy: function () {
        fastmap.uikit.editControl.EditControlFactory.instance = null;
    },

    statics: {
        instance: null,

        getInstance: function () {
            if (!fastmap.uikit.editControl.EditControlFactory.instance) {
                fastmap.uikit.editControl.EditControlFactory.instance =
                    new fastmap.uikit.editControl.EditControlFactory();
            }
            return fastmap.uikit.editControl.EditControlFactory.instance;
        }
    }
});

