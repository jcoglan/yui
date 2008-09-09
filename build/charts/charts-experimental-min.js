/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.4.1
*/
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(E,C,K,F,H,J,L,G,A,D){if(!document.getElementById){return ;}this.DETECT_KEY=D?D:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(E){this.setAttribute("swf",E);}if(C){this.setAttribute("id",C);}if(K){this.setAttribute("width",K);}if(F){this.setAttribute("height",F);}if(H){this.setAttribute("version",new deconcept.PlayerVersion(H.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(J){this.addParam("bgcolor",J);}var B=L?L:"high";this.addParam("quality",B);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var I=(G)?G:window.location;this.setAttribute("xiRedirectUrl",I);this.setAttribute("redirectUrl","");if(A){this.setAttribute("redirectUrl",A);}};deconcept.SWFObject.prototype={useExpressInstall:function(A){this.xiSWFPath=!A?"expressinstall.swf":A;this.setAttribute("useExpressInstall",true);},setAttribute:function(A,B){this.attributes[A]=B;},getAttribute:function(A){return this.attributes[A];},addParam:function(A,B){this.params[A]=B;},getParams:function(){return this.params;},addVariable:function(A,B){this.variables[A]=B;},getVariable:function(A){return this.variables[A];},getVariables:function(){return this.variables;},getVariablePairs:function(){var A=new Array();var B;var C=this.getVariables();for(B in C){A[A.length]=B+"="+C[B];}return A;},getSWFHTML:function(){var D="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}D="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";D+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var C=this.getParams();for(var A in C){D+=[A]+"=\""+C[A]+"\" ";}var B=this.getVariablePairs().join("&");if(B.length>0){D+="flashvars=\""+B+"\"";}D+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}D="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";D+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var C=this.getParams();for(var A in C){D+="<param name=\""+A+"\" value=\""+C[A]+"\" />";}var B=this.getVariablePairs().join("&");if(B.length>0){D+="<param name=\"flashvars\" value=\""+B+"\" />";}D+="</object>";}return D;},write:function(A){if(this.getAttribute("useExpressInstall")){var B=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(B)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var C=(typeof A=="string")?document.getElementById(A):A;C.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var C=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var A=navigator.plugins["Shockwave Flash"];if(A&&A.description){C=new deconcept.PlayerVersion(A.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var D=1;var B=3;while(D){try{B++;D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+B);C=new deconcept.PlayerVersion([B,0,0]);}catch(E){D=null;}}}else{try{var D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(E){try{var D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");C=new deconcept.PlayerVersion([6,0,21]);D.AllowScriptAccess="always";}catch(E){if(C.major==6){return C;}}try{D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(E){}}if(D!=null){C=new deconcept.PlayerVersion(D.GetVariable("$version").split(" ")[1].split(","));}}}return C;};deconcept.PlayerVersion=function(A){this.major=A[0]!=null?parseInt(A[0]):0;this.minor=A[1]!=null?parseInt(A[1]):0;this.rev=A[2]!=null?parseInt(A[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(A){if(this.major<A.major){return false;}if(this.major>A.major){return true;}if(this.minor<A.minor){return false;}if(this.minor>A.minor){return true;}if(this.rev<A.rev){return false;}return true;};deconcept.util={getRequestParameter:function(D){var C=document.location.search||document.location.hash;if(D==null){return C;}if(C){var B=C.substring(1).split("&");for(var A=0;A<B.length;A++){if(B[A].substring(0,B[A].indexOf("="))==D){return B[A].substring((B[A].indexOf("=")+1));}}}return"";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var C=document.getElementsByTagName("OBJECT");for(var B=C.length-1;B>=0;B--){C[B].style.display="none";for(var A in C[B]){if(typeof C[B][A]=="function"){C[B][A]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);
};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(A){return document.all[A];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;YAHOO.widget.FlashAdapter=function(C,A,B){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};B=B||{};this._id=B.id=B.id||YAHOO.util.Dom.generateId(null,"yuigen");B.version=B.version||"9.0.45";B.backgroundColor=B.backgroundColor||"#ffffff";this._attributes=B;this._swfURL=C;this._embedSWF(this._swfURL,A,B.id,B.version,B.backgroundColor,B.expressInstall);this.createEvent("contentReady");};YAHOO.extend(YAHOO.widget.FlashAdapter,YAHOO.util.AttributeProvider,{_swfURL:null,_swf:null,_id:null,_attributes:null,toString:function(){return"FlashAdapter "+this._id;},_embedSWF:function(H,G,C,B,E,F){var D=new deconcept.SWFObject(H,C,"100%","100%",B,E,F);if(F){D.useExpressInstall(F);}D.addParam("allowScriptAccess","always");D.addVariable("allowedDomain",document.location.hostname);D.addVariable("elementID",C);D.addVariable("eventHandler","YAHOO.widget.FlashAdapter.eventHandler");var A=YAHOO.util.Dom.get(G);var I=D.write(A);if(I){this._swf=YAHOO.util.Dom.get(C);this._swf.owner=this;}},_eventHandler:function(B){var A=B.type;switch(A){case"swfReady":this._loadHandler();return ;case"log":return ;}this.fireEvent(A,B);},_loadHandler:function(){this._initAttributes(this._attributes);this.setAttributes(this._attributes,true);this._attributes=null;this.fireEvent("contentReady");},_initAttributes:function(A){this.getAttributeConfig("swfURL",{method:this._getSWFURL});},_getSWFURL:function(){return this._swfURL;}});YAHOO.widget.FlashAdapter.eventHandler=function(A,C){var B=YAHOO.util.Dom.get(A);if(!B.owner){setTimeout(function(){YAHOO.widget.FlashAdapter.eventHandler(A,C);},0);}else{B.owner._eventHandler(C);}};YAHOO.widget.Chart=function(C,A,D,B){YAHOO.widget.Chart.superclass.constructor.call(this,YAHOO.widget.Chart.SWFURL,A,B);this._type=C;this._dataSource=D;this.createEvent("itemMouseOverEvent");this.createEvent("itemMouseOutEvent");this.createEvent("itemClickEvent");this.createEvent("itemDoubleClickEvent");this.createEvent("itemDragStartEvent");this.createEvent("itemDragEvent");this.createEvent("itemDragEndEvent");};YAHOO.extend(YAHOO.widget.Chart,YAHOO.widget.FlashAdapter,{_type:null,_pollingID:null,_pollingInterval:null,toString:function(){return"Chart "+this._id;},setStyle:function(A,B){B=YAHOO.lang.JSON.stringify(B);this._swf.setStyle(A,B);},setStyles:function(A){A=YAHOO.lang.JSON.stringify(A);this._swf.setStyles(A);},setSeriesStyles:function(B){for(var A=0;A<B.length;A++){B[A]=YAHOO.lang.JSON.stringify(B[A]);}this._swf.setSeriesStyles(B);},_initAttributes:function(A){YAHOO.widget.Chart.superclass._initAttributes.call(this,A);this.getAttributeConfig("request",{method:this._getRequest});this.setAttributeConfig("request",{method:this._setRequest});this.getAttributeConfig("dataSource",{method:this._getDataSource});this.setAttributeConfig("dataSource",{method:this._setDataSource});this.getAttributeConfig("series",{method:this._getSeriesDefs});this.setAttributeConfig("series",{method:this._setSeriesDefs});this.getAttributeConfig("categoryNames",{method:this._getCategoryNames});this.setAttributeConfig("categoryNames",{validator:YAHOO.lang.isArray,method:this._setCategoryNames});this.getAttributeConfig("dataTipFunction",{method:this._getDataTipFunction});this.setAttributeConfig("dataTipFunction",{method:this._setDataTipFunction});this.getAttributeConfig("polling",{method:this._getPolling});this.setAttributeConfig("polling",{method:this._setPolling});},_loadHandler:function(){this._swf.setType(this._type);if(this._attributes.style){var A=this._attributes.style;this.setStyles(A);}YAHOO.widget.Chart.superclass._loadHandler.call(this);if(this._dataSource){this.set("dataSource",this._dataSource);}},_refreshData:function(){if(this._dataSource!=null){if(this._pollingID!=null){this._dataSource.clearInterval(this._pollingID);this._pollingID=null;}if(this._pollingInterval>0){this._pollingID=this._dataSource.setInterval(this._pollingInterval,this._request,this._loadDataHandler,this);}else{this._dataSource.sendRequest(this._request,this._loadDataHandler,this);}}},_loadDataHandler:function(D,C,J){if(J){}else{var I=false;var F=[];var E=0;if(this._seriesDefs){E=this._seriesDefs.length;for(var H=0;H<E;H++){var K=this._seriesDefs[H];var B={};for(var A in K){if(A=="style"&&K.style!=null){B.style=YAHOO.lang.JSON.stringify(K.style);I=true;K.style=null;}else{B[A]=K[A];}}F.push(B);}}if(E>0){for(H=0;H<E;H++){K=F[H];if(!K.type){K.type=this._type;}K.dataProvider=C.results;}}else{var G={type:this._type,dataProvider:C.results};F.push(G);}this._swf.setDataProvider(F,I);}},_request:"",_getRequest:function(){return this._request;},_setRequest:function(A){this._request=A;this._refreshData();},_dataSource:null,_getDataSource:function(){return this._dataSource;},_setDataSource:function(A){this._dataSource=A;this._refreshData();},_seriesDefs:null,_getSeriesDefs:function(){return this._seriesDefs;},_setSeriesDefs:function(A){this._seriesDefs=A;},_getCategoryNames:function(){return this._swf.getCategoryNames();},_setCategoryNames:function(A){this._swf.setCategoryNames(A);},_dataTipFunction:null,_getDataTipFunction:function(){return this._dataTipFunction;},_setDataTipFunction:function(A){this._dataTipFunction=A;this._swf.setDataTipFunction(A);},_getPolling:function(){return this._pollingInterval;},_setPolling:function(A){this._pollingInterval=A;this._refreshData();}});YAHOO.widget.Chart.SWFURL="assets/charts.swf";YAHOO.widget.PieChart=function(A,C,B){YAHOO.widget.PieChart.superclass.constructor.call(this,"pie",A,C,B);};YAHOO.lang.extend(YAHOO.widget.PieChart,YAHOO.widget.Chart,{_initAttributes:function(A){YAHOO.widget.PieChart.superclass._initAttributes.call(this,A);this.getAttributeConfig("dataField",{method:this._getDataField});
this.setAttributeConfig("dataField",{validator:YAHOO.lang.isString,method:this._setDataField});this.getAttributeConfig("categoryField",{method:this._getCategoryField});this.setAttributeConfig("categoryField",{validator:YAHOO.lang.isString,method:this._setCategoryField});},_getDataField:function(){return this._swf.getDataField();},_setDataField:function(A){this._swf.setDataField(A);},_getCategoryField:function(){return this._swf.getCategoryField();},_setCategoryField:function(A){this._swf.setCategoryField(A);}});YAHOO.widget.CartesianChart=function(C,A,D,B){YAHOO.widget.CartesianChart.superclass.constructor.call(this,C,A,D,B);};YAHOO.lang.extend(YAHOO.widget.CartesianChart,YAHOO.widget.Chart,{_initAttributes:function(A){YAHOO.widget.CartesianChart.superclass._initAttributes.call(this,A);this.getAttributeConfig("xField",{method:this._getXField});this.setAttributeConfig("xField",{validator:YAHOO.lang.isString,method:this._setXField});this.getAttributeConfig("yField",{method:this._getYField});this.setAttributeConfig("yField",{validator:YAHOO.lang.isString,method:this._setYField});this.setAttributeConfig("xAxis",{method:this._setXAxis});this.setAttributeConfig("yAxis",{method:this._setYAxis});},_getXField:function(){return this._swf.getHorizontalField();},_setXField:function(A){this._swf.setHorizontalField(A);},_getYField:function(){return this._swf.getVerticalField();},_setYField:function(A){this._swf.setVerticalField(A);},_setXAxis:function(A){this._swf.setHorizontalAxis(A);},_setYAxis:function(A){this._swf.setVerticalAxis(A);}});YAHOO.widget.LineChart=function(A,C,B){YAHOO.widget.LineChart.superclass.constructor.call(this,"line",A,C,B);};YAHOO.lang.extend(YAHOO.widget.LineChart,YAHOO.widget.CartesianChart);YAHOO.widget.ColumnChart=function(A,C,B){YAHOO.widget.ColumnChart.superclass.constructor.call(this,"column",A,C,B);};YAHOO.lang.extend(YAHOO.widget.ColumnChart,YAHOO.widget.CartesianChart);YAHOO.widget.BarChart=function(A,C,B){YAHOO.widget.BarChart.superclass.constructor.call(this,"bar",A,C,B);};YAHOO.lang.extend(YAHOO.widget.BarChart,YAHOO.widget.CartesianChart);YAHOO.widget.Axis=function(){};YAHOO.widget.Axis.prototype={type:null,orientation:"horizontal",reverse:false,labelFunction:null,hideOverlappingLabels:true};YAHOO.widget.NumericAxis=function(){YAHOO.widget.NumericAxis.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.NumericAxis,YAHOO.widget.Axis,{type:"numeric",minimum:NaN,maximum:NaN,majorUnit:NaN,minorUnit:NaN,snapToUnits:true,alwaysShowZero:true,scale:"linear"});YAHOO.widget.TimeAxis=function(){YAHOO.widget.TimeAxis.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.TimeAxis,YAHOO.widget.Axis,{type:"time",minimum:null,maximum:null,majorUnit:NaN,majorTimeUnit:null,minorUnit:NaN,minorTimeUnit:null,snapToUnits:true});YAHOO.widget.CategoryAxis=function(){YAHOO.widget.CategoryAxis.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.CategoryAxis,YAHOO.widget.Axis,{type:"category",categoryNames:null});YAHOO.widget.Series=function(){};YAHOO.widget.Series.prototype={type:null,displayName:null};YAHOO.widget.CartesianSeries=function(){YAHOO.widget.CartesianSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.CartesianSeries,YAHOO.widget.Series,{xField:null,yField:null});YAHOO.widget.ColumnSeries=function(){YAHOO.widget.ColumnSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.ColumnSeries,YAHOO.widget.CartesianSeries,{type:"column"});YAHOO.widget.LineSeries=function(){YAHOO.widget.LineSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.LineSeries,YAHOO.widget.CartesianSeries,{type:"line"});YAHOO.widget.BarSeries=function(){YAHOO.widget.BarSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.BarSeries,YAHOO.widget.CartesianSeries,{type:"bar"});YAHOO.widget.PieSeries=function(){YAHOO.widget.PieSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.PieSeries,YAHOO.widget.Series,{type:"pie",dataField:null,categoryField:null});YAHOO.register("charts",YAHOO.widget.Chart,{version:"2.4.1",build:"742"});