FM.uikit.Config = FM.uikit.Config || {};

// 单例，只读
FM.uikit.Config.Utility = (function () {
    var instance;

    var Singleton = function () {
        var config = {
            ScenePanel: {
                name: '图层设置',
                template: {
                    ctrl: 'components/road/ctrls/layers_switch_ctrl/sceneLayersCtrl.js',
                    tmpl: 'components/road/tpls/layers_switch_tpl/sceneLayers.html'
                }
            },
            RestrictionTopoPanel: {
                name: '交限',
                template: {
                    ctrl: 'components/road/ctrls/toolBar_cru_ctrl/restrictionCtrl/restrictionCtrl.js',
                    tmpl: 'components/road/tpls/toolBar_cru_tpl/restrictionTpl/restrictionTpl.html'
                }
            },
            adminOfLevel: {
                name: '层级划分',
                template: {
                    ctrl: 'components/road/ctrls/attr_administratives_ctrl/adAdminOfLevelCtrl.js',
                    tmpl: 'components/road/tpls/attr_adminstratives_tpl/adAdminOfLevelTpl.html'
                }
            },
            CheckJobPanel: {
                name: '检 查',
                template: {
                    ctrl: 'components/tools/ctrls/assist-tools/checkJobPanelCtrl.js',
                    tmpl: 'components/tools/tpls/assist-tools/checkJobPanelTpl.html'
                }
            },
            roadCheckResult: {
                name: '道路检查结果',
                template: {
                    ctrl: 'components/tools/ctrls/assist-tools/roadCheckResultCtrl.js',
                    tmpl: 'components/tools/tpls/assist-tools/roadCheckResultTpl.html'
                }
            },
            poiCheckResult: {
                name: 'POI检查结果',
                template: {
                    ctrl: 'components/tools/ctrls/assist-tools/poiCheckResultCtrl.js',
                    tmpl: 'components/tools/tpls/assist-tools/poiCheckResultTpl.html'
                }
            },
            messageAlert: {
                name: '消息提醒',
                template: {
                    ctrl: 'components/tools/ctrls/assist-tools/messageAlertCtrl.js',
                    tmpl: 'components/tools/tpls/assist-tools/messageAlertTpl.html'
                }
            },
            batchJobPanel: {
                name: '批处理',
                template: {
                    ctrl: 'components/tools/ctrls/assist-tools/batchJobPanelCtrl.js',
                    tmpl: 'components/tools/tpls/assist-tools/batchJobPanelTpl.html'
                }
            },
            autoJobPanel: {
                name: '自动录入',
                template: {
                    ctrl: 'components/tools/ctrls/assist-tools/autofillJobPanelCtrl.js',
                    tmpl: 'components/tools/tpls/assist-tools/autofillJobPanelTpl.html'
                }
            },
            BatchDataList: {
                name: '道路批量修改',
                template: {
                    ctrl: 'components/road/ctrls/attr_link_ctrl/batchResultCtrl.js',
                    tmpl: 'components/road/tpls/attr_link_tpl/batchResultTpl.html'
                }
            },
            BatchTipsEditList: {
                name: 'TIPS批量修改',
                template: {
                    ctrl: 'components/road/ctrls/attr_tips_ctrl/batchEditCtrl.js',
                    tmpl: 'components/road/tpls/attr_tips_tpl/batchEditTpl.html'
                }
            },
            tmcTreePanel: {
                name: 'TMC树形结构',
                template: {
                    ctrl: 'components/road/ctrls/attr_tmc_ctrl/tmcTreeCtrl.js',
                    tmpl: 'components/road/tpls/attr_tmc_tpl/tmcTreeTpl.html'
                }
            },
            createPoiPanel: {
                name: '新建POI',
                template: {
                    ctrl: 'components/poi/ctrls/attr-base/createPoiCtl.js',
                    tmpl: 'components/poi/tpls/attr-base/createPoiTpl.html'
                }
            },
            selpoiParentPanel: {
                name: '修改POI父子关系',
                template: {
                    ctrl: 'components/poi/ctrls/attr-tips/poiParentCtrl.js',
                    tmpl: 'components/poi/tpls/attr-tips/poiParentTpl.html'
                }
            },
            samePoiPanel: {
                name: '修改同一关系',
                template: {
                    ctrl: 'components/poi/ctrls/attr-tips/poiSameCtrl.js',
                    tmpl: 'components/poi/tpls/attr-tips/poiSameTpl.html'
                }
            },
            AdminJoinFacesPanel: {
                name: '制作行政区划点关联面',
                template: {
                    ctrl: 'components/road/ctrls/attr_administratives_ctrl/adAdminToFaceController.js',
                    tmpl: 'components/road/tpls/attr_adminstratives_tpl/adAdminToFaceTpl.html'
                }
            },
            LaneConnexityPanel: {
                name: '新增车信',
                template: {
                    ctrl: 'components/road/ctrls/toolBar_cru_ctrl/laneConnexityCtrl/laneConnexityCtrl.js',
                    tmpl: 'components/road/tpls/toolBar_cru_tpl/laneConnexityTpl/laneConnexityTpl.html'
                }
            },
            RdSameNodePanel: {
                name: '制作同一点',
                template: {
                    ctrl: 'components/road/ctrls/attr_same_ctrl/rdMainSameNodeCtrl.js',
                    tmpl: 'components/road/tpls/attr_same_tpl/rdMainSameNodeTpl.html'
                }
            },
            RdSameLinkPanel: {
                name: '制作同一线',
                template: {
                    ctrl: 'components/road/ctrls/attr_same_ctrl/rdMainSameLinkCtrl.js',
                    tmpl: 'components/road/tpls/attr_same_tpl/rdMainSameLinkTpl.html'
                }
            },
            StreetView: {
                name: '查看街景',
                template: {
                    ctrl: 'components/tools/ctrls/assist-tools/streetViewCtrl.js',
                    tmpl: 'components/tools/tpls/assist-tools/streetViewTpl.html'
                }
            },
            TipLaneConnexity: {
                name: '制作车信tips',
                template: {
                    ctrl: 'components/infos/ctrls/attr_infoLaneConnexity_ctrl/createLaneConnexity.js',
                    tmpl: 'components/infos/tpls/attr_infoLaneConnexit_tpl/createLaneConnexityTmpl.html'
                }
            },
            RdCrossPanel: {
                name: '选择路口同位点',
                template: {
                    ctrl: 'components/road/ctrls/attr_cross_ctrl/rdCrossAlertNodeCtrl.js',
                    tmpl: 'components/road/tpls/attr_cross_tpl/rdCrossAlertNodeTpl.html'
                }
            },
            createTaskListPanel: {
                name: '选择任务列表',
                template: {
                    ctrl: 'components/task/ctrls/attr_taskList_ctrl/taskList.js',
                    tmpl: 'components/task/tpls/attr_taskList_tpl/taskList.html'
                }
            },
            transitLayersChange: {
                name: '选择任务列表',
                template: {
                    ctrl: 'components/task/ctrls/layers_switch_ctrl/layersSwitchCtrl.js',
                    tmpl: 'components/task/tpls/layers_switch_tpl/layersSwitchTpl.html'
                }
            },
            CheckTipsPanel: {
                name: 'tips检查',
                template: {
                    ctrl: './components/infos/ctrls/attr_checkInfoTips_ctrl/checkInfoTipsCtrl.js',
                    tmpl: './components/infos/tpls/attr_checkInfoTips_tpl/checkInfoTipsTmpl.html'
                }
            },
            StaticsResult: {
                name: 'tips统计',
                template: {
                    ctrl: './components/infos/ctrls/attr_infoTipsStatics_ctrl/infoTipsStaticsCtrl.js',
                    tmpl: './components/infos/tpls/attr_infoTipsStatics_tpl/infoTipsStaticsTmpl.html'
                }
            },
            TipNomalRestriction: {
                name: '制作交限tips',
                template: {
                    ctrl: 'components/infos/ctrls/attr_infoNomalRestriction_ctrl/createNomalRestriction.js',
                    tmpl: 'components/infos/tpls/attr_infoNomalRestriction_tpl/createNomalRestrictionTmpl.html'
                }
            },
            ExternalQuality: {
                name: '外业质检',
                template: {
                    ctrl: 'components/poi/ctrls/edit-tools/externalQualityCtrl.js',
                    tmpl: 'components/poi/tpls/edit-tools/externalQualityTmpl.html'
                }
            },
            DeepInfoQuality: {
                name: '录入质检信息',
                template: {
                    ctrl: 'components/poi/ctrls/edit-tools/deepInfoQualityCtrl.js',
                    tmpl: 'components/poi/tpls/edit-tools/deepInfoQualityTmpl.html'
                }
            },
            dataPlanPanel: {
                name: '请确认是否保存规划数据',
                template: {
                    ctrl: 'components/task/ctrls/attr_dataPlan_ctrl/dataPlan.js',
                    tmpl: 'components/task/tpls/attr_dataPlan_tpl/dataPlan.html'
                }
            },
            tipListPanel: {
                name: 'tips列表',
                template: {
                    ctrl: 'components/poi/ctrls/edit-tools/tipsListCtrl.js',
                    tmpl: 'components/poi/tpls/edit-tools/tipsListTpl.html'
                }
            },
            roadnameCheckResult: {
                name: '道路名检查结果',
                template: {
                    ctrl: 'components/road/ctrls/specialwork/checkResultSubModalCtl.js',
                    tmpl: 'components/road/tpls/specialwork/checkResultSubModalTpl.htm'
                }
            },
            roadnameCheck: {
                name: '道路名检查',
                template: {
                    ctrl: 'components/road/ctrls/specialwork/checkSubModalCtl.js',
                    tmpl: 'components/road/tpls/specialwork/checkSubModal.htm'
                }
            },
            addGroup: {
                name: '新增记录',
                template: {
                    ctrl: 'components/group/ctrls/addGroupCtl.js',
                    tmpl: 'components/group/tpls/addGroup.html'
                }
            },
            editGroup: {
                name: '编辑记录',
                template: {
                    ctrl: 'components/group/ctrls/editGroupCtl.js',
                    tmpl: 'components/group/tpls/editGroup.html'
                }
            },
            correlationGroup: {
                name: '关联作业组',
                template: {
                    ctrl: 'components/group/ctrls/correlationGroupCtl.js',
                    tmpl: 'components/group/tpls/correlationGroup.html'
                }
            },
            addPolicy: {
                name: '新增策略表',
                template: {
                    ctrl: 'components/group/ctrls/addPolicyCtl.js',
                    tmpl: 'components/group/tpls/addPolicy.html'
                }
            },
            editPolicy: {
                name: '编辑策略表',
                template: {
                    ctrl: 'components/group/ctrls/editPolicyCtl.js',
                    tmpl: 'components/group/tpls/editPolicy.html'
                }
            },
            ResultListPanel: {
                name: '几何成果列表',
                template: {
                    ctrl: 'components/group/ctrls/resultListCtl.js',
                    tmpl: 'components/group/tpls/resultListTpl.html'
                }
            },
            temporaryPanel: {
                name: '临时几何列表',
                template: {
                    ctrl: 'components/group/ctrls/temporaryListCtl.js',
                    tmpl: 'components/group/tpls/temporaryListTpl.html'
                }
            },
            dealfailureList: {
                name: '批赋处理失败列表',
                template: {
                    ctrl: 'components/group/ctrls/dealFailurelListCtl.js',
                    tmpl: 'components/group/tpls/dealFailureListTpl.html'
                }
            },
            datadifference: {
                name: '数据差分列表',
                template: {
                    ctrl: 'components/group/ctrls/dataDifferenceCtl.js',
                    tmpl: 'components/group/tpls/dataDifferenceTpl.html'
                }
            },
            batchEditLimit: {
                name: '批量编辑列表',
                template: {
                    ctrl: 'components/group/ctrls/batchEditLimitCtl.js',
                    tmpl: 'components/group/tpls/batchEditLimitTpl.html'
                }
            },
            batchDeleteLimit: {
                name: '批量删除列表',
                template: {
                    ctrl: 'components/group/ctrls/batchDeleteLimitCtl.js',
                    tmpl: 'components/group/tpls/batchDeleteLimitTpl.html'
                }
            },
            spareLine: {
                name: '未成面的线列表',
                template: {
                    ctrl: 'components/group/ctrls/spareLineCtl.js',
                    tmpl: 'components/group/tpls/spareLineTpl.html'
                }
            },
            trackLinePanel: {
                name: '追踪线列表',
                template: {
                    ctrl: 'components/group/ctrls/trackLineCtl.js',
                    tmpl: 'components/group/tpls/trackLineTpl.html'
                }
            },
            batchEditLimitLine: {
                name: '批量编辑限行线列表',
                template: {
                    ctrl: 'components/group/ctrls/batchEditLimitLineCtl.js',
                    tmpl: 'components/group/tpls/batchEditLimitLineTpl.html'
                }
            },
            batchDeleteLimitLine: {
                name: '批量删除限行线列表',
                template: {
                    ctrl: 'components/group/ctrls/batchDeleteLimitLineCtl.js',
                    tmpl: 'components/group/tpls/batchDeleteLimitLineTpl.html'
                }
            },
            intersectLineList: {
                name: '相交线列表',
                template: {
                    ctrl: 'components/group/ctrls/intersectLineListCtl.js',
                    tmpl: 'components/group/tpls/intersectLineListTpl.html'
                }
            }
        };

        this.getConfig = function (type) {
            var conf = config[type];
            if (!conf) {
                return null;
            }
            return conf;
        };
        this.getName = function (type) {
            var conf = this.getConfig(type);
            if (!conf) {
                return null;
            }
            if (!conf.name) {
                return null;
            }
            return conf.name;
        };
        this.getTemplate = function (type) {
            var conf = this.getConfig(type);
            if (!conf) {
                return null;
            }
            if (!conf.template) {
                return null;
            }
            return conf.template;
        };
    };

    return function () {
        if (!instance) {
            instance = new Singleton();
        }
        return instance;
    };
}());
