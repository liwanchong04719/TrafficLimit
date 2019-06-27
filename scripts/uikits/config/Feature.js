FM.uikit.Config = FM.uikit.Config || {};
// 单例，只读
FM.uikit.Config.Feature = (function () {
    var instance;

    var Singleton = function () {
        var config = {
            IXPOI: {
                name: '兴趣点',
                serverFeatureType: 'IXPOI',
                model: FM.dataApi.IxPoi,
                depends: ['RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/poi/ctrls/attr-base/generalBaseCtl.js',
                        tmpl: 'components/poi/tpls/attr-base/generalBaseTpl.html'
                    },
                    view: {
                        ctrl: 'components/poi/ctrls/attr-tips/poiPopoverTipsCtl.js',
                        tmpl: 'components/poi/tpls/attr-tips/poiPopoverTipsTpl.html'
                    }
                },
                editTools: ['MODIFY', 'SELECTPARENT', 'POISAME'] // 地图操作工具列表
            },
            RDNODE: {
                name: '道路点', // 要素描述
                serverFeatureType: 'RDNODE', // 服务端要素类型
                model: FM.dataApi.RdNode,
                depends: ['RDLINK'],
                template: {
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_node_ctrl/rdNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_node_tpl/rdNodeTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDLINK: {
                name: '道路线', // 要素描述
                serverFeatureType: 'RDNODE', // 服务端要素类型
                model: FM.dataApi.RdLink,
                depends: ['RDNODE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_link_ctrl/rdLinkTabPanelCtrl.js',
                        tmpl: 'components/road/tpls/attr_link_tpl/rdLinkTabPanelTpl.html'
                    }
                },
                editTools: [] // 地图操作工具列表
            },
            BATCHLINK: {
                name: '道路线', // 要素描述
                serverFeatureType: 'RDNODE', // 服务端要素类型
                model: FM.dataApi.RdLink,
                depends: ['RDNODE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_link_ctrl/rdLinkTabPanelCtrl.js',
                        tmpl: 'components/road/tpls/attr_link_tpl/rdLinkTabPanelTpl.html'
                    }
                },
                editTools: ['DIRECT'] // 地图操作工具列表
            },
            RDRESTRICTION: {
                name: '交限',
                serverFeatureType: 'RDRESTRICTION', // 服务端要素类型
                model: FM.dataApi.RdRestriction,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_restriction_ctrl/rdRestrictionCtrl.js',
                        tmpl: 'components/road/tpls/attr_restrict_tpl/rdRestrictionTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDRESTRICTIONTRUCK: {
                name: '卡车交限',
                serverFeatureType: 'RDRESTRICTION', // 服务端要素类型
                model: FM.dataApi.RdRestriction,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_restriction_ctrl/rdRestrictionCtrl.js',
                        tmpl: 'components/road/tpls/attr_restrict_tpl/rdRestrictionTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDSPEEDLIMIT: {
                name: '点限速',
                serverFeatureType: 'RDSPEEDLIMIT', // 服务端要素类型
                model: FM.dataApi.RdSpeedLimit,
                depends: ['RDNODE', 'RDLINK', 'RDSPEEDLIMIT_DEPENDENT'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_speedLimit_ctrl/speedLimitCtrl.js',
                        tmpl: 'components/road/tpls/attr_speedLimit_tpl/speedLimitTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDSPEEDLIMIT_DEPENDENT: {
                name: '条件点限速',
                serverFeatureType: 'RDSPEEDLIMIT', // 服务端要素类型
                model: FM.dataApi.RdSpeedLimit,
                depends: ['RDNODE', 'RDLINK', 'RDSPEEDLIMIT'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_speedLimit_ctrl/speedLimitCtrl.js',
                        tmpl: 'components/road/tpls/attr_speedLimit_tpl/speedLimitTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDHIGHSPEEDBRANCH: {
                name: '高速分歧',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdBranchCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/rdBaseBranchTpl.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDASPECTBRANCH: {
                name: '方面分歧',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdBranchCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/rdBaseBranchTpl.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDICBRANCH: {
                name: 'IC分歧',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdBranchCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/rdBaseBranchTpl.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RD3DBRANCH: {
                name: '3D分歧',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdBranchCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/rdBaseBranchTpl.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDCOMPLEXSCHEMA: {
                name: '复杂路口模式图',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdBranchCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/rdBaseBranchTpl.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDREALIMAGE: {
                name: '实景图',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdRealImageCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/realImageOfBranch.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDSIGNASREAL: {
                name: '实景看板',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdSignAsRealCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/signAsRealOfBranch.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDSERIESBRANCH: {
                name: '连续分歧',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdSeriesCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/seriesOfBranch.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDSCHEMATICBRANCH: {
                name: '交叉点大路口模式图',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdSchematicCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/schematicOfBranch.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDSIGNBOARD: {
                name: '方向看板',
                serverFeatureType: 'RDBRANCH', // 服务端要素类型
                model: FM.dataApi.RdBranch,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_branch_ctrl/rdSignBoardCtrl.js',
                        tmpl: 'components/road/tpls/attr_branch_tpl/signBoardOfBranch.html'
                    }
                },
                editTools: ['MODIFY', 'MODIFYVIA'] // 地图操作工具列表
            },
            RDCROSS: {
                name: '路口',
                serverFeatureType: 'RDCROSS', // 服务端要素类型
                model: FM.dataApi.RdCross,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_cross_ctrl/rdCrossCtrl.js',
                        tmpl: 'components/road/tpls/attr_cross_tpl/rdCrossTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            // RDWARNINGINFO: {
            //     name: '警示信息',
            //     serverFeatureType: 'RDWARNINGINFO', // 服务端要素类型
            //     model: FM.dataApi.RdWarningInfo,
            //     depends: ['RDNODE', 'RDLINK'],
            //     template: { // 要素的页面片段
            //         edit: { // 属性编辑片段
            //             ctrl: 'components/road/ctrls/attr_warningInfo_ctrl/warningInfoCtrl.js',
            //             tmpl: 'components/road/tpls/attr_warningInfo_tpl/warningInfoTpl.html'
            //         }
            //     }
            // },
            RDLINKWARNING: {
                name: '警示信息',
                serverFeatureType: 'RDLINKWARNING', // 服务端要素类型
                model: FM.dataApi.RdLinkWarning,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_linkWarning_ctrl/linkWarningCtrl.js',
                        tmpl: 'components/road/tpls/attr_linkWarning_tpl/linkWarningTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDTRAFFICSIGNAL: {
                name: '信号灯',
                serverFeatureType: 'RDTRAFFICSIGNAL', // 服务端要素类型
                model: FM.dataApi.RdTrafficSignal,
                depends: ['RDNODE', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_trafficSignal_ctrl/trafficSignalCtrl.js',
                        tmpl: 'components/road/tpls/attr_trafficSignal_tpl/trafficSignalTpl.html'
                    }
                }
            },
            RDELECTRONICEYE: {
                name: '电子眼',
                serverFeatureType: 'RDELECTRONICEYE', // 服务端要素类型
                model: FM.dataApi.RdElectronicEye,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_electronic_ctrl/electronicEyeCtrl.js',
                        tmpl: 'components/road/tpls/attr_electronic_tpl/electronicEyeTpl.html'
                    }
                },
                editTools: ['MODIFY', 'ADDPAIRBOND'] // 地图操作工具列表
            },
            RDGATE: {
                name: '大门',
                serverFeatureType: 'RDGATE', // 服务端要素类型
                model: FM.dataApi.RdGate,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_gate_ctrl/rdGateCtrl.js',
                        tmpl: 'components/road/tpls/attr_gate_tpl/rdGateTpl.html'
                    }
                }
            },
            RDSLOPE: {
                name: '坡度',
                serverFeatureType: 'RDSLOPE', // 服务端要素类型
                model: FM.dataApi.RdSlope,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_rdSlope_ctrl/rdSlopeCtrl.js',
                        tmpl: 'components/road/tpls/attr_rdSlope_tpl/rdSlopeTpl.html'
                    }
                },
                editTools: ['MODIFY']
            },
            RDLANECONNEXITY: {
                name: '车信',
                serverFeatureType: 'RDLANCCONNEXITY', // 服务端要素类型
                model: FM.dataApi.RdLaneConnexity,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_connexity_ctrl/rdLaneConnexityCtrl.js',
                        tmpl: 'components/road/tpls/attr_connexity_tpl/rdLaneConnexityTpl.html'
                    },
                    add: { // 新增
                        ctrl: 'components/road/ctrls/attr_connexity_ctrl/addLaneconnexityCtrl.js',
                        tmpl: 'components/road/tpls/attr_connexity_tpl/addLaneconnexityTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDLINKINTRTIC: {
                name: '互联网RTIC'
            },
            RDDIRECTROUTE: {
                name: '顺行',
                serverFeatureType: 'RDDIRECTROUTE', // 服务端要素类型
                model: FM.dataApi.RdDirectRoute,
                depends: ['RDNODE', 'RDLINK', 'RDCROSS'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_directroute_ctrl/directRouteCtrl.js',
                        tmpl: 'components/road/tpls/attr_directroute_tpl/directRouteTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDSPEEDBUMP: {
                name: '减速带',
                serverFeatureType: 'RDSPEEDBUMP', // 服务端要素类型
                model: FM.dataApi.RdSpeedBump,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_speedbump_ctrl/speedBumpCtrl.js',
                        tmpl: 'components/road/tpls/attr_speedbump_tpl/speedBumpTpl.html'
                    }
                }
            },
            RDSE: {
                name: '分叉口',
                serverFeatureType: 'RDSE', // 服务端要素类型
                model: FM.dataApi.RdSe,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_se_ctrl/rdSeCtrl.js',
                        tmpl: 'components/road/tpls/attr_se_tpl/rdSeTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDINTER: {
                name: 'CRF交叉点',
                serverFeatureType: 'RDINTER', // 服务端要素类型
                model: FM.dataApi.RdInter,
                depends: ['RDNODE', 'RDLINK', 'RDROAD'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_rdcrf_ctrl/crfInterCtrl.js',
                        tmpl: 'components/road/tpls/attr_rdcrf_tpl/crfInterTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDROAD: {
                name: 'CRF道路',
                serverFeatureType: 'RDROAD', // 服务端要素类型
                model: FM.dataApi.RdRoad,
                depends: ['RDNODE', 'RDLINK', 'RDINTER'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_rdcrf_ctrl/crfRoadCtrl.js',
                        tmpl: 'components/road/tpls/attr_rdcrf_tpl/crfRoadTpl.html'
                    }
                },
                editTools: ['MODIFY'] // ['MODRDROADPART']
            },
            RDOBJECT: {
                name: 'CRF对象',
                serverFeatureType: 'RDOBJECT', // 服务端要素类型
                model: FM.dataApi.RdObject,
                depends: ['RDNODE', 'RDLINK', 'RDINTER', 'RDROAD'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_rdcrf_ctrl/crfObjectCtrl.js',
                        tmpl: 'components/road/tpls/attr_rdcrf_tpl/crfObjectTpl.html'
                    }
                },
                editTools: ['MODIFY'] // ['MODRDOBJECTPART', 'MOVELANDMARKER']
            },
            RDTOLLGATE: {
                name: '收费站',
                serverFeatureType: 'RDTOLLGATE', // 服务端要素类型
                model: FM.dataApi.RdTollgate,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_tollgate_ctrl/tollGateCtrl.js',
                        tmpl: 'components/road/tpls/attr_tollgate_tpl/tollGateTpl.html'
                    }
                }
            },
            RDVARIABLESPEED: {
                name: '可变限速',
                serverFeatureType: 'RDVARIABLESPEED', // 服务端要素类型
                model: FM.dataApi.RdVariableSpeed,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_variableSpeed_ctrl/variableSpeedCtrl.js',
                        tmpl: 'components/road/tpls/attr_variableSpeed_tpl/variableSpeed.html'
                    }
                },
                editTools: ['MODIFY']
            },
            RDMILEAGEPILE: {
                name: '里程桩',
                serverFeatureType: 'RDMILEAGEPLE', // 服务端要素类型
                model: FM.dataApi.RdMileagePile,
                depends: ['RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_mileagepile_ctrl/mileagePileCtrl.js',
                        tmpl: 'components/road/tpls/attr_mileagepile_tpl/mileagePile.html'
                    }
                },
                editTools: ['MODIFY']
            },
            RDVOICEGUIDE: {
                name: '语音引导',
                serverFeatureType: 'RDVOICEGUIDE', // 服务端要素类型
                model: FM.dataApi.RdVoiceGuide,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_voiceGuide_ctrl/voiceGuide.js',
                        tmpl: 'components/road/tpls/attr_voiceGuide_tpl/voiceGuide.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDGSC: {
                name: '立交',
                serverFeatureType: 'RDGSC', // 服务端要素类型
                model: FM.dataApi.RdGsc,
                depends: ['RDLINK', 'RWLINK', 'LCLINK', 'CMGBUILDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_rdgsc_ctrl/rdGscCtrl.js',
                        tmpl: 'components/road/tpls/attr_gsc_tpl/rdGscTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RWNODE: {
                name: '铁路点',
                serverFeatureType: 'RWNODE', // 服务端要素类型
                depends: ['RWLINK'],
                model: FM.dataApi.RwNode,
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_node_ctrl/rwNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_node_tpl/rwNodeTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RWLINK: {
                name: '铁路线',
                serverFeatureType: 'RWLINK', // 服务端要素类型
                model: FM.dataApi.RwLink,
                depends: ['RWNODE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_link_ctrl/rwLinkCtrl.js',
                        tmpl: 'components/road/tpls/attr_link_tpl/rwLinkTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETECLOSEDVERTEX'] // 地图操作工具列表
            },
            LCNODE: {
                name: '土地覆盖点',
                serverFeatureType: 'LCNODE',
                model: FM.dataApi.LCNode,
                depends: ['LCLINK', 'LCFACE'],
                template: {
                    edit: {
                        ctrl: 'components/road/ctrls/attr_lc_ctrl/lcNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_lc_tpl/lcNodeTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            LCLINK: {
                name: '土地覆盖线',
                serverFeatureType: 'LCLINK', // 服务端要素类型
                model: FM.dataApi.LcLink,
                depends: ['LCNODE', 'LCFACE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_lc_ctrl/lcLinkCtrl.js',
                        tmpl: 'components/road/tpls/attr_lc_tpl/lcLinkTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETECLOSEDVERTEX'] // 地图操作工具列表
                // editTools: ['PATHVERTEXINSERT', 'PATHVERTEXREMOVE', 'PATHVERTEXMOVE', 'PATHBREAK', 'PATHSMOOTH', 'PATHDEPARTNODE'] // 地图操作工具列表
            },
            LCFACE: {
                name: '土地覆盖面',
                serverFeatureType: 'LCFACE', // 服务端要素类型
                model: FM.dataApi.LCFace,
                depends: ['LCNODE', 'LCLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_lc_ctrl/lcFaceCtrl.js',
                        tmpl: 'components/road/tpls/attr_lc_tpl/lcFaceTpl.html'
                    }
                }
            },
            LUNODE: {
                name: '土地利用点',
                serverFeatureType: 'LUNODE',
                model: FM.dataApi.LUNode,
                depends: ['LULINK', 'LUFACE'],
                template: {
                    add: {
                        ctrl: 'components/road/ctrls/attr_lu_ctrl/luNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_lu_tpl/luNodeTpl.html'
                    },
                    edit: {
                        ctrl: 'components/road/ctrls/attr_lu_ctrl/luNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_lu_tpl/luNodeTpl.html'
                    }
                },
                editTools: ['MODIFY']
            },
            LULINK: {
                name: '土地利用线',
                serverFeatureType: 'LUlINK', // 服务端要素类型
                model: FM.dataApi.LuLink,
                depends: ['LUNODE', 'LUFACE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_lu_ctrl/luLinkCtrl.js',
                        tmpl: 'components/road/tpls/attr_lu_tpl/luLinkTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETECLOSEDVERTEX'] // 地图操作工具列表
                // editTools: ['PATHVERTEXINSERT', 'PATHVERTEXREMOVE', 'PATHVERTEXMOVE', 'PATHBREAK', 'PATHDEPARTNODE', 'PATHSMOOTH'] // 地图操作工具列表
            },
            LUFACE: {
                name: '土地利用面',
                serverFeatureType: 'LUFACE', // 服务端要素类型
                model: FM.dataApi.LUFace,
                depends: ['LULINK', 'LUNODE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_lu_ctrl/luFaceCtrl.js',
                        tmpl: 'components/road/tpls/attr_lu_tpl/luFaceTpl.html'
                    }
                }
            },
            CMGBUILDNODE: {
                name: '市街图点',
                serverFeatureType: 'CMGBUILDNODE',
                model: FM.dataApi.CmgBuildNode,
                depends: ['CMGBUILDLINK', 'CMGBUILDFACE'],
                template: {
                    edit: {
                        ctrl: 'components/road/ctrls/attr_CmgBuild_ctrl/CmgBuildNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_CmgBuild_tpl/CmgBuildNodeTpl.html'
                    }
                },
                editTools: ['MODIFY']
            },
            CMGBUILDLINK: {
                name: '市街图线',
                serverFeatureType: 'CMGBUILDlINK', // 服务端要素类型
                model: FM.dataApi.CmgBuildLink,
                depends: ['CMGBUILDNODE', 'CMGBUILDFACE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_CmgBuild_ctrl/CmgBuildLinkCtrl.js',
                        tmpl: 'components/road/tpls/attr_CmgBuild_tpl/CmgBuildLinkTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETECLOSEDVERTEX'] // 地图操作工具列表
            },
            CMGBUILDFACE: {
                name: '市街图面',
                serverFeatureType: 'CMGBUILDFACE', // 服务端要素类型
                model: FM.dataApi.CmgBuildFace,
                depends: ['CMGBUILDLINK', 'CMGBUILDNODE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_CmgBuild_ctrl/CmgBuildFaceCtrl.js',
                        tmpl: 'components/road/tpls/attr_CmgBuild_tpl/CmgBuildFaceTpl.html'
                    }
                }
            },
            CMGBUILDING: {
                name: '市街图Feature',
                serverFeatureType: 'CMGBUILDINGFEATURE', // 服务端要素类型
                model: FM.dataApi.CmgBuilding,
                depends: ['CMGBUILDLINK', 'CMGBUILDNODE', 'CMGBUILDFACE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_CmgBuild_ctrl/CmgBuildFeatureCtrl.js',
                        tmpl: 'components/road/tpls/attr_CmgBuild_tpl/CmgBuildFeatureTpl.html'
                    }
                }
            },
            ADADMIN: {
                name: '行政区划代表点',
                serverFeatureType: 'ADADMIN',
                model: FM.dataApi.AdAdmin,
                depends: ['ADFACE', 'RDLINK', 'ZONEFACE'],
                template: {
                    edit: {
                        ctrl: 'components/road/ctrls/attr_administratives_ctrl/adAdminCtrl.js',
                        tmpl: 'components/road/tpls/attr_adminstratives_tpl/adAdminTpl.html'
                    }
                },
                editTools: ['MODIFY']
            },
            ADNODE: {
                name: '行政区划组成点',
                serverFeatureType: 'ADADMIN',
                model: FM.dataApi.AdNode,
                depends: ['ADLINK', 'ADFACE'],
                template: {
                    edit: {
                        ctrl: 'components/road/ctrls/attr_administratives_ctrl/adNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_adminstratives_tpl/adNodeTpl.html'
                    }
                },
                editTools: ['MODIFY']
            },
            ADLINK: {
                name: '行政区划组成线',
                serverFeatureType: 'ADLINK', // 服务端要素类型
                model: FM.dataApi.AdLink,
                depends: ['ADNODE', 'ADFACE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_administratives_ctrl/adLinkCtrl.js',
                        tmpl: 'components/road/tpls/attr_adminstratives_tpl/adLinkTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETECLOSEDVERTEX']
            },
            ADFACE: {
                name: '行政区划面',
                serverFeatureType: 'ADFACE',
                model: FM.dataApi.AdFace,
                depends: ['ADNODE', 'ADLINK'],
                template: {
                    edit: {
                        ctrl: 'components/road/ctrls/attr_administratives_ctrl/adFaceCtrl.js',
                        tmpl: 'components/road/tpls/attr_adminstratives_tpl/adFaceTpl.html'
                    }
                }
            },
            ZONENODE: {
                name: 'ZONE点',
                serverFeatureType: 'ZONENODE',
                model: FM.dataApi.ZoneNode,
                depends: ['ZONELINK', 'ZONEFACE'],
                template: {
                    edit: {
                        ctrl: 'components/road/ctrls/attr_zone_ctrl/zoneNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_zone_tpl/zoneNodeTpl.html'
                    }
                },
                editTools: ['MODIFY']
            },
            ZONELINK: {
                name: 'ZONE线',
                serverFeatureType: 'ZONELINK', // 服务端要素类型
                model: FM.dataApi.ZoneLink,
                depends: ['ZONENODE', 'ZONEFACE'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_zone_ctrl/zoneLinkCtrl.js',
                        tmpl: 'components/road/tpls/attr_zone_tpl/zoneLinkTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETECLOSEDVERTEX']
            },
            ZONEFACE: {
                name: 'ZONE面',
                serverFeatureType: 'ZONEFACE', // 服务端要素类型
                model: FM.dataApi.ZoneFace,
                depends: ['ZONENODE', 'ZONELINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_zone_ctrl/zoneFaceCtrl.js',
                        tmpl: 'components/road/tpls/attr_zone_tpl/zoneFaceTpl.html'
                    }
                }
            },
            RDSAMENODE: {
                name: '同一点',
                serverFeatureType: 'RDSAMENODE', // 服务端要素类型
                model: FM.dataApi.RdSameNode,
                depends: ['RDNODE', 'RDLINK', 'ADNODE', 'ADLINK', 'ZONENODE', 'ZONELINK', 'LUNODE', 'LULINK', 'RWNODE', 'RWLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_same_ctrl/rdSameNodeCtrl.js',
                        tmpl: 'components/road/tpls/attr_same_tpl/rdSameNodeTpl.html'
                    }
                }

            },
            RDSAMELINK: {
                name: '同一线',
                serverFeatureType: 'RDSAMELINK', // 服务端要素类型
                model: FM.dataApi.RdSameLink,
                depends: ['RDNODE', 'RDLINK', 'ADNODE', 'ADLINK', 'ZONENODE', 'ZONELINK', 'LUNODE', 'LULINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_same_ctrl/rdSameLinkCtrl.js',
                        tmpl: 'components/road/tpls/attr_same_tpl/rdSameLinkTpl.html'
                    }
                }
            },
            RDLINKSPEEDLIMIT: {
                name: '线限速',
                serverFeatureType: 'RDLINKSPEEDLIMIT',
                model: FM.dataApi.RdLinkSpeedLimit,
                depends: ['RDNODE', 'RDLINK', 'RDSPEEDLIMIT'],  //  线限速制作工具，依赖图层只加载普通点限速
                template: {
                    add: {
                        ctrl: 'components/road/ctrls/attr_speedLimit_ctrl/linkSpeedLimitCtrl.js',
                        tmpl: 'components/road/tpls/attr_speedLimit_tpl/linkSpeedLimitTpl.html'
                    },
                    edit: {
                        ctrl: 'components/road/ctrls/attr_speedLimit_ctrl/linkSpeedLimitCtrl.js',
                        tmpl: 'components/road/tpls/attr_speedLimit_tpl/linkSpeedLimitTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDLINKSPEEDLIMIT_DEPENDENT: {
                name: '条件线限速',
                serverFeatureType: 'RDLINKSPEEDLIMIT',
                model: FM.dataApi.RdLinkSpeedLimit,
                depends: ['RDNODE', 'RDLINK', 'RDSPEEDLIMIT_DEPENDENT'],  //  条件线限速制作工具，依赖图层只加载条件点限速
                template: {
                    add: {
                        ctrl: 'components/road/ctrls/attr_speedLimit_ctrl/linkSpeedLimitCtrl.js',
                        tmpl: 'components/road/tpls/attr_speedLimit_tpl/linkSpeedLimitTpl.html'
                    },
                    edit: {
                        ctrl: 'components/road/ctrls/attr_speedLimit_ctrl/linkSpeedLimitCtrl.js',
                        tmpl: 'components/road/tpls/attr_speedLimit_tpl/linkSpeedLimitTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDHGWGLIMIT: {
                name: '限高限重',
                serverFeatureType: 'RDHGWGLIMIT', // 服务端要素类型
                model: FM.dataApi.RdHgwgLimit,
                depends: ['RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_hgwgLimit_ctrl/hgwgLimitCtrl.js',
                        tmpl: 'components/road/tpls/attr_hgwgLimit_tpl/hgwgLimitTpl.html'
                    }
                },
                editTools: ['MODIFY'] // 地图操作工具列表
            },
            RDLANE: {
                name: '详细车道',
                serverFeatureType: 'RDLANE', // 服务端要素类型
                model: FM.dataApi.RdLane,
                depends: ['RDNODE', 'RDLINK'],
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_lane_ctrl/rdLaneCtrl.js',
                        tmpl: 'components/road/tpls/attr_lane_tpl/rdLaneTpl.html'
                    }
                }
            },
            TMCPOINT: {
                name: 'TMC点',
                serverFeatureType: 'TMCPOINT', // 服务端要素类型
                model: FM.dataApi.TMCPoint,
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_tmc_ctrl/tmcPointCtrl.js',
                        tmpl: 'components/road/tpls/attr_tmc_tpl/tmcPointTpl.html'
                    }
                }
            },
            TMCLINE: {
                name: 'TMC线',
                serverFeatureType: 'TMCLINE', // 服务端要素类型
                model: FM.dataApi.TMCLine,
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        ctrl: 'components/road/ctrls/attr_tmc_ctrl/tmcLineCtrl.js',
                        tmpl: 'components/road/tpls/attr_tmc_tpl/tmcLineTpl.html'
                    }
                }
            },
            RDTMCLOCATION: {
                name: 'TMC匹配信息',
                serverFeatureType: 'TMCLOCATION', // 服务端要素类型
                model: FM.dataApi.RdTmcLocation,
                template: { // 要素的页面片段
                    edit: { // 属性编辑片段
                        // ctrl: 'components/road/ctrls/attr_tmc_ctrl/tmcLocationCtrl.js',
                        // tmpl: 'components/road/tpls/attr_tmc_tpl/tmcLocationTpl.html'
                    }
                }
            },
            DRAWPOLYGON: {
                name: '临时面',
                serverFeatureType: 'SCPLATERESFACE', // 服务端要素类型
                depends: ['COPYTOPOLYGON'],
                template: { // 要素的页面片段
                    edit: {
                        ctrl: 'components/limit/ctrls/copyToPolygonCtrl.js',
                        tmpl: 'components/limit/tpls/copyToPolygonTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETELIMIT'] // 地图操作工具列表
            },
            COPYTOPOLYGON: {
                name: '编辑线',
                serverFeatureType: 'SCPLATERESFACE', // 服务端要素类型
                depends: ['DRAWPOLYGON'],
                template: { // 要素的页面片段
                    edit: {}
                },
                editTools: ['MODIFY', 'DELETELIMIT', 'BREAKEDITLINE'] // 地图操作工具列表
            },
            COPYTOLINE: {
                name: '临时线',
                serverFeatureType: 'SCPLATERESLINK', // 服务端要素类型
                depends: [],
                template: { // 要素的页面片段
                    edit: {
                        ctrl: 'components/limit/ctrls/copyToLineCtrl.js',
                        tmpl: 'components/limit/tpls/copyToLineTpl.html'
                    }
                },
                editTools: ['DELETELIMIT'] // 地图操作工具列表
            },
            GEOMETRYLINE: {
                name: '成果线',
                serverFeatureType: 'SCPLATERESGEOMETRY', // 服务端要素类型
                depends: [],
                template: { // 要素的页面片段
                    edit: {
                        ctrl: 'components/limit/ctrls/geometryLineCtrl.js',
                        tmpl: 'components/limit/tpls/geometryLineTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETELIMIT', 'BREAKEDITLINE'] // 地图操作工具列表
            },
            GEOMETRYPOLYGON: {
                name: '成果面',
                serverFeatureType: 'SCPLATERESGEOMETRY', // 服务端要素类型
                depends: [],
                template: { // 要素的页面片段
                    edit: {
                        ctrl: 'components/limit/ctrls/geometryPolygonCtrl.js',
                        tmpl: 'components/limit/tpls/geometryPolygonTpl.html'
                    }
                },
                editTools: ['MODIFY', 'DELETELIMIT'] // 地图操作工具列表
            },
            LIMITLINE: {
                name: '限行线',
                serverFeatureType: 'SCPLATERESRDLINK', // 服务端要素类型
                depends: [],
                template: { // 要素的页面片段
                    edit: {
                        ctrl: 'components/limit/ctrls/limitLineCtrl.js',
                        tmpl: 'components/limit/tpls/limitLineTpl.html'
                    }
                },
                editTools: ['DELETELIMIT'] // 地图操作工具列表
            }
        };
        var linkNodeConf = {
            RDNODE: 'RDLINK',
            RWNODE: 'RWLINK',
            LUNODE: 'LULINK',
            LCNODE: 'LCLINK',
            ADNODE: 'ADLINK',
            ZONENODE: 'ZONELINK',
            CMGBUILDNODE: 'CMGBUILDLINK'
        };
        this.getConfig = function (featType) {
            var conf = config[featType];
            if (!conf) {
                return null;
            }
            return conf;
        };
        this.getName = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.name) {
                return null;
            }
            return conf.name;
        };
        this.getAddTemplate = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.template) {
                return null;
            }
            if (!conf.template.add) {
                return null;
            }
            return conf.template.add;
        };
        this.getEditTemplate = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.template) {
                return null;
            }
            if (!conf.template.edit) {
                return null;
            }
            return conf.template.edit;
        };
        this.getViewTemplate = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.template) {
                return null;
            }
            if (!conf.template.view) {
                return null;
            }
            return conf.template.view;
        };
        this.getEditTools = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            var tools = [];
            if (conf.editTools) {
                Array.prototype.push.apply(tools, conf.editTools);
            }
            if (tools.length === 0) {
                return null;
            }
            return tools;
        };
        this.getTable = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.table) {
                return null;
            }
            return conf.table;
        };
        this.getExtendTemplate = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.template) {
                return null;
            }
            if (!conf.template.extend) {
                return null;
            }
            return conf.template.extend;
        };
        this.getDataModel = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.model) {
                return null;
            }
            return conf.model;
        };
        this.getDepends = function (featType) {
            var depends = [];
            var conf = this.getConfig(featType);
            if (!conf) {
                return depends;
            }
            if (conf.depends) {
                Array.prototype.push.apply(depends, conf.depends);
            }
            return depends;
        };
        this.getDependOn = function (featType) {
            var dependOns = [];
            var _isDependOn = function (conf) {
                if (conf.depends && conf.depends.indexOf(featType) >= 0) {
                    return true;
                }
                return false;
            };
            var k,
                kk;
            for (k in config) {
                if (config.hasOwnProperty(k) && k !== featType) {
                    if (_isDependOn(config[k])) {
                        dependOns.push(k);
                    }
                }
            }
            return dependOns;
        };
        this.isNode = function (featType) {
            return !(linkNodeConf[featType] === undefined);
        };
        this.getLinkByNode = function (geoLiveType) {
            return linkNodeConf[geoLiveType];
        };
        this.getNodeByLink = function (geoLiveType) {
            var nodeType = null;
            var keys = Object.getOwnPropertyNames(linkNodeConf);
            for (var i = 0; i < keys.length; i++) {
                if (linkNodeConf[keys[i]] === geoLiveType) {
                    nodeType = keys[i];
                    break;
                }
            }
            return nodeType;
        };
        this.getMapping = function () {
            var ret = {};
            for (var k in config) {
                if (config.hasOwnProperty(k)) {
                    ret[k] = config[k].name;
                }
            }
            return ret;
        };
        this.getServerFeatureType = function (featType) {
            var conf = this.getConfig(featType);
            if (!conf) {
                return null;
            }
            if (!conf.serverFeatureType) {
                return null;
            }
            return conf.serverFeatureType;
        };
        this.getUIFeatureTypes = function (serverFeatureType) {
            var ret = [];
            for (var k in config) {
                if (config.hasOwnProperty(k) && config[k].serverFeatureType == serverFeatureType) {
                    ret.push(k);
                }
            }
            return ret;
        };
    };

    return function () {
        if (!instance) {
            instance = new Singleton();
        }
        return instance;
    };
}());
