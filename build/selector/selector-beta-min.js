/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.4.1
*/
(function(){var U=function(){};var D=YAHOO.util;var E={IDENT:"-?[_a-z]+[-\\w]*",BEGIN:"^",END:"$",OR:"|",SP:"\\s+"};var F={SIMPLE:"-+\\w_\\[\\]\\.\\|\\*\\'\\(\\)#:^~=$!\"",COMBINATORS:",>+~"};E.CAPTURE_IDENT="("+E.IDENT+")";E.BEGIN_SPACE="(?:"+E.BEGIN+E.OR+E.SP+")";E.END_SPACE="(?:"+E.SP+E.OR+E.END+")";E.SELECTOR="^("+E.CAPTURE_IDENT+"?(["+F.SIMPLE+"]*)?\\s*(["+F.COMBINATORS+"]?)?\\s*).*$";E.SIMPLE="("+E.CAPTURE_IDENT+"?(["+F.SIMPLE+"]*)*)?";E.ATTRIBUTES="\\[([a-z]+\\w*)+([~\\|\\^\\$\\*!=]=?)?\"?([^\\]\"]*)\"?\\]";E.CAPTURE_ATTRIBUTES="("+E.ATTRIBUTES+")";E.PSEUDO=":"+E.CAPTURE_IDENT+"(?:\\({1}"+E.SIMPLE+"\\){1})*";E.NTH_CHILD="^(?:(\\d*)(n){1}|(odd|even)$)*([-+]?\\d*)$";E.URL_ATTR="^href|url$";U.prototype={document:window.document,attrAliases:{"for":"htmlFor","class":"className"},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"=":function(W,X){return W===X;},"!=":function(W,X){return W!==X;},"~=":function(W,Y){var X=E.BEGIN_SPACE+Y+E.END_SPACE;S[X]=S[X]||new RegExp(X);return S[X].test(W);},"|=":function(W,X){return H(E.BEGIN+X+"[-]?").test(W);},"^=":function(W,X){return W.indexOf(X)===0;},"$=":function(W,X){return W.lastIndexOf(X)===W.length-X.length;},"*=":function(W,X){return W.indexOf(X)>-1;},"":function(W,X){return W;}},pseudos:{"root":function(W){return W===W.ownerDocument.documentElement;},"nth-child":function(W,X){return R(W,X);},"nth-last-child":function(W,X){return R(W,X,null,true);},"nth-of-type":function(W,X){return R(W,X,W.tagName);},"nth-last-of-type":function(W,X){return R(W,X,W.tagName,true);},"first-child":function(W){return G(W.parentNode)[0]===W;},"last-child":function(X){var W=G(X.parentNode);return W[W.length-1]===X;},"first-of-type":function(W,X){return G(W.parentNode,W.tagName.toLowerCase())[0];},"last-of-type":function(X,Y){var W=G(X.parentNode,X.tagName.toLowerCase());return W[W.length-1];},"only-child":function(X){var W=G(X.parentNode);return W.length===1&&W[0]===X;},"only-of-type":function(W){return G(W.parentNode,W.tagName.toLowerCase()).length===1;},"empty":function(W){return W.childNodes.length===0;},"not":function(W,X){return !U.test(W,X);},"contains":function(W,X){return W.innerHTML.indexOf(X)>-1;},"checked":function(W){return W.checked===true;}},test:function(a,Y){a=U.document.getElementById(a)||a;var X=Y.split(",");if(X.length){for(var Z=0,W=X.length;Z<W;++Z){if(V(a,X[Z])){return true;}}return false;}return V(a,Y);},filter:function(Z,Y){if(!Z||!Y){}var c,a=Z,X=[],d=C(Y);if(!a.item){for(var b=0,W=Z.length;b<W;++b){if(!Z[b].tagName){c=U.document.getElementByid(Z[b]);if(c){a[a.length]=c;}else{}}}}X=Q(a,C(Y)[0]);B();return X;},query:function(X,Y,Z){var W=I(X,Y,Z);return W;}};var I=function(c,h,j,a){if(!c){return[];}var k=[];var Y=c.split(",");if(Y.length>1){for(var d=0,e=Y.length;d<e;++d){k=k.concat(arguments.callee(Y[d],h,j,true));}J();return k;}if(h&&!h.tagName){h=U.document.getElementById(h);if(!h){return[];}}h=h||U.document;var g=C(c);var f=g[N(g)],W=[],Z,X,b=g.pop();if(f){X=O(f.attributes);}if(X){if(X===b.id){W=[U.document.getElementById(X)]||h;}else{Z=U.document.getElementById(X);if(h===U.document||L(Z,h)){if(Z&&V(Z,null,f)){h=Z;}}else{return[];}}}if(h&&!W.length){W=h.getElementsByTagName(b.tag);}if(W.length){k=Q(W,b,j,a);}B();return k;};var L=function(){if(document.documentElement.contains&&!YAHOO.env.ua.webkit<420){return function(X,W){return W.contains(X);};}else{if(document.documentElement.compareDocumentPosition){return function(X,W){return !!(W.compareDocumentPosition(X)&16);};}else{return function(Y,X){var W=Y.parentNode;while(W){if(Y===W){return true;}W=W.parentNode;}return false;};}}}();var Q=function(Z,b,c,Y){var X=[],d;for(var a=0,W=Z.length;a<W;++a){d=Z[a];if(!V(d,null,b)||(Y&&d._found)){continue;}if(c){return[d];}if(Y){d._found=true;M[M.length]=d;}X[X.length]=d;}return X;};var V=function(Y,b,a){a=a||C(b).pop();if(!Y||Y._found||(a.tag!="*"&&Y.tagName.toLowerCase()!=a.tag)){return false;}var X=U.operators,W=U.pseudos,c=a.attributes,f,g=a.pseudos,Z=a.previous;for(var d=0,e=c.length;d<e;++d){f=(H(E.URL_ATTR).test(c[d][0]))?Y.getAttribute(c[d][0],2):Y[c[d][0]];if(X[c[d][1]]&&!X[c[d][1]](f,c[d][2])){return false;}}for(var d=0,e=g.length;d<e;++d){if(W[g[d][0]]&&!W[g[d][0]](Y,g[d][1])){return false;}}if(Z){if(Z.combinator!==","){return P[Z.combinator](Y,a);}}return true;};var M=[];var K=[];var S={};var J=function(){for(var X=0,W=M.length;X<W;++X){try{delete M[X]._found;}catch(Y){M[X].removeAttribute("_found");}}M=[];};var B=function(){if(!document.documentElement.children){return function(){for(var X=0,W=K.length;X<W;++X){delete K[X]._children;}K=[];};}else{return function(){};}}();var H=function(X,W){W=W||"";if(!S[X+W]){S[X+W]=new RegExp(X,W);}return S[X+W];};var T=function(W){return W.replace(H(E.BEGIN+E.SP+E.OR+E.SP+E.END,"g"),"");};var P={" ":function(X,W){X=X.parentNode;while(X&&X.tagName){if(V(X,null,W.previous)){return true;}X=X.parentNode;}return false;},">":function(X,W){return V(X.parentNode,null,W.previous);},"+":function(Y,X){var W=Y.previousSibling;while(W&&W.nodeType!==1){W=W.previousSibling;}if(W&&V(W,null,X.previous)){return true;}return false;},"~":function(Y,X){var W=Y.previousSibling;while(W){if(W.nodeType===1&&V(W,null,X.previous)){return true;}W=W.previousSibling;}return false;}};var G=function(){if(document.documentElement.children){return function(X,W){return W?X.children.tags(W):X.children;};}else{return function(a,X){if(a._children){return a._children;}var Z=[],b=a.childNodes;for(var Y=0,W=b.length;Y<W;++Y){if(b[Y].tagName){if(!X||b[Y].tagName.toLowerCase()===X){Z[Z.length]=b[Y];}}}a._children=Z;K[K.length]=a;return Z;};}}();var R=function(X,h,l,c){if(l){l=l.toLowerCase();}var j=S[E.NTH_CHILD]=S[E.NTH_CHILD]||new RegExp(E.NTH_CHILD);j.test(h);var g=parseInt(RegExp.$1,10),W=RegExp.$2,d=RegExp.$3,e=parseInt(RegExp.$4,10)||0,k=[];if(isNaN(g)){g=(W)?1:0;}if(d){g=2;op="+";W="n";e=(d==="odd")?1:0;}var f=G(X.parentNode,l);if(!f){return false;}if(g===0){if(f[e-1]===X){return true;
}else{return false;}}if(!c){for(var Y=e-1,Z=f.length;Y<Z;Y+=g){if(Y>=0&&f[Y]===X){return true;}}}else{for(var Y=f.length-e,Z=f.length;Y>=0;Y-=g){if(Y<Z&&f[Y]===X){return true;}}}return false;};var O=function(X){for(var Y=0,W=X.length;Y<W;++Y){if(X[Y][0]=="id"&&X[Y][1]==="="){return X[Y][2];}}};var N=function(Y){for(var X=0,W=Y.length;X<W;++X){if(O(Y[X].attributes)){return X;}}return -1;};var C=function(Y){if(!Y){return[];}var a,d=[],X,Z=U.attrAliases,W,c=H(E.ATTRIBUTES,"g"),b=H(E.PSEUDO,"g");Y=A(Y);while(Y.length&&H(E.SELECTOR).test(Y)){a={previous:a,simple:RegExp.$1,tag:RegExp.$2.toLowerCase()||"*",predicate:RegExp.$3,attributes:[],pseudos:[],combinator:RegExp.$4};while(X=b.exec(a.predicate)){a.predicate=a.predicate.replace(X[0],"");a.pseudos[a.pseudos.length]=X.slice(1);}while(X=c.exec(a.predicate)){if(Z[X[1]]){X[1]=Z[X[1]];}W=X.slice(1);if(W[1]===undefined){W[1]="";}a.attributes[a.attributes.length]=W;}a.id=O(a.attributes);if(a.previous){a.previous.combinator=a.previous.combinator||" ";}d[d.length]=a;Y=T(Y.substr(a.simple.length));}return d;};var A=function(X){var Y=U.shorthand;var Z=X.match(H(E.CAPTURE_ATTRIBUTES,"g"));if(Z){X=X.replace(H(E.CAPTURE_ATTRIBUTES,"g"),"REPLACED_ATTRIBUTE");}for(var b in Y){X=X.replace(H(b,"g"),Y[b]);}if(Z){for(var a=0,W=Z.length;a<W;++a){X=X.replace("REPLACED_ATTRIBUTE",Z[a]);}}return X;};U=new U();U.CHARS=F;U.TOKENS=E;D.Selector=U;})();YAHOO.register("selector",YAHOO.util.Selector,{version:"2.4.1",build:"742"});