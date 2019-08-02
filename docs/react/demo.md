# 经典案例

## xlsx应用
> 读取excel表格文件的全部内容或者读取某个文件某个单元格的内容，将其渲染

参考文档:<br/>
[npm xlsx](https://www.npmjs.com/package/xlsx)  
[xlsx 插件用法](https://blog.csdn.net/qq_42564846/article/details/83068863)

``` js
// 安装依赖
npm install xlsx 
// 在项目中引入
import * as XLSX from 'xlsx'; 
// 定义上传 input，accept 属性定义了上传文件支持的类型，onChange 操作中的 importExcel 方法定义了上传文件时执行的操作。
<input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} /> 
// 定义获取和解析 excel 对象的方法
onImportExcel = file => {
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) { // sheet为文件表格内部工作薄名称
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet])); // * 获取工作薄内容
            // break; // 如果只取第一张表，就取消注释这行，存在即值取第一张表格
          }
        }
        console.log(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确');
        return;
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  }
// 取指定工作薄的某个单元格
var first_sheet_name = workbook.SheetNames[0]; // 获取工作薄名称
var address_of_cell = 'A1';
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];
/* Find desired cell */
var desired_cell = worksheet[address_of_cell];
/* Get the value */
var desired_value = (desired_cell ? desired_cell.v : undefined);
```

## File-saver
> 将字符串等字符以json等文件下载下来（注：**此方法仅支持PC端**）

``` js
// 安装依赖
npm install file-saver --save
// 页面引入 
import { saveAs } from 'file-saver';
// 使用方法
let blob = new Blob([JSON.stringify(data)], { type: "" }); // data为需要下载的字符串等内容
saveAs(blob, `${fileName}.json`); // fileName为下载文件文件名
// ===================== 或者采用以下方法
var eleLink = document.createElement('a');
eleLink.download = fileName; // fileName为文件名
eleLink.style.display = 'none';
// 字符内容转变成blob地址
var blob = new Blob([data]); // data为下载内容
eleLink.href = URL.createObjectURL(blob);
// 触发点击
document.body.appendChild(eleLink);
eleLink.click();
// 然后移除
document.body.removeChild(eleLink);
```
## csv文件导出
> 将表格内容以excel表格导出，前端做法

``` js
// 下载csv文件
let name = '任务导出列表'; // name为文件名
var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(content); // content为文件内容，字段与字段之间用“,”隔开，换行用“\n”隔开，拼接而成的字符串
var downloadLink = document.createElement("a");
downloadLink.href = uri;
downloadLink.download = (name+".csv")||"temp.csv";
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);
```

## 百度地图

参考文档:<br/>
[百度地图 官网](http://lbsyun.baidu.com/)
``` js
// 引入百度地图api，ak后面的需要自己申请
-<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=OXAZTgatVu8n0iVGUj3H8udtCg7Dw0bW">
// 在webpack.config.dev.js增加如下代码：
externals: {
  'BMap': 'BMap'
}
// 页面书写如下代码
import React, { Component } from 'react';
import BMap from 'BMap';
import { connect } from 'dva';
import {getProject, management} from "../../services/systems";
import iconGreen from '../../assets/images/popGreen.png';
import noImg from '../../assets/images/tup.png'; // 无图显示

class MapBd extends Component {
  constructor(props) {
    super();
    this.map = null;
    this.curId = props.curId;
    this.circles = [];
    this.removeId = props.removeId;
    this.runMapFunc = props.runMapFunc;
    this.isChoose = props.isChoose;
    this.telnetMap = new Map();
    this.customerMap = new Map();
    this.assetPicMap = new Map();
}
  componentDidMount () {
      this.initMap(); // 初始化地图
      const {map2DData} = this.props;
      this.addMarker(map2DData);
  }
  
  initMap = () => {
    this.map = new BMap.Map("container", {enableMapClick:false}); // 创建地图实例  
    let point = new BMap.Point(104.074056,30.657563); // 创建点坐标  
    this.map.centerAndZoom(point, 6); // 初始化地图，设置中心点坐标和地图级别 
    this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    const { BMAP_ANCHOR_BOTTOM_RIGHT, BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP } = window; // window里面包含了很多参数，解决这些参数未定义问题
    this.map.addControl(new BMap.NavigationControl({
      // type : BMAP_NAVIGATION_CONTROL_ZOOM, //缩放控件类型 仅包含缩放按钮
      anchor : BMAP_ANCHOR_BOTTOM_RIGHT, // 右下角
      offset : new BMap.Size(1,1) //进一步控制缩放按钮的水平竖直偏移量
    })); // 左上角控件  
    this.map.addControl(new BMap.ScaleControl()); // 左下角标尺控件
    // map.addControl(new BMap.OverviewMapControl()); //
    this.map.addControl(new BMap.MapTypeControl({mapTypes: [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP ]})); // 地图控件、卫星控件、混合控件
  }

  addMarker = (markerList) => { // 将坐标点逐个渲染到页面上
    const {BMAP_ANIMATION_BOUNCE } = window;
    const that = this;
    
    var pointArray = new Array();
    for (var i=0;i<markerList.length;i++) {
      const item = markerList[i];
      let strv = JSON.parse(item.strv1);
      pointArray[i] = new BMap.Point(strv.longitude, strv.latitude);

      let markerIcon = new BMap.Icon(iconGreen, new BMap.Size(30, 30));
      var steelMarker = new BMap.Marker(pointArray[i], {icon: markerIcon});  // 创建标注
      this.map.addOverlay(steelMarker); // 地图中增加点
      steelMarker.addEventListener("mouseover",function (e) { // 鼠标滑过事件mouseover
          // this.openInfoWindow(e.target.infoWindow); // 弹出信息窗口
          that.addInfo(item);
        }
      );
      steelMarker.closeInfoWindow();// closeInfoWindow关闭信息窗口
      // steelMarker.addEventListener("mouseout",function () { // 鼠标移开事件mouseout
      //   this.closeInfoWindow();
      // });

      steelMarker.addEventListener('click', function() {
        let key = item.entityId;
        let name = strv.name;
        that.props.setCurAssetName(name);
        that.props.openTab({id: key, name: name});
        that.props.modifyLayer(true);
        that.props.modifyWorkBtn(false);
        // 设置选中的点上下抖动
        var allOverlay = this.map.getOverlays(); //获取所有标注点
        for (var i = 0; i < allOverlay.length; i++){
          allOverlay[i].setAnimation(); //清除跳动动画
          if(allOverlay[i].point.lat == strv.latitude && allOverlay[i].point.lng == strv.longitude){
            allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE); //为当前点添加跳动动画
          }
        }
      });
    }
  }

  addInfo = (item) => {
    let strv = JSON.parse(item.strv1);
    var allOverlay = this.map.getOverlays(); //获取所有标注点
    const that = this;
    let newData = allOverlay.filter( i => {
      if (i.point.lat == strv.latitude && i.point.lng == strv.longitude) {
        return i;
      }
    })[0];
    this.props.getAssetAttr({assetId: item.entityId}).then(res => {
      let picImg = '';
      if (res.generalInfo.facilitiesPic1) {
        picImg = res.generalInfo.facilitiesPic1;
      } else if (res.generalInfo.facilitiesPic2) {
        picImg = res.generalInfo.facilitiesPic2;
      } else {
        picImg = noImg;
      }
      that.assetPicMap.set(item.entityId, picImg);
      let _img = that.assetPicMap.get(item.entityId) || '';
      let tenant = that.telnetMap.get(strv.tenantIdStr);
      let customer = that.customerMap.get(strv.customerIdStr)
      let steelContent = '<div>'+
        `<img src='${_img}' style='width:240px;height:124px'>` +
        "<table style='border:1px solid;width: 240px;height:60px;margin-top:10px'>" +
        "<tr style='border-bottom: 1px solid'>" +
        "<td style='border-right: 1px solid;padding-left:10px;width: 80px'>所属项目</td><td style='padding-left:10px'>"+tenant+"</td>"
        + '</tr>' +
        '<tr>' + 
        "<td style='border-right: 1px solid;padding-left:10px;width: 80px'>所属项目</td><td style='padding-left:10px'>"+customer+"</td>"
        + '</tr>' +
        '</table>' +
        '</div>';
        var steelOpts = {
          width : 240,     //信息窗口宽度
          height: 230,     //信息窗口高度
          title : item.name, //信息窗口标题
          offset: new BMap.Size(0,-15), // 信息框向上偏移，解决信息框闪烁问题
          enableMessage:true	//设置允许信息窗发送短息
        };
        let infoWindow = new BMap.InfoWindow(steelContent, steelOpts); // 创建信息窗口
        newData.infoWindow = infoWindow;
        newData.openInfoWindow(newData.infoWindow);
    });
  }
  
  render() {
    return (
      <div id="container" style={{height: '100%'}}></div>
    )
  }
}
```
