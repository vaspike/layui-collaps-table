/*
 * @Author: vaspike
 * @Date: 2021-11-12 13:19:49
 * @LastEditors: vaspike
 * @LastEditTime: 2021-11-12 13:29:21
 * @Description: lay-ui树型表格工具方法
 */
/**
    * @description: 子表dom展开
    * @param {*} options 子表配置对象
    */
function collapseTable(options) {
    let trObj = options.elem;
    if (!trObj) return;
    let accordion = options.accordion,
        success = options.success,
        content = options.content || '';
    //当前表格视图
    let tableView = trObj.parents('.layui-table-view');
    //当前表格标识
    let id = tableView.attr('lay-id');
    //当前行索引
    let index = trObj.data('index');
    //左侧当前固定行
    let leftTr = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + index + '"]');
    //右侧当前固定行
    let rightTr = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + index + '"]');
    //获取合并长度
    let colspan = trObj.find('td').length;
    //展开行Dom
    let trObjChildren = trObj.next();
    //展开行索引
    let indexChildren = id + '-' + index + '-children';
    //左侧展开固定行
    let leftTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + indexChildren + '"]');
    //右侧展开固定行
    let rightTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + indexChildren + '"]');
    //左宽
    let lw = leftTr.width() + 15;
    //右宽
    let rw = rightTr.width() + 15;
    //不存在就创建展开行
    if (trObjChildren.data('index') != indexChildren) {
        //装载HTML元素
        let tr = '<tr data-index="' + indexChildren + '"><td colspan="' + colspan + '"><div style="height: auto;padding-left:' + lw + 'px;padding-right:' + rw + 'px" class="layui-table-cell">' + content + '</div></td></tr>';
        //隐藏展开行
        trObjChildren = trObj.after(tr).next().hide();
        //固定行
        let fixTr = '<tr data-index="' + indexChildren + '"></tr>';
        //左固定
        leftTrChildren = leftTr.after(fixTr).next().hide();
        //右固定
        rightTrChildren = rightTr.after(fixTr).next().hide();
    }
    //应展开|折叠的元素的lay-filter
    let myEventFilter = options.eventName === undefined ? 'collapse' : options.eventName;
    //展开|折叠箭头图标
    trObj.find('td[lay-event="' + myEventFilter + '"] i.layui-colla-icon').toggleClass("layui-icon-right layui-icon-down");
    //显示|隐藏展开行
    trObjChildren.toggle();
    //开启手风琴折叠和折叠箭头
    if (accordion) {
        trObj.siblings().find('td[lay-event="' + myEventFilter + '"] i.layui-colla-icon').removeClass("layui-icon-down").addClass("layui-icon-right");
        //展开
        trObjChildren.siblings('[data-index$="-children"]').hide();
        //左固定
        rightTrChildren.siblings('[data-index$="-children"]').hide();
        //右固定
        leftTrChildren.siblings('[data-index$="-children"]').hide();
    }
    //回调函数
    success(trObjChildren, indexChildren);
    //展开高度固定
    // heightChildren = trObjChildren.height(); 
    //左固定
    // rightTrChildren.height(heightChildren + 115).toggle(); 
    //右固定
    // leftTrChildren.height(heightChildren + 115).toggle(); 
}
