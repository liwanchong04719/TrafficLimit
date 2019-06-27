/**
 * Created by zhongxiaoming on 2016/3/17.
 * Class EventTypes
 */
L.Mixin.EventTypes = {
    // 为避免冲突，事件类型需要定义为不同值
    LAYERONADD: 'layerOnAdd',
    LAYERONREMOVE: 'layerOnRemove',
    LAYERONSWITCH: 'layerSwitch',
    LAYERONSHOW: 'layerOnShow',
    LAYERONEDIT: 'layerOnEdit',
    GETLINKID: 'getLinkId',
    GETRELATIONID: 'getRelationId',
    GETOUTLINKSPID: 'getOutLinksPid',
    GETNODEID: 'getNodeId',
    GETCROSSNODEID: 'getCorssNodeId',
    GETADADMINNODEID: 'getAdAdminNodeId',
    GETTIPSID: 'getTipsId',
    GETPOIID: 'getPoiId',
    GETFACEID: 'getFaceId',
    FEATURESELECTED: 'featureSelected',
    FEATURECLEARED: 'featureCleared',
    RESETCOMPLETE: 'resetComplete',
    GETBOXDATA: 'dataOfBoxEvent',
    DIRECTEVENT: 'directEvent',
    TILEDRAWEND: 'tileDrawend',
    SNAPED: 'snaped',
    STARTSHAPEEDITRESULTFEEDBACK: 'startshapeeditresultfeedback',
    ABORTSHAPEEDITRESULTFEEDBACK: 'abortshapeeditresultfeedback',
    STOPSHAPEEDITRESULTFEEDBACK: 'stoptshapeeditresultfeedback',
    SELECTBYATTRIBUTE: 'selectByAttribute', // 属性选择事件
    SAVEPROPERTY: 'saveproperty', // 属性面板保存事件
    DELETEPROPERTY: 'deleteproperty', // 属性面板删除事件
    CANCELEVENT: 'cancelevent', // 属性面板撤销事件
    SELECTEDFEATURETYPECHANGE: 'selectedfeaturetypechange', // objectcontroller选择要素类型变化事件
    SELECTEDFEATURECHANGE: 'selectedfeaturechange', // objectcontroller选择要素(pid)变化事件
    CHEKCRESULT: 'checkresult', // 检查刷新事件
    CAPTURED: 'captured',
    CHANGELINKNAME: 'changeLinkName', // link编辑名称组是
    CHANGEPOILIST: 'changePoiList', // 更换poiList列表
    GETRECTDATA: 'getRectData',
    GETFEATURE: 'getFeature',
    SELECTEDVEHICLECHANGE: 'selectedVehicleChage', // 更改车辆类型时触发,
    CHANGESCENE: 'changeScene', // 更改场景
    GETEDITDATA: 'getEditData', // 立交自相交
    SHOWRAWPOI: 'showRawPoi', // poi15米移位
    FEEDBACKREFRESH: 'feedbackRefresh', // 刷新反馈
    SELECTEDCHANGED: 'selectedChanged', // 选中要素发生改变
    PARTSOPENPANEL: 'partsOpenPanel', // 打开辅助编辑面板
    PARTSCLOSEPANEL: 'partsClosePanel', // 关闭辅助编辑面板
    PARTSSELECTEDCHANGED: 'partsSelectedChanged', // 辅助面板当前选中项变化
    PARTSADD: 'partsAdd', // 辅助面板添加项
    PARTSDEL: 'partsDel', // 辅助面板删除
    PARTSREFRESH: 'partsRefresh', // 辅助面板刷新
    OBJECTSELECTED: 'ObjectSelected', // 对象选中事件
    BATCHOBJECTSELECTED: 'BatchObjectSelected', // 批量对象选中
    SCENECREFRESH: 'sceneRefresh', // 场景刷新
    SHOWOBJECT: 'showObject', // 场景刷新
    OPENSHAPEEDITPANEL: 'openShapeEditPanel', // 打开形状编辑面板
    REFRESHSHAPEEDITPANELTOOLS: 'refreshShapeEditPanelTools', // 刷新形状编辑面板工具
    REFRESHSHAPEEDITPANELSNAPACTORS: 'refreshShapeEditPanelSnapActors', // 刷新形状编辑面板捕捉
    CLOSESHAPEEDITPANEL: 'closeShapeEditPanel', // 关闭形状编辑面板
    SHAPEEDITTOOLCHANGED: 'shapeEditToolChanged', // 形状编辑工具改变
    SHAPEEDITPANELCLOSED: 'shapeEditPanelClosed', // 形状编辑面板关闭
    SHAPEEDITSNAPACTORCHANGED: 'shapeEditSnapActorChanged', // 形状编辑捕捉器改变
    CTRLPANELSELECTED: 'ctrlPanelSelected', // 控制器面板选择
    DISMISSFACE: 'disMissFace', // 解除关联
    JOINFACE: 'joinFace',  // 建立关联面
    ADDRELATION: 'addRelation', // 创建同一关系事件
    SCENECHANGED: 'sceneChanged', // 场景切换事件
    STREETVIEWHEADINGCHANGED: 'streetViewHeadingChanged',
    LINKDIRECTCHANGED: 'linkDirectChanged', // link方向改变事件
    EDITTOOLSTART: 'editToolStart', // 工具开始编辑
    EDITTOOLEND: 'editToolEnd', // 工具结束编辑
    DRAWTASKCIRCLE: 'drawTaskCircle', // 绘制任务圈
    STARTRELOADINBG: 'startReloading', // 管理工具进度条的开始
    ENDRELOADING: 'endReloading', // 管理工具进度条结束
    REFRESHPOIHIGHLIGHT: 'refreshPoiHighLight', // 管理工具进度条结束
    POIMOVEABLEREQ: 'poiMoveableReq', // poi显示坐标是否可移动请求
    POIMOVEABLERES: 'poiMoveableRes', // poi显示坐标是否可移动回应
    TIPLANECONNEXITYSPACE: 'tipLaneConnexitySpace', // 车信tips创建时在面板按空格事件
    TIPNORMALRESTRICTIONSPACE: 'tipNormalRestrictionSpace', // 交限tips创建时在面板按空格事件
    CLOSERIGHTPANEL: 'closeRightPanel', // 关闭右侧面板及工具条
    BATCHDELETELIMIT: 'batchDeleteLimit', // 批量删除成功之后control需要处理的逻辑
    BATCHEDITLIMIT: 'batchEditLimit', // 批量编辑成功之后control需要处理的逻辑
    REFRESHSPARELINE: 'refreshSpareLine', // 批量编辑成功之后control需要处理的逻辑
    REFRESHRESULTLIST: 'refreshResultList', // 删除成功之后刷新几何成果列表
    REFRESHTEMPORARYLIST: 'refreshTemporaryList', // 刷新临时成果列表
    REFRESHDEALFAILURELIST: 'refreshTemporaryList'// 刷新未批处理成功列表

};
