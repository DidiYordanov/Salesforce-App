/**
 * This is an auto-generated code by Monaca JS/CSS Components.
 * Please do not edit by hand.
 */

/*** <GENERATED> ***/


/*** <Start:monaca-cordova-loader> ***/
/*** <Start:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
(function(){
  if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone|iPad|iPod/i))) {
    if (typeof location.href === "string") {
      var relativePath = location.href.split("/www")[1];
      var paths = relativePath.split("/");
      var cordovaJsUrl = ""; 
      for (var i = 0; i < paths.length - 2; i++) {
        cordovaJsUrl += "../";
      }
      document.write("<script src=\"" + cordovaJsUrl+ "cordova.js" + "\"></script>");
    }
  } else if ( ((navigator.userAgent.match(/MSIE\s10.0/)) && (navigator.userAgent.match(/Windows\sNT\s6.2/)) ) || navigator.userAgent.match(/MSAppHost/) ) {
    var elm = document.createElement('script');
    elm.setAttribute("src", "cordova.js");
    document.getElementsByTagName("head")[0].appendChild(elm);
  };
})();
/*** <End:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
/*** <End:monaca-cordova-loader> ***/


/*** <Start:monaca-core-utils> ***/
/*** <Start:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/**
 * Monaca Core Utility Library
 * This library requires cordova.js
 *
 * @version 2.0.4
 * @author  Asial Corporation
 */
window.monaca = window.monaca || {};

(function() {
    /*
     * monaca api queue.
     */
    monaca.apiQueue = monaca.apiQueue || {};
    monaca.apiQueue.paramsArray = [];
    monaca.apiQueue.exec = function(a,b,c,d,e){
        if (!monaca.isDeviceReady) {
            monaca.apiQueue.paramsArray.push([a,b,c,d,e]);
        } else {
            window.cordova.exec(a,b,c,d,e);
        }
    };
    monaca.apiQueue.next = function(){
        var params = monaca.apiQueue.paramsArray.shift();
        if (params) {
            window.cordova.exec(
                function(r) {
                  if (typeof params[0] === 'function') params[0](r); 
                  monaca.apiQueue.next();
                },
                function(r) {
                  if (typeof params[1] === 'function') params[1](r); 
                  monaca.apiQueue.next();
                },
                params[2],
                params[3],
                params[4]
            );
        }
    };

    monaca.isDeviceReady = monaca.isDeviceReady || false;
    document.addEventListener('deviceready', function(){
        window.monaca.isDeviceReady = true;
        monaca.apiQueue.next();
    }, false);

    /**
     * Check User-Agent
     */
    var isAndroid = !!(navigator.userAgent.match(/Android/i));
    var isIOS     = !!(navigator.userAgent.match(/iPhone|iPad|iPod/i));
    monaca.isAndroid = isAndroid;
    monaca.isIOS     = isIOS;

    /**
     * Obtain style property
     */
    monaca.retrieveUIStyle = function() {
        var argsArray = [].slice.apply(arguments);
        monaca.apiQueue.exec(arguments[arguments.length-1], null, "mobi.monaca.nativecomponent", "retrieve", argsArray);
    };

    /**
     * Update style property
     */
    monaca.updateUIStyle = function(id, name, value) {
        if (typeof id == "string") {
            var argsArray = [].slice.apply(arguments);
            monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", argsArray);
        } else {
            for (var i = 0; i < id.length; i++) {
                monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", [id[i], name, value]);
            }
        }
    };
    
    if (isAndroid) {
        monaca.retrieveUIStyle = function(id, name, success, failure) {
            monaca.apiQueue.exec(
                function(style) { success(style[name]); } || function() { }, 
                failure || function() { }, 
                "mobi.monaca.nativecomponent",
                "retrieve", 
                [id]
            );
        };
            
        monaca.updateUIStyle = function(id, name, value, success, failure) {
            var style = {};
            style[name] = value;
            
            monaca.apiQueue.exec(
                success || function() { }, 
                failure || function() { }, 
                "mobi.monaca.nativecomponent",
                "update", 
                [id, style]
            );
        };
    }

    /**
     * Spinner handling
     */
    monaca.showSpinner = function (options) {
        options = options || {};
        var src = options.src ? options.src : null;
        var frames = options.frames != null ? options.frames : null;
        var interval = options.interval != null ? options.interval : null;
        var backgroundColor = options.backgroundColor ? options.backgroundColor : null;
        var backgroundOpacity = options.backgroundOpacity != null ? options.backgroundOpacity : null;
        var title = options.title ? options.title : null;
        var titleColor = options.titleColor ? options.titleColor : null;
        var titleFontScale = options.titleFontScale != null ? options.titleFontScale : null;
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showSpinner', [ src, frames, interval, backgroundColor, backgroundOpacity, title, titleColor, titleFontScale, null ]);
    };

    monaca.hideSpinner = function(){
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideSpinner', []);
    };

    monaca.updateSpinnerTitle = function(newTitle){
        if (!newTitle) newTitle = "";
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'updateSpinnerTitle', [ newTitle ]);
    };

    var transitionPluginName = "Transit";
    
    /**
     * Open new page.
     */
    monaca.pushPage = function(path, options, param) {
        options = options || {};
        var animation = null;
        switch (options.animation) {
        case "lift":
          animation = "modal"; break;
        case "slide":
        case "slideLeft":
          animation = "push"; break;
        case "slideRight":
          animation = "slideRight"; break;
        default:
          animation = "push";
        }
        monaca.apiQueue.exec(null, null, transitionPluginName, animation, [path, options, param]);
    };
    /**
     * Close current page.
     */
    monaca.popPage = function(options) {
        options = options || {};
        var name = options.animation == 'lift' ? 'dismiss' : 'pop';
        monaca.apiQueue.exec(null, null, transitionPluginName, name, [options]);
    };

    /**
     * Open in browser.
     */
    monaca.invokeBrowser = function(url) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "browse", [url]);
    };

    /** 
     * Load in current page.
     */
    monaca.load = function(path, options, param) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "link", [path, options, param]);
    };

    /**
     * return to top page.
     */
    monaca.home = function(options) {
        options = options || {};
        monaca.apiQueue.exec(null, null, transitionPluginName, "home", [options]);
    };

    /**
     * Clear stack
     */
    monaca.clearPageStack = function(clearAll) {
        clearAll = clearAll || false;
        monaca.apiQueue.exec(null, null, transitionPluginName, "clearPageStack", [clearAll]);
    };


    /**
     * Console API from independent PhoneGap.
     */
    window.monaca.console = window.monaca.console || {};

    /**
     * base method for send log.
     */
    monaca.console.sendLog = function(level, url, line, char, arguments) {
        var message;
        for (var i=0; i<arguments.length; i++){
            if (typeof arguments[i] == "string") {
                message = arguments[i];
            } else {
                message = JSON.stringify(arguments[i]);
            }

            if (isIOS) {
                var head = message.substr(0, 5);
                if (window.monaca.isDeviceReady !== true || (head != 'ERROR' && head != 'WARN:')) {
                    var xhr = new XMLHttpRequest();
                    var path = "monaca://log?level=" + encodeURIComponent(level) + "&message=" + encodeURIComponent(message);
                    xhr.open("GET", path);
                    xhr.send();
                }
            } else {
                window.console[level](message);
            }
        }
    }

    /**
     * monaca console methods
     */
    var methods = ["debug", "info", "log", "warn", "error"];
    for (var i=0; i<methods.length; i++) {
        var method = methods[i];
        monaca.console[method] = function(method) {
            return function() {
                monaca.console.sendLog(method, null, null, null, arguments);
            };
        }(method);
    }
    
    /** Replace window.console if iOS **/
    if (isIOS) {
      window.console = window.monaca.console;
    }
    /* Comment out for now
    window.onerror = function (desc, page, line, char) {
      monaca.console.sendLog("error", page, line, char, [desc]);
    };
    */

    window.monaca.splashScreen = window.monaca.splashScreen || {};
    var splashScreenPluginName = "MonacaSplashScreen";

    /**
     * hide SplashScreen.
     */
    monaca.splashScreen.hide = function() {
        if (isAndroid) {
            monaca.apiQueue.exec(null, null, splashScreenPluginName, "hide", []);
        } else {
            navigator.splashscreen.hide();
        }
    };

    // Set monaca.baseUrl
    if (typeof location.href !== "string") {
        console.warn("Cannot find base url");
        monaca.baseUrl = null;
    } else {
        monaca.baseUrl = location.href.split("/www/")[0] + "/www/";
    }

    /**
     * Get device ID
     */
    monaca.getDeviceId = function(callback) {
        monaca.apiQueue.exec(function(result) { callback(result.deviceId); }, null, "Monaca", "getRuntimeConfiguration", []);
    };

})();

/**
 * iOS Status Bar Plugin
 *
 * @author Asial Corporation
 * @date   2014/1/15
 */
window.StatusBar = window.StatusBar || {};

(function() {

  /*
    hideStatusBar
    support : iOS6,iOS7
  */
  StatusBar.hideStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideStatusBar', []);
  }

  /*
    showStatusBar
    support : iOS6,iOS7
  */
  StatusBar.showStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showStatusBar', []);
  }

  /* 
    statusBarStyleDefault
    support : iOS6,iOS7
  */
  StatusBar.statusBarStyleDefault = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleDefault', []);
  }

  /* 
    statusBarStyleLightContent
    support : iOS7
  */
  StatusBar.statusBarStyleLightContent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleLightContent', []);
  }

  /* 
    statusBarStyleBlackOpaque
    support : iOS6
  */
  StatusBar.statusBarStyleBlackOpaque = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackOpaque', []);
  }

  /* 
    statusBarStyleBlackTranslucent
    support : iOS6
  */
  StatusBar.statusBarStyleBlackTranslucent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackTranslucent', []);
  }

})();

/**
 * Monaca Cloud Functions
 *  Version 1.5.0
 *
 * @author Masahiro TANAKA <info@monaca.mobi>
 * @date   2013/03/17
 */
window.monaca = window.monaca || {};
window.monaca.cloud = window.monaca.cloud || {};

(function() {
    /**
     * Push Notification
     */
    monaca.cloud.Push = {};
    monaca.cloud.Push.callback = null;
    monaca.cloud.Push.callbackData = null;

    monaca.cloud.Push.send = function(data) {
        if (typeof monaca.cloud.Push.callback === "function") {
            monaca.cloud.Push.callback(data);
        } else {
            monaca.cloud.Push.callbackData = data;
        }
    };
    monaca.cloud.Push.setHandler = function(fn) {
        if (typeof fn !== "function") {
            console.warn("Push callback must be a function");
        } else {
            monaca.cloud.Push.callback = fn;
            if (monaca.cloud.Push.callbackData) {
                monaca.cloud.Push.callback(monaca.cloud.Push.callbackData);
                monaca.cloud.Push.callbackData = null;
            }
        }
    }; 
    
})();


/*
 * cloud
 */
(function(root) {
  var original$ = root.$;
  var originalZepto = root.Zepto;

  /* Zepto 1.1.3 - zepto event ajax deferred callbacks - zeptojs.com/license */
  var Zepto=function(){function k(t){return null==t?String(t):j[T.call(t)]||"object"}function $(t){return"function"==k(t)}function L(t){return null!=t&&t==t.window}function D(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function F(t){return"object"==k(t)}function Z(t){return F(t)&&!L(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function R(t){return s.call(t,function(t){return null!=t})}function _(t){return t.length>0?n.fn.concat.apply([],t):t}function q(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function W(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function z(t,e){return"number"!=typeof e||c[q(t)]?e:e+"px"}function H(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function I(n,i,r){for(e in i)r&&(Z(i[e])||A(i[e]))?(Z(i[e])&&!Z(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),I(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return $(e)?e.call(t,n,i):e}function U(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function X(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,S={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),Z(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}else{if($(e))return n(a).ready(e);if(S.isZ(e))return e;if(A(e))r=R(e);else if(F(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){I(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return D(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=k,n.isFunction=$,n.isWindow=L,n.isArray=A,n.isPlainObject=Z,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return _(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return $(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if($(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&$(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return F(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!F(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!F(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!D(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!D(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(N(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=H(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=$(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=$(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(F(n))for(e in n)U(this,e,n[e]);else U(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&U(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==k(t))i||0===i?a=q(t)+":"+z(t,i):this.each(function(){this.style.removeProperty(q(t))});else for(e in t)t[e]||0===t[e]?a+=q(e)+":"+z(e,t[e])+";":this.each(function(){this.style.removeProperty(q(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(X(t))},W(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=X(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&X(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?X(this,""):(i=X(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(W(t)," ")}),void X(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,X(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?L(s)?s["inner"+i]:D(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=k(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=N,S.deserializeValue=Y,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=w(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto);

  root.$ = original$;
  root.Zepto = originalZepto;
  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};

  monaca.cloud.timeout = 30000;
  monaca.cloud.url = '%%%CLOUD_HOST%%%';
  monaca.cloud.backendId = '%%%BACKEND_ID%%%';
  monaca.cloud.apiKey = '%%%BACKEND_API_KEY%%%';
  monaca.cloud.deviceId = null;
  monaca.cloud.postQueue = [];

  /**
   * @property {jQuery} .
   */
  monaca.cloud.$ = Zepto;

  var MonacaCloudError = (function() {
    function MonacaCloudError(code, message, data) {
      if (typeof data === "undefined") {
        data = {};
      }
      this.code = code;
      this.message = message;
      this.data = data;
    }
    return MonacaCloudError;
  })();

  /**
   * @class
   */
  monaca.cloud.Error = function(code, message, data) {
    return new MonacaCloudError(code, message, data);
  };

  /**
   * @param {Number} msec .
   */
  monaca.cloud.setTimeout = function(msec) {
    this.timeout = msec;
  };

  // Get device id
  document.addEventListener("deviceready", function() {

    cordova.exec(function(result) {
        monaca.cloud.deviceId = new String(result.deviceId);
        monaca.cloud.url = new String(result.url);
        monaca.cloud.backendId = new String(result.backendId);
        monaca.cloud.apiKey = new String(result.apiKey);

        // execute and clear postQueue
        for (var i = 0; i < monaca.cloud.postQueue.length; i++) {
          monaca.cloud._doPost.apply(monaca.cloud, monaca.cloud.postQueue[i]);
        }
        monaca.cloud.postQueue = [];
      }, function(error) {
        console.error(error);
      },

      "Monaca",
      "getRuntimeConfiguration", []
    );

  }, false);

  // Others
  monaca.cloud._post = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    if (monaca.cloud.deviceId == null) {
      monaca.cloud.postQueue.push([method, params, dfd, ajaxOptions, beforeSuccess]);
    } else {
      monaca.cloud._doPost(method, params, dfd, ajaxOptions, beforeSuccess);
    }
  };

  monaca.cloud._doPost = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    var $ = monaca.cloud.$;

    if (typeof(ajaxOptions) === 'undefined') ajaxOptions = {};
    if ((typeof(method) === 'undefined') && (typeof(params) === 'undefined')) {
      throw new Error('Invalid arguments');
    }

    params['__api_key'] = monaca.cloud.apiKey;
    params['__device'] = monaca.cloud.deviceId;
    var sid = monaca.cloud._getSessionId();
    if (sid.length > 0) {
      params['__session'] = sid;
    }
    var data = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: '1'
    });

    var o = $.extend(true, {
      url: this.url + this.backendId,
      data: data,
      dataType: 'json',
      type: 'POST',
      timeout: this.timeout,
      success: function(jsonResponse, status, xhr) {
        var sessionHeader = xhr.getResponseHeader('X-Set-Monaca-Cloud-Session');
        if (sessionHeader) {
          monaca.cloud._setSessionId(sessionHeader);
        }

        if (typeof(jsonResponse.error) !== 'undefined') {
          // has error code
          dfd.reject(jsonResponse.error);
        } else {
          // success
          if (typeof(jsonResponse.result.loginToken) !== 'undefined') {
            localStorage.monacaCloudLoginToken = jsonResponse.result.loginToken;
          }
          if (typeof(beforeSuccess) !== 'undefined') {
            beforeSuccess(jsonResponse, status, xhr, dfd);
          }
          dfd.resolve(jsonResponse.result);
        }
      },
      error: function(xhr, status) {
        switch (status) {
          case 'timeout':
            var err = monaca.cloud.Error(-11, 'Connection timeout');
            break;
          case 'parsererror':
            var err = monaca.cloud.Error(-12, 'Invalid response');
            break;
          default:
            var err = monaca.cloud.Error(-13, 'Invalid status code');
        }
        dfd.reject(err);
      }
    }, ajaxOptions);

    $.ajax(o);
  };

  var _sessionId = '';

  monaca.cloud._getSessionId = function() {
    return _sessionId;
  };

  monaca.cloud._setSessionId = function(id) {
    if (typeof id != 'string') {
      id = '';
    }
    _sessionId = id;
  };

})(window);
/*
 * CollectionItem
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollectionItem = (function() {

    function MonacaCloudCollectionItem(item, collection) {

      /**
       * @property {String} .
       */
      this._id = item._id;

      /**
       * @property {String} .
       */
      this._ownerUserOid = item._ownerUserOid;

      /**
       * @property {Date} .
       */
      this._createdAt = new Date(item._createdAt);

      /**
       * @property {Date} .
       */
      this._updatedAt = new Date(item._updatedAt);

      /**
       * @property {MonacaCloudCollection} .
       */
      this._collection = collection;


      for (var key in item) {
        if (key.substr(0, 1) != '_') {
          this[key] = item[key];
        }
      }
    }

    MonacaCloudCollectionItem.prototype = {

      /**
       * @return {$.Promise} .
       */
      update: function() {
        var dfd = new $.Deferred();
        var col = this._collection;
        var data = {};

        for (var key in this) {
          if (key.indexOf('_') !== 0) {
            data[key] = this[key];
          }
        }

        monaca.cloud._post('Collection.update', {
          collectionName: col.name,
          itemOid: this._id,
          data: data,
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      getPermission: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.getPermission', {
          collectionName: col.name,
          itemOid: this._id
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(permission, options) {
        var dfd = new $.Deferred();
        var col = this._collection;

        if (typeof(options) === 'undefined') {
          options = {};
        }

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: col.name,
          criteria: '_id == ?',
          bindParams: [this._id],
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      remove: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.delete', {
          collectionName: col.name,
          itemOid: this._id,
        }, dfd, {});

        return dfd.promise();
      },

      'delete': function() {
        return this.remove();
      }

    };


    return MonacaCloudCollectionItem;
  })();

  monaca.cloud.CollectionItem = function(item, collection) {
    return new MonacaCloudCollectionItem(item, collection);
  };

})(window);
/*
 * Collection
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollection = (function() {

    function MonacaCloudCollection(name) {
      this.name = name;
    }

    MonacaCloudCollection.prototype = {

      /**
       * @param {Object|Array} items .
       * @return {Array} result .
       */
      _makeCollectionItem: function(items) {
        var result = [];

        if (items instanceof Array) {
          for (var i = 0; i < items.length; i++) {
            result[i] = monaca.cloud.CollectionItem(items[i], this);
          }
        } else {
          result = monaca.cloud.CollectionItem(items, this);
        }

        return result;
      },

      /**
       * @param {Criteria|Array} criteria .
       */
      _validateCriteria: function(criteria) {
        if ((typeof(criteria) === 'undefined') || (typeof(criteria) === 'null')) {
          criteria = monaca.cloud.Criteria('');
        } else if (typeof(criteria) === 'string') {
          criteria = monaca.cloud.Criteria(criteria);
        }

        return criteria;
      },

      /**
       * @param {Object|Array} orderBy .
       * @param {Object} options .
       */
      _validateOptions: function(orderBy, options) {
        //if orderBy is hash, consider it as "options"
        if ((typeof(orderBy) === 'object') && (typeof(orderBy.length) === 'undefined')) {
          options = orderBy;
          if (typeof(options.orderBy) !== 'undefined') {
            orderBy = orderBy.orderBy;
          } else {
            orderBy = null;
          }
        }

        if (orderBy === '') {
          orderBy = null;
        }

        return {
          orderBy: orderBy,
          options: options
        };
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      find: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOne: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOneMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Object} item .
       * @param {Object} [permission] .
       * @return {$.Promise} .
       */
      insert: function(item, permission) {
        var self = this;
        var dfd = new $.Deferred();

        if (typeof(permission) === 'undefined') {
          permission = {};
        }

        monaca.cloud._post('Collection.insert', {
            collectionName: this.name,
            item: item,
            permission: permission
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var item = self._makeCollectionItem(e.result.item);
            dfd.resolve(item);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(criteria, permission, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: this.name,
          criteria: criteria.query,
          bindParams: criteria.bindParams,
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      }
    };

    return MonacaCloudCollection;
  })();


  monaca.cloud.Collection = function(name) {
    return new MonacaCloudCollection(name);
  };

})(window);
/*
 * Criteria
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCriteria = (function() {

    function MonacaCloudCriteria(query, bindParams) {
      this.query = query;
      this.bindParams = (typeof(bindParams) !== 'undefined') ? bindParams : [];
    }

    return MonacaCloudCriteria;
  })();


  monaca.cloud.Criteria = function(query, bindParams) {
    return new MonacaCloudCriteria(query, bindParams);
  };

})(window);
/*
 * Device
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Device = {

    /**
     * @param {String} name .
     * @return {$.Promise} .
     */
    getProperty: function(name) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: [name]
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties[name]);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {Array} names .
     * @return {$.Promise} .
     */
    getProperties: function(names) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: names
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {String} name .
     * @param {String} value .
     * @return {$.Promise} .
     */
    saveProperty: function(name, value) {
      var dfd = new $.Deferred();
      var param = {};

      if ((typeof(name) !== 'undefined') && (typeof(value) !== 'undefined')) {
        param = {
          properties: {}
        };
        param.properties[name] = value;
      }

      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    },

    /**
     * @param {Object} properties .
     * @return {$.Promise} .
     */
    saveProperties: function(properties) {
      var dfd = new $.Deferred();
      var param = {};

      if (typeof(properties) !== 'undefined') param.properties = properties;
      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    }

  };

})(window);
/*
 * Mailer
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Mailer = {

    /**
     * @param {String} userOid .
     * @param {String} templateName .
     * @param {Object} substituteParams .
     * @param {Object} [options] .
     * @return {$.Promise} .
     */
    sendMail: function(userOid, templateName, substituteParams, options) {
      var dfd = new $.Deferred();

      if (typeof(options) === 'undefined') {
        options = {};
      }

      monaca.cloud._post('Mailer.sendMail', {
        userOid: userOid,
        templateName: templateName,
        substituteParams: substituteParams,
        options: options
      }, dfd);

      return dfd.promise();
    }
  };

})(window);
/*
 * User
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.User = (function() {


    return {

      _oid: null,

      /**
       * @return {Boolean} .
       */
      isAuthenticated: function() {
        return (this._oid === null) ? false : true;
      },


      /**
       * @param {String} username .
       * @param {String} password .
       * @param {Object} [properties] .
       * @return {$.Promise} .
       */
      register: function(username, password, properties) {
        var dfd = new $.Deferred();
        var self = this;

        if (typeof(properties) === 'undefined') properties = {};

        monaca.cloud._post('User.register', {
            username: username,
            password: password,
            properties: properties
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );


        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      validate: function(username, properties) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.validate', {
          username: username,
          properties: properties
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} password .
       * @return {$.Promise} .
       */
      unregister: function(password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.unregister', {
            password: password
          }, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} password .
       * @return {$.Promise} .
       */
      login: function(username, password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.login', {
            username: username,
            password: password
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      autoLogin: function() {
        var dfd = new $.Deferred();
        var token = localStorage.monacaCloudLoginToken || '';
        var self = this;

        monaca.cloud._post('User.autoLogin', {
            loginToken: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      logout: function() {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.logout', {}, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} oldPassword .
       * @param {String} newPassword .
       * @return {$.Promise} .
       */
      updatePassword: function(oldPassword, newPassword) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.updatePassword', {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} options .
       * @return {$.Promise} .
       */
      sendPasswordResetToken: function(username, options) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.sendPasswordResetToken', {
          username: username,
          options: options
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} newPassword .
       * @param {String} token .
       * @return {$.Promise} .
       */
      resetPasswordAndLogin: function(username, newPassword, token) {
        var dfd = new $.Deferred();
        var self = this;

        monaca.cloud._post('User.resetPasswordAndLogin', {
            username: username,
            newPassword: newPassword,
            token: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @return {$.Promise} .
       */
      getProperty: function(name) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: [name]
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties[name]);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {Array} names .
       * @return {$.Promise} .
       */
      getProperties: function(names) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: names
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @param {String} value .
       * @return {$.Promise} .
       */
      saveProperty: function(name, value) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(name) !== 'undefined') {
          param = {
            properties: {}
          };
          param.properties[name] = value;
        }

        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      },

      /**
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      saveProperties: function(properties) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(properties) !== 'undefined') param.properties = properties;
        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      }

    };
  })();

})(window);

/*** <End:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/*** <End:monaca-core-utils> ***/














/*** <Start:monaca-onsenui> ***/
/*** <Start:monaca-onsenui LoadJs:"components/monaca-onsenui/js/onsenui.min.js"> ***/
/*! onsenui v2.0.0-beta.6 - 2016-02-05 */
"undefined"==typeof WeakMap&&!function(){var defineProperty=Object.defineProperty,counter=Date.now()%1e9,WeakMap=function(){this.name="__st"+(1e9*Math.random()>>>0)+(counter++ +"__")};WeakMap.prototype={set:function(key,value){var entry=key[this.name];return entry&&entry[0]===key?entry[1]=value:defineProperty(key,this.name,{value:[key,value],writable:!0}),this},get:function(key){var entry;return(entry=key[this.name])&&entry[0]===key?entry[1]:void 0},"delete":function(key){var entry=key[this.name];return entry&&entry[0]===key?(entry[0]=entry[1]=void 0,!0):!1},has:function(key){var entry=key[this.name];return entry?entry[0]===key:!1}},window.WeakMap=WeakMap}(),function(global){function scheduleCallback(observer){scheduledObservers.push(observer),isScheduled||(isScheduled=!0,setImmediate(dispatchCallbacks))}function wrapIfNeeded(node){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(node)||node}function dispatchCallbacks(){isScheduled=!1;var observers=scheduledObservers;scheduledObservers=[],observers.sort(function(o1,o2){return o1.uid_-o2.uid_});var anyNonEmpty=!1;observers.forEach(function(observer){var queue=observer.takeRecords();removeTransientObserversFor(observer),queue.length&&(observer.callback_(queue,observer),anyNonEmpty=!0)}),anyNonEmpty&&dispatchCallbacks()}function removeTransientObserversFor(observer){observer.nodes_.forEach(function(node){var registrations=registrationsTable.get(node);registrations&&registrations.forEach(function(registration){registration.observer===observer&&registration.removeTransientObservers()})})}function forEachAncestorAndObserverEnqueueRecord(target,callback){for(var node=target;node;node=node.parentNode){var registrations=registrationsTable.get(node);if(registrations)for(var j=0;j<registrations.length;j++){var registration=registrations[j],options=registration.options;if(node===target||options.subtree){var record=callback(options);record&&registration.enqueue(record)}}}}function JsMutationObserver(callback){this.callback_=callback,this.nodes_=[],this.records_=[],this.uid_=++uidCounter}function MutationRecord(type,target){this.type=type,this.target=target,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function copyMutationRecord(original){var record=new MutationRecord(original.type,original.target);return record.addedNodes=original.addedNodes.slice(),record.removedNodes=original.removedNodes.slice(),record.previousSibling=original.previousSibling,record.nextSibling=original.nextSibling,record.attributeName=original.attributeName,record.attributeNamespace=original.attributeNamespace,record.oldValue=original.oldValue,record}function getRecord(type,target){return currentRecord=new MutationRecord(type,target)}function getRecordWithOldValue(oldValue){return recordWithOldValue?recordWithOldValue:(recordWithOldValue=copyMutationRecord(currentRecord),recordWithOldValue.oldValue=oldValue,recordWithOldValue)}function clearRecords(){currentRecord=recordWithOldValue=void 0}function recordRepresentsCurrentMutation(record){return record===recordWithOldValue||record===currentRecord}function selectRecord(lastRecord,newRecord){return lastRecord===newRecord?lastRecord:recordWithOldValue&&recordRepresentsCurrentMutation(lastRecord)?recordWithOldValue:null}function Registration(observer,target,options){this.observer=observer,this.target=target,this.options=options,this.transientObservedNodes=[]}var setImmediate,registrationsTable=new WeakMap;if(/Trident|Edge/.test(navigator.userAgent))setImmediate=setTimeout;else if(window.setImmediate)setImmediate=window.setImmediate;else{var setImmediateQueue=[],sentinel=String(Math.random());window.addEventListener("message",function(e){if(e.data===sentinel){var queue=setImmediateQueue;setImmediateQueue=[],queue.forEach(function(func){func()})}}),setImmediate=function(func){setImmediateQueue.push(func),window.postMessage(sentinel,"*")}}var isScheduled=!1,scheduledObservers=[],uidCounter=0;JsMutationObserver.prototype={observe:function(target,options){if(target=wrapIfNeeded(target),!options.childList&&!options.attributes&&!options.characterData||options.attributeOldValue&&!options.attributes||options.attributeFilter&&options.attributeFilter.length&&!options.attributes||options.characterDataOldValue&&!options.characterData)throw new SyntaxError;var registrations=registrationsTable.get(target);registrations||registrationsTable.set(target,registrations=[]);for(var registration,i=0;i<registrations.length;i++)if(registrations[i].observer===this){registration=registrations[i],registration.removeListeners(),registration.options=options;break}registration||(registration=new Registration(this,target,options),registrations.push(registration),this.nodes_.push(target)),registration.addListeners()},disconnect:function(){this.nodes_.forEach(function(node){for(var registrations=registrationsTable.get(node),i=0;i<registrations.length;i++){var registration=registrations[i];if(registration.observer===this){registration.removeListeners(),registrations.splice(i,1);break}}},this),this.records_=[]},takeRecords:function(){var copyOfRecords=this.records_;return this.records_=[],copyOfRecords}};var currentRecord,recordWithOldValue;Registration.prototype={enqueue:function(record){var records=this.observer.records_,length=records.length;if(records.length>0){var lastRecord=records[length-1],recordToReplaceLast=selectRecord(lastRecord,record);if(recordToReplaceLast)return void(records[length-1]=recordToReplaceLast)}else scheduleCallback(this.observer);records[length]=record},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(node){var options=this.options;options.attributes&&node.addEventListener("DOMAttrModified",this,!0),options.characterData&&node.addEventListener("DOMCharacterDataModified",this,!0),options.childList&&node.addEventListener("DOMNodeInserted",this,!0),(options.childList||options.subtree)&&node.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(node){var options=this.options;options.attributes&&node.removeEventListener("DOMAttrModified",this,!0),options.characterData&&node.removeEventListener("DOMCharacterDataModified",this,!0),options.childList&&node.removeEventListener("DOMNodeInserted",this,!0),(options.childList||options.subtree)&&node.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(node){if(node!==this.target){this.addListeners_(node),this.transientObservedNodes.push(node);var registrations=registrationsTable.get(node);registrations||registrationsTable.set(node,registrations=[]),registrations.push(this)}},removeTransientObservers:function(){var transientObservedNodes=this.transientObservedNodes;this.transientObservedNodes=[],transientObservedNodes.forEach(function(node){this.removeListeners_(node);for(var registrations=registrationsTable.get(node),i=0;i<registrations.length;i++)if(registrations[i]===this){registrations.splice(i,1);break}},this)},handleEvent:function(e){switch(e.stopImmediatePropagation(),e.type){case"DOMAttrModified":var name=e.attrName,namespace=e.relatedNode.namespaceURI,target=e.target,record=new getRecord("attributes",target);record.attributeName=name,record.attributeNamespace=namespace;var oldValue=e.attrChange===MutationEvent.ADDITION?null:e.prevValue;forEachAncestorAndObserverEnqueueRecord(target,function(options){return!options.attributes||options.attributeFilter&&options.attributeFilter.length&&-1===options.attributeFilter.indexOf(name)&&-1===options.attributeFilter.indexOf(namespace)?void 0:options.attributeOldValue?getRecordWithOldValue(oldValue):record});break;case"DOMCharacterDataModified":var target=e.target,record=getRecord("characterData",target),oldValue=e.prevValue;forEachAncestorAndObserverEnqueueRecord(target,function(options){return options.characterData?options.characterDataOldValue?getRecordWithOldValue(oldValue):record:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(e.target);case"DOMNodeInserted":var addedNodes,removedNodes,changedNode=e.target;"DOMNodeInserted"===e.type?(addedNodes=[changedNode],removedNodes=[]):(addedNodes=[],removedNodes=[changedNode]);var previousSibling=changedNode.previousSibling,nextSibling=changedNode.nextSibling,record=getRecord("childList",e.target.parentNode);record.addedNodes=addedNodes,record.removedNodes=removedNodes,record.previousSibling=previousSibling,record.nextSibling=nextSibling,forEachAncestorAndObserverEnqueueRecord(e.relatedNode,function(options){return options.childList?record:void 0})}clearRecords()}},global.JsMutationObserver=JsMutationObserver,global.MutationObserver||(global.MutationObserver=JsMutationObserver)}(this),window.CustomElements=window.CustomElements||{flags:{}},function(scope){var flags=scope.flags,modules=[],addModule=function(module){modules.push(module)},initializeModules=function(){modules.forEach(function(module){module(scope)})};scope.addModule=addModule,scope.initializeModules=initializeModules,scope.hasNative=Boolean(document.registerElement),scope.useNative=!flags.register&&scope.hasNative&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||HTMLImports.useNative)}(window.CustomElements),window.CustomElements.addModule(function(scope){function forSubtree(node,cb){findAllElements(node,function(e){return cb(e)?!0:void forRoots(e,cb)}),forRoots(node,cb)}function findAllElements(node,find,data){var e=node.firstElementChild;if(!e)for(e=node.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)find(e,data)!==!0&&findAllElements(e,find,data),e=e.nextElementSibling;return null}function forRoots(node,cb){for(var root=node.shadowRoot;root;)forSubtree(root,cb),root=root.olderShadowRoot}function forDocumentTree(doc,cb){_forDocumentTree(doc,cb,[])}function _forDocumentTree(doc,cb,processingDocuments){if(doc=wrap(doc),!(processingDocuments.indexOf(doc)>=0)){processingDocuments.push(doc);for(var n,imports=doc.querySelectorAll("link[rel="+IMPORT_LINK_TYPE+"]"),i=0,l=imports.length;l>i&&(n=imports[i]);i++)n["import"]&&_forDocumentTree(n["import"],cb,processingDocuments);cb(doc)}}var IMPORT_LINK_TYPE=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none";scope.forDocumentTree=forDocumentTree,scope.forSubtree=forSubtree}),window.CustomElements.addModule(function(scope){function addedNode(node){return added(node)||addedSubtree(node)}function added(node){return scope.upgrade(node)?!0:void attached(node)}function addedSubtree(node){forSubtree(node,function(e){return added(e)?!0:void 0})}function attachedNode(node){attached(node),inDocument(node)&&forSubtree(node,function(e){attached(e)})}function deferMutation(fn){pendingMutations.push(fn),isPendingMutations||(isPendingMutations=!0,setTimeout(takeMutations))}function takeMutations(){isPendingMutations=!1;for(var p,$p=pendingMutations,i=0,l=$p.length;l>i&&(p=$p[i]);i++)p();pendingMutations=[]}function attached(element){hasPolyfillMutations?deferMutation(function(){_attached(element)}):_attached(element)}function _attached(element){element.__upgraded__&&(element.attachedCallback||element.detachedCallback)&&!element.__attached&&inDocument(element)&&(element.__attached=!0,element.attachedCallback&&element.attachedCallback())}function detachedNode(node){detached(node),forSubtree(node,function(e){detached(e)})}function detached(element){hasPolyfillMutations?deferMutation(function(){_detached(element)}):_detached(element)}function _detached(element){element.__upgraded__&&(element.attachedCallback||element.detachedCallback)&&element.__attached&&!inDocument(element)&&(element.__attached=!1,element.detachedCallback&&element.detachedCallback())}function inDocument(element){for(var p=element,doc=wrap(document);p;){if(p==doc)return!0;p=p.parentNode||p.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&p.host}}function watchShadow(node){if(node.shadowRoot&&!node.shadowRoot.__watched){flags.dom&&console.log("watching shadow-root for: ",node.localName);for(var root=node.shadowRoot;root;)observe(root),root=root.olderShadowRoot}}function handler(mutations){if(flags.dom){var mx=mutations[0];if(mx&&"childList"===mx.type&&mx.addedNodes&&mx.addedNodes){for(var d=mx.addedNodes[0];d&&d!==document&&!d.host;)d=d.parentNode;var u=d&&(d.URL||d._URL||d.host&&d.host.localName)||"";u=u.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",mutations.length,u||"")}mutations.forEach(function(mx){"childList"===mx.type&&(forEach(mx.addedNodes,function(n){n.localName&&addedNode(n)}),forEach(mx.removedNodes,function(n){n.localName&&detachedNode(n)}))}),flags.dom&&console.groupEnd()}function takeRecords(node){for(node=wrap(node),node||(node=wrap(document));node.parentNode;)node=node.parentNode;var observer=node.__observer;observer&&(handler(observer.takeRecords()),takeMutations())}function observe(inRoot){if(!inRoot.__observer){var observer=new MutationObserver(handler);observer.observe(inRoot,{childList:!0,subtree:!0}),inRoot.__observer=observer}}function upgradeDocument(doc){doc=wrap(doc),flags.dom&&console.group("upgradeDocument: ",doc.baseURI.split("/").pop()),addedNode(doc),observe(doc),flags.dom&&console.groupEnd()}function upgradeDocumentTree(doc){forDocumentTree(doc,upgradeDocument)}var flags=scope.flags,forSubtree=scope.forSubtree,forDocumentTree=scope.forDocumentTree,hasPolyfillMutations=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;scope.hasPolyfillMutations=hasPolyfillMutations;var isPendingMutations=!1,pendingMutations=[],forEach=Array.prototype.forEach.call.bind(Array.prototype.forEach),originalCreateShadowRoot=Element.prototype.createShadowRoot;originalCreateShadowRoot&&(Element.prototype.createShadowRoot=function(){var root=originalCreateShadowRoot.call(this);return CustomElements.watchShadow(this),root}),scope.watchShadow=watchShadow,scope.upgradeDocumentTree=upgradeDocumentTree,scope.upgradeSubtree=addedSubtree,scope.upgradeAll=addedNode,scope.attachedNode=attachedNode,scope.takeRecords=takeRecords}),window.CustomElements.addModule(function(scope){function upgrade(node){if(!node.__upgraded__&&node.nodeType===Node.ELEMENT_NODE){var is=node.getAttribute("is"),definition=scope.getRegisteredDefinition(is||node.localName);if(definition){if(is&&definition.tag==node.localName)return upgradeWithDefinition(node,definition);if(!is&&!definition["extends"])return upgradeWithDefinition(node,definition)}}}function upgradeWithDefinition(element,definition){return flags.upgrade&&console.group("upgrade:",element.localName),definition.is&&element.setAttribute("is",definition.is),implementPrototype(element,definition),element.__upgraded__=!0,created(element),scope.attachedNode(element),scope.upgradeSubtree(element),flags.upgrade&&console.groupEnd(),element}function implementPrototype(element,definition){Object.__proto__?element.__proto__=definition.prototype:(customMixin(element,definition.prototype,definition["native"]),element.__proto__=definition.prototype)}function customMixin(inTarget,inSrc,inNative){for(var used={},p=inSrc;p!==inNative&&p!==HTMLElement.prototype;){for(var k,keys=Object.getOwnPropertyNames(p),i=0;k=keys[i];i++)used[k]||(Object.defineProperty(inTarget,k,Object.getOwnPropertyDescriptor(p,k)),used[k]=1);p=Object.getPrototypeOf(p)}}function created(element){element.createdCallback&&element.createdCallback()}var flags=scope.flags;scope.upgrade=upgrade,scope.upgradeWithDefinition=upgradeWithDefinition,scope.implementPrototype=implementPrototype}),window.CustomElements.addModule(function(scope){function register(name,options){var definition=options||{};if(!name)throw new Error("document.registerElement: first argument `name` must not be empty");if(name.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(name)+"'.");if(isReservedTag(name))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(name)+"'. The type name is invalid.");if(getRegisteredDefinition(name))throw new Error("DuplicateDefinitionError: a type with name '"+String(name)+"' is already registered");return definition.prototype||(definition.prototype=Object.create(HTMLElement.prototype)),definition.__name=name.toLowerCase(),definition.lifecycle=definition.lifecycle||{},definition.ancestry=ancestry(definition["extends"]),resolveTagName(definition),resolvePrototypeChain(definition),overrideAttributeApi(definition.prototype),registerDefinition(definition.__name,definition),definition.ctor=generateConstructor(definition),definition.ctor.prototype=definition.prototype,definition.prototype.constructor=definition.ctor,scope.ready&&upgradeDocumentTree(document),definition.ctor}function overrideAttributeApi(prototype){if(!prototype.setAttribute._polyfilled){var setAttribute=prototype.setAttribute;prototype.setAttribute=function(name,value){changeAttribute.call(this,name,value,setAttribute)};var removeAttribute=prototype.removeAttribute;prototype.removeAttribute=function(name){changeAttribute.call(this,name,null,removeAttribute)},prototype.setAttribute._polyfilled=!0}}function changeAttribute(name,value,operation){name=name.toLowerCase();var oldValue=this.getAttribute(name);operation.apply(this,arguments);var newValue=this.getAttribute(name);this.attributeChangedCallback&&newValue!==oldValue&&this.attributeChangedCallback(name,oldValue,newValue)}function isReservedTag(name){for(var i=0;i<reservedTagList.length;i++)if(name===reservedTagList[i])return!0}function ancestry(extnds){var extendee=getRegisteredDefinition(extnds);return extendee?ancestry(extendee["extends"]).concat([extendee]):[]}function resolveTagName(definition){for(var a,baseTag=definition["extends"],i=0;a=definition.ancestry[i];i++)baseTag=a.is&&a.tag;definition.tag=baseTag||definition.__name,baseTag&&(definition.is=definition.__name)}function resolvePrototypeChain(definition){if(!Object.__proto__){var nativePrototype=HTMLElement.prototype;if(definition.is){var inst=document.createElement(definition.tag),expectedPrototype=Object.getPrototypeOf(inst);expectedPrototype===definition.prototype&&(nativePrototype=expectedPrototype)}for(var ancestor,proto=definition.prototype;proto&&proto!==nativePrototype;)ancestor=Object.getPrototypeOf(proto),proto.__proto__=ancestor,proto=ancestor;definition["native"]=nativePrototype}}function instantiate(definition){return upgradeWithDefinition(domCreateElement(definition.tag),definition)}function getRegisteredDefinition(name){return name?registry[name.toLowerCase()]:void 0}function registerDefinition(name,definition){registry[name]=definition}function generateConstructor(definition){return function(){return instantiate(definition)}}function createElementNS(namespace,tag,typeExtension){return namespace===HTML_NAMESPACE?createElement(tag,typeExtension):domCreateElementNS(namespace,tag)}function createElement(tag,typeExtension){tag&&(tag=tag.toLowerCase()),typeExtension&&(typeExtension=typeExtension.toLowerCase());var definition=getRegisteredDefinition(typeExtension||tag);if(definition){if(tag==definition.tag&&typeExtension==definition.is)return new definition.ctor;if(!typeExtension&&!definition.is)return new definition.ctor}var element;return typeExtension?(element=createElement(tag),element.setAttribute("is",typeExtension),element):(element=domCreateElement(tag),tag.indexOf("-")>=0&&implementPrototype(element,HTMLElement),element)}function wrapDomMethodToForceUpgrade(obj,methodName){var orig=obj[methodName];obj[methodName]=function(){var n=orig.apply(this,arguments);return upgradeAll(n),n}}var isInstance,isIE11OrOlder=scope.isIE11OrOlder,upgradeDocumentTree=scope.upgradeDocumentTree,upgradeAll=scope.upgradeAll,upgradeWithDefinition=scope.upgradeWithDefinition,implementPrototype=scope.implementPrototype,useNative=scope.useNative,reservedTagList=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],registry={},HTML_NAMESPACE="http://www.w3.org/1999/xhtml",domCreateElement=document.createElement.bind(document),domCreateElementNS=document.createElementNS.bind(document);isInstance=Object.__proto__||useNative?function(obj,base){return obj instanceof base}:function(obj,ctor){for(var p=obj;p;){if(p===ctor.prototype)return!0;p=p.__proto__}return!1},wrapDomMethodToForceUpgrade(Node.prototype,"cloneNode"),wrapDomMethodToForceUpgrade(document,"importNode"),isIE11OrOlder&&!function(){var importNode=document.importNode;document.importNode=function(){var n=importNode.apply(document,arguments);if(n.nodeType==n.DOCUMENT_FRAGMENT_NODE){var f=document.createDocumentFragment();return f.appendChild(n),f}return n}}(),document.registerElement=register,document.createElement=createElement,document.createElementNS=createElementNS,scope.registry=registry,scope["instanceof"]=isInstance,scope.reservedTagList=reservedTagList,scope.getRegisteredDefinition=getRegisteredDefinition,document.register=document.registerElement}),function(scope){function bootstrap(){upgradeDocumentTree(wrap(document)),window.HTMLImports&&(HTMLImports.__importsParsingHook=function(elt){upgradeDocumentTree(wrap(elt["import"]))}),CustomElements.ready=!0,setTimeout(function(){CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})}var useNative=scope.useNative,initializeModules=scope.initializeModules,isIE11OrOlder=/Trident/.test(navigator.userAgent);if(useNative){var nop=function(){};scope.watchShadow=nop,scope.upgrade=nop,scope.upgradeAll=nop,scope.upgradeDocumentTree=nop,scope.upgradeSubtree=nop,scope.takeRecords=nop,scope["instanceof"]=function(obj,base){return obj instanceof base}}else initializeModules();var upgradeDocumentTree=scope.upgradeDocumentTree;if(window.wrap||(window.ShadowDOMPolyfill?(window.wrap=ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=ShadowDOMPolyfill.unwrapIfNeeded):window.wrap=window.unwrap=function(node){return node}),isIE11OrOlder&&"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(inType,params){params=params||{};var e=document.createEvent("CustomEvent");return e.initCustomEvent(inType,Boolean(params.bubbles),Boolean(params.cancelable),params.detail),e},window.CustomEvent.prototype=window.Event.prototype),"complete"===document.readyState||scope.flags.eager)bootstrap();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var loadEvent=window.HTMLImports&&!HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(loadEvent,bootstrap)}else bootstrap();scope.isIE11OrOlder=isIE11OrOlder}(window.CustomElements),window.CustomEvent||!function(){var CustomEvent;CustomEvent=function(event,params){var evt;return params=params||{bubbles:!1,cancelable:!1,detail:void 0},evt=document.createEvent("CustomEvent"),evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail),evt},CustomEvent.prototype=window.Event.prototype,window.CustomEvent=CustomEvent}(),window.animit=function(){"use strict";var TIMEOUT_RATIO=1.4,util={};util.capitalize=function(str){return str.charAt(0).toUpperCase()+str.slice(1)},util.buildTransitionValue=function(params){params.property=params.property||"all",params.duration=params.duration||.4,params.timing=params.timing||"linear";var props=params.property.split(/ +/);return props.map(function(prop){return prop+" "+params.duration+"s "+params.timing}).join(", ")},util.onceOnTransitionEnd=function(element,callback){if(!element)return function(){};var fn=function(event){element==event.target&&(event.stopPropagation(),removeListeners(),callback())},removeListeners=function(){util._transitionEndEvents.forEach(function(eventName){element.removeEventListener(eventName,fn,!1)})};return util._transitionEndEvents.forEach(function(eventName){element.addEventListener(eventName,fn,!1)}),removeListeners},util._transitionEndEvents=function(){return"ontransitionend"in window?["transitionend"]:"onwebkittransitionend"in window?["webkitTransitionEnd"]:"webkit"===util.vendorPrefix||"o"===util.vendorPrefix||"moz"===util.vendorPrefix||"ms"===util.vendorPrefix?[util.vendorPrefix+"TransitionEnd","transitionend"]:[]}(),util._cssPropertyDict=function(){for(var styles=window.getComputedStyle(document.documentElement,""),dict={},a="A".charCodeAt(0),z="z".charCodeAt(0),upper=function(s){return s.substr(1).toUpperCase()},i=0;i<styles.length;i++){var key=styles[i].replace(/^[\-]+/,"").replace(/[\-][a-z]/g,upper).replace(/^moz/,"Moz");a<=key.charCodeAt(0)&&z>=key.charCodeAt(0)&&"cssText"!==key&&"parentText"!==key&&(dict[key]=!0)}return dict}(),util.hasCssProperty=function(name){return name in util._cssPropertyDict},util.vendorPrefix=function(){var styles=window.getComputedStyle(document.documentElement,""),pre=(Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/)||""===styles.OLink&&["","o"])[1];return pre}(),util.forceLayoutAtOnce=function(elements,callback){this.batchImmediate(function(){elements.forEach(function(element){element.offsetHeight}),callback()})},util.batchImmediate=function(){var callbacks=[];return function(callback){0===callbacks.length&&setImmediate(function(){var concreateCallbacks=callbacks.slice(0);callbacks=[],concreateCallbacks.forEach(function(callback){callback()})}),callbacks.push(callback)}}(),util.batchAnimationFrame=function(){var callbacks=[],raf=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,1e3/60)};return function(callback){0===callbacks.length&&raf(function(){var concreateCallbacks=callbacks.slice(0);callbacks=[],concreateCallbacks.forEach(function(callback){callback()})}),callbacks.push(callback)}}(),util.transitionPropertyName=function(){if(util.hasCssProperty("transitionDuration"))return"transition";if(util.hasCssProperty(util.vendorPrefix+"TransitionDuration"))return util.vendorPrefix+"Transition";throw new Error("Invalid state")}();var Animit=function(element){if(!(this instanceof Animit))return new Animit(element);if(element instanceof HTMLElement)this.elements=[element];else{if("[object Array]"!==Object.prototype.toString.call(element))throw new Error("First argument must be an array or an instance of HTMLElement.");this.elements=element}this.transitionQueue=[],this.lastStyleAttributeDict=[]};return Animit.prototype={transitionQueue:void 0,elements:void 0,play:function(callback){return"function"==typeof callback&&this.transitionQueue.push(function(done){callback(),done()}),this.startAnimation(),this},queue:function(transition,options){var queue=this.transitionQueue;if(transition&&options&&(options.css=transition,transition=new Animit.Transition(options)),transition instanceof Function||transition instanceof Animit.Transition||(transition=new Animit.Transition(transition.css?transition:{css:transition})),transition instanceof Function)queue.push(transition);else{if(!(transition instanceof Animit.Transition))throw new Error("Invalid arguments");queue.push(transition.build())}return this},wait:function(seconds){return seconds>0&&this.transitionQueue.push(function(done){setTimeout(done,1e3*seconds)}),this},saveStyle:function(){return this.transitionQueue.push(function(done){this.elements.forEach(function(element,index){for(var css=this.lastStyleAttributeDict[index]={},i=0;i<element.style.length;i++)css[element.style[i]]=element.style[element.style[i]]}.bind(this)),done()}.bind(this)),this},restoreStyle:function(options){function reset(){self.elements.forEach(function(element,index){element.style[transitionName]="none";var css=self.lastStyleAttributeDict[index];if(!css)throw new Error("restoreStyle(): The style is not saved. Invoke saveStyle() before.");self.lastStyleAttributeDict[index]=void 0;for(var i=0,name="";i<element.style.length;i++)name=element.style[i],"undefined"==typeof css[element.style[i]]&&(css[element.style[i]]="");Object.keys(css).forEach(function(key){element.style[key]=css[key]})})}options=options||{};var self=this;if(options.transition&&!options.duration)throw new Error('"options.duration" is required when "options.transition" is enabled.');var transitionName=util.transitionPropertyName;if(options.transition||options.duration&&options.duration>0){var transitionValue=options.transition||"all "+options.duration+"s "+(options.timing||"linear");this.transitionQueue.push(function(done){var timeoutId,elements=this.elements,clearTransition=function(){elements.forEach(function(element){element.style[transitionName]=""})},removeListeners=util.onceOnTransitionEnd(elements[0],function(){clearTimeout(timeoutId),clearTransition(),done()});timeoutId=setTimeout(function(){removeListeners(),clearTransition(),done()},1e3*options.duration*TIMEOUT_RATIO),elements.forEach(function(element,index){var css=self.lastStyleAttributeDict[index];if(!css)throw new Error("restoreStyle(): The style is not saved. Invoke saveStyle() before.");self.lastStyleAttributeDict[index]=void 0;for(var name,i=0,len=element.style.length;len>i;i++)name=element.style[i],void 0===css[name]&&(css[name]="");element.style[transitionName]=transitionValue,Object.keys(css).forEach(function(key){key!==transitionName&&(element.style[key]=css[key])}),element.style[transitionName]=transitionValue})})}else this.transitionQueue.push(function(done){reset(),done()});return this},startAnimation:function(){return this._dequeueTransition(),this},_dequeueTransition:function(){var transition=this.transitionQueue.shift();if(this._currentTransition)throw new Error("Current transition exists.");this._currentTransition=transition;var self=this,called=!1,done=function(){if(called)throw new Error("Invalid state: This callback is called twice.");called=!0,self._currentTransition=void 0,self._dequeueTransition()};transition&&transition.call(this,done)}},Animit.runAll=function(){for(var i=0;i<arguments.length;i++)arguments[i].play()},Animit.Transition=function(options){this.options=options||{},this.options.duration=this.options.duration||0,this.options.timing=this.options.timing||"linear",this.options.css=this.options.css||{},this.options.property=this.options.property||"all"},Animit.Transition.prototype={build:function(){function createActualCssProps(css){var result={};return Object.keys(css).forEach(function(name){var value=css[name];if(util.hasCssProperty(name))return void(result[name]=value);var prefixed=util.vendorPrefix+util.capitalize(name);util.hasCssProperty(prefixed)?result[prefixed]=value:(result[prefixed]=value,result[name]=value)}),result}if(0===Object.keys(this.options.css).length)throw new Error("options.css is required.");var css=createActualCssProps(this.options.css);if(this.options.duration>0){var transitionValue=util.buildTransitionValue(this.options),self=this;return function(callback){var timeoutId,elements=this.elements,timeout=1e3*self.options.duration*TIMEOUT_RATIO,removeListeners=util.onceOnTransitionEnd(elements[0],function(){clearTimeout(timeoutId),callback()});timeoutId=setTimeout(function(){removeListeners(),callback()},timeout),elements.forEach(function(element){element.style[util.transitionPropertyName]=transitionValue,Object.keys(css).forEach(function(name){element.style[name]=css[name]})})}}return this.options.duration<=0?function(callback){var elements=this.elements;elements.forEach(function(element){element.style[util.transitionPropertyName]="",Object.keys(css).forEach(function(name){element.style[name]=css[name]})}),elements.length>0?util.forceLayoutAtOnce(elements,function(){util.batchAnimationFrame(callback)}):util.batchAnimationFrame(callback)}:void 0}},Animit}(),function(){"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)})}(),"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?!function(){
"use strict";var testElement=document.createElement("_");if(testElement.classList.add("c1","c2"),!testElement.classList.contains("c2")){var createMethod=function(method){var original=DOMTokenList.prototype[method];DOMTokenList.prototype[method]=function(token){var i,len=arguments.length;for(i=0;len>i;i++)token=arguments[i],original.call(this,token)}};createMethod("add"),createMethod("remove")}if(testElement.classList.toggle("c3",!1),testElement.classList.contains("c3")){var _toggle=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(token,force){return 1 in arguments&&!this.contains(token)==!force?force:_toggle.call(this,token)}}testElement=null}():!function(view){"use strict";if("Element"in view){var classListProp="classList",protoProp="prototype",elemCtrProto=view.Element[protoProp],objCtr=Object,strTrim=String[protoProp].trim||function(){return this.replace(/^\s+|\s+$/g,"")},arrIndexOf=Array[protoProp].indexOf||function(item){for(var i=0,len=this.length;len>i;i++)if(i in this&&this[i]===item)return i;return-1},DOMEx=function(type,message){this.name=type,this.code=DOMException[type],this.message=message},checkTokenAndGetIndex=function(classList,token){if(""===token)throw new DOMEx("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(token))throw new DOMEx("INVALID_CHARACTER_ERR","String contains an invalid character");return arrIndexOf.call(classList,token)},ClassList=function(elem){for(var trimmedClasses=strTrim.call(elem.getAttribute("class")||""),classes=trimmedClasses?trimmedClasses.split(/\s+/):[],i=0,len=classes.length;len>i;i++)this.push(classes[i]);this._updateClassName=function(){elem.setAttribute("class",this.toString())}},classListProto=ClassList[protoProp]=[],classListGetter=function(){return new ClassList(this)};if(DOMEx[protoProp]=Error[protoProp],classListProto.item=function(i){return this[i]||null},classListProto.contains=function(token){return token+="",-1!==checkTokenAndGetIndex(this,token)},classListProto.add=function(){var token,tokens=arguments,i=0,l=tokens.length,updated=!1;do token=tokens[i]+"",-1===checkTokenAndGetIndex(this,token)&&(this.push(token),updated=!0);while(++i<l);updated&&this._updateClassName()},classListProto.remove=function(){var token,index,tokens=arguments,i=0,l=tokens.length,updated=!1;do for(token=tokens[i]+"",index=checkTokenAndGetIndex(this,token);-1!==index;)this.splice(index,1),updated=!0,index=checkTokenAndGetIndex(this,token);while(++i<l);updated&&this._updateClassName()},classListProto.toggle=function(token,force){token+="";var result=this.contains(token),method=result?force!==!0&&"remove":force!==!1&&"add";return method&&this[method](token),force===!0||force===!1?force:!result},classListProto.toString=function(){return this.join(" ")},objCtr.defineProperty){var classListPropDesc={get:classListGetter,enumerable:!0,configurable:!0};try{objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc)}catch(ex){-2146823252===ex.number&&(classListPropDesc.enumerable=!1,objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc))}}else objCtr[protoProp].__defineGetter__&&elemCtrProto.__defineGetter__(classListProp,classListGetter)}}(self)),function(){"use strict";function FastClick(layer,options){function bind(method,context){return function(){return method.apply(context,arguments)}}var oldOnClick;if(options=options||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=options.touchBoundary||10,this.layer=layer,this.tapDelay=options.tapDelay||200,this.tapTimeout=options.tapTimeout||700,!FastClick.notNeeded(layer)){for(var methods=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],context=this,i=0,l=methods.length;l>i;i++)context[methods[i]]=bind(context[methods[i]],context);deviceIsAndroid&&(layer.addEventListener("mouseover",this.onMouse,!0),layer.addEventListener("mousedown",this.onMouse,!0),layer.addEventListener("mouseup",this.onMouse,!0)),layer.addEventListener("click",this.onClick,!0),layer.addEventListener("touchstart",this.onTouchStart,!1),layer.addEventListener("touchmove",this.onTouchMove,!1),layer.addEventListener("touchend",this.onTouchEnd,!1),layer.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;"click"===type?rmv.call(layer,type,callback.hijacked||callback,capture):rmv.call(layer,type,callback,capture)},layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;"click"===type?adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){event.propagationStopped||callback(event)}),capture):adv.call(layer,type,callback,capture)}),"function"==typeof layer.onclick&&(oldOnClick=layer.onclick,layer.addEventListener("click",function(event){oldOnClick(event)},!1),layer.onclick=null)}}var deviceIsWindowsPhone=navigator.userAgent.indexOf("Windows Phone")>=0,deviceIsAndroid=navigator.userAgent.indexOf("Android")>0&&!deviceIsWindowsPhone,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent)&&!deviceIsWindowsPhone,deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS [6-7]_\d/.test(navigator.userAgent),deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;FastClick.prototype.needsClick=function(target){switch(target.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(target.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===target.type||target.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(target.className)},FastClick.prototype.needsFocus=function(target){switch(target.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(target.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!target.disabled&&!target.readOnly;default:return/\bneedsfocus\b/.test(target.className)}},FastClick.prototype.sendClick=function(targetElement,event){var clickEvent,touch;document.activeElement&&document.activeElement!==targetElement&&document.activeElement.blur(),touch=event.changedTouches[0],clickEvent=document.createEvent("MouseEvents"),clickEvent.initMouseEvent(this.determineEventType(targetElement),!0,!0,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,!1,!1,!1,!1,0,null),clickEvent.forwardedTouchEvent=!0,targetElement.dispatchEvent(clickEvent)},FastClick.prototype.determineEventType=function(targetElement){return deviceIsAndroid&&"select"===targetElement.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(targetElement){var length;deviceIsIOS&&targetElement.setSelectionRange&&0!==targetElement.type.indexOf("date")&&"time"!==targetElement.type&&"month"!==targetElement.type?(length=targetElement.value.length,targetElement.setSelectionRange(length,length)):targetElement.focus()},FastClick.prototype.updateScrollParent=function(targetElement){var scrollParent,parentElement;if(scrollParent=targetElement.fastClickScrollParent,!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement,targetElement.fastClickScrollParent=parentElement;break}parentElement=parentElement.parentElement}while(parentElement)}scrollParent&&(scrollParent.fastClickLastScrollTop=scrollParent.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){return eventTarget.nodeType===Node.TEXT_NODE?eventTarget.parentNode:eventTarget},FastClick.prototype.onTouchStart=function(event){var targetElement,touch,selection;if(event.targetTouches.length>1)return!0;if(targetElement=this.getTargetElementFromEventTarget(event.target),touch=event.targetTouches[0],deviceIsIOS){if(selection=window.getSelection(),selection.rangeCount&&!selection.isCollapsed)return!0;if(!deviceIsIOS4){if(touch.identifier&&touch.identifier===this.lastTouchIdentifier)return event.preventDefault(),!1;this.lastTouchIdentifier=touch.identifier,this.updateScrollParent(targetElement)}}return this.trackingClick=!0,this.trackingClickStart=event.timeStamp,this.targetElement=targetElement,this.touchStartX=touch.pageX,this.touchStartY=touch.pageY,event.timeStamp-this.lastClickTime<this.tapDelay&&event.timeStamp-this.lastClickTime>-1&&event.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(event){var touch=event.changedTouches[0],boundary=this.touchBoundary;return Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary?!0:!1},FastClick.prototype.onTouchMove=function(event){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(labelElement){return void 0!==labelElement.control?labelElement.control:labelElement.htmlFor?document.getElementById(labelElement.htmlFor):labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(event){var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick)return!0;if(event.timeStamp-this.lastClickTime<this.tapDelay&&event.timeStamp-this.lastClickTime>-1)return this.cancelNextClick=!0,!0;if(event.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=event.timeStamp,trackingClickStart=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(touch=event.changedTouches[0],targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement,targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent),targetTagName=targetElement.tagName.toLowerCase(),"label"===targetTagName){if(forElement=this.findControl(targetElement)){if(this.focus(targetElement),deviceIsAndroid)return!1;targetElement=forElement}}else if(this.needsFocus(targetElement))return event.timeStamp-trackingClickStart>100||deviceIsIOS&&window.top!==window&&"input"===targetTagName?(this.targetElement=null,!1):(this.focus(targetElement),this.sendClick(targetElement,event),deviceIsIOS&&"select"===targetTagName||(this.targetElement=null,event.preventDefault()),!1);return deviceIsIOS&&!deviceIsIOS4&&(scrollParent=targetElement.fastClickScrollParent,scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop)?!0:(this.needsClick(targetElement)||(event.preventDefault(),this.sendClick(targetElement,event)),!1)},FastClick.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(event){return this.targetElement?event.forwardedTouchEvent?!0:event.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(event.stopImmediatePropagation?event.stopImmediatePropagation():event.propagationStopped=!0,event.stopPropagation(),event.preventDefault(),!1):!0:!0},FastClick.prototype.onClick=function(event){var permitted;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===event.target.type&&0===event.detail?!0:(permitted=this.onMouse(event),permitted||(this.targetElement=null),permitted)},FastClick.prototype.destroy=function(){var layer=this.layer;deviceIsAndroid&&(layer.removeEventListener("mouseover",this.onMouse,!0),layer.removeEventListener("mousedown",this.onMouse,!0),layer.removeEventListener("mouseup",this.onMouse,!0)),layer.removeEventListener("click",this.onClick,!0),layer.removeEventListener("touchstart",this.onTouchStart,!1),layer.removeEventListener("touchmove",this.onTouchMove,!1),layer.removeEventListener("touchend",this.onTouchEnd,!1),layer.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(layer){var metaViewport,chromeVersion,blackberryVersion,firefoxVersion;if("undefined"==typeof window.ontouchstart)return!0;if(chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(metaViewport=document.querySelector("meta[name=viewport]")){if(-1!==metaViewport.content.indexOf("user-scalable=no"))return!0;if(chromeVersion>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(deviceIsBlackBerry10&&(blackberryVersion=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),blackberryVersion[1]>=10&&blackberryVersion[2]>=3&&(metaViewport=document.querySelector("meta[name=viewport]")))){if(-1!==metaViewport.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===layer.style.msTouchAction||"manipulation"===layer.style.touchAction?!0:(firefoxVersion=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],firefoxVersion>=27&&(metaViewport=document.querySelector("meta[name=viewport]"),metaViewport&&(-1!==metaViewport.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===layer.style.touchAction||"manipulation"===layer.style.touchAction?!0:!1)},FastClick.attach=function(layer,options){return new FastClick(layer,options)},window.FastClick=FastClick}();var MicroEvent=function(){};MicroEvent.prototype={on:function(event,fct){this._events=this._events||{},this._events[event]=this._events[event]||[],this._events[event].push(fct)},once:function(event,fct){var self=this,wrapper=function(){return self.off(event,wrapper),fct.apply(null,arguments)};this.on(event,wrapper)},off:function(event,fct){this._events=this._events||{},event in this._events!=!1&&this._events[event].splice(this._events[event].indexOf(fct),1)},emit:function(event){if(this._events=this._events||{},event in this._events!=!1)for(var i=0;i<this._events[event].length;i++)this._events[event][i].apply(this,Array.prototype.slice.call(arguments,1))}},MicroEvent.mixin=function(destObject){for(var props=["on","once","off","emit"],i=0;i<props.length;i++)"function"==typeof destObject?destObject.prototype[props[i]]=MicroEvent.prototype[props[i]]:destObject[props[i]]=MicroEvent.prototype[props[i]]},"undefined"!=typeof module&&"exports"in module&&(module.exports=MicroEvent),window.MicroEvent=MicroEvent,!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,s,a;for(var l in S)if(S.hasOwnProperty(l)){if(e=[],t=S[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),C.push((o?"":"no-")+a.join("-"))}}function i(e){var t=w.className,n=Modernizr._config.classPrefix||"";if(_&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?w.className.baseVal=t:w.className=t)}function s(e,t){if("object"==typeof e)for(var n in e)N(e,n)&&s(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),i([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(e,t){return!!~(""+e).indexOf(t)}function u(){var e=t.body;return e||(e=a(_?"svg":"body"),e.fake=!0),e}function f(e,n,r,o){var i,s,l,f,c="modernizr",d=a("div"),p=u();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:c+(r+1),d.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+c,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",f=w.style.overflow,w.style.overflow="hidden",w.appendChild(p)),s=n(d,e),p.fake?(p.parentNode.removeChild(p),w.style.overflow=f,w.offsetHeight):d.parentNode.removeChild(d),!!s}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function d(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?d(o,n||t):o);return!1}function m(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(m(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+m(t[o])+":"+r+")");return i=i.join(" or "),f("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function g(e,t,o,i){function s(){f&&(delete L.style,delete L.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=h(e,o);if(!r(u,"undefined"))return u}for(var f,d,p,m,g,v=["modernizr","tspan"];!L.style;)f=!0,L.modElem=a(v.shift()),L.style=L.modElem.style;for(p=e.length,d=0;p>d;d++)if(m=e[d],g=L.style[m],l(m,"-")&&(m=c(m)),L.style[m]!==n){if(i||r(o,"undefined"))return s(),"pfx"==t?m:!0;try{L.style[m]=o}catch(y){}if(L.style[m]!=g)return s(),"pfx"==t?m:!0}return s(),!1}function v(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+k.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?g(a,t,o,i):(a=(e+" "+T.join(s+" ")+s).split(" "),p(a,t,n))}function y(e,t,r){return v(e,n,n,t,r)}var C=[],S=[],x={_version:"3.1.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){S.push({name:e,fn:t,options:n})},addAsyncTest:function(e){S.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=x,Modernizr=new Modernizr,Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var b=x._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];x._prefixes=b;var w=t.documentElement,_="svg"===w.nodeName.toLowerCase();_||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=C.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=C.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),C.elements=n+" "+e,u(t)}function i(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function s(e,n,r){if(n||(n=t),c)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||m.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function a(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),s=0,a=r(),l=a.length;l>s;s++)o.createElement(a[s]);return o}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return C.shivMethods?s(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(C,t.frag)}function u(e){e||(e=t);var r=i(e);return!C.shivCSS||f||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||l(e,r),e}var f,c,d="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",f="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){f=!0,c=!0}}();var C={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:c,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:u,createElement:s,createDocumentFragment:a,addElements:o};e.html5=C,u(t),"object"==typeof module&&module.exports&&(module.exports=C)}("undefined"!=typeof e?e:this,t);var E="Moz O ms Webkit",T=x._config.usePrefixes?E.toLowerCase().split(" "):[];x._domPrefixes=T;var N;!function(){var e={}.hasOwnProperty;N=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),x._l={},x.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},x._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){x.addTest=s}),Modernizr.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))});var P="CSS"in e&&"supports"in e.CSS,j="supportsCSS"in e;Modernizr.addTest("supports",P||j);var k=x._config.usePrefixes?E.split(" "):[];x._cssomPrefixes=k;var z=x.testStyles=f,F={elem:a("modernizr")};Modernizr._q.push(function(){delete F.elem});var L={style:F.elem.style};Modernizr._q.unshift(function(){delete L.style}),x.testProp=function(e,t,r){return g([e],n,t,r)},x.testAllProps=v,x.testAllProps=y,Modernizr.addTest("borderradius",y("borderRadius","0px",!0)),Modernizr.addTest("boxshadow",y("boxShadow","1px 1px",!0)),Modernizr.addTest("cssanimations",y("animationName","a",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in w.style)){var n;Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}",z(n,function(t){e=9===t.offsetLeft&&5===t.offsetHeight})}return e}),Modernizr.addTest("csstransitions",y("transition","all",!0)),o(),i(C),delete x.addTest,delete x.addAsyncTest;for(var A=0;A<Modernizr._q.length;A++)Modernizr._q[A]();e.Modernizr=Modernizr}(window,document),!function n(t,e,r){function o(u,f){if(!e[u]){if(!t[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var l=e[u]={exports:{}};t[u][0].call(l.exports,function(n){var e=t[u][1][n];return o(e?e:n)},l,l.exports,n,t,e,r)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(n,t,e){"use strict";function r(){}function o(n){try{return n.then}catch(t){return d=t,w}}function i(n,t){try{return n(t)}catch(e){return d=e,w}}function u(n,t,e){try{n(t,e)}catch(r){return d=r,w}}function f(n){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof n)throw new TypeError("not a function");this._37=0,this._12=null,this._59=[],n!==r&&v(n,this)}function c(n,t,e){return new n.constructor(function(o,i){var u=new f(r);u.then(o,i),s(n,new p(t,e,u))})}function s(n,t){for(;3===n._37;)n=n._12;return 0===n._37?void n._59.push(t):void y(function(){var e=1===n._37?t.onFulfilled:t.onRejected;if(null===e)return void(1===n._37?l(t.promise,n._12):a(t.promise,n._12));var r=i(e,n._12);r===w?a(t.promise,d):l(t.promise,r)})}function l(n,t){if(t===n)return a(n,new TypeError("A promise cannot be resolved with itself."));if(t&&("object"==typeof t||"function"==typeof t)){var e=o(t);if(e===w)return a(n,d);if(e===n.then&&t instanceof f)return n._37=3,n._12=t,void h(n);if("function"==typeof e)return void v(e.bind(t),n)}n._37=1,n._12=t,h(n)}function a(n,t){n._37=2,n._12=t,h(n)}function h(n){for(var t=0;t<n._59.length;t++)s(n,n._59[t]);n._59=null}function p(n,t,e){this.onFulfilled="function"==typeof n?n:null,this.onRejected="function"==typeof t?t:null,this.promise=e}function v(n,t){var e=!1,r=u(n,function(n){e||(e=!0,l(t,n))},function(n){e||(e=!0,a(t,n))});e||r!==w||(e=!0,a(t,d))}var y=n("asap/raw"),d=null,w={};t.exports=f,f._99=r,f.prototype.then=function(n,t){if(this.constructor!==f)return c(this,n,t);var e=new f(r);return s(this,new p(n,t,e)),e}},{"asap/raw":4}],2:[function(n,t,e){"use strict";function r(n){var t=new o(o._99);return t._37=1,t._12=n,t}var o=n("./core.js");t.exports=o;var i=r(!0),u=r(!1),f=r(null),c=r(void 0),s=r(0),l=r("");o.resolve=function(n){if(n instanceof o)return n;if(null===n)return f;if(void 0===n)return c;if(n===!0)return i;if(n===!1)return u;if(0===n)return s;if(""===n)return l;if("object"==typeof n||"function"==typeof n)try{var t=n.then;if("function"==typeof t)return new o(t.bind(n))}catch(e){return new o(function(n,t){t(e)})}return r(n)},o.all=function(n){var t=Array.prototype.slice.call(n);return new o(function(n,e){function r(u,f){if(f&&("object"==typeof f||"function"==typeof f)){if(f instanceof o&&f.then===o.prototype.then){for(;3===f._37;)f=f._12;return 1===f._37?r(u,f._12):(2===f._37&&e(f._12),void f.then(function(n){r(u,n)},e))}var c=f.then;if("function"==typeof c){var s=new o(c.bind(f));return void s.then(function(n){r(u,n)},e)}}t[u]=f,0===--i&&n(t)}if(0===t.length)return n([]);for(var i=t.length,u=0;u<t.length;u++)r(u,t[u])})},o.reject=function(n){return new o(function(t,e){e(n)})},o.race=function(n){return new o(function(t,e){n.forEach(function(n){o.resolve(n).then(t,e)})})},o.prototype["catch"]=function(n){return this.then(null,n)}},{"./core.js":1}],3:[function(n,t,e){"use strict";function r(){if(c.length)throw c.shift()}function o(n){var t;t=f.length?f.pop():new i,t.task=n,u(t)}function i(){this.task=null}var u=n("./raw"),f=[],c=[],s=u.makeRequestCallFromTimer(r);t.exports=o,i.prototype.call=function(){try{this.task.call()}catch(n){o.onerror?o.onerror(n):(c.push(n),s())}finally{this.task=null,f[f.length]=this}}},{"./raw":4}],4:[function(n,t,e){(function(n){"use strict";function e(n){f.length||(u(),c=!0),f[f.length]=n}function r(){for(;s<f.length;){var n=s;if(s+=1,f[n].call(),s>l){for(var t=0,e=f.length-s;e>t;t++)f[t]=f[t+s];f.length-=s,s=0}}f.length=0,s=0,c=!1}function o(n){var t=1,e=new a(n),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){t=-t,r.data=t}}function i(n){return function(){function t(){clearTimeout(e),clearInterval(r),n()}var e=setTimeout(t,0),r=setInterval(t,50)}}t.exports=e;var u,f=[],c=!1,s=0,l=1024,a=n.MutationObserver||n.WebKitMutationObserver;u="function"==typeof a?o(r):i(r),e.requestFlush=u,e.makeRequestCallFromTimer=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(n,t,e){"function"!=typeof Promise.prototype.done&&(Promise.prototype.done=function(n,t){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,function(n){setTimeout(function(){throw n},0)})})},{}],6:[function(n,t,e){n("asap"),"undefined"==typeof Promise&&(Promise=n("./lib/core.js"),n("./lib/es6-extensions.js")),n("./polyfill-done.js")},{"./lib/core.js":1,"./lib/es6-extensions.js":2,"./polyfill-done.js":5,asap:3}]},{},[6]),function(global,undefined){"use strict";function addFromSetImmediateArguments(args){return tasksByHandle[nextHandle]=partiallyApplied.apply(undefined,args),nextHandle++}function partiallyApplied(handler){var args=[].slice.call(arguments,1);return function(){"function"==typeof handler?handler.apply(undefined,args):new Function(""+handler)()}}function runIfPresent(handle){if(currentlyRunningATask)setTimeout(partiallyApplied(runIfPresent,handle),0);else{var task=tasksByHandle[handle];if(task){currentlyRunningATask=!0;try{task()}finally{clearImmediate(handle),currentlyRunningATask=!1}}}}function clearImmediate(handle){delete tasksByHandle[handle]}function installNextTickImplementation(){setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return process.nextTick(partiallyApplied(runIfPresent,handle)),handle}}function canUsePostMessage(){if(global.postMessage&&!global.importScripts){var postMessageIsAsynchronous=!0,oldOnMessage=global.onmessage;return global.onmessage=function(){postMessageIsAsynchronous=!1},global.postMessage("","*"),global.onmessage=oldOnMessage,postMessageIsAsynchronous}}function installPostMessageImplementation(){var messagePrefix="setImmediate$"+Math.random()+"$",onGlobalMessage=function(event){event.source===global&&"string"==typeof event.data&&0===event.data.indexOf(messagePrefix)&&runIfPresent(+event.data.slice(messagePrefix.length))};global.addEventListener?global.addEventListener("message",onGlobalMessage,!1):global.attachEvent("onmessage",onGlobalMessage),setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return global.postMessage(messagePrefix+handle,"*"),handle}}function installMessageChannelImplementation(){var channel=new MessageChannel;channel.port1.onmessage=function(event){var handle=event.data;runIfPresent(handle)},setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return channel.port2.postMessage(handle),handle}}function installReadyStateChangeImplementation(){var html=doc.documentElement;setImmediate=function(){var handle=addFromSetImmediateArguments(arguments),script=doc.createElement("script");return script.onreadystatechange=function(){runIfPresent(handle),script.onreadystatechange=null,html.removeChild(script),script=null},html.appendChild(script),handle}}function installSetTimeoutImplementation(){setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return setTimeout(partiallyApplied(runIfPresent,handle),0),handle}}if(!global.setImmediate){var setImmediate,nextHandle=1,tasksByHandle={},currentlyRunningATask=!1,doc=global.document,attachTo=Object.getPrototypeOf&&Object.getPrototypeOf(global);attachTo=attachTo&&attachTo.setTimeout?attachTo:global,"[object process]"==={}.toString.call(global.process)?installNextTickImplementation():canUsePostMessage()?installPostMessageImplementation():global.MessageChannel?installMessageChannelImplementation():doc&&"onreadystatechange"in doc.createElement("script")?installReadyStateChangeImplementation():installSetTimeoutImplementation(),attachTo.setImmediate=setImmediate,attachTo.clearImmediate=clearImmediate}}(function(){return this}()),function(){function Viewport(){return this.PRE_IOS7_VIEWPORT="initial-scale=1, maximum-scale=1, user-scalable=no",this.IOS7_VIEWPORT="initial-scale=1, maximum-scale=1, user-scalable=no",this.DEFAULT_VIEWPORT="initial-scale=1, maximum-scale=1, user-scalable=no",this.ensureViewportElement(),this.platform={},this.platform.name=this.getPlatformName(),this.platform.version=this.getPlatformVersion(),this}Viewport.prototype.ensureViewportElement=function(){
this.viewportElement=document.querySelector("meta[name=viewport]"),this.viewportElement||(this.viewportElement=document.createElement("meta"),this.viewportElement.name="viewport",document.head.appendChild(this.viewportElement))},Viewport.prototype.setup=function(){function isWebView(){return!!(window.cordova||window.phonegap||window.PhoneGap)}this.viewportElement&&"true"!=this.viewportElement.getAttribute("data-no-adjust")&&("ios"==this.platform.name?this.platform.version>=7&&isWebView()?this.viewportElement.setAttribute("content",this.IOS7_VIEWPORT):this.viewportElement.setAttribute("content",this.PRE_IOS7_VIEWPORT):this.viewportElement.setAttribute("content",this.DEFAULT_VIEWPORT))},Viewport.prototype.getPlatformName=function(){return navigator.userAgent.match(/Android/i)?"android":navigator.userAgent.match(/iPhone|iPad|iPod/i)?"ios":void 0},Viewport.prototype.getPlatformVersion=function(){var start=window.navigator.userAgent.indexOf("OS ");return window.Number(window.navigator.userAgent.substr(start+3,3).replace("_","."))},window.Viewport=Viewport}(),function(){function getAttributes(element){return Node_get_attributes.call(element)}function setAttribute(element,attribute,value){try{Element_setAttribute.call(element,attribute,value)}catch(e){}}function removeAttribute(element,attribute){Element_removeAttribute.call(element,attribute)}function childNodes(element){return Node_get_childNodes.call(element)}function empty(element){for(;element.childNodes.length;)element.removeChild(element.lastChild)}function insertAdjacentHTML(element,position,html){HTMLElement_insertAdjacentHTMLPropertyDescriptor.value.call(element,position,html)}function inUnsafeMode(){var isUnsafe=!0;try{detectionDiv.innerHTML="<test/>"}catch(ex){isUnsafe=!1}return isUnsafe}function cleanse(html,targetElement){function cleanseAttributes(element){var attributes=getAttributes(element);if(attributes&&attributes.length){for(var events,i=0,len=attributes.length;len>i;i++){var attribute=attributes[i],name=attribute.name;"o"!==name[0]&&"O"!==name[0]||"n"!==name[1]&&"N"!==name[1]||(events=events||[],events.push({name:attribute.name,value:attribute.value}))}if(events)for(var i=0,len=events.length;len>i;i++){var attribute=events[i];removeAttribute(element,attribute.name),setAttribute(element,"x-"+attribute.name,attribute.value)}}for(var children=childNodes(element),i=0,len=children.length;len>i;i++)cleanseAttributes(children[i])}var cleaner=document.implementation.createHTMLDocument("cleaner");empty(cleaner.documentElement),MSApp.execUnsafeLocalFunction(function(){insertAdjacentHTML(cleaner.documentElement,"afterbegin",html)});var scripts=cleaner.documentElement.querySelectorAll("script");Array.prototype.forEach.call(scripts,function(script){switch(script.type.toLowerCase()){case"":script.type="text/inert";break;case"text/javascript":case"text/ecmascript":case"text/x-javascript":case"text/jscript":case"text/livescript":case"text/javascript1.1":case"text/javascript1.2":case"text/javascript1.3":script.type="text/inert-"+script.type.slice("text/".length);break;case"application/javascript":case"application/ecmascript":case"application/x-javascript":script.type="application/inert-"+script.type.slice("application/".length)}}),cleanseAttributes(cleaner.documentElement);var cleanedNodes=[];return"HTML"===targetElement.tagName?cleanedNodes=Array.prototype.slice.call(document.adoptNode(cleaner.documentElement).childNodes):(cleaner.head&&(cleanedNodes=cleanedNodes.concat(Array.prototype.slice.call(document.adoptNode(cleaner.head).childNodes))),cleaner.body&&(cleanedNodes=cleanedNodes.concat(Array.prototype.slice.call(document.adoptNode(cleaner.body).childNodes)))),cleanedNodes}function cleansePropertySetter(property,setter){var propertyDescriptor=Object.getOwnPropertyDescriptor(HTMLElement.prototype,property),originalSetter=propertyDescriptor.set;Object.defineProperty(HTMLElement.prototype,property,{get:propertyDescriptor.get,set:function(value){if(window.WinJS&&window.WinJS._execUnsafe&&inUnsafeMode())originalSetter.call(this,value);else{var that=this,nodes=cleanse(value,that);MSApp.execUnsafeLocalFunction(function(){setter(propertyDescriptor,that,nodes)})}},enumerable:propertyDescriptor.enumerable,configurable:propertyDescriptor.configurable})}if(window.MSApp&&MSApp.execUnsafeLocalFunction){var Element_setAttribute=Object.getOwnPropertyDescriptor(Element.prototype,"setAttribute").value,Element_removeAttribute=Object.getOwnPropertyDescriptor(Element.prototype,"removeAttribute").value,HTMLElement_insertAdjacentHTMLPropertyDescriptor=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"insertAdjacentHTML"),Node_get_attributes=Object.getOwnPropertyDescriptor(Node.prototype,"attributes").get,Node_get_childNodes=Object.getOwnPropertyDescriptor(Node.prototype,"childNodes").get,detectionDiv=document.createElement("div");cleansePropertySetter("innerHTML",function(propertyDescriptor,target,elements){empty(target);for(var i=0,len=elements.length;len>i;i++)target.appendChild(elements[i])}),cleansePropertySetter("outerHTML",function(propertyDescriptor,target,elements){for(var i=0,len=elements.length;len>i;i++)target.insertAdjacentElement("afterend",elements[i]);target.parentNode.removeChild(target)})}}(),function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory():"function"==typeof define&&define.amd?define(factory):global.ons=factory()}(this,function(){"use strict";function waitDeviceReady(){var unlockDeviceReady=ons$1._readyLock.lock();window.addEventListener("DOMContentLoaded",function(){ons$1.isWebView()?window.document.addEventListener("deviceready",unlockDeviceReady,!1):unlockDeviceReady()},!1)}function setup(){GestureDetector.READY||(Event$1.determineEventTypes(),Utils.each(GestureDetector.gestures,function(gesture){Detection.register(gesture)}),Event$1.onTouch(GestureDetector.DOCUMENT,EVENT_MOVE,Detection.detect),Event$1.onTouch(GestureDetector.DOCUMENT,EVENT_END,Detection.detect),GestureDetector.READY=!0)}var babelHelpers={};babelHelpers["typeof"]=function(obj){return obj&&"undefined"!=typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj},babelHelpers.classCallCheck=function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")},babelHelpers.createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),babelHelpers.inherits=function(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)},babelHelpers.possibleConstructorReturn=function(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call},babelHelpers.slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),babelHelpers.toConsumableArray=function(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)};var animationOptionsParser={};animationOptionsParser.nextToken=function(string){string=string.trimLeft();var limit=string.length;if(":"===string[0]||","===string[0])limit=1;else if("{"===string[0]||"["===string[0]){for(var c=string.charCodeAt(0),nestedObject=1,i=1;i<string.length;i++)if(string.charCodeAt(i)===c)nestedObject++;else if(string.charCodeAt(i)===c+2&&(nestedObject--,0===nestedObject)){limit=i+1;break}}else if("'"===string[0]||'"'===string[0]){for(var i=1;i<string.length;i++)if(string[i]===string[0]){limit=i+1;break}}else for(var i=1;i<string.length;i++)if(-1!==[" ",",",":"].indexOf(string[i])){limit=i;break}return string.slice(0,limit)},animationOptionsParser.parseObject=function(string,isObjectString,isArrayString,isQuotedString,processToken,error){var isValidKey=function(key){return/^[A-Z_\$][A-Z0-9_\$]*$/i.test(key)};string=string.trim();for(var originalString=string,readingKey=!0,key=void 0,previousToken=void 0,token=void 0,object={};string.length>0;)if(previousToken=token,token=animationOptionsParser.nextToken(string),string=string.slice(token.length,string.length).trimLeft(),":"===token&&(!readingKey||!previousToken||","===previousToken)||","===token&&readingKey||":"!==token&&","!==token&&previousToken&&","!==previousToken&&":"!==previousToken)error(token,string,originalString);else if(":"===token&&readingKey&&previousToken){if(!isValidKey(previousToken))throw new Error("Invalid key token '"+previousToken+"' at position 0 in string: '"+originalString+"'");key=previousToken,readingKey=!1}else","===token&&!readingKey&&previousToken&&(object[key]=processToken(previousToken,string,originalString),readingKey=!0);return token&&(object[key]=processToken(token,string,originalString)),object},animationOptionsParser.parseArray=function(string,isObjectString,isArrayString,isQuotedString,processToken,error){string=string.trim();for(var originalString=string,previousToken=void 0,token=void 0,array=[];string.length>0;)previousToken=token,token=animationOptionsParser.nextToken(string),string=string.slice(token.length,string.length).trimLeft(),","!==token||previousToken&&","!==previousToken?","===token&&array.push(processToken(previousToken,string,originalString)):error(token,string,originalString);return token&&(","!==token?array.push(processToken(token,string,originalString)):error(token,string,originalString)),array},animationOptionsParser.parse=function(string){var methods=void 0,unwrap=function(string){return string.slice(1,-1)},error=function(token,string,originalString){throw new Error("Unexpected token '"+token+"' at position "+(originalString.length-string.length-1)+" in string: '"+originalString+"'")},isObjectString=function(string){return string.startsWith("{")&&string.endsWith("}")},isArrayString=function(string){return string.startsWith("[")&&string.endsWith("]")},isQuotedString=function(string){return string.startsWith("'")&&string.endsWith("'")||string.startsWith('"')&&string.endsWith('"')},processToken=function(token,string,originalString){return"true"===token||"false"===token?"true"===token:isQuotedString(token)?unwrap(token):isNaN(token)?isObjectString(token)?animationOptionsParser.parseObject.apply(animationOptionsParser,[unwrap(token)].concat(babelHelpers.toConsumableArray(methods))):isArrayString(token)?animationOptionsParser.parseArray.apply(animationOptionsParser,[unwrap(token)].concat(babelHelpers.toConsumableArray(methods))):void error(token,string,originalString):+token};if(methods=[isObjectString,isArrayString,isQuotedString,processToken,error],string=string.trim(),isObjectString(string))return animationOptionsParser.parseObject.apply(animationOptionsParser,[unwrap(string)].concat(babelHelpers.toConsumableArray(methods)));if(isArrayString(string))return animationOptionsParser.parseArray.apply(animationOptionsParser,[unwrap(string)].concat(babelHelpers.toConsumableArray(methods)));throw new Error("Provided string must be object or array like: "+string)};var util={};util.prepareQuery=function(query){return query instanceof Function?query:"."===query.substr(0,1)?function(node){return node.classList.contains(query.substr(1))}:function(node){return node.nodeName.toLowerCase()===query}},util.findChild=function(element,query){for(var match=util.prepareQuery(query),i=0;i<element.children.length;i++){var node=element.children[i];if(match(node))return node}return null},util.findChildRecursively=function(element,query){for(var match=util.prepareQuery(query),i=0;i<element.children.length;i++){var node=element.children[i];if(match(node))return node;var nodeMatch=util.findChildRecursively(node,match);if(nodeMatch)return nodeMatch}return null},util.findParent=function(element,query){for(var match="."===query.substr(0,1)?function(node){return node.classList.contains(query.substr(1))}:function(node){return node.nodeName.toLowerCase()===query},parent=element.parentNode;;){if(!parent)return null;if(match(parent))return parent;parent=parent.parentNode}},util.isAttached=function(element){for(;document.documentElement!==element;){if(!element)return!1;element=element.parentNode}return!0},util.hasAnyComponentAsParent=function(element){for(;element&&document.documentElement!==element;)if(element=element.parentNode,element&&element.nodeName.toLowerCase().match(/(ons-navigator|ons-tabbar|ons-sliding-menu|ons-split-view)/))return!0;return!1},util.propagateAction=function(element,action){for(var i=0;i<element.childNodes.length;i++){var child=element.childNodes[i];child[action]?child[action]():util.propagateAction(child,action)}},util.createElement=function(html){var wrapper=document.createElement("div");if(wrapper.innerHTML=html,wrapper.children.length>1)throw new Error('"html" must be one wrapper element.');return wrapper.children[0]},util.createFragment=function(html){var wrapper=document.createElement("div");wrapper.innerHTML=html;var fragment=document.createDocumentFragment();return wrapper.firstChild&&fragment.appendChild(wrapper.firstChild),fragment},util.extend=function(dst){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_len>_key;_key++)args[_key-1]=arguments[_key];for(var i=0;i<args.length;i++)if(args[i])for(var keys=Object.keys(args[i]),j=0;j<keys.length;j++){var key=keys[j];dst[key]=args[i][key]}return dst},util.arrayFrom=function(arrayLike){for(var result=[],i=0;i<arrayLike.length;i++)result.push(arrayLike[i]);return result},util.parseJSONObjectSafely=function(jsonString){var failSafe=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];try{var result=JSON.parse(""+jsonString);if("object"===("undefined"==typeof result?"undefined":babelHelpers["typeof"](result))&&null!==result)return result}catch(e){return failSafe}return failSafe},util.triggerElementEvent=function(target,eventName){var detail=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],event=new CustomEvent(eventName,{bubbles:!0,cancelable:!0,detail:detail});return Object.keys(detail).forEach(function(key){event[key]=detail[key]}),target.dispatchEvent(event),event},util.hasModifier=function(target,modifierName){if(!target.hasAttribute("modifier"))return!1;for(var modifiers=target.getAttribute("modifier").trim().split(/\s+/),i=0;i<modifiers.length;i++)if(modifiers[i]===modifierName)return!0;return!1},util.animationOptionsParse=animationOptionsParser.parse;var generateId=function(){var i=0;return function(){return i++}}(),DoorLock=function(){function DoorLock(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];babelHelpers.classCallCheck(this,DoorLock),this._lockList=[],this._waitList=[],this._log=options.log||function(){}}return babelHelpers.createClass(DoorLock,[{key:"lock",value:function(){var _this=this,unlock=function unlock(){_this._unlock(unlock)};return unlock.id=generateId(),this._lockList.push(unlock),this._log("lock: "+unlock.id),unlock}},{key:"_unlock",value:function(fn){var index=this._lockList.indexOf(fn);if(-1===index)throw new Error("This function is not registered in the lock list.");this._lockList.splice(index,1),this._log("unlock: "+fn.id),this._tryToFreeWaitList()}},{key:"_tryToFreeWaitList",value:function(){for(;!this.isLocked()&&this._waitList.length>0;)this._waitList.shift()()}},{key:"waitUnlock",value:function(callback){if(!(callback instanceof Function))throw new Error("The callback param must be a function.");this.isLocked()?this._waitList.push(callback):callback()}},{key:"isLocked",value:function(){return this._lockList.length>0}}]),DoorLock}(),util$1={_ready:!1,_domContentLoaded:!1,_onDOMContentLoaded:function(){util$1._domContentLoaded=!0,ons$1.isWebView()?window.document.addEventListener("deviceready",function(){util$1._ready=!0},!1):util$1._ready=!0},addBackButtonListener:function(fn){if(!this._domContentLoaded)throw new Error("This method is available after DOMContentLoaded");this._ready?window.document.addEventListener("backbutton",fn,!1):window.document.addEventListener("deviceready",function(){window.document.addEventListener("backbutton",fn,!1)})},removeBackButtonListener:function(fn){if(!this._domContentLoaded)throw new Error("This method is available after DOMContentLoaded");this._ready?window.document.removeEventListener("backbutton",fn,!1):window.document.addEventListener("deviceready",function(){window.document.removeEventListener("backbutton",fn,!1)})}};window.addEventListener("DOMContentLoaded",function(){return util$1._onDOMContentLoaded()},!1);var HandlerRepository={_store:{},_genId:function(){var i=0;return function(){return i++}}(),set:function(element,handler){element.dataset.deviceBackButtonHandlerId&&this.remove(element);var id=element.dataset.deviceBackButtonHandlerId=HandlerRepository._genId();this._store[id]=handler},remove:function(element){element.dataset.deviceBackButtonHandlerId&&(delete this._store[element.dataset.deviceBackButtonHandlerId],delete element.dataset.deviceBackButtonHandlerId)},get:function(element){if(!element.dataset.deviceBackButtonHandlerId)return void 0;var id=element.dataset.deviceBackButtonHandlerId;if(!this._store[id])throw new Error;return this._store[id]},has:function(element){var id=element.dataset.deviceBackButtonHandlerId;return!!this._store[id]}},DeviceBackButtonDispatcher=function(){function DeviceBackButtonDispatcher(){babelHelpers.classCallCheck(this,DeviceBackButtonDispatcher),this._isEnabled=!1,this._boundCallback=this._callback.bind(this)}return babelHelpers.createClass(DeviceBackButtonDispatcher,[{key:"enable",value:function(){this._isEnabled||(util$1.addBackButtonListener(this._boundCallback),this._isEnabled=!0)}},{key:"disable",value:function(){this._isEnabled&&(util$1.removeBackButtonListener(this._boundCallback),this._isEnabled=!1)}},{key:"fireDeviceBackButtonEvent",value:function(){var event=document.createEvent("Event");event.initEvent("backbutton",!0,!0),document.dispatchEvent(event)}},{key:"_callback",value:function(){this._dispatchDeviceBackButtonEvent()}},{key:"createHandler",value:function(element,callback){if(!(element instanceof HTMLElement))throw new Error("element must be an instance of HTMLElement");if(!(callback instanceof Function))throw new Error("callback must be an instance of Function");var handler={_callback:callback,_element:element,disable:function(){HandlerRepository.remove(element)},setListener:function(callback){this._callback=callback},enable:function(){HandlerRepository.set(element,this)},isEnabled:function(){return HandlerRepository.get(element)===this},destroy:function(){HandlerRepository.remove(element),this._callback=this._element=null}};return handler.enable(),handler}},{key:"_dispatchDeviceBackButtonEvent",value:function(){function createEvent(element){return{_element:element,callParentHandler:function(){for(var parent=this._element.parentNode;parent;){if(handler=HandlerRepository.get(parent))return handler._callback(createEvent(parent));parent=parent.parentNode}}}}var tree=this._captureTree(),element=this._findHandlerLeafElement(tree),handler=HandlerRepository.get(element);handler._callback(createEvent(element))}},{key:"_captureTree",value:function(){function createTree(element){return{element:element,children:Array.prototype.concat.apply([],arrayOf(element.children).map(function(childElement){if("none"===childElement.style.display)return[];if(0===childElement.children.length&&!HandlerRepository.has(childElement))return[];var result=createTree(childElement);return 0!==result.children.length||HandlerRepository.has(result.element)?[result]:[]}))}}function arrayOf(target){for(var result=[],i=0;i<target.length;i++)result.push(target[i]);return result}return createTree(document.body)}},{key:"_findHandlerLeafElement",value:function(tree){function find(node){return 0===node.children.length?node.element:1===node.children.length?find(node.children[0]):node.children.map(function(childNode){return childNode.element}).reduce(function(left,right){if(!left)return right;var leftZ=parseInt(window.getComputedStyle(left,"").zIndex,10),rightZ=parseInt(window.getComputedStyle(right,"").zIndex,10);if(!isNaN(leftZ)&&!isNaN(rightZ))return leftZ>rightZ?left:right;throw new Error("Capturing backbutton-handler is failure.")},null)}return find(tree)}}]),DeviceBackButtonDispatcher}(),deviceBackButtonDispatcher=new DeviceBackButtonDispatcher,ons$1={};ons$1._readyLock=new DoorLock,ons$1._config={autoStatusBarFill:!0,animationsDisabled:!1},waitDeviceReady(),ons$1.isReady=function(){return!ons$1._readyLock.isLocked()},ons$1.isWebView=function(){if("loading"===document.readyState||"uninitialized"==document.readyState)throw new Error("isWebView() method is available after dom contents loaded.");return!!(window.cordova||window.phonegap||window.PhoneGap)},ons$1.ready=function(callback){ons$1.isReady()?callback():ons$1._readyLock.waitUnlock(callback)},ons$1.setDefaultDeviceBackButtonListener=function(listener){ons$1._defaultDeviceBackButtonHandler.setListener(listener)},ons$1.disableDeviceBackButtonHandler=function(){ons$1._deviceBackButtonDispatcher.disable()},ons$1.enableDeviceBackButtonHandler=function(){ons$1._deviceBackButtonDispatcher.enable()},ons$1.enableAutoStatusBarFill=function(){if(ons$1.isReady())throw new Error("This method must be called before ons.isReady() is true.");ons$1._config.autoStatusBarFill=!0},ons$1.disableAutoStatusBarFill=function(){if(ons$1.isReady())throw new Error("This method must be called before ons.isReady() is true.");ons$1._config.autoStatusBarFill=!1},ons$1.disableAnimations=function(){ons$1._config.animationsDisabled=!0},ons$1.enableAnimations=function(){ons$1._config.animationsDisabled=!1},ons$1._createPopoverOriginal=function(page){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!page)throw new Error("Page url must be defined.");return ons$1._internal.getPageHTMLAsync(page).then(function(html){html=html.match(/<ons-popover/gi)?"<div>"+html+"</div>":"<ons-popover>"+html+"</ons-popover>";var div=ons$1._util.createElement("<div>"+html+"</div>"),popover=div.querySelector("ons-popover");return CustomElements.upgrade(popover),document.body.appendChild(popover),options.link instanceof Function&&options.link(popover),popover})},ons$1.createPopover=ons$1._createPopoverOriginal,ons$1._createDialogOriginal=function(page){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!page)throw new Error("Page url must be defined.");return ons$1._internal.getPageHTMLAsync(page).then(function(html){html=html.match(/<ons-dialog/gi)?"<div>"+html+"</div>":"<ons-dialog>"+html+"</ons-dialog>";var div=ons$1._util.createElement("<div>"+html+"</div>"),dialog=div.querySelector("ons-dialog");return CustomElements.upgrade(dialog),document.body.appendChild(dialog),options.link instanceof Function&&options.link(dialog),dialog})},ons$1.createDialog=ons$1._createDialogOriginal,ons$1._createAlertDialogOriginal=function(page){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!page)throw new Error("Page url must be defined.");return ons$1._internal.getPageHTMLAsync(page).then(function(html){html=html.match(/<ons-alert-dialog/gi)?"<div>"+html+"</div>":"<ons-alert-dialog>"+html+"</ons-alert-dialog>";var div=ons$1._util.createElement("<div>"+html+"</div>"),alertDialog=div.querySelector("ons-alert-dialog");return CustomElements.upgrade(alertDialog),document.body.appendChild(alertDialog),options.link instanceof Function&&options.link(alertDialog),alertDialog})},ons$1.createAlertDialog=ons$1._createAlertDialogOriginal,ons$1._resolveLoadingPlaceholderOriginal=function(page,link){var elements=ons$1._util.arrayFrom(window.document.querySelectorAll("[ons-loading-placeholder]"));if(!(elements.length>0))throw new Error("No ons-loading-placeholder exists.");elements.filter(function(element){return!element.getAttribute("page")}).forEach(function(element){element.setAttribute("ons-loading-placeholder",page),ons$1._resolveLoadingPlaceholder(element,page,link)})},ons$1.resolveLoadingPlaceholder=ons$1._resolveLoadingPlaceholderOriginal,ons$1._setupLoadingPlaceHolders=function(){ons$1.ready(function(){var elements=ons$1._util.arrayFrom(window.document.querySelectorAll("[ons-loading-placeholder]"));elements.forEach(function(element){var page=element.getAttribute("ons-loading-placeholder");"string"==typeof page&&ons$1._resolveLoadingPlaceholder(element,page)})})},ons$1._resolveLoadingPlaceholder=function(element,page,link){link=link||function(element,done){done()},ons$1._internal.getPageHTMLAsync(page).then(function(html){for(;element.firstChild;)element.removeChild(element.firstChild);var contentElement=ons$1._util.createElement("<div>"+html+"</div>");contentElement.style.display="none",element.appendChild(contentElement),link(contentElement,function(){contentElement.style.display=""})})["catch"](function(error){throw new Error("Unabled to resolve placeholder: "+error)})};var AnimatorFactory=function(){function AnimatorFactory(opts){if(babelHelpers.classCallCheck(this,AnimatorFactory),this._animators=opts.animators,this._baseClass=opts.baseClass,this._baseClassName=opts.baseClassName||opts.baseClass.name,this._animation=opts.defaultAnimation||"default",this._animationOptions=opts.defaultAnimationOptions||{},!this._animators[this._animation])throw new Error("No such animation: "+this._animation)}return babelHelpers.createClass(AnimatorFactory,[{key:"setAnimationOptions",value:function(options){this._animationOptions=options}},{key:"newAnimator",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],defaultAnimator=arguments[1],animator=null;if(options.animation instanceof this._baseClass)return options.animation;var Animator=null;if("string"==typeof options.animation&&(Animator=this._animators[options.animation]),!Animator&&defaultAnimator)animator=defaultAnimator;else{Animator=Animator||this._animators[this._animation];var animationOpts=util.extend({},this._animationOptions,options.animationOptions||{},ons$1._config.animationsDisabled?{duration:0,delay:0}:{});animator=new Animator(animationOpts)}if(!(animator instanceof this._baseClass))throw new Error('"animator" is not an instance of '+this._baseClassName+".");return animator}}],[{key:"parseAnimationOptionsString",value:function(jsonString){try{if("string"==typeof jsonString){var result=util.animationOptionsParse(jsonString);if("object"===("undefined"==typeof result?"undefined":babelHelpers["typeof"](result))&&null!==result)return result;console.error('"animation-options" attribute must be a JSON object string: '+jsonString)}return{}}catch(e){return console.error('"animation-options" attribute must be a JSON object string: '+jsonString),{}}}}]),AnimatorFactory}(),Platform=function(){function Platform(){babelHelpers.classCallCheck(this,Platform),this._renderPlatform=null}return babelHelpers.createClass(Platform,[{key:"select",value:function(platform){this._renderPlatform=platform.trim().toLowerCase()}},{key:"isWebView",value:function(){return ons$1.isWebView()}},{key:"isIOS",value:function(){return this._renderPlatform?"ios"===this._renderPlatform:"object"===("undefined"==typeof device?"undefined":babelHelpers["typeof"](device))?/iOS/i.test(device.platform):/iPhone|iPad|iPod/i.test(navigator.userAgent)}},{key:"isAndroid",value:function(){return this._renderPlatform?"android"===this._renderPlatform:/Android/i.test("object"===("undefined"==typeof device?"undefined":babelHelpers["typeof"](device))?device.platform:navigator.userAgent)}},{key:"isAndroidPhone",value:function(){return/Android/i.test(navigator.userAgent)&&/Mobile/i.test(navigator.userAgent)}},{key:"isAndroidTablet",value:function(){return/Android/i.test(navigator.userAgent)&&!/Mobile/i.test(navigator.userAgent)}},{key:"isWP",value:function(){return this._renderPlatform?"wp"===this._renderPlatform:"object"===("undefined"==typeof device?"undefined":babelHelpers["typeof"](device))?/Win32NT|WinCE/i.test(device.platform):/Windows Phone|IEMobile|WPDesktop/i.test(navigator.userAgent)}},{key:"isIPhone",value:function(){return/iPhone/i.test(navigator.userAgent)}},{key:"isIPad",value:function(){return/iPad/i.test(navigator.userAgent)}},{key:"isIPod",value:function(){return/iPod/i.test(navigator.userAgent)}},{key:"isBlackBerry",value:function(){return this._renderPlatform?"blackberry"===this._renderPlatform:"object"===("undefined"==typeof device?"undefined":babelHelpers["typeof"](device))?/BlackBerry/i.test(device.platform):/BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent)}},{key:"isOpera",value:function(){return this._renderPlatform?"opera"===this._renderPlatform:!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0}},{key:"isFirefox",value:function(){return this._renderPlatform?"firefox"===this._renderPlatform:"undefined"!=typeof InstallTrigger}},{key:"isSafari",value:function(){return this._renderPlatform?"safari"===this._renderPlatform:Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0}},{key:"isChrome",value:function(){return this._renderPlatform?"chrome"===this._renderPlatform:!(!window.chrome||window.opera||navigator.userAgent.indexOf(" OPR/")>=0||navigator.userAgent.indexOf(" Edge/")>=0)}},{key:"isIE",value:function(){return this._renderPlatform?"ie"===this._renderPlatform:!1||!!document.documentMode}},{key:"isEdge",value:function(){return this._renderPlatform?"edge"===this._renderPlatform:navigator.userAgent.indexOf(" Edge/")>=0}},{key:"isIOS7above",value:function(){if("object"===("undefined"==typeof device?"undefined":babelHelpers["typeof"](device)))return/iOS/i.test(device.platform)&&parseInt(device.version.split(".")[0])>=7;if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){var ver=(navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)||[""])[0].replace(/_/g,".");return parseInt(ver.split(".")[0])>=7}return!1}},{key:"getMobileOS",value:function(){return this.isAndroid()?"android":this.isIOS()?"ios":this.isWP()?"wp":"other"}},{key:"getIOSDevice",value:function(){return this.isIPhone()?"iphone":this.isIPad()?"ipad":this.isIPod()?"ipod":"na"}}]),Platform}(),platform=new Platform,pageAttributeExpression={_variables:{},defineVariable:function(name,value){var overwrite=arguments.length<=2||void 0===arguments[2]?!1:arguments[2];if("string"!=typeof name)throw new Error("Variable name must be a string.");if("string"!=typeof value&&"function"!=typeof value)throw new Error("Variable value must be a string or a function.");if(this._variables.hasOwnProperty(name)&&!overwrite)throw new Error('"'+name+'" is already defined.');this._variables[name]=value},getVariable:function(name){return this._variables.hasOwnProperty(name)?this._variables[name]:null},removeVariable:function(name){delete this._variables[name]},getAllVariables:function(){return this._variables},_parsePart:function(part){var c=void 0,inInterpolation=!1,currentIndex=0,tokens=[];if(0===part.length)throw new Error("Unable to parse empty string.");for(var i=0;i<part.length;i++)if(c=part.charAt(i),
"$"===c&&"{"===part.charAt(i+1)){if(inInterpolation)throw new Error("Nested interpolation not supported.");var token=part.substring(currentIndex,i);token.length>0&&tokens.push(part.substring(currentIndex,i)),currentIndex=i,inInterpolation=!0}else if("}"===c){if(!inInterpolation)throw new Error("} must be preceeded by ${");var token=part.substring(currentIndex,i+1);token.length>0&&tokens.push(part.substring(currentIndex,i+1)),currentIndex=i+1,inInterpolation=!1}if(inInterpolation)throw new Error("Unterminated interpolation.");return tokens.push(part.substring(currentIndex,part.length)),tokens},_replaceToken:function(token){var re=/^\${(.*?)}$/,match=token.match(re);if(match){var name=match[1].trim(),variable=this.getVariable(name);if(null===variable)throw new Error('Variable "'+name+'" does not exist.');if("string"==typeof variable)return variable;var rv=variable();if("string"!=typeof rv)throw new Error("Must return a string.");return rv}return token},_replaceTokens:function(tokens){return tokens.map(this._replaceToken.bind(this))},_parseExpression:function(expression){return expression.split(",").map(function(part){return part.trim()}).map(this._parsePart.bind(this)).map(this._replaceTokens.bind(this)).map(function(part){return part.join("")})},evaluate:function(expression){return expression?this._parseExpression(expression):[]}};pageAttributeExpression.defineVariable("mobileOS",platform.getMobileOS()),pageAttributeExpression.defineVariable("iOSDevice",platform.getIOSDevice()),pageAttributeExpression.defineVariable("runtime",function(){return platform.isWebView()?"cordova":"browser"});var internal={};internal.nullElement=window.document.createElement("div"),internal.isEnabledAutoStatusBarFill=function(){return!!ons._config.autoStatusBarFill},internal.normalizePageHTML=function(html){return html=(""+html).trim(),html.match(/^<ons-page/)||(html="<ons-page _muted>"+html+"</ons-page>"),html},internal.waitDOMContentLoaded=function(callback){"loading"===window.document.readyState||"uninitialized"==window.document.readyState?window.document.addEventListener("DOMContentLoaded",callback):setImmediate(callback)},internal.shouldFillStatusBar=function(element){var checkStatusBar=function(){if(internal.isEnabledAutoStatusBarFill()&&platform.isWebView()&&platform.isIOS7above()){if(!(element instanceof HTMLElement))throw new Error("element must be an instance of HTMLElement");for(;;){if(element.hasAttribute("no-status-bar-fill"))return!1;if(element=element.parentNode,!element||!element.hasAttribute)return!0}}return!1};return new Promise(function(resolve,reject){"object"===("undefined"==typeof device?"undefined":babelHelpers["typeof"](device))?document.addEventListener("deviceready",function(){checkStatusBar()&&resolve()}):checkStatusBar()&&resolve(),reject()})},internal.templateStore={_storage:{},get:function(key){return internal.templateStore._storage[key]||null},set:function(key,template){internal.templateStore._storage[key]=template}},window.document.addEventListener("_templateloaded",function(e){"ons-template"===e.target.nodeName.toLowerCase()&&internal.templateStore.set(e.templateId,e.template)},!1),window.document.addEventListener("DOMContentLoaded",function(){function register(query){for(var templates=window.document.querySelectorAll(query),i=0;i<templates.length;i++)internal.templateStore.set(templates[i].getAttribute("id"),templates[i].textContent)}register('script[type="text/ons-template"]'),register('script[type="text/template"]'),register('script[type="text/ng-template"]')},!1),internal.getTemplateHTMLAsync=function(page){return new Promise(function(resolve,reject){setImmediate(function(){var cache=internal.templateStore.get(page);if(cache){var html="string"==typeof cache?cache:cache[1];resolve(html)}else!function(){var xhr=new XMLHttpRequest;xhr.open("GET",page,!0),xhr.onload=function(response){var html=xhr.responseText;xhr.status>=400&&xhr.status<600?reject(html):resolve(html)},xhr.onerror=function(){throw new Error("The page is not found: "+page)},xhr.send(null)}()})})},internal.getPageHTMLAsync=function(page){var pages=pageAttributeExpression.evaluate(page),getPage=function getPage(page){return"string"!=typeof page?Promise.reject("Must specify a page."):internal.getTemplateHTMLAsync(page).then(function(html){return internal.normalizePageHTML(html)},function(error){return 0===pages.length?Promise.reject(error):getPage(pages.shift())}).then(function(html){return internal.normalizePageHTML(html)})};return getPage(pages.shift())};var ModifierUtil=function(){function ModifierUtil(){babelHelpers.classCallCheck(this,ModifierUtil)}return babelHelpers.createClass(ModifierUtil,null,[{key:"diff",value:function(last,current){function makeDict(modifier){var dict={};return ModifierUtil.split(modifier).forEach(function(token){return dict[token]=token}),dict}last=makeDict((""+last).trim()),current=makeDict((""+current).trim());var removed=Object.keys(last).reduce(function(result,token){return current[token]||result.push(token),result},[]),added=Object.keys(current).reduce(function(result,token){return last[token]||result.push(token),result},[]);return{added:added,removed:removed}}},{key:"applyDiffToClassList",value:function(diff,classList,template){diff.added.map(function(modifier){return template.replace(/\*/g,modifier)}).forEach(function(klass){return classList.add(klass)}),diff.removed.map(function(modifier){return template.replace(/\*/g,modifier)}).forEach(function(klass){return classList.remove(klass)})}},{key:"applyDiffToElement",value:function(diff,element,scheme){for(var selector in scheme)if(scheme.hasOwnProperty(selector))for(var targetElements=""===selector?[element]:element.querySelectorAll(selector),i=0;i<targetElements.length;i++)ModifierUtil.applyDiffToClassList(diff,targetElements[i].classList,scheme[selector])}},{key:"onModifierChanged",value:function(last,current,element,scheme){return ModifierUtil.applyDiffToElement(ModifierUtil.diff(last,current),element,scheme)}},{key:"initModifier",value:function(element,scheme){var modifier=element.getAttribute("modifier");"string"==typeof modifier&&ModifierUtil.applyDiffToElement({removed:[],added:ModifierUtil.split(modifier)},element,scheme)}},{key:"split",value:function(modifier){return"string"!=typeof modifier?[]:modifier.trim().split(/ +/).filter(function(token){return""!==token})}}]),ModifierUtil}(),LazyRepeatDelegate=function(){function LazyRepeatDelegate(){babelHelpers.classCallCheck(this,LazyRepeatDelegate)}return babelHelpers.createClass(LazyRepeatDelegate,[{key:"prepareItem",value:function(index,done){throw new Error("This is an abstract method.")}},{key:"countItems",value:function(){throw new Error("This is an abstract method.")}},{key:"updateItem",value:function(index,item){throw new Error("This is an abstract method.")}},{key:"calculateItemHeight",value:function(index){throw new Error("This is an abstract method.")}},{key:"destroyItem",value:function(index,item){throw new Error("This is an abstract method.")}},{key:"destroy",value:function(){throw new Error("This is an abstract method.")}}]),LazyRepeatDelegate}(),LazyRepeatProvider=function(){function LazyRepeatProvider(wrapperElement,delegate){if(babelHelpers.classCallCheck(this,LazyRepeatProvider),!(delegate instanceof LazyRepeatDelegate))throw new Error('"delegate" parameter must be an instance of ons._internal.LazyRepeatDelegate.');if(!(wrapperElement instanceof Element))throw new Error('"wrapperElement" parameter must be an instance of Element.');if(this._wrapperElement=wrapperElement,this._delegate=delegate,this._pageContent=util.findParent(wrapperElement,".page__content"),this._pageContent||(this._pageContent=util.findParent(wrapperElement,".ons-scroller__content")),!this._pageContent)throw new Error("ons-lazy-repeat must be a descendant of an <ons-page> or an <ons-scroller> element.");this._itemHeightSum=[],this._maxIndex=0,this._renderedItems={},this._addEventListeners(),this._onChange()}return babelHelpers.createClass(LazyRepeatProvider,[{key:"_countItems",value:function(){return this._delegate.countItems()}},{key:"_getItemHeight",value:function(i){return this._delegate.calculateItemHeight(i)}},{key:"_getTopOffset",value:function(){return"undefined"!=typeof this._wrapperElement&&null!==this._wrapperElement?this._wrapperElement.getBoundingClientRect().top:0}},{key:"_onChange",value:function(){this._render()}},{key:"refresh",value:function(){this._removeAllElements(),this._onChange()}},{key:"_render",value:function(){for(var items=this._getItemsInView(),keep={},i=0,l=items.length;l>i;i++){var _item=items[i];this._renderElement(_item),keep[_item.index]=!0}for(var key in this._renderedItems)this._renderedItems.hasOwnProperty(key)&&!keep.hasOwnProperty(key)&&this._removeElement(key);this._wrapperElement.style.height=this._calculateListHeight()+"px"}},{key:"_calculateListHeight",value:function(){var indices=Object.keys(this._renderedItems).map(function(n){return parseInt(n)});return this._itemHeightSum[indices.pop()]||0}},{key:"_isRendered",value:function(index){return this._renderedItems.hasOwnProperty(index)}},{key:"_renderElement",value:function(_ref){var _this=this,index=_ref.index,top=_ref.top;if(this._isRendered(index)){var currentItem=this._renderedItems[index];this._delegate.updateItem(index,currentItem);var element=this._renderedItems[index].element;return void(element.style.top=this._wrapperElement.offsetTop+top+"px")}this._delegate.prepareItem(index,function(item){var element=item.element;element.style.position="absolute",element.style.top=top+"px",element.style.left="0px",element.style.right="0px",_this._wrapperElement.appendChild(element),_this._renderedItems[index]=item})}},{key:"_removeElement",value:function(index){if(this._isRendered(index)){var item=this._renderedItems[index];this._delegate.destroyItem(index,item),item.element.parentElement&&item.element.parentElement.removeChild(item.element),item=null,delete this._renderedItems[index]}}},{key:"_removeAllElements",value:function(){for(var key in this._renderedItems)this._renderedItems.hasOwnProperty(key)&&this._removeElement(key)}},{key:"_calculateStartIndex",value:function(current){for(var start=0,end=this._maxIndex;;){var middle=Math.floor((start+end)/2),value=current+this._itemHeightSum[middle];if(start>end)return 0;if(value>=0&&value-this._getItemHeight(middle)<0)return middle;isNaN(value)||value>=0?end=middle-1:start=middle+1}}},{key:"_recalculateItemHeightSum",value:function(){for(var sums=this._itemHeightSum,i=0,sum=0;i<Math.min(sums.length,this._countItems());i++)sum+=this._getItemHeight(i),sums[i]=sum}},{key:"_getItemsInView",value:function(){var topOffset=this._getTopOffset(),topPosition=topOffset,cnt=this._countItems();cnt!==this._itemCount&&(this._recalculateItemHeightSum(),this._maxIndex=cnt-1),this._itemCount=cnt;var startIndex=this._calculateStartIndex(topPosition);startIndex=Math.max(startIndex-30,0),startIndex>0&&(topPosition+=this._itemHeightSum[startIndex-1]);for(var items=[],i=startIndex;cnt>i&&topPosition<4*window.innerHeight;i++){var h=this._getItemHeight(i);i>=this._itemHeightSum.length&&(this._itemHeightSum=this._itemHeightSum.concat(new Array(100))),this._itemHeightSum[i]=i>0?this._itemHeightSum[i-1]+h:h,this._maxIndex=Math.max(i,this._maxIndex),items.push({index:i,top:topPosition-topOffset}),topPosition+=h}return items}},{key:"_debounce",value:function(func,wait,immediate){var timeout;return function(){var context=this,args=arguments,later=function(){timeout=null,immediate||func.apply(context,args)},callNow=immediate&&!timeout;clearTimeout(timeout),timeout=setTimeout(later,wait),callNow&&func.apply(context,args)}}},{key:"_doubleFireOnTouchend",value:function(){this._render(),this._debounce(this._render.bind(this),100)}},{key:"_addEventListeners",value:function(){this._boundOnChange=platform.isIOS()?this._debounce(this._onChange.bind(this),30):this._onChange.bind(this),this._boundDoubleFireOnTouchend=this._doubleFireOnTouchend.bind(this),this._pageContent.addEventListener("scroll",this._boundOnChange,!0),platform.isIOS()&&(this._pageContent.addEventListener("touchmove",this._boundOnChange,!0),this._pageContent.addEventListener("touchend",this._boundDoubleFireOnTouchend,!0)),window.document.addEventListener("resize",this._boundOnChange,!0)}},{key:"_removeEventListeners",value:function(){this._pageContent.removeEventListener("scroll",this._boundOnChange,!0),platform.isIOS()&&(this._pageContent.removeEventListener("touchmove",this._boundOnChange,!0),this._pageContent.removeEventListener("touchend",this._boundDoubleFireOnTouchend,!0)),window.document.removeEventListener("resize",this._boundOnChange,!0)}},{key:"destroy",value:function(){this._removeAllElements(),this._delegate.destroy(),this._parentElement=this._delegate=this._renderedItems=null,this._removeEventListeners()}}]),LazyRepeatProvider}();internal.AnimatorFactory=AnimatorFactory,internal.ModifierUtil=ModifierUtil,internal.LazyRepeatProvider=LazyRepeatProvider,internal.LazyRepeatDelegate=LazyRepeatDelegate;var Event$1,Utils,Detection,PointerEvent,GestureDetector=function GestureDetector(element,options){return new GestureDetector.Instance(element,options||{})};GestureDetector.defaults={behavior:{userSelect:"none",touchAction:"pan-y",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},GestureDetector.DOCUMENT=document,GestureDetector.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,GestureDetector.HAS_TOUCHEVENTS="ontouchstart"in window,GestureDetector.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent),GestureDetector.NO_MOUSEEVENTS=GestureDetector.HAS_TOUCHEVENTS&&GestureDetector.IS_MOBILE||GestureDetector.HAS_POINTEREVENTS,GestureDetector.CALCULATE_INTERVAL=25;var EVENT_TYPES={},DIRECTION_DOWN=GestureDetector.DIRECTION_DOWN="down",DIRECTION_LEFT=GestureDetector.DIRECTION_LEFT="left",DIRECTION_UP=GestureDetector.DIRECTION_UP="up",DIRECTION_RIGHT=GestureDetector.DIRECTION_RIGHT="right",POINTER_MOUSE=GestureDetector.POINTER_MOUSE="mouse",POINTER_TOUCH=GestureDetector.POINTER_TOUCH="touch",POINTER_PEN=GestureDetector.POINTER_PEN="pen",EVENT_START=GestureDetector.EVENT_START="start",EVENT_MOVE=GestureDetector.EVENT_MOVE="move",EVENT_END=GestureDetector.EVENT_END="end",EVENT_RELEASE=GestureDetector.EVENT_RELEASE="release",EVENT_TOUCH=GestureDetector.EVENT_TOUCH="touch";GestureDetector.READY=!1,GestureDetector.plugins=GestureDetector.plugins||{},GestureDetector.gestures=GestureDetector.gestures||{},Utils=GestureDetector.utils={extend:function(dest,src,merge){for(var key in src)!src.hasOwnProperty(key)||void 0!==dest[key]&&merge||(dest[key]=src[key]);return dest},on:function(element,type,handler){element.addEventListener(type,handler,!1)},off:function(element,type,handler){element.removeEventListener(type,handler,!1)},each:function(obj,iterator,context){var i,len;if("forEach"in obj)obj.forEach(iterator,context);else if(void 0!==obj.length){for(i=0,len=obj.length;len>i;i++)if(iterator.call(context,obj[i],i,obj)===!1)return}else for(i in obj)if(obj.hasOwnProperty(i)&&iterator.call(context,obj[i],i,obj)===!1)return},inStr:function(src,find){return src.indexOf(find)>-1},inArray:function(src,find){if(src.indexOf){var index=src.indexOf(find);return-1===index?!1:index}for(var i=0,len=src.length;len>i;i++)if(src[i]===find)return i;return!1},toArray:function(obj){return Array.prototype.slice.call(obj,0)},hasParent:function(node,parent){for(;node;){if(node==parent)return!0;node=node.parentNode}return!1},getCenter:function(touches){var pageX=[],pageY=[],clientX=[],clientY=[],min=Math.min,max=Math.max;return 1===touches.length?{pageX:touches[0].pageX,pageY:touches[0].pageY,clientX:touches[0].clientX,clientY:touches[0].clientY}:(Utils.each(touches,function(touch){pageX.push(touch.pageX),pageY.push(touch.pageY),clientX.push(touch.clientX),clientY.push(touch.clientY)}),{pageX:(min.apply(Math,pageX)+max.apply(Math,pageX))/2,pageY:(min.apply(Math,pageY)+max.apply(Math,pageY))/2,clientX:(min.apply(Math,clientX)+max.apply(Math,clientX))/2,clientY:(min.apply(Math,clientY)+max.apply(Math,clientY))/2})},getVelocity:function(deltaTime,deltaX,deltaY){return{x:Math.abs(deltaX/deltaTime)||0,y:Math.abs(deltaY/deltaTime)||0}},getAngle:function(touch1,touch2){var x=touch2.clientX-touch1.clientX,y=touch2.clientY-touch1.clientY;return 180*Math.atan2(y,x)/Math.PI},getDirection:function(touch1,touch2){var x=Math.abs(touch1.clientX-touch2.clientX),y=Math.abs(touch1.clientY-touch2.clientY);return x>=y?touch1.clientX-touch2.clientX>0?DIRECTION_LEFT:DIRECTION_RIGHT:touch1.clientY-touch2.clientY>0?DIRECTION_UP:DIRECTION_DOWN},getDistance:function(touch1,touch2){var x=touch2.clientX-touch1.clientX,y=touch2.clientY-touch1.clientY;return Math.sqrt(x*x+y*y)},getScale:function(start,end){return start.length>=2&&end.length>=2?this.getDistance(end[0],end[1])/this.getDistance(start[0],start[1]):1},getRotation:function(start,end){return start.length>=2&&end.length>=2?this.getAngle(end[1],end[0])-this.getAngle(start[1],start[0]):0},isVertical:function(direction){return direction==DIRECTION_UP||direction==DIRECTION_DOWN},setPrefixedCss:function(element,prop,value,toggle){var prefixes=["","Webkit","Moz","O","ms"];prop=Utils.toCamelCase(prop);for(var i=0;i<prefixes.length;i++){var p=prop;if(prefixes[i]&&(p=prefixes[i]+p.slice(0,1).toUpperCase()+p.slice(1)),p in element.style){element.style[p]=(null===toggle||toggle)&&value||"";break}}},toggleBehavior:function(element,props,toggle){if(props&&element&&element.style){Utils.each(props,function(value,prop){Utils.setPrefixedCss(element,prop,value,toggle)});var falseFn=toggle&&function(){return!1};"none"==props.userSelect&&(element.onselectstart=falseFn),"none"==props.userDrag&&(element.ondragstart=falseFn)}},toCamelCase:function(str){return str.replace(/[_-]([a-z])/g,function(s){return s[1].toUpperCase()})}},Event$1=GestureDetector.event={preventMouseEvents:!1,started:!1,shouldDetect:!1,on:function(element,type,handler,hook){var types=type.split(" ");Utils.each(types,function(type){Utils.on(element,type,handler),hook&&hook(type)})},off:function(element,type,handler,hook){var types=type.split(" ");Utils.each(types,function(type){Utils.off(element,type,handler),hook&&hook(type)})},onTouch:function(element,eventType,handler){var self=this,onTouchHandler=function(ev){var triggerType,srcType=ev.type.toLowerCase(),isPointer=GestureDetector.HAS_POINTEREVENTS,isMouse=Utils.inStr(srcType,"mouse");isMouse&&self.preventMouseEvents||(isMouse&&eventType==EVENT_START&&0===ev.button?(self.preventMouseEvents=!1,self.shouldDetect=!0):isPointer&&eventType==EVENT_START?self.shouldDetect=1===ev.buttons||PointerEvent.matchType(POINTER_TOUCH,ev):isMouse||eventType!=EVENT_START||(self.preventMouseEvents=!0,self.shouldDetect=!0),isPointer&&eventType!=EVENT_END&&PointerEvent.updatePointer(eventType,ev),self.shouldDetect&&(triggerType=self.doDetect.call(self,ev,eventType,element,handler)),triggerType==EVENT_END&&(self.preventMouseEvents=!1,self.shouldDetect=!1,PointerEvent.reset()),isPointer&&eventType==EVENT_END&&PointerEvent.updatePointer(eventType,ev))};return this.on(element,EVENT_TYPES[eventType],onTouchHandler),onTouchHandler},doDetect:function(ev,eventType,element,handler){var touchList=this.getTouchList(ev,eventType),touchListLength=touchList.length,triggerType=eventType,triggerChange=touchList.trigger,changedLength=touchListLength;eventType==EVENT_START?triggerChange=EVENT_TOUCH:eventType==EVENT_END&&(triggerChange=EVENT_RELEASE,changedLength=touchList.length-(ev.changedTouches?ev.changedTouches.length:1)),changedLength>0&&this.started&&(triggerType=EVENT_MOVE),this.started=!0;var evData=this.collectEventData(element,triggerType,touchList,ev);return eventType!=EVENT_END&&handler.call(Detection,evData),triggerChange&&(evData.changedLength=changedLength,evData.eventType=triggerChange,handler.call(Detection,evData),evData.eventType=triggerType,delete evData.changedLength),triggerType==EVENT_END&&(handler.call(Detection,evData),this.started=!1),triggerType},determineEventTypes:function(){var types;return types=GestureDetector.HAS_POINTEREVENTS?window.PointerEvent?["pointerdown","pointermove","pointerup pointercancel lostpointercapture"]:["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel MSLostPointerCapture"]:GestureDetector.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],EVENT_TYPES[EVENT_START]=types[0],EVENT_TYPES[EVENT_MOVE]=types[1],EVENT_TYPES[EVENT_END]=types[2],EVENT_TYPES},getTouchList:function(ev,eventType){if(GestureDetector.HAS_POINTEREVENTS)return PointerEvent.getTouchList();if(ev.touches){if(eventType==EVENT_MOVE)return ev.touches;var identifiers=[],concat=[].concat(Utils.toArray(ev.touches),Utils.toArray(ev.changedTouches)),touchList=[];return Utils.each(concat,function(touch){Utils.inArray(identifiers,touch.identifier)===!1&&touchList.push(touch),identifiers.push(touch.identifier)}),touchList}return ev.identifier=1,[ev]},collectEventData:function(element,eventType,touches,ev){var pointerType=POINTER_TOUCH;return Utils.inStr(ev.type,"mouse")||PointerEvent.matchType(POINTER_MOUSE,ev)?pointerType=POINTER_MOUSE:PointerEvent.matchType(POINTER_PEN,ev)&&(pointerType=POINTER_PEN),{center:Utils.getCenter(touches),timeStamp:Date.now(),target:ev.target,touches:touches,eventType:eventType,pointerType:pointerType,srcEvent:ev,preventDefault:function(){var srcEvent=this.srcEvent;srcEvent.preventManipulation&&srcEvent.preventManipulation(),srcEvent.preventDefault&&srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return Detection.stopDetect()}}}},PointerEvent=GestureDetector.PointerEvent={pointers:{},getTouchList:function(){var touchlist=[];return Utils.each(this.pointers,function(pointer){touchlist.push(pointer)}),touchlist},updatePointer:function(eventType,pointerEvent){eventType==EVENT_END||eventType!=EVENT_END&&1!==pointerEvent.buttons?delete this.pointers[pointerEvent.pointerId]:(pointerEvent.identifier=pointerEvent.pointerId,this.pointers[pointerEvent.pointerId]=pointerEvent)},matchType:function(pointerType,ev){if(!ev.pointerType)return!1;var pt=ev.pointerType,types={};return types[POINTER_MOUSE]=pt===(ev.MSPOINTER_TYPE_MOUSE||POINTER_MOUSE),types[POINTER_TOUCH]=pt===(ev.MSPOINTER_TYPE_TOUCH||POINTER_TOUCH),types[POINTER_PEN]=pt===(ev.MSPOINTER_TYPE_PEN||POINTER_PEN),types[pointerType]},reset:function(){this.pointers={}}},Detection=GestureDetector.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(inst,eventData){this.current||(this.stopped=!1,this.current={inst:inst,startEvent:Utils.extend({},eventData),lastEvent:!1,lastCalcEvent:!1,futureCalcEvent:!1,lastCalcData:{},name:""},this.detect(eventData))},detect:function(eventData){if(this.current&&!this.stopped){eventData=this.extendEventData(eventData);var inst=this.current.inst,instOptions=inst.options;return Utils.each(this.gestures,function(gesture){!this.stopped&&inst.enabled&&instOptions[gesture.name]&&gesture.handler.call(gesture,eventData,inst)},this),this.current&&(this.current.lastEvent=eventData),eventData.eventType==EVENT_END&&this.stopDetect(),eventData}},stopDetect:function(){this.previous=Utils.extend({},this.current),this.current=null,this.stopped=!0},getCalculatedData:function(ev,center,deltaTime,deltaX,deltaY){var cur=this.current,recalc=!1,calcEv=cur.lastCalcEvent,calcData=cur.lastCalcData;calcEv&&ev.timeStamp-calcEv.timeStamp>GestureDetector.CALCULATE_INTERVAL&&(center=calcEv.center,deltaTime=ev.timeStamp-calcEv.timeStamp,deltaX=ev.center.clientX-calcEv.center.clientX,deltaY=ev.center.clientY-calcEv.center.clientY,recalc=!0),(ev.eventType==EVENT_TOUCH||ev.eventType==EVENT_RELEASE)&&(cur.futureCalcEvent=ev),(!cur.lastCalcEvent||recalc)&&(calcData.velocity=Utils.getVelocity(deltaTime,deltaX,deltaY),calcData.angle=Utils.getAngle(center,ev.center),calcData.direction=Utils.getDirection(center,ev.center),cur.lastCalcEvent=cur.futureCalcEvent||ev,cur.futureCalcEvent=ev),ev.velocityX=calcData.velocity.x,ev.velocityY=calcData.velocity.y,ev.interimAngle=calcData.angle,ev.interimDirection=calcData.direction},extendEventData:function(ev){var cur=this.current,startEv=cur.startEvent,lastEv=cur.lastEvent||startEv;(ev.eventType==EVENT_TOUCH||ev.eventType==EVENT_RELEASE)&&(startEv.touches=[],Utils.each(ev.touches,function(touch){startEv.touches.push({clientX:touch.clientX,clientY:touch.clientY})}));var deltaTime=ev.timeStamp-startEv.timeStamp,deltaX=ev.center.clientX-startEv.center.clientX,deltaY=ev.center.clientY-startEv.center.clientY;return this.getCalculatedData(ev,lastEv.center,deltaTime,deltaX,deltaY),Utils.extend(ev,{startEvent:startEv,deltaTime:deltaTime,deltaX:deltaX,deltaY:deltaY,distance:Utils.getDistance(startEv.center,ev.center),angle:Utils.getAngle(startEv.center,ev.center),direction:Utils.getDirection(startEv.center,ev.center),scale:Utils.getScale(startEv.touches,ev.touches),rotation:Utils.getRotation(startEv.touches,ev.touches)}),ev},register:function(gesture){var options=gesture.defaults||{};return void 0===options[gesture.name]&&(options[gesture.name]=!0),Utils.extend(GestureDetector.defaults,options,!0),gesture.index=gesture.index||1e3,this.gestures.push(gesture),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}},GestureDetector.Instance=function(element,options){var self=this;setup(),this.element=element,this.enabled=!0,Utils.each(options,function(value,name){delete options[name],options[Utils.toCamelCase(name)]=value}),this.options=Utils.extend(Utils.extend({},GestureDetector.defaults),options||{}),this.options.behavior&&Utils.toggleBehavior(this.element,this.options.behavior,!0),this.eventStartHandler=Event$1.onTouch(element,EVENT_START,function(ev){self.enabled&&ev.eventType==EVENT_START?Detection.startDetect(self,ev):ev.eventType==EVENT_TOUCH&&Detection.detect(ev)}),this.eventHandlers=[]},GestureDetector.Instance.prototype={on:function(gestures,handler){var self=this;return Event$1.on(self.element,gestures,handler,function(type){self.eventHandlers.push({gesture:type,handler:handler})}),self},off:function(gestures,handler){var self=this;return Event$1.off(self.element,gestures,handler,function(type){var index=Utils.inArray({gesture:type,handler:handler});index!==!1&&self.eventHandlers.splice(index,1)}),self},trigger:function(gesture,eventData){eventData||(eventData={});var event=GestureDetector.DOCUMENT.createEvent("Event");event.initEvent(gesture,!0,!0),event.gesture=eventData;var element=this.element;return Utils.hasParent(eventData.target,element)&&(element=eventData.target),element.dispatchEvent(event),this},enable:function(state){return this.enabled=state,this},dispose:function(){var i,eh;for(Utils.toggleBehavior(this.element,this.options.behavior,!1),i=-1;eh=this.eventHandlers[++i];)Utils.off(this.element,eh.gesture,eh.handler);return this.eventHandlers=[],Event$1.off(this.element,EVENT_TYPES[EVENT_START],this.eventStartHandler),null}},function(name){function dragGesture(ev,inst){var cur=Detection.current;if(!(inst.options.dragMaxTouches>0&&ev.touches.length>inst.options.dragMaxTouches))switch(ev.eventType){case EVENT_START:triggered=!1;break;case EVENT_MOVE:if(ev.distance<inst.options.dragMinDistance&&cur.name!=name)return;var startCenter=cur.startEvent.center;if(cur.name!=name&&(cur.name=name,inst.options.dragDistanceCorrection&&ev.distance>0)){var factor=Math.abs(inst.options.dragMinDistance/ev.distance);startCenter.pageX+=ev.deltaX*factor,startCenter.pageY+=ev.deltaY*factor,startCenter.clientX+=ev.deltaX*factor,startCenter.clientY+=ev.deltaY*factor,ev=Detection.extendEventData(ev)}(cur.lastEvent.dragLockToAxis||inst.options.dragLockToAxis&&inst.options.dragLockMinDistance<=ev.distance)&&(ev.dragLockToAxis=!0);var lastDirection=cur.lastEvent.direction;ev.dragLockToAxis&&lastDirection!==ev.direction&&(ev.direction=Utils.isVertical(lastDirection)?ev.deltaY<0?DIRECTION_UP:DIRECTION_DOWN:ev.deltaX<0?DIRECTION_LEFT:DIRECTION_RIGHT),triggered||(inst.trigger(name+"start",ev),triggered=!0),inst.trigger(name,ev),inst.trigger(name+ev.direction,ev);var isVertical=Utils.isVertical(ev.direction);(inst.options.dragBlockVertical&&isVertical||inst.options.dragBlockHorizontal&&!isVertical)&&ev.preventDefault();break;case EVENT_RELEASE:triggered&&ev.changedLength<=inst.options.dragMaxTouches&&(inst.trigger(name+"end",ev),triggered=!1);break;case EVENT_END:triggered=!1}}var triggered=!1;GestureDetector.gestures.Drag={name:name,index:50,handler:dragGesture,defaults:{dragMinDistance:10,dragDistanceCorrection:!0,dragMaxTouches:1,dragBlockHorizontal:!1,dragBlockVertical:!1,dragLockToAxis:!1,dragLockMinDistance:25}}}("drag"),GestureDetector.gestures.Gesture={name:"gesture",index:1337,handler:function(ev,inst){inst.trigger(this.name,ev)}},function(name){function holdGesture(ev,inst){var options=inst.options,current=Detection.current;switch(ev.eventType){case EVENT_START:clearTimeout(timer),current.name=name,timer=setTimeout(function(){current&&current.name==name&&inst.trigger(name,ev)},options.holdTimeout);break;case EVENT_MOVE:ev.distance>options.holdThreshold&&clearTimeout(timer);break;case EVENT_RELEASE:clearTimeout(timer)}}var timer;GestureDetector.gestures.Hold={name:name,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:holdGesture}}("hold"),GestureDetector.gestures.Release={name:"release",index:1/0,handler:function(ev,inst){ev.eventType==EVENT_RELEASE&&inst.trigger(this.name,ev)}},GestureDetector.gestures.Swipe={name:"swipe",index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:.6,swipeVelocityY:.6},handler:function(ev,inst){if(ev.eventType==EVENT_RELEASE){var touches=ev.touches.length,options=inst.options;if(touches<options.swipeMinTouches||touches>options.swipeMaxTouches)return;(ev.velocityX>options.swipeVelocityX||ev.velocityY>options.swipeVelocityY)&&(inst.trigger(this.name,ev),inst.trigger(this.name+ev.direction,ev))}}},function(name){function tapGesture(ev,inst){var sincePrev,didDoubleTap,options=inst.options,current=Detection.current,prev=Detection.previous;switch(ev.eventType){case EVENT_START:hasMoved=!1;break;case EVENT_MOVE:hasMoved=hasMoved||ev.distance>options.tapMaxDistance;break;case EVENT_END:!Utils.inStr(ev.srcEvent.type,"cancel")&&ev.deltaTime<options.tapMaxTime&&!hasMoved&&(sincePrev=prev&&prev.lastEvent&&ev.timeStamp-prev.lastEvent.timeStamp,didDoubleTap=!1,prev&&prev.name==name&&sincePrev&&sincePrev<options.doubleTapInterval&&ev.distance<options.doubleTapDistance&&(inst.trigger("doubletap",ev),didDoubleTap=!0),(!didDoubleTap||options.tapAlways)&&(current.name=name,inst.trigger(current.name,ev)))}}var hasMoved=!1;GestureDetector.gestures.Tap={name:name,index:100,handler:tapGesture,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:!0,doubleTapDistance:20,doubleTapInterval:300}}}("tap"),GestureDetector.gestures.Touch={name:"touch",index:-(1/0),defaults:{preventDefault:!1,preventMouse:!1},handler:function(ev,inst){return inst.options.preventMouse&&ev.pointerType==POINTER_MOUSE?void ev.stopDetect():(inst.options.preventDefault&&ev.preventDefault(),void(ev.eventType==EVENT_TOUCH&&inst.trigger("touch",ev)))}},function(name){function transformGesture(ev,inst){switch(ev.eventType){case EVENT_START:triggered=!1;break;case EVENT_MOVE:if(ev.touches.length<2)return;var scaleThreshold=Math.abs(1-ev.scale),rotationThreshold=Math.abs(ev.rotation);if(scaleThreshold<inst.options.transformMinScale&&rotationThreshold<inst.options.transformMinRotation)return;Detection.current.name=name,triggered||(inst.trigger(name+"start",ev),triggered=!0),inst.trigger(name,ev),rotationThreshold>inst.options.transformMinRotation&&inst.trigger("rotate",ev),scaleThreshold>inst.options.transformMinScale&&(inst.trigger("pinch",ev),inst.trigger("pinch"+(ev.scale<1?"in":"out"),ev));break;case EVENT_RELEASE:triggered&&ev.changedLength<2&&(inst.trigger(name+"end",ev),
triggered=!1)}}var triggered=!1;GestureDetector.gestures.Transform={name:name,index:45,defaults:{transformMinScale:.01,transformMinRotation:1},handler:transformGesture}}("transform");var softwareKeyboard=new MicroEvent;softwareKeyboard._visible=!1;var onShow=function(){softwareKeyboard._visible=!0,softwareKeyboard.emit("show")},onHide=function(){softwareKeyboard._visible=!1,softwareKeyboard.emit("hide")},bindEvents=function(){return"undefined"!=typeof Keyboard?(Keyboard.onshow=onShow,Keyboard.onhide=onHide,softwareKeyboard.emit("init",{visible:Keyboard.isVisible}),!0):"undefined"!=typeof cordova.plugins&&"undefined"!=typeof cordova.plugins.Keyboard?(window.addEventListener("native.keyboardshow",onShow),window.addEventListener("native.keyboardhide",onHide),softwareKeyboard.emit("init",{visible:cordova.plugins.Keyboard.isVisible}),!0):!1},noPluginError=function(){console.warn("ons-keyboard: Cordova Keyboard plugin is not present.")};document.addEventListener("deviceready",function(){bindEvents()||((document.querySelector("[ons-keyboard-active]")||document.querySelector("[ons-keyboard-inactive]"))&&noPluginError(),softwareKeyboard.on=noPluginError)});var create=function(){var obj={_isPortrait:!1,isPortrait:function(){return this._isPortrait()},isLandscape:function(){return!this.isPortrait()},_init:function(){return document.addEventListener("DOMContentLoaded",this._onDOMContentLoaded.bind(this),!1),"orientation"in window?window.addEventListener("orientationchange",this._onOrientationChange.bind(this),!1):window.addEventListener("resize",this._onResize.bind(this),!1),this._isPortrait=function(){return window.innerHeight>window.innerWidth},this},_onDOMContentLoaded:function(){this._installIsPortraitImplementation(),this.emit("change",{isPortrait:this.isPortrait()})},_installIsPortraitImplementation:function(){var isPortrait=window.innerWidth<window.innerHeight;this._isPortrait="orientation"in window?window.orientation%180===0?function(){return 0===Math.abs(window.orientation%180)?isPortrait:!isPortrait}:function(){return 90===Math.abs(window.orientation%180)?isPortrait:!isPortrait}:function(){return window.innerHeight>window.innerWidth}},_onOrientationChange:function(){var _this=this,isPortrait=this._isPortrait(),nIter=0,interval=setInterval(function(){nIter++;var w=window.innerWidth,h=window.innerHeight;isPortrait&&h>=w||!isPortrait&&w>=h?(_this.emit("change",{isPortrait:isPortrait}),clearInterval(interval)):50===nIter&&(_this.emit("change",{isPortrait:isPortrait}),clearInterval(interval))},20)},_onResize:function(){this.emit("change",{isPortrait:this.isPortrait()})}};return MicroEvent.mixin(obj),obj},orientation=create()._init(),notification={};notification._createAlertDialog=function(title,message,buttonLabels,primaryButtonIndex,modifier,animation,_callback,messageIsHTML,cancelable,promptDialog,autofocus,placeholder,defaultValue,submitOnEnter,compile){compile=compile||function(object){return object};var titleElementHTML="string"==typeof title?'<div class="alert-dialog-title"></div>':"",dialogElement=util.createElement("\n  <ons-alert-dialog>\n    "+titleElementHTML+'\n    <div class="alert-dialog-content"></div>\n    <div class="alert-dialog-footer"></div>\n  </ons-alert-dialog>'),titleElement=dialogElement.querySelector(".alert-dialog-title"),messageElement=dialogElement.querySelector(".alert-dialog-content"),footerElement=dialogElement.querySelector(".alert-dialog-footer"),inputElement=void 0;"string"==typeof title&&(titleElement.textContent=title),titleElement=null,dialogElement.setAttribute("animation",animation),messageIsHTML?messageElement.innerHTML=message:messageElement.textContent=message,promptDialog&&(inputElement=util.createElement('<input class="text-input" type="text"></input>'),modifier&&inputElement.classList.add("text-input--"+modifier),inputElement.setAttribute("placeholder",placeholder),inputElement.value=defaultValue,inputElement.style.width="100%",inputElement.style.marginTop="10px",messageElement.appendChild(inputElement),submitOnEnter&&inputElement.addEventListener("keypress",function(event){13===event.keyCode&&dialogElement.hide({callback:function(){_callback(inputElement.value),dialogElement.destroy(),dialogElement=null}})},!1)),document.body.appendChild(dialogElement),compile(dialogElement),buttonLabels.length<=2&&footerElement.classList.add("alert-dialog-footer--one");for(var createButton=function(i){var buttonElement=util.createElement('<button class="alert-dialog-button"></button>');buttonElement.textContent=buttonLabels[i],i==primaryButtonIndex&&buttonElement.classList.add("alert-dialog-button--primal"),buttonLabels.length<=2&&buttonElement.classList.add("alert-dialog-button--one");var onClick=function onClick(){buttonElement.removeEventListener("click",onClick,!1),dialogElement.hide({callback:function(){_callback(promptDialog?inputElement.value:i),dialogElement.destroy(),dialogElement=inputElement=buttonElement=null}})};buttonElement.addEventListener("click",onClick,!1),footerElement.appendChild(buttonElement)},i=0;i<buttonLabels.length;i++)createButton(i);return cancelable&&(dialogElement.setCancelable(cancelable),dialogElement.addEventListener("cancel",function(){_callback(promptDialog?null:-1),setTimeout(function(){dialogElement.destroy(),dialogElement=null,inputElement=null})},!1)),dialogElement.show({callback:function(){inputElement&&promptDialog&&autofocus&&inputElement.focus()}}),messageElement=footerElement=null,modifier&&dialogElement.setAttribute("modifier",modifier),Promise.resolve(dialogElement)},notification._alertOriginal=function(options){var defaults={buttonLabel:"OK",animation:"default",title:"Alert",callback:function(){}};if(options=util.extend({},defaults,options),!options.message&&!options.messageHTML)throw new Error("Alert dialog must contain a message.");return notification._createAlertDialog(options.title,options.message||options.messageHTML,[options.buttonLabel],0,options.modifier,options.animation,options.callback,options.message?!1:!0,!1,!1,!1,"","",!1,options.compile)},notification.alert=notification._alertOriginal,notification._confirmOriginal=function(options){var defaults={buttonLabels:["Cancel","OK"],primaryButtonIndex:1,animation:"default",title:"Confirm",callback:function(){},cancelable:!1};if(options=util.extend({},defaults,options),!options.message&&!options.messageHTML)throw new Error("Confirm dialog must contain a message.");return notification._createAlertDialog(options.title,options.message||options.messageHTML,options.buttonLabels,options.primaryButtonIndex,options.modifier,options.animation,options.callback,options.message?!1:!0,options.cancelable,!1,!1,"","",!1,options.compile)},notification.confirm=notification._confirmOriginal,notification._promptOriginal=function(options){var defaults={buttonLabel:"OK",animation:"default",title:"Alert",defaultValue:"",placeholder:"",callback:function(){},cancelable:!1,autofocus:!0,submitOnEnter:!0};if(options=util.extend({},defaults,options),!options.message&&!options.messageHTML)throw new Error("Prompt dialog must contain a message.");return notification._createAlertDialog(options.title,options.message||options.messageHTML,[options.buttonLabel],0,options.modifier,options.animation,options.callback,options.message?!1:!0,options.cancelable,!0,options.autofocus,options.placeholder,options.defaultValue,options.submitOnEnter,options.compile)},notification.prompt=notification._promptOriginal;var BaseElement=function(){if("function"!=typeof HTMLElement){var BaseElement=function(){};return BaseElement.prototype=document.createElement("div"),BaseElement}return HTMLElement}(),AlertDialogAnimator=function(){function AlertDialogAnimator(){var _ref=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref$timing=_ref.timing,timing=void 0===_ref$timing?"linear":_ref$timing,_ref$delay=_ref.delay,delay=void 0===_ref$delay?0:_ref$delay,_ref$duration=_ref.duration,duration=void 0===_ref$duration?.2:_ref$duration;babelHelpers.classCallCheck(this,AlertDialogAnimator),this.timing=timing,this.delay=delay,this.duration=duration}return babelHelpers.createClass(AlertDialogAnimator,[{key:"show",value:function(dialog,done){done()}},{key:"hide",value:function(dialog,done){done()}}]),AlertDialogAnimator}(),AndroidAlertDialogAnimator=function(_AlertDialogAnimator){function AndroidAlertDialogAnimator(){var _ref2=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref2$timing=_ref2.timing,timing=void 0===_ref2$timing?"cubic-bezier(.1, .7, .4, 1)":_ref2$timing,_ref2$duration=_ref2.duration,duration=void 0===_ref2$duration?.2:_ref2$duration,_ref2$delay=_ref2.delay,delay=void 0===_ref2$delay?0:_ref2$delay;return babelHelpers.classCallCheck(this,AndroidAlertDialogAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AndroidAlertDialogAnimator).call(this,{duration:duration,timing:timing,delay:delay}))}return babelHelpers.inherits(AndroidAlertDialogAnimator,_AlertDialogAnimator),babelHelpers.createClass(AndroidAlertDialogAnimator,[{key:"show",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:0}).wait(this.delay).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)",opacity:0},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}},{key:"hide",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)",opacity:0},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}}]),AndroidAlertDialogAnimator}(AlertDialogAnimator),IOSAlertDialogAnimator=function(_AlertDialogAnimator2){function IOSAlertDialogAnimator(){var _ref3=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref3$timing=_ref3.timing,timing=void 0===_ref3$timing?"cubic-bezier(.1, .7, .4, 1)":_ref3$timing,_ref3$duration=_ref3.duration,duration=void 0===_ref3$duration?.2:_ref3$duration,_ref3$delay=_ref3.delay,delay=void 0===_ref3$delay?0:_ref3$delay;return babelHelpers.classCallCheck(this,IOSAlertDialogAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(IOSAlertDialogAnimator).call(this,{duration:duration,timing:timing,delay:delay}))}return babelHelpers.inherits(IOSAlertDialogAnimator,_AlertDialogAnimator2),babelHelpers.createClass(IOSAlertDialogAnimator,[{key:"show",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:0}).wait(this.delay).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.3, 1.3, 1.0)",opacity:0},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}},{key:"hide",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{opacity:1},duration:0}).wait(this.delay).queue({css:{opacity:0},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}}]),IOSAlertDialogAnimator}(AlertDialogAnimator),scheme$20={".alert-dialog":"alert-dialog--*",".alert-dialog-container":"alert-dialog-container--*",".alert-dialog-title":"alert-dialog-title--*",".alert-dialog-content":"alert-dialog-content--*",".alert-dialog-footer":"alert-dialog-footer--*",".alert-dialog-button":"alert-dialog-button--*",".alert-dialog-footer--one":"alert-dialog-footer--one--*",".alert-dialog-button--one":"alert-dialog-button--one--*",".alert-dialog-button--primal":"alert-dialog-button--primal--*",".alert-dialog-mask":"alert-dialog-mask--*"},templateSource$2=util.createElement('\n  <div>\n    <div class="alert-dialog-mask"></div>\n    <div class="alert-dialog">\n      <div class="alert-dialog-container"></div>\n    </div>\n  </div>\n'),_animatorDict={"default":platform.isAndroid()?AndroidAlertDialogAnimator:IOSAlertDialogAnimator,fade:platform.isAndroid()?AndroidAlertDialogAnimator:IOSAlertDialogAnimator,none:AlertDialogAnimator},AlertDialogElement=function(_BaseElement){function AlertDialogElement(){return babelHelpers.classCallCheck(this,AlertDialogElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AlertDialogElement).apply(this,arguments))}return babelHelpers.inherits(AlertDialogElement,_BaseElement),babelHelpers.createClass(AlertDialogElement,[{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$20),this._animatorFactory=new AnimatorFactory({animators:_animatorDict,baseClass:AlertDialogAnimator,baseClassName:"AlertDialogAnimator",defaultAnimation:this.getAttribute("animation")}),this._visible=!1,this._doorLock=new DoorLock,this._boundCancel=this._cancel.bind(this)}},{key:"_compile",value:function(){var style=this.getAttribute("style");this.style.display="none";var template=templateSource$2.cloneNode(!0),alertDialog=template.children[1];for(style&&alertDialog.setAttribute("style",style);this.firstChild;)alertDialog.children[0].appendChild(this.firstChild);for(;template.firstChild;)this.appendChild(template.firstChild);this._dialog.style.zIndex=20001,this._mask.style.zIndex=2e4,this.getAttribute("mask-color")&&(this._mask.style.backgroundColor=this.getAttribute("mask-color"))}},{key:"setDisabled",value:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?this.setAttribute("disabled",""):this.removeAttribute("disabled")}},{key:"isDisabled",value:function(){return this.hasAttribute("disabled")}},{key:"setCancelable",value:function(cancelable){if("boolean"!=typeof cancelable)throw new Error("Argument must be a boolean.");cancelable?this.setAttribute("cancelable",""):this.removeAttribute("cancelable")}},{key:"show",value:function(){var _this2=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_cancel2=!1,callback=options.callback||function(){};options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options"))),util.triggerElementEvent(this,"preshow",{alertDialog:this,cancel:function(){_cancel2=!0}}),_cancel2||this._doorLock.waitUnlock(function(){var unlock=_this2._doorLock.lock();_this2._mask.style.display="block",_this2._mask.style.opacity=1,_this2.style.display="block";var animator=_this2._animatorFactory.newAnimator(options);animator.show(_this2,function(){_this2._visible=!0,unlock(),util.triggerElementEvent(_this2,"postshow",{alertDialog:_this2}),callback()})})}},{key:"hide",value:function(){var _this3=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_cancel3=!1,callback=options.callback||function(){};util.triggerElementEvent(this,"prehide",{alertDialog:this,cancel:function(){_cancel3=!0}}),_cancel3||this._doorLock.waitUnlock(function(){var unlock=_this3._doorLock.lock(),animator=_this3._animatorFactory.newAnimator(options);animator.hide(_this3,function(){_this3.style.display="none",_this3._mask.style.display="none",_this3._visible=!1,unlock(),util.triggerElementEvent(_this3,"posthide",{alertDialog:_this3}),callback()})})}},{key:"isShown",value:function(){return this._visible}},{key:"destroy",value:function(){this.parentElement&&this.parentElement.removeChild(this)}},{key:"isCancelable",value:function(){return this.hasAttribute("cancelable")}},{key:"_onDeviceBackButton",value:function(event){this.isCancelable()?this._cancel():event.callParentHandler()}},{key:"_cancel",value:function(){var _this4=this;this.isCancelable()&&this.hide({callback:function(){util.triggerElementEvent(_this4,"cancel")}})}},{key:"attachedCallback",value:function(){this._deviceBackButtonHandler=deviceBackButtonDispatcher.createHandler(this,this._onDeviceBackButton.bind(this)),this._mask.addEventListener("click",this._boundCancel,!1)}},{key:"detachedCallback",value:function(){this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=null,this._mask.removeEventListener("click",this._boundCancel.bind(this),!1)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$20):void 0}},{key:"_mask",get:function(){return util.findChild(this,".alert-dialog-mask")}},{key:"_dialog",get:function(){return util.findChild(this,".alert-dialog")}},{key:"_titleElement",get:function(){return util.findChild(this._dialog.children[0],".alert-dialog-title")}},{key:"_contentElement",get:function(){return util.findChild(this._dialog.children[0],".alert-dialog-content")}}]),AlertDialogElement}(BaseElement),OnsAlertDialogElement=window.OnsAlertDialogElement=document.registerElement("ons-alert-dialog",{prototype:AlertDialogElement.prototype});OnsAlertDialogElement.registerAnimator=function(name,Animator){if(!(Animator.prototype instanceof AlertDialogAnimator))throw new Error('"Animator" param must inherit OnsAlertDialogElement.AlertDialogAnimator');_animatorDict[name]=Animator},OnsAlertDialogElement.AlertDialogAnimator=AlertDialogAnimator;var scheme={"":"back-button--*",".back-button__icon":"back-button--*__icon",".back-button__label":"back-button--*__label"},BackButtonElement=function(_BaseElement){function BackButtonElement(){return babelHelpers.classCallCheck(this,BackButtonElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BackButtonElement).apply(this,arguments))}return babelHelpers.inherits(BackButtonElement,_BaseElement),babelHelpers.createClass(BackButtonElement,[{key:"createdCallback",value:function(){this._options={},this._compile(),this._boundOnClick=this._onClick.bind(this),ModifierUtil.initModifier(this,scheme)}},{key:"_compile",value:function(){this.classList.add("back-button");var label=util.createElement('\n      <span class="back-button__label">'+this.innerHTML+"</span>\n    ");this.innerHTML="";var icon=util.createElement('\n      <span class="back-button__icon"></span>\n    ');this.appendChild(icon),this.appendChild(label)}},{key:"_onClick",value:function(){var navigator=util.findParent(this,"ons-navigator");navigator&&(this.options.cancelIfRunning=!0,this.hasAttribute("animation")&&(this.options.animation=this.getAttribute("animation")),this.hasAttribute("animation-options")&&(this.options.animationOptions=util.animationOptionsParse(this.getAttribute("animation-options"))),this.hasAttribute("on-transition-end")&&(this.options.onTransitionEnd=window.eval("("+this.getAttribute("on-transition-end")+")")),this.hasAttribute("refresh")&&(this.options.refresh="true"===this.getAttribute("refresh")),navigator.popPage(this.options))}},{key:"attachedCallback",value:function(){this.addEventListener("click",this._boundOnClick,!1)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme):void 0}},{key:"detachedCallback",value:function(){this.removeEventListener("click",this._boundOnClick,!1)}},{key:"show",value:function(){this.style.display="inline-block"}},{key:"hide",value:function(){this.style.display="none"}},{key:"options",get:function(){return this._options},set:function(object){this._options=object}}]),BackButtonElement}(BaseElement);window.OnsBackButtonElement=document.registerElement("ons-back-button",{prototype:BackButtonElement.prototype});var scheme$1={"":"bottom-bar--*"},BottomToolbarElement=function(_BaseElement){function BottomToolbarElement(){return babelHelpers.classCallCheck(this,BottomToolbarElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BottomToolbarElement).apply(this,arguments))}return babelHelpers.inherits(BottomToolbarElement,_BaseElement),babelHelpers.createClass(BottomToolbarElement,[{key:"createdCallback",value:function(){this.classList.add("bottom-bar"),this.style.zIndex="0",this._update(),ModifierUtil.initModifier(this,scheme$1)}},{key:"attributeChangedCallback",value:function(name,last,current){if("inline"===name)this._update();else if("modifier"===name)return ModifierUtil.onModifierChanged(last,current,this,scheme$1)}},{key:"_update",value:function(){var inline="string"==typeof this.getAttribute("inline");this.style.position=inline?"static":"absolute"}}]),BottomToolbarElement}(BaseElement);window.OnsBottomToolbarElement=document.registerElement("ons-bottom-toolbar",{prototype:BottomToolbarElement.prototype});var scheme$2={"":"button--*"},ButtonElement=function(_BaseElement){function ButtonElement(){return babelHelpers.classCallCheck(this,ButtonElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ButtonElement).apply(this,arguments))}return babelHelpers.inherits(ButtonElement,_BaseElement),babelHelpers.createClass(ButtonElement,[{key:"createdCallback",value:function(){this.classList.add("button"),ModifierUtil.initModifier(this,scheme$2)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$2):void 0}}]),ButtonElement}(BaseElement);window.OnsButtonElement=document.registerElement("ons-button",{prototype:ButtonElement.prototype});var scheme$3={"":"carousel-item--*"},CarouselItemElement=function(_BaseElement){function CarouselItemElement(){return babelHelpers.classCallCheck(this,CarouselItemElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(CarouselItemElement).apply(this,arguments))}return babelHelpers.inherits(CarouselItemElement,_BaseElement),babelHelpers.createClass(CarouselItemElement,[{key:"createdCallback",value:function(){this.style.width="100%",ModifierUtil.initModifier(this,scheme$3)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$3):void 0}}]),CarouselItemElement}(BaseElement);window.OnsCarouselItemElement=document.registerElement("ons-carousel-item",{prototype:CarouselItemElement.prototype});var scheme$4={"":"carousel--*"},VerticalModeTrait={_getScrollDelta:function(event){return event.gesture.deltaY},_getScrollVelocity:function(event){return event.gesture.velocityY},_getElementSize:function(){return this._currentElementSize||(this._currentElementSize=this.getBoundingClientRect().height),this._currentElementSize},_generateScrollTransform:function(scroll){return"translate3d(0px, "+-scroll+"px, 0px)"},_layoutCarouselItems:function(){for(var children=this._getCarouselItemElements(),sizeAttr=this._getCarouselItemSizeAttr(),sizeInfo=this._decomposeSizeString(sizeAttr),computedStyle=window.getComputedStyle(this),totalWidth=this.getBoundingClientRect().width||0,finalWidth=totalWidth-parseInt(computedStyle.paddingLeft,10)-parseInt(computedStyle.paddingRight,10),i=0;i<children.length;i++)children[i].style.position="absolute",children[i].style.height=sizeAttr,children[i].style.width=finalWidth+"px",children[i].style.visibility="visible",children[i].style.top=i*sizeInfo.number+sizeInfo.unit}},HorizontalModeTrait={_getScrollDelta:function(event){return event.gesture.deltaX},_getScrollVelocity:function(event){return event.gesture.velocityX},_getElementSize:function(){return this._currentElementSize||(this._currentElementSize=this.getBoundingClientRect().width),this._currentElementSize},_generateScrollTransform:function(scroll){return"translate3d("+-scroll+"px, 0px, 0px)"},_layoutCarouselItems:function(){for(var children=this._getCarouselItemElements(),sizeAttr=this._getCarouselItemSizeAttr(),sizeInfo=this._decomposeSizeString(sizeAttr),computedStyle=window.getComputedStyle(this),totalHeight=this.getBoundingClientRect().height||0,finalHeight=totalHeight-parseInt(computedStyle.paddingTop,10)-parseInt(computedStyle.paddingBottom,10),i=0;i<children.length;i++)children[i].style.position="absolute",children[i].style.height=finalHeight+"px",children[i].style.width=sizeAttr,children[i].style.visibility="visible",children[i].style.left=i*sizeInfo.number+sizeInfo.unit}},CarouselElement=function(_BaseElement){function CarouselElement(){return babelHelpers.classCallCheck(this,CarouselElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(CarouselElement).apply(this,arguments))}return babelHelpers.inherits(CarouselElement,_BaseElement),babelHelpers.createClass(CarouselElement,[{key:"createdCallback",value:function(){ModifierUtil.initModifier(this,scheme$4),this._doorLock=new DoorLock,this._scroll=0,this._lastActiveIndex=0,this._boundOnDrag=this._onDrag.bind(this),this._boundOnDragEnd=this._onDragEnd.bind(this),this._boundOnResize=this._onResize.bind(this),this._mixin(this._isVertical()?VerticalModeTrait:HorizontalModeTrait),this._layoutCarouselItems(),this._setupInitialIndex(),this._saveLastState()}},{key:"_onResize",value:function(){this.refresh()}},{key:"_onDirectionChange",value:function(){this._isVertical()?(this.style.overflowX="auto",this.style.overflowY=""):(this.style.overflowX="",this.style.overflowY="auto"),this.refresh()}},{key:"_saveLastState",value:function(){this._lastState={elementSize:this._getCarouselItemSize(),carouselElementCount:this.getCarouselItemCount(),width:this._getCarouselItemSize()*this.getCarouselItemCount()}}},{key:"_getCarouselItemSize",value:function(){var sizeAttr=this._getCarouselItemSizeAttr(),sizeInfo=this._decomposeSizeString(sizeAttr),elementSize=this._getElementSize();if("%"===sizeInfo.unit)return Math.round(sizeInfo.number/100*elementSize);if("px"===sizeInfo.unit)return sizeInfo.number;throw new Error("Invalid state")}},{key:"_getInitialIndex",value:function(){var index=parseInt(this.getAttribute("initial-index"),10);return"number"!=typeof index||isNaN(index)?0:Math.max(Math.min(index,this.getCarouselItemCount()-1),0)}},{key:"_getCarouselItemSizeAttr",value:function(){var attrName="item-"+(this._isVertical()?"height":"width"),itemSizeAttr=(""+this.getAttribute(attrName)).trim();return itemSizeAttr.match(/^\d+(px|%)$/)?itemSizeAttr:"100%"}},{key:"_decomposeSizeString",value:function(size){var matches=size.match(/^(\d+)(px|%)/);return{number:parseInt(matches[1],10),unit:matches[2]}}},{key:"_setupInitialIndex",value:function(){this._scroll=this._getCarouselItemSize()*this._getInitialIndex(),this._lastActiveIndex=this._getInitialIndex(),this._scrollTo(this._scroll)}},{key:"setSwipeable",value:function(swipeable){swipeable?this.setAttribute("swipeable",""):this.removeAttribute("swipeable")}},{key:"isSwipeable",value:function(){return this.hasAttribute("swipeable")}},{key:"setAutoScrollRatio",value:function(ratio){if(0>ratio||ratio>1)throw new Error("Invalid ratio.");this.setAttribute("auto-scroll-ratio",ratio)}},{key:"getAutoScrollRatio",value:function(){var attr=this.getAttribute("auto-scroll-ratio");if(!attr)return.5;var scrollRatio=parseFloat(attr);if(0>scrollRatio||scrollRatio>1)throw new Error("Invalid ratio.");return isNaN(scrollRatio)?.5:scrollRatio}},{key:"setActiveCarouselItemIndex",value:function(index){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];index=Math.max(0,Math.min(index,this.getCarouselItemCount()-1));var scroll=this._getCarouselItemSize()*index,max=this._calculateMaxScroll();this._scroll=Math.max(0,Math.min(max,scroll)),this._scrollTo(this._scroll,{animate:"none"!==options.animation,callback:options.callback}),this._tryFirePostChangeEvent()}},{key:"getActiveCarouselItemIndex",value:function(){var scroll=this._scroll,count=this.getCarouselItemCount(),size=this._getCarouselItemSize();if(0>scroll)return 0;var i=void 0;for(i=0;count>i;i++)if(scroll>=size*i&&size*(i+1)>scroll)return i;return i}},{key:"next",value:function(options){return this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex()+1,options)}},{key:"prev",value:function(options){return this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex()-1,options)}},{key:"setAutoScrollEnabled",value:function(enabled){enabled?this.setAttribute("auto-scroll",""):this.removeAttribute("auto-scroll")}},{key:"isAutoScrollEnabled",value:function(){return this.hasAttribute("auto-scroll")}},{key:"setDisabled",value:function(disabled){disabled?this.setAttribute("disabled",""):this.removeAttribute("disabled")}},{key:"isDisabled",value:function(){return this.hasAttribute("disabled")}},{key:"setOverscrollable",value:function(scrollable){scrollable?this.setAttribute("overscrollable",""):this.removeAttribute("overscrollable")}},{key:"isOverscrollable",value:function(){return this.hasAttribute("overscrollable")}},{key:"_isEnabledChangeEvent",value:function(){var elementSize=this._getElementSize(),carouselItemSize=this._getCarouselItemSize();return this.isAutoScrollEnabled()&&elementSize===carouselItemSize}},{key:"_isVertical",value:function(){return"vertical"===this.getAttribute("direction")}},{key:"_prepareEventListeners",value:function(){this._gestureDetector=new GestureDetector(this,{dragMinDistance:1}),this._gestureDetector.on("drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown",this._boundOnDrag),this._gestureDetector.on("dragend",this._boundOnDragEnd),window.addEventListener("resize",this._boundOnResize,!0)}},{key:"_removeEventListeners",value:function(){this._gestureDetector.off("drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown",this._boundOnDrag),this._gestureDetector.off("dragend",this._boundOnDragEnd),this._gestureDetector.dispose(),window.removeEventListener("resize",this._boundOnResize,!0)}},{key:"_tryFirePostChangeEvent",value:function(){var currentIndex=this.getActiveCarouselItemIndex();if(this._lastActiveIndex!==currentIndex){var lastActiveIndex=this._lastActiveIndex;this._lastActiveIndex=currentIndex,util.triggerElementEvent(this,"postchange",{carousel:this,activeIndex:currentIndex,lastActiveIndex:lastActiveIndex})}}},{key:"_onDrag",value:function(event){if(this.isSwipeable()){var direction=event.gesture.direction;if((!this._isVertical()||"left"!==direction&&"right"!==direction)&&(this._isVertical()||"up"!==direction&&"down"!==direction)){event.stopPropagation(),this._lastDragEvent=event;var scroll=this._scroll-this._getScrollDelta(event);this._scrollTo(scroll),event.gesture.preventDefault(),this._tryFirePostChangeEvent()}}}},{key:"_onDragEnd",value:function(event){var _this2=this;if(this._currentElementSize=void 0,this.isSwipeable()){if(this._scroll=this._scroll-this._getScrollDelta(event),0!==this._getScrollDelta(event)&&event.stopPropagation(),this._isOverScroll(this._scroll)){var waitForAction=!1;util.triggerElementEvent(this,"overscroll",{carousel:this,activeIndex:this.getActiveCarouselItemIndex(),direction:this._getOverScrollDirection(),waitToReturn:function(promise){waitForAction=!0,promise.then(function(){return _this2._scrollToKillOverScroll()})}}),waitForAction||this._scrollToKillOverScroll()}else this._startMomentumScroll();this._lastDragEvent=null,event.gesture.preventDefault()}}},{key:"_mixin",value:function(trait){Object.keys(trait).forEach(function(key){this[key]=trait[key]}.bind(this))}},{key:"_startMomentumScroll",value:function(){if(this._lastDragEvent){var velocity=this._getScrollVelocity(this._lastDragEvent),duration=.3,scrollDelta=100*duration*velocity,scroll=this._normalizeScrollPosition(this._scroll+(this._getScrollDelta(this._lastDragEvent)>0?-scrollDelta:scrollDelta));

this._scroll=scroll,animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(this._scroll)},{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){done(),this._tryFirePostChangeEvent()}.bind(this)).play()}}},{key:"_normalizeScrollPosition",value:function(scroll){var _this3=this,max=this._calculateMaxScroll();if(!this.isAutoScrollEnabled())return Math.max(0,Math.min(max,scroll));var _ret=function(){for(var arr=[],size=_this3._getCarouselItemSize(),nbrOfItems=_this3.getCarouselItemCount(),i=0;nbrOfItems>i;i++)max>=i*size&&arr.push(i*size);arr.push(max),arr.sort(function(left,right){return left=Math.abs(left-scroll),right=Math.abs(right-scroll),left-right}),arr=arr.filter(function(item,pos){return!pos||item!=arr[pos-1]});var lastScroll=_this3._lastActiveIndex*size,scrollRatio=Math.abs(scroll-lastScroll)/size;return scrollRatio<=_this3.getAutoScrollRatio()?{v:lastScroll}:scrollRatio>_this3.getAutoScrollRatio()&&1>scrollRatio&&arr[0]===lastScroll&&arr.length>1?{v:arr[1]}:{v:arr[0]}}();return"object"===("undefined"==typeof _ret?"undefined":babelHelpers["typeof"](_ret))?_ret.v:void 0}},{key:"_getCarouselItemElements",value:function(){return util.arrayFrom(this.children).filter(function(child){return"ons-carousel-item"===child.nodeName.toLowerCase()})}},{key:"_scrollTo",value:function(scroll){var _this4=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],isOverscrollable=this.isOverscrollable(),normalizeScroll=function(scroll){var ratio=.35;if(0>scroll)return isOverscrollable?Math.round(scroll*ratio):0;var maxScroll=_this4._calculateMaxScroll();return scroll>maxScroll?isOverscrollable?maxScroll+Math.round((scroll-maxScroll)*ratio):maxScroll:scroll};options.animate?animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(normalizeScroll(scroll))},{duration:.3,timing:"cubic-bezier(.1, .7, .1, 1)"}).play(options.callback):animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(normalizeScroll(scroll))}).play(options.callback)}},{key:"_calculateMaxScroll",value:function(){var max=this.getCarouselItemCount()*this._getCarouselItemSize()-this._getElementSize();return Math.ceil(0>max?0:max)}},{key:"_isOverScroll",value:function(scroll){return 0>scroll||scroll>this._calculateMaxScroll()?!0:!1}},{key:"_getOverScrollDirection",value:function(){return this._isVertical()?this._scroll<=0?"up":"down":this._scroll<=0?"left":"right"}},{key:"_scrollToKillOverScroll",value:function(){var duration=.4;if(this._scroll<0)return animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(0)},{duration:duration,timing:"cubic-bezier(.1, .4, .1, 1)"}).queue(function(done){done(),this._tryFirePostChangeEvent()}.bind(this)).play(),void(this._scroll=0);var maxScroll=this._calculateMaxScroll();return maxScroll<this._scroll?(animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(maxScroll)},{duration:duration,timing:"cubic-bezier(.1, .4, .1, 1)"}).queue(function(done){done(),this._tryFirePostChangeEvent()}.bind(this)).play(),void(this._scroll=maxScroll)):void 0}},{key:"getCarouselItemCount",value:function(){return this._getCarouselItemElements().length}},{key:"refresh",value:function(){if(0!==this._getCarouselItemSize()){if(this._mixin(this._isVertical()?VerticalModeTrait:HorizontalModeTrait),this._layoutCarouselItems(),this._lastState&&this._lastState.width>0){var scroll=this._scroll;this._isOverScroll(scroll)?this._scrollToKillOverScroll():(this.isAutoScrollEnabled()&&(scroll=this._normalizeScrollPosition(scroll)),this._scrollTo(scroll))}this._saveLastState(),util.triggerElementEvent(this,"refresh",{carousel:this})}}},{key:"first",value:function(){this.setActiveCarouselItemIndex(0)}},{key:"last",value:function(){this.setActiveCarouselItemIndex(Math.max(this.getCarouselItemCount()-1,0))}},{key:"attachedCallback",value:function(){this._prepareEventListeners(),this._layoutCarouselItems(),this._setupInitialIndex(),this._saveLastState()}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$4):void("direction"===name&&this._onDirectionChange())}},{key:"detachedCallback",value:function(){this._removeEventListeners()}}]),CarouselElement}(BaseElement);window.OnsCarouselElement=document.registerElement("ons-carousel",{prototype:CarouselElement.prototype});var ColumnElement=function(_BaseElement){function ColumnElement(){return babelHelpers.classCallCheck(this,ColumnElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ColumnElement).apply(this,arguments))}return babelHelpers.inherits(ColumnElement,_BaseElement),babelHelpers.createClass(ColumnElement,[{key:"createdCallback",value:function(){this.getAttribute("width")&&this._updateWidth()}},{key:"attributeChangedCallback",value:function(name,last,current){"width"===name&&this._updateWidth()}},{key:"_updateWidth",value:function(){var width=this.getAttribute("width");"string"==typeof width&&(width=(""+width).trim(),width=width.match(/^\d+$/)?width+"%":width,this.style.webkitBoxFlex="0",this.style.webkitFlex="0 0 "+width,this.style.mozBoxFlex="0",this.style.mozFlex="0 0 "+width,this.style.msFlex="0 0 "+width,this.style.flex="0 0 "+width,this.style.maxWidth=width)}}]),ColumnElement}(BaseElement);window.OnsColElement=document.registerElement("ons-col",{prototype:ColumnElement.prototype});var DialogAnimator=function(){function DialogAnimator(){var _ref=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref$timing=_ref.timing,timing=void 0===_ref$timing?"linear":_ref$timing,_ref$delay=_ref.delay,delay=void 0===_ref$delay?0:_ref$delay,_ref$duration=_ref.duration,duration=void 0===_ref$duration?.2:_ref$duration;babelHelpers.classCallCheck(this,DialogAnimator),this.timing=timing,this.delay=delay,this.duration=duration}return babelHelpers.createClass(DialogAnimator,[{key:"show",value:function(dialog,done){done()}},{key:"hide",value:function(dialog,done){done()}}]),DialogAnimator}(),AndroidDialogAnimator=function(_DialogAnimator){function AndroidDialogAnimator(){var _ref2=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref2$timing=_ref2.timing,timing=void 0===_ref2$timing?"ease-in-out":_ref2$timing,_ref2$delay=_ref2.delay,delay=void 0===_ref2$delay?0:_ref2$delay,_ref2$duration=_ref2.duration,duration=void 0===_ref2$duration?.3:_ref2$duration;return babelHelpers.classCallCheck(this,AndroidDialogAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AndroidDialogAnimator).call(this,{timing:timing,delay:delay,duration:duration}))}return babelHelpers.inherits(AndroidDialogAnimator,_DialogAnimator),babelHelpers.createClass(AndroidDialogAnimator,[{key:"show",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:0}).wait(this.delay).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3d(-50%, -60%, 0)",opacity:0},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-50%, -50%, 0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}},{key:"hide",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3d(-50%, -50%, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-50%, -60%, 0)",opacity:0},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}}]),AndroidDialogAnimator}(DialogAnimator),IOSDialogAnimator=function(_DialogAnimator2){function IOSDialogAnimator(){var _ref3=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref3$timing=_ref3.timing,timing=void 0===_ref3$timing?"ease-in-out":_ref3$timing,_ref3$delay=_ref3.delay,delay=void 0===_ref3$delay?0:_ref3$delay,_ref3$duration=_ref3.duration,duration=void 0===_ref3$duration?.3:_ref3$duration;return babelHelpers.classCallCheck(this,IOSDialogAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(IOSDialogAnimator).call(this,{timing:timing,delay:delay,duration:duration}))}return babelHelpers.inherits(IOSDialogAnimator,_DialogAnimator2),babelHelpers.createClass(IOSDialogAnimator,[{key:"show",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:0}).wait(this.delay).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3d(-50%, 300%, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-50%, -50%, 0)"},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}},{key:"hide",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3d(-50%, -50%, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-50%, 300%, 0)"},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}}]),IOSDialogAnimator}(DialogAnimator),SlideDialogAnimator=function(_DialogAnimator3){function SlideDialogAnimator(){var _ref4=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref4$timing=_ref4.timing,timing=void 0===_ref4$timing?"cubic-bezier(.1, .7, .4, 1)":_ref4$timing,_ref4$delay=_ref4.delay,delay=void 0===_ref4$delay?0:_ref4$delay,_ref4$duration=_ref4.duration,duration=void 0===_ref4$duration?.2:_ref4$duration;return babelHelpers.classCallCheck(this,SlideDialogAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SlideDialogAnimator).call(this,{timing:timing,delay:delay,duration:duration}))}return babelHelpers.inherits(SlideDialogAnimator,_DialogAnimator3),babelHelpers.createClass(SlideDialogAnimator,[{key:"show",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:0}).wait(this.delay).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3D(-50%, -350%, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(-50%, -50%, 0)"},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}},{key:"hide",value:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask).queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog).saveStyle().queue({css:{transform:"translate3D(-50%, -50%, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(-50%, -350%, 0)"},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}}]),SlideDialogAnimator}(DialogAnimator),scheme$22={".dialog":"dialog--*",".dialog-container":"dialog-container--*",".dialog-mask":"dialog-mask--*"},templateSource$3=util.createElement('\n  <div>\n    <div class="dialog-mask"></div>\n    <div class="dialog">\n      <div class="dialog-container"></div>\n    </div>\n  </div>\n'),_animatorDict$3={"default":platform.isAndroid()?AndroidDialogAnimator:IOSDialogAnimator,fade:platform.isAndroid()?AndroidDialogAnimator:IOSDialogAnimator,slide:SlideDialogAnimator,none:DialogAnimator},DialogElement=function(_BaseElement){function DialogElement(){return babelHelpers.classCallCheck(this,DialogElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(DialogElement).apply(this,arguments))}return babelHelpers.inherits(DialogElement,_BaseElement),babelHelpers.createClass(DialogElement,[{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$22),this._visible=!1,this._doorLock=new DoorLock,this._boundCancel=this._cancel.bind(this),this._animatorFactory=new AnimatorFactory({animators:_animatorDict$3,baseClass:DialogAnimator,baseClassName:"DialogAnimator",defaultAnimation:this.getAttribute("animation")})}},{key:"_compile",value:function(){if(!util.findChild(this,".dialog")||!util.findChild(this,".dialog-mask")){var style=this.getAttribute("style");this.style.display="none";var template=templateSource$3.cloneNode(!0),dialog=template.children[1];for(style&&dialog.setAttribute("style",style);this.firstChild;)dialog.children[0].appendChild(this.firstChild);for(;template.firstChild;)this.appendChild(template.firstChild);this._dialog.style.zIndex=20001,this._mask.style.zIndex=2e4,this.setAttribute("no-status-bar-fill","")}}},{key:"getDeviceBackButtonHandler",value:function(){return this._deviceBackButtonHandler}},{key:"_onDeviceBackButton",value:function(event){this.isCancelable()?this._cancel():event.callParentHandler()}},{key:"_cancel",value:function(){var _this2=this;this.isCancelable()&&this.hide({callback:function(){util.triggerElementEvent(_this2,"cancel")}})}},{key:"show",value:function(){var _this3=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_cancel2=!1,callback=options.callback||function(){};util.triggerElementEvent(this,"preshow",{dialog:this,cancel:function(){_cancel2=!0}}),options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options"))),_cancel2||this._doorLock.waitUnlock(function(){var unlock=_this3._doorLock.lock();_this3.style.display="block",_this3._mask.style.opacity="1";var animator=_this3._animatorFactory.newAnimator(options);animator.show(_this3,function(){_this3._visible=!0,unlock(),util.triggerElementEvent(_this3,"postshow",{dialog:_this3}),callback()})})}},{key:"hide",value:function(){var _this4=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_cancel3=!1,callback=options.callback||function(){};util.triggerElementEvent(this,"prehide",{dialog:this,cancel:function(){_cancel3=!0}}),options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options"))),_cancel3||this._doorLock.waitUnlock(function(){var unlock=_this4._doorLock.lock(),animator=_this4._animatorFactory.newAnimator(options);animator.hide(_this4,function(){_this4.style.display="none",_this4._visible=!1,unlock(),util.triggerElementEvent(_this4,"posthide",{dialog:_this4}),callback()})})}},{key:"destroy",value:function(){this.parentElement&&this.parentElement.removeChild(this)}},{key:"isShown",value:function(){return this._visible}},{key:"isCancelable",value:function(){return this.hasAttribute("cancelable")}},{key:"setDisabled",value:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?this.setAttribute("disabled",""):this.removeAttribute("disabled")}},{key:"isDisabled",value:function(){return this.hasAttribute("disabled")}},{key:"setCancelable",value:function(cancelable){if("boolean"!=typeof cancelable)throw new Error("Argument must be a boolean.");cancelable?this.setAttribute("cancelable",""):this.removeAttribute("cancelable")}},{key:"attachedCallback",value:function(){this._deviceBackButtonHandler=ons$1._deviceBackButtonDispatcher.createHandler(this,this._onDeviceBackButton.bind(this)),this._mask.addEventListener("click",this._boundCancel,!1)}},{key:"detachedCallback",value:function(){this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=null,this._mask.removeEventListener("click",this._boundCancel.bind(this),!1)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$22):void 0}},{key:"_mask",get:function(){return util.findChild(this,".dialog-mask")}},{key:"_dialog",get:function(){return util.findChild(this,".dialog")}}]),DialogElement}(BaseElement),OnsDialogElement=window.OnsDialogElement=document.registerElement("ons-dialog",{prototype:DialogElement.prototype});OnsDialogElement.registerAnimator=function(name,Animator){if(!(Animator.prototype instanceof DialogAnimator))throw new Error('"Animator" param must inherit OnsDialogElement.DialogAnimator');_animatorDict$3[name]=Animator},OnsDialogElement.DialogAnimator=DialogAnimator;var scheme$5={"":"fab--*"},FabElement=function(_BaseElement){function FabElement(){return babelHelpers.classCallCheck(this,FabElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(FabElement).apply(this,arguments))}return babelHelpers.inherits(FabElement,_BaseElement),babelHelpers.createClass(FabElement,[{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$5),this.classList.add("fab"),this._updatePosition(),this.hide()}},{key:"_compile",value:function(){var content=document.createElement("span");content.classList.add("fab__icon");util.arrayFrom(this.childNodes).forEach(function(element){return content.appendChild(element)});this.insertBefore(content,this.firstChild)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$5):void("position"===name&&this._updatePosition())}},{key:"_show",value:function(){this.isInline()||this.show()}},{key:"_hide",value:function(){this.isInline()||this.hide()}},{key:"_updatePosition",value:function(){var position=this.getAttribute("position");switch(this.classList.remove("fab--top__left","fab--bottom__right","fab--bottom__left","fab--top__right","fab--top__center","fab--bottom__center"),position){case"top right":case"right top":this.classList.add("fab--top__right");break;case"top left":case"left top":this.classList.add("fab--top__left");break;case"bottom right":case"right bottom":this.classList.add("fab--bottom__right");break;case"bottom left":case"left bottom":this.classList.add("fab--bottom__left");break;case"center top":case"top center":this.classList.add("fab--top__center");break;case"center bottom":case"bottom center":this.classList.add("fab--bottom__center")}}},{key:"show",value:function(){arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.style.transform="scale(1)",this.style.webkitTransform="scale(1)"}},{key:"hide",value:function(){arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.style.transform="scale(0)",this.style.webkitTransform="scale(0)"}},{key:"setDisabled",value:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?this.setAttribute("disabled",""):this.removeAttribute("disabled")}},{key:"isDisabled",value:function(){return this.hasAttribute("disabled")}},{key:"isInline",value:function(){return this.hasAttribute("inline")}},{key:"isShown",value:function(){return"scale(1)"===this.style.transform&&"none"!==this.style.display}},{key:"toggle",value:function(){this.isShown()?this.hide():this.show()}}]),FabElement}(BaseElement);window.OnsFabElement=document.registerElement("ons-fab",{prototype:FabElement.prototype});var GestureDetectorElement=function(_BaseElement){function GestureDetectorElement(){return babelHelpers.classCallCheck(this,GestureDetectorElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(GestureDetectorElement).apply(this,arguments))}return babelHelpers.inherits(GestureDetectorElement,_BaseElement),babelHelpers.createClass(GestureDetectorElement,[{key:"createdCallback",value:function(){this._gestureDetector=new GestureDetector(this)}}]),GestureDetectorElement}(BaseElement);window.OnsGestureDetectorElement=document.registerElement("ons-gesture-detector",{prototype:GestureDetectorElement.prototype});var IconElement=function(_BaseElement){function IconElement(){return babelHelpers.classCallCheck(this,IconElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(IconElement).apply(this,arguments))}return babelHelpers.inherits(IconElement,_BaseElement),babelHelpers.createClass(IconElement,[{key:"createdCallback",value:function(){this._update()}},{key:"attributeChangedCallback",value:function(name,last,current){-1!==["icon","size"].indexOf(name)&&this._update()}},{key:"_update",value:function(){var _this2=this;this._cleanClassAttribute();var builded=this._buildClassAndStyle(this);for(var key in builded.style)builded.style.hasOwnProperty(key)&&(this.style[key]=builded.style[key]);builded.classList.forEach(function(className){return _this2.classList.add(className)})}},{key:"_cleanClassAttribute",value:function(){var classList=this.classList;Array.apply(null,this.classList).filter(function(klass){return"fa"===klass||0===klass.indexOf("fa-")||0===klass.indexOf("ion-")||0===klass.indexOf("zmdi-")}).forEach(function(className){classList.remove(className)}),classList.remove("zmdi"),classList.remove("ons-icon--ion")}},{key:"_buildClassAndStyle",value:function(){var classList=["ons-icon"],style={},iconName=this._iconName;0===iconName.indexOf("ion-")?(classList.push(iconName),classList.push("ons-icon--ion")):0===iconName.indexOf("fa-")?(classList.push(iconName),classList.push("fa")):0===iconName.indexOf("md-")?(classList.push("zmdi"),classList.push("zmdi-"+iconName.split(/\-(.+)?/)[1])):(classList.push("fa"),classList.push("fa-"+iconName));var size=""+this.getAttribute("size");return size.match(/^[1-5]x|lg$/)?(classList.push("fa-"+size),this.style.removeProperty("font-size")):style.fontSize=size,{classList:classList,style:style}}},{key:"_iconName",get:function(){return""+this.getAttribute("icon")}}]),IconElement}(BaseElement);window.OnsIconElement=document.registerElement("ons-icon",{prototype:IconElement.prototype});var InternalDelegate=function(_LazyRepeatDelegate){function InternalDelegate(userDelegate){var templateElement=arguments.length<=1||void 0===arguments[1]?null:arguments[1];babelHelpers.classCallCheck(this,InternalDelegate);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(InternalDelegate).call(this));if(_this._userDelegate=userDelegate,!(templateElement instanceof Element||null===templateElement))throw new Error("templateElemenet parameter must be an instance of Element or null.");return _this._templateElement=templateElement,_this}return babelHelpers.inherits(InternalDelegate,_LazyRepeatDelegate),babelHelpers.createClass(InternalDelegate,[{key:"prepareItem",value:function(index,done){var content=this._userDelegate.createItemContent(index,this._templateElement);if(!(content instanceof Element))throw new Error("createItemContent() must return an instance of Element.");done({element:content})}},{key:"countItems",value:function(){var count=this._userDelegate.countItems();if("number"!=typeof count)throw new Error("countItems() must return number.");return count}},{key:"updateItem",value:function(index,item){this._userDelegate.updateItemContent instanceof Function&&this._userDelegate.updateItemContent(index,item)}},{key:"calculateItemHeight",value:function(index){var height=this._userDelegate.calculateItemHeight(index);if("number"!=typeof height)throw new Error("calculateItemHeight() must return number.");return height}},{key:"destroyItem",value:function(index,item){this._userDelegate.destroyItem instanceof Function&&this._userDelegate.destroyItem(index,item)}},{key:"destroy",value:function(){this._userDelegate.destroy instanceof Function&&this._userDelegate.destroy()}}]),InternalDelegate}(LazyRepeatDelegate),LazyRepeatElement=function(_BaseElement){function LazyRepeatElement(){return babelHelpers.classCallCheck(this,LazyRepeatElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(LazyRepeatElement).apply(this,arguments))}return babelHelpers.inherits(LazyRepeatElement,_BaseElement),babelHelpers.createClass(LazyRepeatElement,[{key:"createdCallback",value:function(){this.style.display="none"}},{key:"attributeChangedCallback",value:function(name,last,current){}},{key:"attachedCallback",value:function(){if(this.hasAttribute("delegate")){var delegate=new InternalDelegate(this._getUserDelegate(),this._getTemplateElement());this._lazyRepeatProvider=new LazyRepeatProvider(this.parentElement,delegate)}}},{key:"_getTemplateElement",value:function(){return this.children[0]&&!this._templateElement&&(this._templateElement=this.removeChild(this.children[0])),this._templateElement||null}},{key:"_getUserDelegate",value:function(){var name=this.getAttribute("delegate")||this.getAttribute("ons-lazy-repeat");return window[name]?window[name]:null}},{key:"detachedCallback",value:function(){this._lazyRepeatProvider&&(this._lazyRepeatProvider.destroy(),this._lazyRepeatProvider=null)}},{key:"refresh",value:function(){this._lazyRepeatProvider&&this._lazyRepeatProvider.refresh()}},{key:"setDelegate",value:function(userDelegate){this._lazyRepeatProvider&&this._lazyRepeatProvider.destroy();var delegate=new InternalDelegate(userDelegate,this._getTemplateElement());this._lazyRepeatProvider=new LazyRepeatProvider(this.parentElement,delegate)}},{key:"delegate",set:function(userDelegate){this.setDelegate(userDelegate)}}]),LazyRepeatElement}(BaseElement);window.OnsLazyRepeatElement=document.registerElement("ons-lazy-repeat",{prototype:LazyRepeatElement.prototype});var scheme$6={"":"list__header--*"},ListHeaderElement=function(_BaseElement){function ListHeaderElement(){return babelHelpers.classCallCheck(this,ListHeaderElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ListHeaderElement).apply(this,arguments))}return babelHelpers.inherits(ListHeaderElement,_BaseElement),babelHelpers.createClass(ListHeaderElement,[{key:"createdCallback",value:function(){this.classList.add("list__header"),ModifierUtil.initModifier(this,scheme$6)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$6):void 0}}]),ListHeaderElement}(BaseElement);window.OnsListHeaderElement=document.registerElement("ons-list-header",{prototype:ListHeaderElement.prototype});var scheme$7={"":"list__item--*",".list__item__left":"list__item--*__left",".list__item__center":"list__item--*__center",".list__item__right":"list__item--*__right",".list__item__label":"list__item--*__label",".list__item__title":"list__item--*__title",".list__item__subtitle":"list__item--*__subtitle",".list__item__thumbnail":"list__item--*__thumbnail",".list__item__icon":"list__item--*__icon"},ListItemElement=function(_BaseElement){function ListItemElement(){return babelHelpers.classCallCheck(this,ListItemElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ListItemElement).apply(this,arguments))}return babelHelpers.inherits(ListItemElement,_BaseElement),babelHelpers.createClass(ListItemElement,[{key:"createdCallback",value:function(){this.classList.add("list__item"),ModifierUtil.initModifier(this,scheme$7),this._gestureDetector=new GestureDetector(this)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$7):void 0}},{key:"attachedCallback",value:function(){this.addEventListener("drag",this._onDrag),this.addEventListener("touchstart",this._onTouch),this.addEventListener("mousedown",this._onTouch),this.addEventListener("touchend",this._onRelease),this.addEventListener("touchmove",this._onRelease),this.addEventListener("touchcancel",this._onRelease),this.addEventListener("mouseup",this._onRelease),this._originalBackgroundColor=this.style.backgroundColor,this.tapped=!1}},{key:"detachedCallback",value:function(){this.removeEventListener("drag",this._onDrag),this.removeEventListener("touchstart",this._onTouch),this.removeEventListener("mousedown",this._onTouch),this.removeEventListener("touchend",this._onRelease),this.removeEventListener("touchmove",this._onRelease),this.removeEventListener("touchcancel",this._onRelease),this.removeEventListener("mouseup",this._onRelease)}},{key:"_onDrag",value:function(event){var gesture=event.gesture;this._shouldLockOnDrag()&&["left","right"].indexOf(gesture.direction)>-1&&gesture.preventDefault()}},{key:"_onTouch",value:function(){this.tapped||(this.tapped=!0,this.style.transition=this._transition,this.style.webkitTransition=this._transition,this.style.MozTransition=this._transition,this._tappable&&(this.style.backgroundColor&&(this._originalBackgroundColor=this.style.backgroundColor),this.style.backgroundColor=this._tapColor))}},{key:"_onRelease",value:function(){this.tapped=!1,this.style.transition="",this.style.webkitTransition="",this.style.MozTransition="",this.style.backgroundColor=this._originalBackgroundColor||""}},{key:"_shouldLockOnDrag",value:function(){return this.hasAttribute("lock-on-drag")}},{key:"_transition",get:function(){return"background-color 0.0s linear 0.15s"}},{key:"_tappable",get:function(){return this.hasAttribute("tappable")}},{key:"_tapColor",get:function(){return this.getAttribute("tappable")||"#d9d9d9"}}]),ListItemElement}(BaseElement);window.OnsListItemElement=document.registerElement("ons-list-item",{prototype:ListItemElement.prototype});var scheme$8={"":"list--*"},ListElement=function(_BaseElement){function ListElement(){return babelHelpers.classCallCheck(this,ListElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ListElement).apply(this,arguments))}return babelHelpers.inherits(ListElement,_BaseElement),babelHelpers.createClass(ListElement,[{key:"createdCallback",value:function(){this.classList.add("list"),ModifierUtil.initModifier(this,scheme$8)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$8):void 0}}]),ListElement}(BaseElement);window.OnsListElement=document.registerElement("ons-list",{prototype:ListElement.prototype});var scheme$9={".text-input":"text-input--*",".text-input__label":"text-input--*__label"},INPUT_ATTRIBUTES=["autocapitalize","autocomplete","autocorrect","autofocus","disabled","inputmode","max","maxlength","min","minlength","name","pattern","placeholder","readonly","size","step","type","validator","value"],MaterialInputElement=function(_BaseElement){function MaterialInputElement(){return babelHelpers.classCallCheck(this,MaterialInputElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(MaterialInputElement).apply(this,arguments))}return babelHelpers.inherits(MaterialInputElement,_BaseElement),babelHelpers.createClass(MaterialInputElement,[{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$9),this._updateLabel(),this._updateLabelColor(),this._updateBoundAttributes(),this._updateLabelClass(),this._boundOnInput=this._onInput.bind(this),this._boundOnFocusin=this._onFocusin.bind(this),this._boundOnFocusout=this._onFocusout.bind(this),this._boundDelegateEvent=this._delegateEvent.bind(this)}},{key:"_compile",value:function(){this._input||(this.appendChild(document.createElement("input")),this._input.classList.add("text-input"),this.appendChild(document.createElement("span")),this._label.classList.add("text-input__label"))}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$9):"label"===name?this._updateLabel():INPUT_ATTRIBUTES.indexOf(name)>=0?this._updateBoundAttributes():void 0}},{key:"attachedCallback",value:function(){this._input.addEventListener("input",this._boundOnInput),this._input.addEventListener("focusin",this._boundOnFocusin),this._input.addEventListener("focusout",this._boundOnFocusout),this._input.addEventListener("focus",this._boundDelegateEvent),this._input.addEventListener("blur",this._boundDelegateEvent)}},{key:"detachedCallback",value:function(){
this._input.removeEventListener("input",this._boundOnInput),this._input.removeEventListener("focusin",this._boundOnFocusin),this._input.removeEventListener("focusout",this._boundOnFocusout),this._input.addEventListener("focus",this._boundDelegateEvent),this._input.addEventListener("blur",this._boundDelegateEvent)}},{key:"_setLabel",value:function(value){"undefined"!=typeof this._label.textContent?this._label.textContent=value:this._label.innerText=value}},{key:"_updateLabel",value:function(){this._setLabel(this.hasAttribute("label")?this.getAttribute("label"):"")}},{key:"_updateBoundAttributes",value:function(){var _this2=this;INPUT_ATTRIBUTES.forEach(function(attr){_this2.hasAttribute(attr)?_this2._input.setAttribute(attr,_this2.getAttribute(attr)):_this2._input.removeAttribute(attr)})}},{key:"_updateLabelColor",value:function(){this._label.style.color=this.value.length>0&&this._input===document.activeElement?"":"rgba(0, 0, 0, 0.5)"}},{key:"_updateLabelClass",value:function(){""===this.value?this._label.classList.remove("text-input__label--active"):this._label.classList.add("text-input__label--active")}},{key:"_delegateEvent",value:function(event){var e=new CustomEvent(event.type,{bubbles:!1,cancelable:!0});return this.dispatchEvent(e)}},{key:"_onInput",value:function(event){this._updateLabelClass(),this._updateLabelColor()}},{key:"_onFocusin",value:function(event){this._updateLabelClass(),this._updateLabelColor()}},{key:"_onFocusout",value:function(event){this._updateLabelColor()}},{key:"_input",get:function(){return this.querySelector("input")}},{key:"_label",get:function(){return this.querySelector("span")}},{key:"value",get:function(){return this._input.value},set:function(val){return this._input.value=val,this._onInput(),this._input.val}}]),MaterialInputElement}(BaseElement);window.OnsInputElement=document.registerElement("ons-input",{prototype:MaterialInputElement.prototype});var ModalAnimator=function(){function ModalAnimator(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];babelHelpers.classCallCheck(this,ModalAnimator),this.delay=0,this.duration=.2,this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration,this.delay=void 0!==options.delay?options.delay:this.delay}return babelHelpers.createClass(ModalAnimator,[{key:"show",value:function(modal,callback){callback()}},{key:"hide",value:function(modal,callback){callback()}}]),ModalAnimator}(),FadeModalAnimator=function(_ModalAnimator){function FadeModalAnimator(options){return babelHelpers.classCallCheck(this,FadeModalAnimator),options.timing=options.timing||"linear",options.duration=options.duration||"0.3",options.delay=options.delay||0,babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(FadeModalAnimator).call(this,options))}return babelHelpers.inherits(FadeModalAnimator,_ModalAnimator),babelHelpers.createClass(FadeModalAnimator,[{key:"show",value:function(modal,callback){callback=callback?callback:function(){},animit(modal).queue({opacity:0}).wait(this.delay).queue({opacity:1},{duration:this.duration,timing:this.timing}).queue(function(done){callback(),done()}).play()}},{key:"hide",value:function(modal,callback){callback=callback?callback:function(){},animit(modal).queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}).queue(function(done){callback(),done()}).play()}}]),FadeModalAnimator}(ModalAnimator),scheme$21={"":"modal--*",modal__content:"modal--*__content"},_animatorDict$1={"default":ModalAnimator,fade:FadeModalAnimator,none:ModalAnimator},ModalElement=function(_BaseElement){function ModalElement(){return babelHelpers.classCallCheck(this,ModalElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ModalElement).apply(this,arguments))}return babelHelpers.inherits(ModalElement,_BaseElement),babelHelpers.createClass(ModalElement,[{key:"createdCallback",value:function(){this._doorLock=new DoorLock,this._animatorFactory=new AnimatorFactory({animators:_animatorDict$1,baseClass:ModalAnimator,baseClassName:"ModalAnimator",defaultAnimation:this.getAttribute("animation")}),this._compile(),ModifierUtil.initModifier(this,scheme$21)}},{key:"getDeviceBackButtonHandler",value:function(){return this._deviceBackButtonHandler}},{key:"setDeviceBackButtonHandler",value:function(callback){this._deviceBackButtonHandler&&this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=deviceBackButtonDispatcher.createHandler(this,callback),this._onDeviceBackButton=callback}},{key:"_onDeviceBackButton",value:function(){}},{key:"_compile",value:function(){this.style.display="none",this.classList.add("modal");var wrapper=document.createElement("div");for(wrapper.classList.add("modal__content");this.childNodes[0];){var node=this.childNodes[0];this.removeChild(node),wrapper.insertBefore(node,null)}this.appendChild(wrapper)}},{key:"detachedCallback",value:function(){this._deviceBackButtonHandler&&this._deviceBackButtonHandler.destroy()}},{key:"attachedCallback",value:function(){setImmediate(this._ensureNodePosition.bind(this)),this._deviceBackButtonHandler=deviceBackButtonDispatcher.createHandler(this,this._onDeviceBackButton.bind(this))}},{key:"_ensureNodePosition",value:function(){if(this.parentNode&&!this.hasAttribute("inline")&&"ons-page"!==this.parentNode.nodeName.toLowerCase()){for(var page=this;;){if(page=page.parentNode,!page)return;if("ons-page"===page.nodeName.toLowerCase())break}page._registerExtraElement(this)}}},{key:"isShown",value:function(){return"none"!==this.style.display}},{key:"show",value:function(){var _this2=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options")));var callback=options.callback||function(){};this._doorLock.waitUnlock(function(){var unlock=_this2._doorLock.lock(),animator=_this2._animatorFactory.newAnimator(options);_this2.style.display="table",animator.show(_this2,function(){unlock(),callback()})})}},{key:"toggle",value:function(){return this.isShown()?this.hide.apply(this,arguments):this.show.apply(this,arguments)}},{key:"hide",value:function(){var _this3=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options")));var callback=options.callback||function(){};this._doorLock.waitUnlock(function(){var unlock=_this3._doorLock.lock(),animator=_this3._animatorFactory.newAnimator(options);animator.hide(_this3,function(){_this3.style.display="none",unlock(),callback()})})}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$21):void 0}}]),ModalElement}(BaseElement);window.OnsModalElement=document.registerElement("ons-modal",{prototype:ModalElement.prototype}),window.OnsModalElement.registerAnimator=function(name,Animator){if(!(Animator.prototype instanceof ModalAnimator))throw new Error('"Animator" param must inherit OnsModalElement.ModalAnimator');_animatorDict$1[name]=Animator},window.OnsModalElement.ModalAnimator=ModalAnimator;var NavigatorTransitionAnimator=function(){function NavigatorTransitionAnimator(options){babelHelpers.classCallCheck(this,NavigatorTransitionAnimator),options=util.extend({timing:"linear",duration:"0.4",delay:"0"},options||{}),this.timing=options.timing,this.duration=options.duration,this.delay=options.delay}return babelHelpers.createClass(NavigatorTransitionAnimator,[{key:"push",value:function(enterPage,leavePage,callback){callback()}},{key:"pop",value:function(enterPage,leavePage,callback){callback()}}]),NavigatorTransitionAnimator}(),NoneNavigatorTransitionAnimator=function(_NavigatorTransitionA){function NoneNavigatorTransitionAnimator(options){return babelHelpers.classCallCheck(this,NoneNavigatorTransitionAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(NoneNavigatorTransitionAnimator).call(this,options))}return babelHelpers.inherits(NoneNavigatorTransitionAnimator,_NavigatorTransitionA),babelHelpers.createClass(NoneNavigatorTransitionAnimator,[{key:"push",value:function(enterPage,leavePage,callback){callback()}},{key:"pop",value:function(enterPage,leavePage,callback){callback()}}]),NoneNavigatorTransitionAnimator}(NavigatorTransitionAnimator),FadeNavigatorTransitionAnimator=function(_NavigatorTransitionA){function FadeNavigatorTransitionAnimator(options){return babelHelpers.classCallCheck(this,FadeNavigatorTransitionAnimator),options=util.extend({timing:"linear",duration:"0.4",delay:"0"},options||{}),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(FadeNavigatorTransitionAnimator).call(this,options))}return babelHelpers.inherits(FadeNavigatorTransitionAnimator,_NavigatorTransitionA),babelHelpers.createClass(FadeNavigatorTransitionAnimator,[{key:"push",value:function(enterPage,leavePage,callback){animit.runAll(animit([enterPage.element._getContentElement(),enterPage.element._getBackgroundElement()]).saveStyle().queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}),animit(enterPage.element._getToolbarElement()).saveStyle().queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle())}},{key:"pop",value:function(enterPage,leavePage,callback){animit.runAll(animit([leavePage.element._getContentElement(),leavePage.element._getBackgroundElement()]).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:this.duration,timing:this.timing}).queue(function(done){callback(),done()}),animit(leavePage.element._getToolbarElement()).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:this.duration,timing:this.timing}))}}]),FadeNavigatorTransitionAnimator}(NavigatorTransitionAnimator),LiftNavigatorTransitionAnimator=function(_NavigatorTransitionA){function LiftNavigatorTransitionAnimator(options){babelHelpers.classCallCheck(this,LiftNavigatorTransitionAnimator),options=util.extend({duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)",delay:0},options||{});var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(LiftNavigatorTransitionAnimator).call(this,options));return _this.backgroundMask=util.createElement('\n      <div style="position: absolute; width: 100%; height: 100%;\n        background-color: black;"></div>\n    '),_this}return babelHelpers.inherits(LiftNavigatorTransitionAnimator,_NavigatorTransitionA),babelHelpers.createClass(LiftNavigatorTransitionAnimator,[{key:"push",value:function(enterPage,leavePage,callback){var _this2=this;this.backgroundMask.remove(),leavePage.element.parentNode.insertBefore(this.backgroundMask,leavePage.element);var maskClear=animit(this.backgroundMask).wait(.6).queue(function(done){_this2.backgroundMask.remove(),done()});animit.runAll(maskClear,animit(enterPage.element).saveStyle().queue({css:{transform:"translate3D(0, 100%, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 0, 0)"},duration:this.duration,timing:this.timing}).wait(.2).restoreStyle().queue(function(done){callback(),done()}),animit(leavePage.element).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, -10%, 0)",opacity:.9},duration:this.duration,timing:this.timing}))}},{key:"pop",value:function(enterPage,leavePage,callback){var _this3=this;this.backgroundMask.remove(),enterPage.element.parentNode.insertBefore(this.backgroundMask,enterPage.element),animit.runAll(animit(this.backgroundMask).wait(.4).queue(function(done){_this3.backgroundMask.remove(),done()}),animit(enterPage.element).queue({css:{transform:"translate3D(0, -10%, 0)",opacity:.9},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:this.duration,timing:this.timing}).wait(.4).queue(function(done){callback(),done()}),animit(leavePage.element).queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 100%, 0)"},duration:this.duration,timing:this.timing}))}}]),LiftNavigatorTransitionAnimator}(NavigatorTransitionAnimator),SimpleSlideNavigatorTransitionAnimator=function(_NavigatorTransitionA){function SimpleSlideNavigatorTransitionAnimator(options){babelHelpers.classCallCheck(this,SimpleSlideNavigatorTransitionAnimator),options=util.extend({duration:.3,timing:"cubic-bezier(.1, .7, .4, 1)",delay:0},options||{});var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SimpleSlideNavigatorTransitionAnimator).call(this,options));return _this.backgroundMask=util.createElement('\n      <div style="position: absolute; width: 100%; height: 100%; z-index: 2;\n        background-color: black; opacity: 0;"></div>\n    '),_this.blackMaskOpacity=.4,_this}return babelHelpers.inherits(SimpleSlideNavigatorTransitionAnimator,_NavigatorTransitionA),babelHelpers.createClass(SimpleSlideNavigatorTransitionAnimator,[{key:"push",value:function(enterPage,leavePage,callback){var _this2=this;this.backgroundMask.remove(),leavePage.element.parentElement.insertBefore(this.backgroundMask,leavePage.element.nextSibling),animit.runAll(animit(this.backgroundMask).saveStyle().queue({opacity:0,transform:"translate3d(0, 0, 0)"}).wait(this.delay).queue({opacity:this.blackMaskOpacity},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){_this2.backgroundMask.remove(),done()}),animit(enterPage.element).saveStyle().queue({css:{transform:"translate3D(100%, 0, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0, 0, 0)"},duration:this.duration,timing:this.timing}).restoreStyle(),animit(leavePage.element).saveStyle().queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(-45%, 0px, 0px)"},duration:this.duration,timing:this.timing}).restoreStyle().wait(.2).queue(function(done){callback(),done()}))}},{key:"pop",value:function(enterPage,leavePage,done){var _this3=this;this.backgroundMask.remove(),enterPage.element.parentNode.insertBefore(this.backgroundMask,enterPage.element.nextSibling),animit.runAll(animit(this.backgroundMask).saveStyle().queue({opacity:this.blackMaskOpacity,transform:"translate3d(0, 0, 0)"}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){_this3.backgroundMask.remove(),done()}),animit(enterPage.element).saveStyle().queue({css:{transform:"translate3D(-45%, 0px, 0px)",opacity:.9},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0px, 0px, 0px)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit(leavePage.element).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:this.duration,timing:this.timing}).wait(.2).queue(function(finish){done(),finish()}))}}]),SimpleSlideNavigatorTransitionAnimator}(NavigatorTransitionAnimator),IOSSlideNavigatorTransitionAnimator=function(_NavigatorTransitionA){function IOSSlideNavigatorTransitionAnimator(options){babelHelpers.classCallCheck(this,IOSSlideNavigatorTransitionAnimator),options=util.extend({duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)",delay:0},options||{});var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(IOSSlideNavigatorTransitionAnimator).call(this,options));return _this.backgroundMask=util.createElement('\n      <div style="position: absolute; width: 100%; height: 100%;\n        background-color: black; opacity: 0;"></div>\n    '),_this}return babelHelpers.inherits(IOSSlideNavigatorTransitionAnimator,_NavigatorTransitionA),babelHelpers.createClass(IOSSlideNavigatorTransitionAnimator,[{key:"_decompose",value:function(page){CustomElements.upgrade(page.element);var toolbar=page.element._getToolbarElement();CustomElements.upgrade(toolbar);var left=toolbar._getToolbarLeftItemsElement(),right=toolbar._getToolbarRightItemsElement(),excludeBackButtonLabel=function(elements){for(var result=[],i=0;i<elements.length;i++)if("ons-back-button"===elements[i].nodeName.toLowerCase()){var iconElement=elements[i].querySelector(".back-button__icon");iconElement&&result.push(iconElement)}else result.push(elements[i]);return result},other=[].concat(0===left.children.length?left:excludeBackButtonLabel(left.children)).concat(0===right.children.length?right:excludeBackButtonLabel(right.children)),pageLabels=[toolbar._getToolbarCenterItemsElement(),toolbar._getToolbarBackButtonLabelElement()];return{pageLabels:pageLabels,other:other,content:page.element._getContentElement(),background:page.element._getBackgroundElement(),toolbar:toolbar,bottomToolbar:page.element._getBottomToolbarElement()}}},{key:"_shouldAnimateToolbar",value:function(enterPage,leavePage){var bothPageHasToolbar=enterPage.element._canAnimateToolbar()&&leavePage.element._canAnimateToolbar(),noMaterialToolbar=!enterPage.element._getToolbarElement().classList.contains("navigation-bar--material")&&!leavePage.element._getToolbarElement().classList.contains("navigation-bar--material");return bothPageHasToolbar&&noMaterialToolbar}},{key:"push",value:function(enterPage,leavePage,callback){var _this2=this;this.backgroundMask.remove(),leavePage.element.parentNode.insertBefore(this.backgroundMask,leavePage.element.nextSibling);var enterPageDecomposition=this._decompose(enterPage),leavePageDecomposition=this._decompose(leavePage),delta=function(){var rect=leavePage.element.getBoundingClientRect();return Math.round((rect.right-rect.left)/2*.6)}(),maskClear=animit(this.backgroundMask).saveStyle().queue({opacity:0,transform:"translate3d(0, 0, 0)"}).wait(this.delay).queue({opacity:.1},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){_this2.backgroundMask.remove(),done()}),shouldAnimateToolbar=this._shouldAnimateToolbar(enterPage,leavePage);shouldAnimateToolbar?(enterPage.element.style.zIndex="auto",leavePage.element.style.zIndex="auto",animit.runAll(maskClear,animit([enterPageDecomposition.content,enterPageDecomposition.bottomToolbar,enterPageDecomposition.background]).saveStyle().queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:this.duration,timing:this.timing}).restoreStyle(),animit(enterPageDecomposition.toolbar).saveStyle().queue({css:{background:"none",backgroundColor:"rgba(0, 0, 0, 0)",borderColor:"rgba(0, 0, 0, 0)"},duration:0}).wait(this.delay+.3).restoreStyle({duration:.1,transition:"background-color 0.1s linear, border-color 0.1s linear"}),animit(enterPageDecomposition.pageLabels).saveStyle().queue({css:{transform:"translate3d("+delta+"px, 0, 0)",opacity:0},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit(enterPageDecomposition.other).saveStyle().queue({css:{opacity:0},duration:0}).wait(this.delay).queue({css:{opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit([leavePageDecomposition.content,leavePageDecomposition.bottomToolbar,leavePageDecomposition.background]).saveStyle().queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(-25%, 0px, 0px)"},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){enterPage.element.style.zIndex="",leavePage.element.style.zIndex="",callback(),done()}),animit(leavePageDecomposition.pageLabels).saveStyle().queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(-"+delta+"px, 0, 0)",opacity:0},duration:this.duration,timing:this.timing}).restoreStyle(),animit(leavePageDecomposition.other).saveStyle().queue({css:{opacity:1},duration:0}).wait(this.delay).queue({css:{opacity:0},duration:this.duration,timing:this.timing}).restoreStyle())):(enterPage.element.style.zIndex="auto",leavePage.element.style.zIndex="auto",animit.runAll(maskClear,animit(enterPage.element).saveStyle().queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:this.duration,timing:this.timing}).restoreStyle(),animit(leavePage.element).saveStyle().queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(-25%, 0px, 0px)"},duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){enterPage.element.style.zIndex="",leavePage.element.style.zIndex="",callback(),done()})))}},{key:"pop",value:function(enterPage,leavePage,done){var _this3=this;this.backgroundMask.remove(),enterPage.element.parentNode.insertBefore(this.backgroundMask,enterPage.element.nextSibling);var enterPageDecomposition=this._decompose(enterPage),leavePageDecomposition=this._decompose(leavePage),delta=function(){var rect=leavePage.element.getBoundingClientRect();return Math.round((rect.right-rect.left)/2*.6)}(),maskClear=animit(this.backgroundMask).saveStyle().queue({opacity:.1,transform:"translate3d(0, 0, 0)"}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){_this3.backgroundMask.remove(),done()}),shouldAnimateToolbar=this._shouldAnimateToolbar(enterPage,leavePage);shouldAnimateToolbar?(enterPage.element.style.zIndex="auto",leavePage.element.style.zIndex="auto",animit.runAll(maskClear,animit([enterPageDecomposition.content,enterPageDecomposition.bottomToolbar,enterPageDecomposition.background]).saveStyle().queue({css:{transform:"translate3D(-25%, 0px, 0px)",opacity:.9},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0px, 0px, 0px)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit(enterPageDecomposition.pageLabels).saveStyle().queue({css:{transform:"translate3d(-"+delta+"px, 0, 0)",opacity:0},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit(enterPageDecomposition.toolbar).saveStyle().queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit(enterPageDecomposition.other).saveStyle().queue({css:{opacity:0},duration:0}).wait(this.delay).queue({css:{opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit([leavePageDecomposition.content,leavePageDecomposition.bottomToolbar,leavePageDecomposition.background]).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:this.duration,timing:this.timing}).wait(0).queue(function(finish){enterPage.element.style.zIndex="",leavePage.element.style.zIndex="",done(),finish()}),animit(leavePageDecomposition.other).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3d(0, 0, 0)",opacity:0},duration:this.duration,timing:this.timing}),animit(leavePageDecomposition.toolbar).queue({css:{background:"none",backgroundColor:"rgba(0, 0, 0, 0)",borderColor:"rgba(0, 0, 0, 0)"},duration:0}),animit(leavePageDecomposition.pageLabels).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).wait(this.delay).queue({css:{transform:"translate3d("+delta+"px, 0, 0)",opacity:0},duration:this.duration,timing:this.timing}))):(enterPage.element.style.zIndex="auto",leavePage.element.style.zIndex="auto",animit.runAll(maskClear,animit(enterPage.element).saveStyle().queue({css:{transform:"translate3D(-25%, 0px, 0px)",opacity:.9},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(0px, 0px, 0px)",opacity:1},duration:this.duration,timing:this.timing}).restoreStyle(),animit(leavePage.element).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:0}).wait(this.delay).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:this.duration,timing:this.timing}).queue(function(finish){enterPage.element.style.zIndex="",leavePage.element.style.zIndex="",done(),finish()})))}}]),IOSSlideNavigatorTransitionAnimator}(NavigatorTransitionAnimator),NavigatorPage=function(){function NavigatorPage(params){var _this=this;babelHelpers.classCallCheck(this,NavigatorPage),this.page=params.page,this.name=params.page,this.element=params.element,this.options=params.options,this.navigator=params.navigator,this.initialContent=params.initialContent,this.backButton=util.findChildRecursively(this.element,"ons-back-button"),this.backButton&&CustomElements.upgrade(this.backButton),this._blockEvents=function(event){(_this.navigator._isPopping||_this.navigator._isPushing)&&(event.preventDefault(),event.stopPropagation())},this._pointerEvents.forEach(function(event){return _this.element.addEventListener(event,_this._blockEvents)},!1)}return babelHelpers.createClass(NavigatorPage,[{key:"getDeviceBackButtonHandler",value:function(){return this._deviceBackButtonHandler}},{key:"getPageView",value:function(){if(!this._page&&(this._page=util.findParent("ons-page"),!this._page))throw new Error("Fail to fetch ons-page element.");return this._page}},{key:"updateBackButton",value:function(){this.backButton&&(1===this.navigator._pages.length||this.options._forceHideBackButton?(this.backButton.hide(),this.options._forceHideBackButton=!1):this.backButton.show())}},{key:"destroy",value:function(){var _this2=this;this._pointerEvents.forEach(function(event){return _this2.element.removeEventListener(event,_this2._blockEvents)},!1),this.element._destroy();var index=this.navigator._pages.indexOf(this);-1!==index&&this.navigator._pages.splice(index,1),this.element=this._page=this.options=this.navigator=null}},{key:"_pointerEvents",get:function(){return["touchmove"]}}]),NavigatorPage}(),_animatorDict$2={"default":platform.isAndroid()?SimpleSlideNavigatorTransitionAnimator:IOSSlideNavigatorTransitionAnimator,slide:platform.isAndroid()?SimpleSlideNavigatorTransitionAnimator:IOSSlideNavigatorTransitionAnimator,simpleslide:SimpleSlideNavigatorTransitionAnimator,lift:LiftNavigatorTransitionAnimator,fade:FadeNavigatorTransitionAnimator,none:NoneNavigatorTransitionAnimator},rewritables$2={ready:function(navigatorElement,callback){callback()},link:function(navigatorElement,target,options,callback){callback(target)}},NavigatorElement=function(_BaseElement){function NavigatorElement(){return babelHelpers.classCallCheck(this,NavigatorElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(NavigatorElement).apply(this,arguments))}return babelHelpers.inherits(NavigatorElement,_BaseElement),babelHelpers.createClass(NavigatorElement,[{key:"createdCallback",value:function(){this._doorLock=new DoorLock,this._pages=[],this._boundOnDeviceBackButton=this._onDeviceBackButton.bind(this),this._isPushing=this._isPopping=!1,this._initialHTML=this.innerHTML,this.innerHTML="",this._animatorFactory=new AnimatorFactory({animators:_animatorDict$2,baseClass:NavigatorTransitionAnimator,baseClassName:"NavigatorTransitionAnimator",defaultAnimation:this.getAttribute("animation")})}},{key:"canPopPage",value:function(){return this._pages.length>1}},{key:"replacePage",value:function(page){var _this2=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],onTransitionEnd=options.onTransitionEnd||function(){};return 1===this._pages.length&&(options._forceHideBackButton=!0),options.onTransitionEnd=function(){_this2._pages.length>1&&_this2._pages[_this2._pages.length-2].destroy(),onTransitionEnd()},this.pushPage(page,options)}},{key:"popPage",value:function(){var _this3=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];options.cancelIfRunning&&this._isPopping||(options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options"))),this._doorLock.waitUnlock(function(){if(_this3._pages.length<=1)throw new Error("ons-navigator's page stack is empty.");if(!_this3._emitPrePopEvent()){var unlock=_this3._doorLock.lock();options.refresh?!function(){var index=_this3._pages.length-2;if(!_this3._pages[index].page)throw new Error("Refresh option cannot be used with pages directly inside the Navigator. Use ons-template instead.");internal.getPageHTMLAsync(_this3._pages[index].page).then(function(templateHTML){var element=_this3._createPageElement(templateHTML),pageObject=_this3._createPageObject(_this3._pages[index].page,element,_this3._pages[index].options);rewritables$2.link(_this3,element,_this3._pages[index].options,function(element){_this3.insertBefore(element,_this3._pages[index]?_this3._pages[index].element:null),_this3._pages.splice(index,0,pageObject),_this3._pages[index+1].destroy(),_this3._popPage(options,unlock)})})}():_this3._popPage(options,unlock)}}))}},{key:"_popPage",value:function(options,unlock){var _this4=this;options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options")));var leavePage=this._pages.pop(),enterPage=this._pages[this._pages.length-1];enterPage.updateBackButton(),leavePage.element._hide(),enterPage&&(enterPage.element.style.display="block",enterPage.element._show());var eventDetail={leavePage:leavePage,enterPage:this._pages[this._pages.length-1],navigator:this},callback=function(){leavePage.destroy(),_this4._isPopping=!1,unlock();var event=util.triggerElementEvent(_this4,"postpop",eventDetail);event.leavePage=null,"function"==typeof options.onTransitionEnd&&options.onTransitionEnd()};this._isPopping=!0;var animator=this._animatorFactory.newAnimator(options,leavePage.options.animator);animator.pop(enterPage,leavePage,callback)}},{key:"insertPage",value:function(index,page){var _this5=this,options=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];if(options=options||{},options&&"object"!=("undefined"==typeof options?"undefined":babelHelpers["typeof"](options)))throw new Error("options must be an object. You supplied "+options);return index=this._normalizeIndex(index),index>=this._pages.length?this.pushPage.apply(this,[].slice.call(arguments,1)):void this._doorLock.waitUnlock(function(){var unlock=_this5._doorLock.lock();internal.getPageHTMLAsync(page).then(function(templateHTML){var element=_this5._createPageElement(templateHTML),pageObject=_this5._createPageObject(page,element,options);rewritables$2.link(_this5,element,options,function(element){element.style.display="none",_this5.insertBefore(element,_this5._pages[index].element),_this5._pages.splice(index,0,pageObject),_this5.getCurrentPage().updateBackButton(),setTimeout(function(){unlock(),element=null},1e3/60)})})})}},{key:"_normalizeIndex",value:function(index){return 0>index&&(index=Math.abs(this._pages.length+index)%this._pages.length),index}},{key:"getCurrentPage",value:function(){if(this._pages.length<=0)throw new Error("Invalid state");return this._pages[this._pages.length-1]}},{key:"_show",value:function(){this._pages[this._pages.length-1]&&this._pages[this._pages.length-1].element._show()}},{key:"_hide",value:function(){this._pages[this._pages.length-1]&&this._pages[this._pages.length-1].element._hide()}},{key:"_destroy",value:function(){for(var i=this._pages.length-1;i>=0;i--)this._pages[i].destroy();this.remove()}},{key:"_onDeviceBackButton",
value:function(event){this._pages.length>1?this.popPage():event.callParentHandler()}},{key:"resetToPage",value:function(page){var _this6=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];options.animator||options.animation||(options.animation="none");var onTransitionEnd=options.onTransitionEnd||function(){};options.onTransitionEnd=function(){for(;_this6._pages.length>1;)_this6._pages.shift().destroy();_this6._pages[0].updateBackButton(),onTransitionEnd()},(void 0===page||""===page)&&(this.hasAttribute("page")?page=this.getAttribute("page"):(options.pageHTML=this._initialHTML,page="")),this.pushPage(page,options)}},{key:"attributeChangedCallback",value:function(name,last,current){}},{key:"attachedCallback",value:function(){var _this7=this;this._deviceBackButtonHandler=deviceBackButtonDispatcher.createHandler(this,this._boundOnDeviceBackButton),rewritables$2.ready(this,function(){if(0===_this7._pages.length)if(_this7.getAttribute("page"))_this7.pushPage(_this7.getAttribute("page"),{animation:"none"});else{var element=_this7._createPageElement(_this7._initialHTML||"");_this7._pushPageDOM(_this7._createPageObject("",element,{}),function(){})}})}},{key:"detachedCallback",value:function(){this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=null}},{key:"pushPage",value:function(page){var _this8=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options"))),!options.cancelIfRunning||!this._isPushing){if(options&&"object"!=("undefined"==typeof options?"undefined":babelHelpers["typeof"](options)))throw new Error("options must be an object. You supplied "+options);this._emitPrePushEvent()||(this._isPushing=!0,this._doorLock.waitUnlock(function(){return _this8._pushPage(page,options)}))}}},{key:"_pushPage",value:function(page,options){var _this9=this,unlock=this._doorLock.lock(),done=function(){unlock()},run=function(templateHTML){var element=_this9._createPageElement(templateHTML);_this9._pushPageDOM(_this9._createPageObject(page,element,options),done)};options.pageHTML?run(options.pageHTML):internal.getPageHTMLAsync(page).then(run)}},{key:"_pushPageDOM",value:function(pageObject,unlock){var _this10=this;unlock=unlock||function(){};var element=pageObject.element,options=pageObject.options,eventDetail={enterPage:pageObject,leavePage:this._pages[this._pages.length-1],navigator:this};this._pages.push(pageObject),pageObject.updateBackButton();var done=function(){_this10._pages[_this10._pages.length-2]&&(_this10._pages[_this10._pages.length-2].element.style.display="none"),_this10._isPushing=!1,unlock(),util.triggerElementEvent(_this10,"postpush",eventDetail),"function"==typeof options.onTransitionEnd&&options.onTransitionEnd(),element=null};this._isPushing=!0,rewritables$2.link(this,element,options,function(element){CustomElements.upgrade(element),setTimeout(function(){if(_this10._pages.length>1){var leavePage=_this10._pages.slice(-2)[0],enterPage=_this10._pages.slice(-1)[0];_this10.appendChild(element),leavePage.element._hide(),enterPage.element._show(),options.animator.push(enterPage,leavePage,done)}else _this10.appendChild(element),element._show(),done()},1e3/60)})}},{key:"bringPageTop",value:function(item){var _this11=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(options&&"object"!=("undefined"==typeof options?"undefined":babelHelpers["typeof"](options)))throw new Error("options must be an object. You supplied "+options);if(!(options.cancelIfRunning&&this._isPushing||this._emitPrePushEvent())){var index=void 0,page=void 0;if("string"==typeof item)page=item,index=this._lastIndexOfPage(page);else{if("number"!=typeof item)throw new Error("First argument must be a page name or the index of an existing page. You supplied "+item);if(index=this._normalizeIndex(item),item>=this._pages.length)throw new Error("The provided index does not match an existing page.");page=this._pages[index].page}0>index?this._doorLock.waitUnlock(function(){return _this11._pushPage(page,options)}):index<this._pages.length-1&&this._doorLock.waitUnlock(function(){var unlock=_this11._doorLock.lock(),done=function(){unlock()},pageObject=_this11._pages.splice(index,1)[0];pageObject.element.style.display="block",pageObject.element.setAttribute("_skipinit",""),options.animation&&(options.animator=_this11._animatorFactory.newAnimator(options)),pageObject.options=util.extend(pageObject.options,options),_this11._pushPageDOM(pageObject,done)})}}},{key:"_lastIndexOfPage",value:function(page){var index=void 0;for(index=this._pages.length-1;index>=0&&this._pages[index].page!==page;index--);return index}},{key:"_emitPrePushEvent",value:function(){var isCanceled=!1;return util.triggerElementEvent(this,"prepush",{navigator:this,currentPage:this._pages.length>0?this.getCurrentPage():void 0,cancel:function(){isCanceled=!0}}),isCanceled}},{key:"_emitPrePopEvent",value:function(){var isCanceled=!1,leavePage=this.getCurrentPage();return util.triggerElementEvent(this,"prepop",{navigator:this,currentPage:leavePage,leavePage:leavePage,enterPage:this._pages[this._pages.length-2],cancel:function(){isCanceled=!0}}),isCanceled}},{key:"_createPageObject",value:function(page,element,options){return options.animator=this._animatorFactory.newAnimator(options),new NavigatorPage({page:page,element:element,options:options,navigator:this})}},{key:"_createPageElement",value:function(templateHTML){var pageElement=util.createElement(internal.normalizePageHTML(templateHTML));if("ons-page"!==pageElement.nodeName.toLowerCase())throw new Error('You must supply an "ons-page" element to "ons-navigator".');return pageElement}},{key:"pages",get:function(){return this._pages.slice(0)}}]),NavigatorElement}(BaseElement);window.OnsNavigatorElement=document.registerElement("ons-navigator",{prototype:NavigatorElement.prototype}),window.OnsNavigatorElement.registerAnimator=function(name,Animator){if(!(Animator.prototype instanceof NavigatorTransitionAnimator))throw new Error('"Animator" param must inherit OnsNavigatorElement.NavigatorTransitionAnimator');_animatorDict$2[name]=Animator},window.OnsNavigatorElement.rewritables=rewritables$2,window.OnsNavigatorElement.NavigatorTransitionAnimator=NavigatorTransitionAnimator;var scheme$10={"":"page--*",".page__content":"page--*__content",".page__background":"page--*__background"},nullToolbarElement=document.createElement("ons-toolbar"),PageElement=function(_BaseElement){function PageElement(){return babelHelpers.classCallCheck(this,PageElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(PageElement).apply(this,arguments))}return babelHelpers.inherits(PageElement,_BaseElement),babelHelpers.createClass(PageElement,[{key:"createdCallback",value:function(){this.classList.add("page"),this._compile(),ModifierUtil.initModifier(this,scheme$10),this._isShown=!1,this._isMuted=this.hasAttribute("_muted"),this._skipInit=this.hasAttribute("_skipinit"),this.eventDetail={page:this}}},{key:"attachedCallback",value:function(){this._isMuted||(this._skipInit?this.removeAttribute("_skipinit"):util.triggerElementEvent(this,"init",this.eventDetail)),util.hasAnyComponentAsParent(this)||this._show(),this._tryToFillStatusBar()}},{key:"getDeviceBackButtonHandler",value:function(){return this._deviceBackButtonHandler||null}},{key:"setDeviceBackButtonHandler",value:function(callback){this._deviceBackButtonHandler&&this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=ons$1._deviceBackButtonDispatcher.createHandler(this,callback)}},{key:"_getContentElement",value:function(){var result=util.findChild(this,".page__content");if(result)return result;throw Error('fail to get ".page__content" element.')}},{key:"_hasToolbarElement",value:function(){return!!util.findChild(this,"ons-toolbar")}},{key:"_canAnimateToolbar",value:function(){var toolbar=util.findChild(this,"ons-toolbar");if(toolbar)return!0;for(var elements=this._getContentElement().children,i=0;i<elements.length;i++)if("ons-toolbar"===elements[i].nodeName.toLowerCase()&&!elements[i].hasAttribute("inline"))return!0;return!1}},{key:"_getBackgroundElement",value:function(){var result=util.findChild(this,".page__background");if(result)return result;throw Error('fail to get ".page__background" element.')}},{key:"_getBottomToolbarElement",value:function(){return util.findChild(this,"ons-bottom-toolbar")||internal.nullElement}},{key:"_getToolbarElement",value:function(){return util.findChild(this,"ons-toolbar")||nullToolbarElement}},{key:"_registerToolbar",value:function(element){this._getContentElement().setAttribute("no-status-bar-fill",""),util.findChild(this,".page__status-bar-fill")?this.insertBefore(element,this.children[1]):this.insertBefore(element,this.children[0])}},{key:"_registerBottomToolbar",value:function(element){if(!util.findChild(this,".page__status-bar-fill")){var fill=document.createElement("div");fill.classList.add("page__bottom-bar-fill"),fill.style.width="0px",fill.style.height="0px",this.insertBefore(fill,this.children[0]),this.insertBefore(element,null)}}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$10):void("_muted"===name?this._isMuted=this.hasAttribute("_muted"):"_skipinit"===name&&(this._skipInit=this.hasAttribute("_skipinit")))}},{key:"_compile",value:function(){if(!util.findChild(this,".page__background")||!util.findChild(this,".page__content")){var background=document.createElement("div");background.classList.add("page__background");var content=document.createElement("div");for(content.classList.add("page__content");this.childNodes[0];)content.appendChild(this.childNodes[0]);this.hasAttribute("style")&&(background.setAttribute("style",this.getAttribute("style")),this.removeAttribute("style",null));var fragment=document.createDocumentFragment();fragment.appendChild(background),fragment.appendChild(content),this.appendChild(fragment)}}},{key:"_registerExtraElement",value:function(element){var extra=util.findChild(this,".page__extra");extra||(extra=document.createElement("div"),extra.classList.add("page__extra"),extra.style.zIndex="10001",this.insertBefore(extra,null)),extra.insertBefore(element,null)}},{key:"_tryToFillStatusBar",value:function(){var _this2=this;return internal.shouldFillStatusBar(this).then(function(){var fill=_this2.querySelector(".page__status-bar-fill");if(fill instanceof HTMLElement)return fill;fill=document.createElement("div"),fill.classList.add("page__status-bar-fill"),fill.style.width="0px",fill.style.height="0px";for(var bottomBarFill=void 0,i=0;i<_this2.children.length;i++)if(_this2.children[i].classList.contains("page__bottom-bar-fill")){bottomBarFill=_this2.children[i];break}return bottomBarFill?_this2.insertBefore(fill,bottomBarFill.nextSibling):_this2.insertBefore(fill,_this2.children[0]),fill})["catch"](function(){var el=_this2.querySelector(".page__status-bar-fill");el instanceof HTMLElement&&el.remove()})}},{key:"_show",value:function(){!this.isShown&&util.isAttached(this)&&(this.isShown=!0,this._isMuted||util.triggerElementEvent(this,"show",this.eventDetail),util.propagateAction(this._getContentElement(),"_show"))}},{key:"_hide",value:function(){this.isShown&&(this.isShown=!1,this._isMuted||util.triggerElementEvent(this,"hide",this.eventDetail),util.propagateAction(this._getContentElement(),"_hide"))}},{key:"_destroy",value:function(){this._hide(),this._isMuted||util.triggerElementEvent(this,"destroy",this.eventDetail),this.getDeviceBackButtonHandler()&&this.getDeviceBackButtonHandler().destroy(),util.propagateAction(this._getContentElement(),"_destroy"),this.remove()}},{key:"isShown",get:function(){return this._isShown},set:function(value){this._isShown=value}}]),PageElement}(BaseElement);window.OnsPageElement=document.registerElement("ons-page",{prototype:PageElement.prototype});var PopoverAnimator=function(){function PopoverAnimator(options){babelHelpers.classCallCheck(this,PopoverAnimator),options=ons._util.extend({timing:"cubic-bezier(.1, .7, .4, 1)",duration:.2,delay:0},options||{}),this.timing=options.timing,this.duration=options.duration,this.delay=options.delay}return babelHelpers.createClass(PopoverAnimator,[{key:"show",value:function(popover,callback){callback()}},{key:"hide",value:function(popover,callback){callback()}}]),PopoverAnimator}(),FadePopoverAnimator=function(_PopoverAnimator){function FadePopoverAnimator(options){return babelHelpers.classCallCheck(this,FadePopoverAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(FadePopoverAnimator).call(this,options))}return babelHelpers.inherits(FadePopoverAnimator,_PopoverAnimator),babelHelpers.createClass(FadePopoverAnimator,[{key:"show",value:function(popover,callback){var pop=popover.querySelector(".popover"),mask=popover.querySelector(".popover-mask");animit.runAll(animit(mask).queue({opacity:0}).wait(this.delay).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(pop).saveStyle().queue({transform:"scale3d(1.3, 1.3, 1.0)",opacity:0}).wait(this.delay).queue({transform:"scale3d(1.0, 1.0,  1.0)",opacity:1},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}},{key:"hide",value:function(popover,callback){var pop=popover.querySelector(".popover"),mask=popover.querySelector(".popover-mask");animit.runAll(animit(mask).queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(pop).saveStyle().queue({opacity:1}).wait(this.delay).queue({opacity:0},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(done){callback(),done()}))}}]),FadePopoverAnimator}(PopoverAnimator),scheme$23={".popover":"popover--*",".popover__content":"popover__content--*"},templateSource$4=util.createElement('\n  <div>\n    <div class="popover-mask"></div>\n    <div class="popover">\n      <div class="popover__content"></div>\n      <div class="popover__arrow"></div>\n    </div>\n  </div>\n'),_animatorDict$4={fade:FadePopoverAnimator,none:PopoverAnimator},PopoverElement=function(_BaseElement){function PopoverElement(){return babelHelpers.classCallCheck(this,PopoverElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(PopoverElement).apply(this,arguments))}return babelHelpers.inherits(PopoverElement,_BaseElement),babelHelpers.createClass(PopoverElement,[{key:"createdCallback",value:function(){this._compile(),this.style.display="none",ModifierUtil.initModifier(this,scheme$23),this._mask.style.zIndex="20000",this._popover.style.zIndex="20001",this.hasAttribute("mask-color")&&(this._mask.style.backgroundColor=this.getAttribute("mask-color")),this._visible=!1,this._doorLock=new DoorLock,this._boundOnChange=this._onChange.bind(this),this._boundCancel=this._cancel.bind(this),this._animatorFactory=this._createAnimatorFactory()}},{key:"_createAnimatorFactory",value:function(){return new AnimatorFactory({animators:_animatorDict$4,baseClass:PopoverAnimator,baseClassName:"PopoverAnimator",defaultAnimation:this.getAttribute("animation")||"fade"})}},{key:"_onDeviceBackButton",value:function(event){this.isCancelable()?this._cancel():event.callParentHandler()}},{key:"_setDirection",value:function(direction){var arrowPosition=void 0;if("up"===direction)arrowPosition="bottom";else if("left"===direction)arrowPosition="right";else if("down"===direction)arrowPosition="top";else{if("right"!=direction)throw new Error("Invalid direction.");arrowPosition="left"}var popoverClassList=this._popover.classList;popoverClassList.remove("popover--up"),popoverClassList.remove("popover--down"),popoverClassList.remove("popover--left"),popoverClassList.remove("popover--right"),popoverClassList.add("popover--"+direction);var arrowClassList=this._arrow.classList;arrowClassList.remove("popover__top-arrow"),arrowClassList.remove("popover__bottom-arrow"),arrowClassList.remove("popover__left-arrow"),arrowClassList.remove("popover__right-arrow"),arrowClassList.add("popover__"+arrowPosition+"-arrow")}},{key:"_positionPopoverByDirection",value:function(target,direction){var el=this._popover,pos=target.getBoundingClientRect(),own=el.getBoundingClientRect(),arrow=el.children[1],offset=14,margin=6,radius=parseInt(window.getComputedStyle(el.querySelector(".popover__content")).borderRadius);arrow.style.top="",arrow.style.left="",this._setDirection(direction),["left","right"].indexOf(direction)>-1?(el.style.left="left"==direction?pos.right-pos.width-own.width-offset+"px":pos.right+offset+"px",el.style.top=pos.bottom-pos.height/2-own.height/2+"px"):(el.style.top="up"==direction?pos.bottom-pos.height-own.height-offset+"px":pos.bottom+offset+"px",el.style.left=pos.right-pos.width/2-own.width/2+"px"),own=el.getBoundingClientRect();var diff=function(x){return x/2*Math.sqrt(2)-x/2}(parseInt(window.getComputedStyle(arrow).width)),limit=margin+radius+diff+2;["left","right"].indexOf(direction)>-1?own.top<margin?(arrow.style.top=Math.max(own.height/2+own.top-margin,limit)+"px",el.style.top=margin+"px"):own.bottom>window.innerHeight-margin&&(arrow.style.top=Math.min(own.height/2-(window.innerHeight-own.bottom)+margin,own.height-limit)+"px",el.style.top=window.innerHeight-own.height-margin+"px"):own.left<margin?(arrow.style.left=Math.max(own.width/2+own.left-margin,limit)+"px",el.style.left=margin+"px"):own.right>window.innerWidth-margin&&(arrow.style.left=Math.min(own.width/2-(window.innerWidth-own.right)+margin,own.width-limit)+"px",el.style.left=window.innerWidth-own.width-margin+"px"),el.removeAttribute("data-animit-orig-style")}},{key:"_positionPopover",value:function(target){for(var _this2=this,directions=function(){return _this2.hasAttribute("direction")?_this2.getAttribute("direction").split(/\s+/):["up","down","left","right"]}(),position=target.getBoundingClientRect(),scores={left:position.left,right:window.innerWidth-position.right,up:position.top,down:window.innerHeight-position.bottom},orderedDirections=Object.keys(scores).sort(function(a,b){return-(scores[a]-scores[b])}),i=0,l=orderedDirections.length;l>i;i++){var direction=orderedDirections[i];if(directions.indexOf(direction)>-1)return void this._positionPopoverByDirection(target,direction)}}},{key:"_onChange",value:function(){var _this3=this;setImmediate(function(){_this3._currentTarget&&_this3._positionPopover(_this3._currentTarget)})}},{key:"_compile",value:function(){var templateElement=templateSource$4.cloneNode(!0),content=templateElement.querySelector(".popover__content"),style=this.getAttribute("style");for(style&&this.removeAttribute("style");this.childNodes[0];)content.appendChild(this.childNodes[0]);for(;templateElement.children[0];)this.appendChild(templateElement.children[0]);style&&this._popover.setAttribute("style",style)}},{key:"show",value:function(target){var _this4=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],callback=options.callback||function(){};if("string"==typeof target?target=document.querySelector(target):target instanceof Event&&(target=target.target),!target)throw new Error("Target undefined");if(options.animation&&!(options.animation in _animatorDict$4))throw new Error("Animator "+options.animation+" is not registered.");options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options")));var canceled=!1;util.triggerElementEvent(this,"preshow",{popover:this,cancel:function(){canceled=!0}}),canceled||this._doorLock.waitUnlock(function(){var unlock=_this4._doorLock.lock();_this4.style.display="block",_this4._currentTarget=target,_this4._positionPopover(target);var animator=_this4._animatorFactory.newAnimator(options);animator.show(_this4,function(){_this4._visible=!0,unlock(),util.triggerElementEvent(_this4,"postshow",{popover:_this4}),callback()})})}},{key:"hide",value:function(){var _this5=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],callback=options.callback||function(){},canceled=!1;util.triggerElementEvent(this,"prehide",{popover:this,cancel:function(){canceled=!0}}),canceled||this._doorLock.waitUnlock(function(){var unlock=_this5._doorLock.lock(),animator=_this5._animatorFactory.newAnimator(options);animator.hide(_this5,function(){_this5.style.display="none",_this5._visible=!1,unlock(),util.triggerElementEvent(_this5,"posthide",{popover:_this5}),callback()})})}},{key:"isShown",value:function(){return this._visible}},{key:"attachedCallback",value:function(){this._mask.addEventListener("click",this._boundCancel,!1),this._deviceBackButtonHandler=deviceBackButtonDispatcher.createHandler(this,this._onDeviceBackButton.bind(this)),this._popover.addEventListener("DOMNodeInserted",this._boundOnChange,!1),this._popover.addEventListener("DOMNodeRemoved",this._boundOnChange,!1),window.addEventListener("resize",this._boundOnChange,!1)}},{key:"detachedCallback",value:function(){this._mask.removeEventListener("click",this._boundCancel,!1),this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=null,this._popover.removeEventListener("DOMNodeInserted",this._boundOnChange,!1),this._popover.removeEventListener("DOMNodeRemoved",this._boundOnChange,!1),window.removeEventListener("resize",this._boundOnChange,!1)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$23):void("direction"===name?this._boundOnChange():("animation"===name||"animation-options"===name)&&(this._animatorFactory=this._createAnimatorFactory()))}},{key:"setCancelable",value:function(cancelable){if("boolean"!=typeof cancelable)throw new Error("Argument must be a boolean.");cancelable?this.setAttribute("cancelable",""):this.removeAttribute("cancelable")}},{key:"isCancelable",value:function(){return this.hasAttribute("cancelable")}},{key:"destroy",value:function(){this.parentElement&&this.parentElement.removeChild(this)}},{key:"_cancel",value:function(){this.isCancelable()&&this.hide()}},{key:"_mask",get:function(){return this.children[0]}},{key:"_popover",get:function(){return this.children[1]}},{key:"_content",get:function(){return this._popover.children[0]}},{key:"_arrow",get:function(){return this._popover.children[1]}}]),PopoverElement}(BaseElement);window.OnsPopoverElement=document.registerElement("ons-popover",{prototype:PopoverElement.prototype}),window.OnsPopoverElement.registerAnimator=function(name,Animator){if(!(Animator.prototype instanceof PopoverAnimator))throw new Error('"Animator" param must inherit PopoverAnimator');_animatorDict$4[name]=Animator},window.OnsPopoverElement.PopoverAnimator=PopoverAnimator;var scheme$11={".progress-bar":"progress-bar--*",".progress-bar__primary":"progress-bar__primary--*",".progress-bar__secondary":"progress-bar__secondary--*"},template=util.createElement('\n  <div class="progress-bar">\n    <div class="progress-bar__secondary"></div>\n    <div class="progress-bar__primary"></div>\n  </div>\n'),ProgressBarElement=function(_BaseElement){function ProgressBarElement(){return babelHelpers.classCallCheck(this,ProgressBarElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ProgressBarElement).apply(this,arguments))}return babelHelpers.inherits(ProgressBarElement,_BaseElement),babelHelpers.createClass(ProgressBarElement,[{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$11)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$11):void("value"===name||"secondary-value"===name?this._updateValue():"indeterminate"===name&&this._updateDeterminate())}},{key:"_updateDeterminate",value:function(){this.hasAttribute("indeterminate")?(this._template.classList.add("progress-bar--indeterminate"),this._template.classList.remove("progress-bar--determinate")):(this._template.classList.add("progress-bar--determinate"),this._template.classList.remove("progress-bar--indeterminate"))}},{key:"_updateValue",value:function(){this._primary.style.width=this.hasAttribute("value")?this.getAttribute("value")+"%":"0%",this._secondary.style.width=this.hasAttribute("secondary-value")?this.getAttribute("secondary-value")+"%":"0%"}},{key:"_compile",value:function(){this._template=template.cloneNode(!0),this._primary=this._template.childNodes[3],this._secondary=this._template.childNodes[1],this._updateDeterminate(),this._updateValue(),this.appendChild(this._template)}}]),ProgressBarElement}(BaseElement);window.OnsProgressBarElement=document.registerElement("ons-progress-bar",{prototype:ProgressBarElement.prototype});var scheme$12={".progress-circular":"progress-circular--*",".progress-circular__primary":"progress-circular__primary--*",".progress-circular__secondary":"progress-circular__secondary--*"},template$1=util.createElement('\n  <svg class="progress-circular">\n    <circle class="progress-circular__secondary" cx="50%" cy="50%" r="40%" fill="none" stroke-width="10%" stroke-miterlimit="10"/>\n    <circle class="progress-circular__primary" cx="50%" cy="50%" r="40%" fill="none" stroke-width="10%" stroke-miterlimit="10"/>\n  </svg>\n'),ProgressCircularElement=function(_BaseElement){function ProgressCircularElement(){return babelHelpers.classCallCheck(this,ProgressCircularElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ProgressCircularElement).apply(this,arguments))}return babelHelpers.inherits(ProgressCircularElement,_BaseElement),babelHelpers.createClass(ProgressCircularElement,[{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$12)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$12):void("value"===name||"secondary-value"===name?this._updateValue():"indeterminate"===name&&this._updateDeterminate())}},{key:"_updateDeterminate",value:function(){this.hasAttribute("indeterminate")?(this._template.classList.add("progress-circular--indeterminate"),this._template.classList.remove("progress-circular--determinate")):(this._template.classList.add("progress-circular--determinate"),this._template.classList.remove("progress-circular--indeterminate"))}},{key:"_updateValue",value:function(){if(this.hasAttribute("value")){var per=Math.ceil(251.32*this.getAttribute("value")*.01);this._primary.style["stroke-dasharray"]=per+"%, 251.32%"}if(this.hasAttribute("secondary-value")){var per=Math.ceil(251.32*this.getAttribute("secondary-value")*.01);this._secondary.style["stroke-dasharray"]=per+"%, 251.32%"}}},{key:"_compile",value:function(){this._template=template$1.cloneNode(!0),this._primary=this._template.childNodes[3],this._secondary=this._template.childNodes[1],this._updateDeterminate(),this._updateValue(),this.appendChild(this._template)}}]),ProgressCircularElement}(BaseElement);window.OnsProgressCircularElement=document.registerElement("ons-progress-circular",{prototype:ProgressCircularElement.prototype});var STATE_INITIAL="initial",STATE_PREACTION="preaction",STATE_ACTION="action",PullHookElement=function(_BaseElement){function PullHookElement(){return babelHelpers.classCallCheck(this,PullHookElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(PullHookElement).apply(this,arguments))}return babelHelpers.inherits(PullHookElement,_BaseElement),babelHelpers.createClass(PullHookElement,[{key:"createdCallback",value:function(){if(this._scrollElement=this._createScrollElement(),this._pageElement=this._scrollElement.parentElement,!this._pageElement.classList.contains("page__content")&&!this._pageElement.classList.contains("ons-scroller__content"))throw new Error("<ons-pull-hook> must be a direct descendant of an <ons-page> or an <ons-scroller> element.");this._boundOnDrag=this._onDrag.bind(this),this._boundOnDragStart=this._onDragStart.bind(this),this._boundOnDragEnd=this._onDragEnd.bind(this),this._boundOnScroll=this._onScroll.bind(this),this._currentTranslation=0,this._setState(STATE_INITIAL,!0),this._setStyle()}},{key:"_createScrollElement",value:function(){var scrollElement=util.createElement('<div class="scroll"><div>'),pageElement=this.parentElement;for(scrollElement.appendChild(this);pageElement.firstChild;)scrollElement.appendChild(pageElement.firstChild);return pageElement.appendChild(scrollElement),scrollElement}},{key:"_setStyle",value:function(){var height=this.getHeight();this.style.top="-"+height+"px",this.style.height=height+"px",this.style.lineHeight=height+"px"}},{key:"_onScroll",value:function(event){var element=this._pageElement;element.scrollTop<0&&(element.scrollTop=0)}},{key:"_generateTranslationTransform",value:function(scroll){return"translate3d(0px, "+scroll+"px, 0px)"}},{key:"_onDrag",value:function(event){var _this2=this;if(!this.isDisabled()&&"left"!==event.gesture.direction&&"right"!==event.gesture.direction){var element=this._pageElement;if(element.scrollTop=this._startScroll-event.gesture.deltaY,element.scrollTop<window.innerHeight&&"up"!==event.gesture.direction&&event.gesture.preventDefault(),0===this._currentTranslation&&0===this._getCurrentScroll()){this._transitionDragLength=event.gesture.deltaY;var direction=event.gesture.interimDirection;"down"===direction?this._transitionDragLength-=1:this._transitionDragLength+=1}var scroll=Math.max(event.gesture.deltaY-this._startScroll,0);this._thresholdHeightEnabled()&&scroll>=this.getThresholdHeight()?(event.gesture.stopDetect(),setImmediate(function(){_this2._setState(STATE_ACTION),_this2._translateTo(_this2.getHeight(),{animate:!0}),_this2._waitForAction(_this2._onDone.bind(_this2))})):this._setState(scroll>=this.getHeight()?STATE_PREACTION:STATE_INITIAL),event.stopPropagation(),this._translateTo(scroll)}}},{key:"_onDragStart",value:function(event){this.isDisabled()||(this._startScroll=this._getCurrentScroll())}},{key:"_onDragEnd",value:function(event){if(!this.isDisabled()&&this._currentTranslation>0){var scroll=this._currentTranslation;scroll>this.getHeight()?(this._setState(STATE_ACTION),this._translateTo(this.getHeight(),{animate:!0}),this._waitForAction(this._onDone.bind(this))):this._translateTo(0,{animate:!0})}}},{key:"setActionCallback",value:function(callback){this._callback=callback}},{key:"_waitForAction",value:function(done){this._callback instanceof Function?this._callback.call(null,done):done()}},{key:"_onDone",value:function(done){this._translateTo(0,{animate:!0}),this._setState(STATE_INITIAL)}},{key:"getHeight",value:function(){return parseInt(this.getAttribute("height")||"64",10)}},{key:"setHeight",value:function(height){this.setAttribute("height",height+"px"),this._setStyle()}},{key:"setThresholdHeight",value:function(thresholdHeight){this.setAttribute("threshold-height",thresholdHeight+"px")}},{key:"getThresholdHeight",value:function(){return parseInt(this.getAttribute("threshold-height")||"96",10)}},{key:"_thresholdHeightEnabled",value:function(){var th=this.getThresholdHeight();return th>0&&th>=this.getHeight()}},{key:"_setState",value:function(state,noEvent){var lastState=this._getState();this.setAttribute("state",state),noEvent||lastState===this._getState()||util.triggerElementEvent(this,"changestate",{pullHook:this,state:state,lastState:lastState})}},{key:"_getState",value:function(){return this.getAttribute("state")}},{key:"getCurrentState",value:function(){return this._getState()}},{key:"_getCurrentScroll",value:function(){return this._pageElement.scrollTop}},{key:"getPullDistance",value:function(){return this._currentTranslation}},{key:"isDisabled",value:function(){return this.hasAttribute("disabled")}},{key:"_isContentFixed",value:function(){return this.hasAttribute("fixed-content")}},{key:"setDisabled",value:function(disabled){disabled?this.setAttribute("disabled",""):this.removeAttribute("disabled")}},{key:"_getScrollableElement",
value:function(){return this._isContentFixed()?this:this._scrollElement}},{key:"_translateTo",value:function(scroll){var _this3=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(0!=this._currentTranslation||0!=scroll){var done=function(){0===scroll&&_this3._getScrollableElement().removeAttribute("style"),options.callback&&options.callback()};this._currentTranslation=scroll,options.animate?animit(this._getScrollableElement()).queue({transform:this._generateTranslationTransform(scroll)},{duration:.3,timing:"cubic-bezier(.1, .7, .1, 1)"}).play(done):animit(this._getScrollableElement()).queue({transform:this._generateTranslationTransform(scroll)}).play(done)}}},{key:"_getMinimumScroll",value:function(){var scrollHeight=this._scrollElement.getBoundingClientRect().height,pageHeight=this._pageElement.getBoundingClientRect().height;return scrollHeight>pageHeight?-(scrollHeight-pageHeight):0}},{key:"_createEventListeners",value:function(){this._gestureDetector=new GestureDetector(this._pageElement,{dragMinDistance:1,dragDistanceCorrection:!1}),this._gestureDetector.on("drag",this._boundOnDrag),this._gestureDetector.on("dragstart",this._boundOnDragStart),this._gestureDetector.on("dragend",this._boundOnDragEnd),this._scrollElement.parentElement.addEventListener("scroll",this._boundOnScroll,!1)}},{key:"_destroyEventListeners",value:function(){this._gestureDetector.off("drag",this._boundOnDrag),this._gestureDetector.off("dragstart",this._boundOnDragStart),this._gestureDetector.off("dragend",this._boundOnDragEnd),this._gestureDetector.dispose(),this._gestureDetector=null,this._scrollElement.parentElement.removeEventListener("scroll",this._boundOnScroll,!1)}},{key:"attachedCallback",value:function(){this._createEventListeners()}},{key:"detachedCallback",value:function(){this._destroyEventListeners()}},{key:"attributeChangedCallback",value:function(name,last,current){}}]),PullHookElement}(BaseElement);window.OnsPullHookElement=document.registerElement("ons-pull-hook",{prototype:PullHookElement.prototype}),window.OnsPullHookElement.STATE_ACTION=STATE_ACTION,window.OnsPullHookElement.STATE_INITIAL=STATE_INITIAL,window.OnsPullHookElement.STATE_PREACTION=STATE_PREACTION;var RippleElement=function(_BaseElement){function RippleElement(){return babelHelpers.classCallCheck(this,RippleElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(RippleElement).apply(this,arguments))}return babelHelpers.inherits(RippleElement,_BaseElement),babelHelpers.createClass(RippleElement,[{key:"createdCallback",value:function(){this.classList.add("ripple"),this._compile(),this._boundOnClick=this._onMouseDown.bind(this)}},{key:"_compile",value:function(){this._wave=document.createElement("span"),this._wave.classList.add("ripple__wave"),this.insertBefore(this._wave,this.children[0]),this.hasAttribute("color")&&(this._wave.style.background=this.getAttribute("color"))}},{key:"_updateTarget",value:function(){this.hasAttribute("target")&&"children"===this.getAttribute("target")?(this._target=this,this.style.display="inline-block",this.style.position="relative"):(this._target=this.parentNode,"static"===window.getComputedStyle(this._target).getPropertyValue("position")&&(this._target.style.position="relative"),this.style.display="block",this.style.position="absolute")}},{key:"_updateCenter",value:function(){this._center=this.hasAttribute("center")?!0:!1,this._wave.classList.remove("ripple__wave--done-center"),this._wave.classList.remove("ripple__wave--animate-center"),this._wave.classList.remove("ripple__wave--done"),this._wave.classList.remove("ripple__wave--animate")}},{key:"attributeChangedCallback",value:function(name,last,current){"target"===name&&this._updateTarget(),"color"===name&&(this._wave.style.background=current),"center"===name&&this._updateCenter()}},{key:"_isTouchDevice",value:function(){return"ontouchstart"in window||"onmsgesturechange"in window}},{key:"_addListener",value:function(){var _this2=this;this.addEventListener("mousedown",this._boundOnClick),this._isTouchDevice()&&!function(){var initTouchHandler=function initTouchHandler(e){_this2.removeEventListener("mousedown",_this2._boundOnClick),_this2.removeEventListener("touchstart",initTouchHandler),_this2.addEventListener("touchstart",_this2._boundOnClick),_this2._boundOnClick(e)};_this2.addEventListener("touchstart",initTouchHandler)}()}},{key:"_removeListener",value:function(){this.removeEventListener("mousedown",this._boundOnClick),this._isTouchDevice()&&this.removeEventListener("touchstart",this._boundOnClick)}},{key:"attachedCallback",value:function(){this._updateCenter(),this._updateTarget(),this._addListener()}},{key:"detachedCallback",value:function(){this._removeListener()}},{key:"_onMouseDown",value:function(e){var _this3=this,eventType=e.type,wave=this._wave,el=this._target,pos=el.getBoundingClientRect();if(!this.isDisabled()){this._center?(wave.classList.remove("ripple__wave--done-center"),wave.classList.remove("ripple__wave--animate-center")):(wave.classList.remove("ripple__wave--done"),wave.classList.remove("ripple__wave--animate"));var animationEnded=new Promise(function(resolve){var onAnimationEnd=function onAnimationEnd(){_this3.removeEventListener("webkitAnimationEnd",onAnimationEnd),_this3.removeEventListener("animationend",onAnimationEnd),resolve()};_this3.addEventListener("webkitAnimationEnd",onAnimationEnd),_this3.addEventListener("animationend",onAnimationEnd)}),mouseReleased=new Promise(function(resolve){var onMouseUp=function onMouseUp(){document.removeEventListener("webkitAnimationEnd",onMouseUp),document.removeEventListener("animationend",onMouseUp),resolve()};document.addEventListener("mouseup",onMouseUp),document.addEventListener("touchend",onMouseUp)});Promise.all([animationEnded,mouseReleased]).then(function(){_this3._center?(wave.classList.remove("ripple__wave--animate-center"),wave.classList.add("ripple__wave--done-center")):(wave.classList.remove("ripple__wave--animate"),wave.classList.add("ripple__wave--done"))});var x=e.clientX,y=e.clientY;"touchstart"===eventType&&(x=e.changedTouches[0].clientX,y=e.changedTouches[0].clientY);var sizeX=void 0,sizeY=0;this._center?(sizeX=el.offsetWidth,sizeY=el.offsetHeight,sizeX=sizeX-parseFloat(window.getComputedStyle(el,null).getPropertyValue("border-left-width"))-parseFloat(window.getComputedStyle(el,null).getPropertyValue("border-right-width")),sizeY=sizeY-parseFloat(window.getComputedStyle(el,null).getPropertyValue("border-top-width"))-parseFloat(window.getComputedStyle(el,null).getPropertyValue("border-bottom-width"))):sizeX=sizeY=Math.max(el.offsetWidth,el.offsetHeight),wave.style.width=sizeX+"px",wave.style.height=sizeY+"px",x=x-pos.left-sizeX/2,y=y-pos.top-sizeY/2,wave.style.left=x+"px",wave.style.top=y+"px",wave.classList.add(this._center?"ripple__wave--animate-center":"ripple__wave--animate")}}},{key:"setDisabled",value:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?this.setAttribute("disabled",""):this.removeAttribute("disabled")}},{key:"isDisabled",value:function(){return this.hasAttribute("disabled")}}]),RippleElement}(BaseElement);window.OnsRippleElement=document.registerElement("ons-ripple",{prototype:RippleElement.prototype}),window.OnsRowElement=window.OnsRowElement?window.OnsRowElement:document.registerElement("ons-row"),window.OnsScrollerElement=window.OnsScrollerElement?window.OnsScrollerElement:document.registerElement("ons-scroller");var scheme$13={"":"speed-dial__item--*"},SpeedDialItemElement=function(_BaseElement){function SpeedDialItemElement(){return babelHelpers.classCallCheck(this,SpeedDialItemElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SpeedDialItemElement).apply(this,arguments))}return babelHelpers.inherits(SpeedDialItemElement,_BaseElement),babelHelpers.createClass(SpeedDialItemElement,[{key:"createdCallback",value:function(){ModifierUtil.initModifier(this,scheme$13),this.classList.add("fab"),this.classList.add("fab--mini"),this.classList.add("speed-dial__item"),this._boundOnClick=this._onClick.bind(this)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$13):void 0}},{key:"attachedCallback",value:function(){this.addEventListener("click",this._boundOnClick,!1)}},{key:"detachedCallback",value:function(){this.removeEventListener("click",this._boundOnClick,!1)}},{key:"_onClick",value:function(e){e.stopPropagation()}}]),SpeedDialItemElement}(BaseElement);window.OnsSpeedDialItemElement=document.registerElement("ons-speed-dial-item",{prototype:SpeedDialItemElement.prototype});var scheme$14={"":"speed-dial--*"},SpeedDialElement=function(_BaseElement){function SpeedDialElement(){return babelHelpers.classCallCheck(this,SpeedDialElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SpeedDialElement).apply(this,arguments))}return babelHelpers.inherits(SpeedDialElement,_BaseElement),babelHelpers.createClass(SpeedDialElement,[{key:"createdCallback",value:function(){this._compile(),this._shown=!0,this._itemShown=!1,ModifierUtil.initModifier(this,scheme$14),this._boundOnClick=this._onClick.bind(this),this.classList.add("speed__dial"),this._updateDirection(this.hasAttribute("direction")?this.getAttribute("direction"):"up"),this._updatePosition(),this.hasAttribute("disabled")&&this.setDisabled(!0)}},{key:"_compile",value:function(){{var content=document.createElement("ons-fab");util.arrayFrom(this.childNodes).forEach(function(element){return"ons-speed-dial-item"!==element.nodeName.toLowerCase()?content.firstChild.appendChild(element):!0})}this.insertBefore(content,this.firstChild)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$14):void("direction"===name?this._updateDirection(current):"position"===name?this._updatePosition():"disabled"===name&&this.setDisabled(null!==current?!0:!1))}},{key:"attachedCallback",value:function(){this.addEventListener("click",this._boundOnClick,!1)}},{key:"detachedCallback",value:function(){this.removeEventListener("click",this._boundOnClick,!1)}},{key:"_onClick",value:function(e){this.isDisabled()||this.toggleItems()}},{key:"_show",value:function(){this.isInline()||this.show()}},{key:"_hide",value:function(){this.isInline()||this.hide()}},{key:"_updateDirection",value:function(direction){for(var children=this.items,i=0;i<children.length;i++)children[i].style.transitionDelay=25*i+"ms",children[i].style.webkitTransitionDelay=25*i+"ms",children[i].style.bottom="auto",children[i].style.right="auto",children[i].style.top="auto",children[i].style.left="auto";switch(direction){case"up":for(var i=0;i<children.length;i++)children[i].style.bottom=72+56*i+"px",children[i].style.right="8px";break;case"down":for(var i=0;i<children.length;i++)children[i].style.top=72+56*i+"px",children[i].style.left="8px";break;case"left":for(var i=0;i<children.length;i++)children[i].style.top="8px",children[i].style.right=72+56*i+"px";break;case"right":for(var i=0;i<children.length;i++)children[i].style.top="8px",children[i].style.left=72+56*i+"px";break;default:throw new Error("Argument must be one of up, down, left or right.")}}},{key:"_updatePosition",value:function(){var position=this.getAttribute("position");switch(this.classList.remove("fab--top__left","fab--bottom__right","fab--bottom__left","fab--top__right","fab--top__center","fab--bottom__center"),position){case"top right":case"right top":this.classList.add("fab--top__right");break;case"top left":case"left top":this.classList.add("fab--top__left");break;case"bottom right":case"right bottom":this.classList.add("fab--bottom__right");break;case"bottom left":case"left bottom":this.classList.add("fab--bottom__left");break;case"center top":case"top center":this.classList.add("fab--top__center");break;case"center bottom":case"bottom center":this.classList.add("fab--bottom__center")}}},{key:"show",value:function(){arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.querySelector("ons-fab").show(),this._shown=!0}},{key:"hide",value:function(){{var _this2=this;arguments.length<=0||void 0===arguments[0]?{}:arguments[0]}this.hideItems(),setTimeout(function(){_this2.querySelector("ons-fab").hide()},200),this._shown=!1}},{key:"showItems",value:function(){if(!this._itemShown)for(var children=this.items,i=0;i<children.length;i++)children[i].style.transform="scale(1)",children[i].style.webkitTransform="scale(1)",children[i].style.transitionDelay=25*i+"ms",children[i].style.webkitTransitionDelay=25*i+"ms";this._itemShown=!0}},{key:"hideItems",value:function(){if(this._itemShown)for(var children=this.items,i=0;i<children.length;i++)children[i].style.transform="scale(0)",children[i].style.webkitTransform="scale(0)",children[i].style.transitionDelay=25*(children.length-i)+"ms",children[i].style.webkitTransitionDelay=25*(children.length-i)+"ms";this._itemShown=!1}},{key:"setDisabled",value:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?(this.hideItems(),this.setAttribute("disabled",""),util.arrayFrom(this.childNodes).forEach(function(element){return element.classList.contains("fab")?element.setAttribute("disabled",""):!0})):(this.removeAttribute("disabled"),util.arrayFrom(this.childNodes).forEach(function(element){return element.classList.contains("fab")?element.removeAttribute("disabled"):!0}))}},{key:"isDisabled",value:function(){return this.hasAttribute("disabled")}},{key:"isInline",value:function(){return this.hasAttribute("inline")}},{key:"isShown",value:function(){return this._shown&&"none"!==this.style.display}},{key:"isItemShown",value:function(){return this._itemShown}},{key:"toggle",value:function(){this.isShown()?this.hide():this.show()}},{key:"toggleItems",value:function(){this.isItemShown()?this.hideItems():this.showItems()}},{key:"items",get:function(){return util.arrayFrom(this.querySelectorAll("ons-speed-dial-item"))}}]),SpeedDialElement}(BaseElement);window.OnsSpeedDialElement=document.registerElement("ons-speed-dial",{prototype:SpeedDialElement.prototype});var rewritables={ready:function(splitterSideElement,callback){setImmediate(callback)},link:function(splitterSideElement,target,options,callback){callback(target)}},SplitterContentElement=function(_BaseElement){function SplitterContentElement(){return babelHelpers.classCallCheck(this,SplitterContentElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SplitterContentElement).apply(this,arguments))}return babelHelpers.inherits(SplitterContentElement,_BaseElement),babelHelpers.createClass(SplitterContentElement,[{key:"createdCallback",value:function(){this._page=null}},{key:"load",value:function(page){var _this2=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this._page=page,options.callback=options.callback instanceof Function?options.callback:function(){},internal.getPageHTMLAsync(page).then(function(html){rewritables.link(_this2,util.createFragment(html),options,function(fragment){for(;_this2.childNodes[0];)_this2.childNodes[0]._hide instanceof Function&&_this2.childNodes[0]._hide(),_this2.removeChild(_this2.childNodes[0]);_this2.appendChild(fragment),util.arrayFrom(fragment.children).forEach(function(child){child._show instanceof Function&&child._show()}),options.callback()})})}},{key:"attachedCallback",value:function(){var _this3=this;this._assertParent(),this.hasAttribute("page")&&setImmediate(function(){return rewritables.ready(_this3,function(){return _this3.load(_this3.getAttribute("page"))})})}},{key:"detachedCallback",value:function(){}},{key:"_show",value:function(){util.arrayFrom(this.children).forEach(function(child){child._show instanceof Function&&child._show()})}},{key:"_hide",value:function(){util.arrayFrom(this.children).forEach(function(child){child._hide instanceof Function&&child._hide()})}},{key:"_destroy",value:function(){util.arrayFrom(this.children).forEach(function(child){child._destroy instanceof Function&&child._destroy()}),this.remove()}},{key:"_assertParent",value:function(){var parentElementName=this.parentElement.nodeName.toLowerCase();if("ons-splitter"!==parentElementName)throw new Error('"'+parentElementName+'" element is not allowed as parent element.')}},{key:"page",get:function(){return this._page}}]),SplitterContentElement}(BaseElement);window.OnsSplitterContentElement=document.registerElement("ons-splitter-content",{prototype:SplitterContentElement.prototype}),window.OnsSplitterContentElement.rewritables=rewritables;var SplitterMaskElement=function(_BaseElement){function SplitterMaskElement(){return babelHelpers.classCallCheck(this,SplitterMaskElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SplitterMaskElement).apply(this,arguments))}return babelHelpers.inherits(SplitterMaskElement,_BaseElement),babelHelpers.createClass(SplitterMaskElement,[{key:"createdCallback",value:function(){this._boundOnClick=this._onClick.bind(this)}},{key:"_onClick",value:function(event){this.parentElement&&"ons-splitter"===this.parentElement.nodeName.toLowerCase()&&(this.parentElement.closeRight(),this.parentElement.closeLeft()),event.stopPropagation()}},{key:"attributeChangedCallback",value:function(name,last,current){}},{key:"attachedCallback",value:function(){this.addEventListener("click",this._boundOnClick)}},{key:"detachedCallback",value:function(){this.removeEventListener("click",this._boundOnClick)}}]),SplitterMaskElement}(BaseElement);window.OnsSplitterMaskElement=document.registerElement("ons-splitter-mask",{prototype:SplitterMaskElement.prototype});var SplitterAnimator=function(){function SplitterAnimator(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];babelHelpers.classCallCheck(this,SplitterAnimator),options=util.extend({timing:"linear",duration:"0.3",delay:"0"},options||{}),this._timing=options.timing,this._duration=options.duration,this._delay=options.delay}return babelHelpers.createClass(SplitterAnimator,[{key:"layoutOnOpen",value:function(){}},{key:"layoutOnClose",value:function(){}},{key:"translate",value:function(distance){}},{key:"open",value:function(done){done()}},{key:"close",value:function(done){done()}},{key:"activate",value:function(contentElement,sideElement,maskElement){}},{key:"inactivate",value:function(){}},{key:"isActivated",value:function(){throw new Error}}]),SplitterAnimator}(),SPLIT_MODE="split",COLLAPSE_MODE="collapse",CollapseDetection=function(){function CollapseDetection(){babelHelpers.classCallCheck(this,CollapseDetection)}return babelHelpers.createClass(CollapseDetection,[{key:"activate",value:function(element){}},{key:"inactivate",value:function(){}}]),CollapseDetection}(),rewritables$1={ready:function(splitterSideElement,callback){setImmediate(callback)},link:function(splitterSideElement,target,options,callback){callback(target)}},OrientationCollapseDetection=function(_CollapseDetection){function OrientationCollapseDetection(orientation){babelHelpers.classCallCheck(this,OrientationCollapseDetection);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(OrientationCollapseDetection).call(this));if("portrait"!==orientation&&"landscape"!==orientation)throw new Error("Invalid orientation: "+orientation);return _this._boundOnOrientationChange=_this._onOrientationChange.bind(_this),_this._targetOrientation=orientation,_this}return babelHelpers.inherits(OrientationCollapseDetection,_CollapseDetection),babelHelpers.createClass(OrientationCollapseDetection,[{key:"activate",value:function(element){this._element=element,ons.orientation.on("change",this._boundOnOrientationChange),this._update(ons.orientation.isPortrait())}},{key:"_onOrientationChange",value:function(info){this._update(info.isPortrait)}},{key:"_update",value:function(isPortrait){this._element._updateMode(isPortrait&&"portrait"===this._targetOrientation?COLLAPSE_MODE:isPortrait||"landscape"!==this._targetOrientation?SPLIT_MODE:COLLAPSE_MODE)}},{key:"inactivate",value:function(){this._element=null,ons.orientation.off("change",this._boundOnOrientationChange)}}]),OrientationCollapseDetection}(CollapseDetection),StaticCollapseDetection=function(_CollapseDetection2){function StaticCollapseDetection(){return babelHelpers.classCallCheck(this,StaticCollapseDetection),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(StaticCollapseDetection).apply(this,arguments))}return babelHelpers.inherits(StaticCollapseDetection,_CollapseDetection2),babelHelpers.createClass(StaticCollapseDetection,[{key:"activate",value:function(element){element._updateMode(COLLAPSE_MODE)}}]),StaticCollapseDetection}(CollapseDetection),MediaQueryCollapseDetection=function(_CollapseDetection3){function MediaQueryCollapseDetection(query){babelHelpers.classCallCheck(this,MediaQueryCollapseDetection);var _this3=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(MediaQueryCollapseDetection).call(this));return _this3._mediaQueryString=query,_this3._boundOnChange=_this3._onChange.bind(_this3),_this3}return babelHelpers.inherits(MediaQueryCollapseDetection,_CollapseDetection3),babelHelpers.createClass(MediaQueryCollapseDetection,[{key:"_onChange",value:function(queryList){this._element._updateMode(queryList.matches?COLLAPSE_MODE:SPLIT_MODE)}},{key:"activate",value:function(element){this._element=element,this._queryResult=window.matchMedia(this._mediaQueryString),this._queryResult.addListener(this._boundOnChange),this._onChange(this._queryResult)}},{key:"inactivate",value:function(){this._element=null,this._queryResult.removeListener(this._boundOnChange),this._queryResult=null}}]),MediaQueryCollapseDetection}(CollapseDetection),BaseMode=function(){function BaseMode(){babelHelpers.classCallCheck(this,BaseMode)}return babelHelpers.createClass(BaseMode,[{key:"isOpen",value:function(){return!1}},{key:"openMenu",value:function(){return!1}},{key:"closeMenu",value:function(){return!1}},{key:"enterMode",value:function(){}},{key:"exitMode",value:function(){}},{key:"handleGesture",value:function(){}}]),BaseMode}(),SplitMode=function(_BaseMode){function SplitMode(element){babelHelpers.classCallCheck(this,SplitMode);var _this4=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SplitMode).call(this));return _this4._element=element,_this4}return babelHelpers.inherits(SplitMode,_BaseMode),babelHelpers.createClass(SplitMode,[{key:"isOpen",value:function(){return!1}},{key:"layout",value:function(){var element=this._element;element.style.width=element._getWidth(),element._isLeftSide()?(element.style.left="0",element.style.right="auto"):(element.style.left="auto",element.style.right="0")}},{key:"enterMode",value:function(){this.layout()}},{key:"exitMode",value:function(){var element=this._element;element.style.left="",element.style.right="",element.style.width="",element.style.zIndex=""}}]),SplitMode}(BaseMode),CollapseMode=function(_BaseMode2){function CollapseMode(element){babelHelpers.classCallCheck(this,CollapseMode);var _this5=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(CollapseMode).call(this));return _this5._state=CollapseMode.CLOSED_STATE,_this5._distance=0,_this5._element=element,_this5._lock=new DoorLock,_this5}return babelHelpers.inherits(CollapseMode,_BaseMode2),babelHelpers.createClass(CollapseMode,[{key:"_animator",get:function(){return this._element._getAnimator()}}],[{key:"CLOSED_STATE",get:function(){return"closed"}},{key:"OPEN_STATE",get:function(){return"open"}},{key:"CHANGING_STATE",get:function(){return"changing"}}]),babelHelpers.createClass(CollapseMode,[{key:"_isLocked",value:function(){return this._lock.isLocked()}},{key:"isOpen",value:function(){return this._state!==CollapseMode.CLOSED_STATE}},{key:"isClosed",value:function(){return this._state===CollapseMode.CLOSED_STATE}},{key:"handleGesture",value:function(event){if(!this._isLocked()&&!this._isOpenOtherSideMenu())if("dragstart"===event.type)this._onDragStart(event);else if("dragleft"===event.type||"dragright"===event.type)this._ignoreDrag||this._onDrag(event);else{if("dragend"!==event.type)throw new Error("Invalid state");this._ignoreDrag||this._onDragEnd(event)}}},{key:"_onDragStart",value:function(event){if(this._ignoreDrag=!1,!this.isOpen()&&this._isOpenOtherSideMenu())this._ignoreDrag=!0;else if(this._element._swipeTargetWidth>0){var distance=this._element._isLeftSide()?event.gesture.center.clientX:window.innerWidth-event.gesture.center.clientX;distance>this._element._swipeTargetWidth&&(this._ignoreDrag=!0)}}},{key:"_onDrag",value:function(event){event.gesture.preventDefault();var deltaX=event.gesture.deltaX,deltaDistance=this._element._isLeftSide()?deltaX:-deltaX,startEvent=event.gesture.startEvent;"isOpen"in startEvent||(startEvent.isOpen=this.isOpen(),startEvent.distance=startEvent.isOpen?this._element._getWidthInPixel():0,startEvent.width=this._element._getWidthInPixel());var width=this._element._getWidthInPixel();if(!(0>deltaDistance&&startEvent.distance<=0||deltaDistance>0&&startEvent.distance>=width)){var distance=startEvent.isOpen?deltaDistance+width:deltaDistance,normalizedDistance=Math.max(0,Math.min(width,distance));startEvent.distance=normalizedDistance,this._state=CollapseMode.CHANGING_STATE,this._animator.translate(normalizedDistance)}}},{key:"_onDragEnd",value:function(event){var deltaX=event.gesture.deltaX,deltaDistance=this._element._isLeftSide()?deltaX:-deltaX,width=event.gesture.startEvent.width,distance=event.gesture.startEvent.isOpen?deltaDistance+width:deltaDistance,direction=event.gesture.interimDirection,shouldOpen=this._element._isLeftSide()&&"right"===direction&&distance>width*this._element._getThresholdRatioIfShouldOpen()||!this._element._isLeftSide()&&"left"===direction&&distance>width*this._element._getThresholdRatioIfShouldOpen();shouldOpen?this._openMenu():this._closeMenu()}},{key:"layout",value:function(){if(this._state!==CollapseMode.CHANGING_STATE)if(this._state===CollapseMode.CLOSED_STATE)this._animator.isActivated()&&this._animator.layoutOnClose();else{if(this._state!==CollapseMode.OPEN_STATE)throw new Error("Invalid state");this._animator.isActivated()&&this._animator.layoutOnOpen()}}},{key:"enterMode",value:function(){this._animator.activate(this._element._getContentElement(),this._element,this._element._getMaskElement()),this.layout()}},{key:"exitMode",value:function(){this._animator.inactivate()}},{key:"_isOpenOtherSideMenu",value:function(){var _this6=this;return util.arrayFrom(this._element.parentElement.children).filter(function(child){return"ons-splitter-side"===child.nodeName.toLowerCase()&&_this6._element!==child}).filter(function(side){return side.isOpen()}).length>0}},{key:"openMenu",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._state!==CollapseMode.CLOSED_STATE?!1:this._openMenu(options)}},{key:"_openMenu",value:function(){var _this7=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(this._isLocked())return!1;if(this._isOpenOtherSideMenu())return!1;if(this._element._emitPreOpenEvent())return!1;options.callback=options.callback instanceof Function?options.callback:function(){};var unlock=this._lock.lock(),done=function(){unlock(),_this7._element._emitPostOpenEvent(),options.callback()};return options.withoutAnimation?(this._state=CollapseMode.OPEN_STATE,this.layout(),done()):(this._state=CollapseMode.CHANGING_STATE,this._animator.open(function(){_this7._state=CollapseMode.OPEN_STATE,_this7.layout(),done()})),!0}},{key:"closeMenu",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._state!==CollapseMode.OPEN_STATE?!1:this._closeMenu(options)}},{key:"_closeMenu",value:function(){var _this8=this,options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(this._isLocked())return!1;if(this._element._emitPreCloseEvent())return!1;options.callback=options.callback instanceof Function?options.callback:function(){};var unlock=this._lock.lock(),done=function(){unlock(),_this8._element._emitPostCloseEvent(),setImmediate(options.callback)};return options.withoutAnimation?(this._state=CollapseMode.CLOSED_STATE,this.layout(),done()):(this._state=CollapseMode.CHANGING_STATE,this._animator.close(function(){_this8._state=CollapseMode.CLOSED_STATE,_this8.layout(),done()})),!0}}]),CollapseMode}(BaseMode),SplitterSideElement=function(_BaseElement){function SplitterSideElement(){return babelHelpers.classCallCheck(this,SplitterSideElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SplitterSideElement).apply(this,arguments))}return babelHelpers.inherits(SplitterSideElement,_BaseElement),babelHelpers.createClass(SplitterSideElement,[{key:"_updateForAnimationOptionsAttribute",value:function(){this._animationOptions=util.parseJSONObjectSafely(this.getAttribute("animation-options"),{})}},{key:"_getMaskElement",value:function(){return util.findChild(this.parentElement,"ons-splitter-mask")}},{key:"_getContentElement",value:function(){return util.findChild(this.parentElement,"ons-splitter-content")}},{key:"_getModeStrategy",value:function(){return this._mode===COLLAPSE_MODE?this._collapseMode:this._mode===SPLIT_MODE?this._splitMode:void 0}},{key:"createdCallback",value:function(){this._mode=null,this._page=null,this._isAttached=!1,this._collapseStrategy=new CollapseDetection,this._animatorFactory=new AnimatorFactory({animators:window.OnsSplitterElement._animatorDict,baseClass:SplitterAnimator,baseClassName:"SplitterAnimator",defaultAnimation:this.getAttribute("animation")}),this._collapseMode=new CollapseMode(this),this._splitMode=new SplitMode(this),this._boundHandleGesture=this._handleGesture.bind(this),this._cancelModeDetection=function(){},this._updateMode(SPLIT_MODE),this._updateForAnimationAttribute(),this._updateForWidthAttribute(),this._updateForSideAttribute(),this._updateForCollapseAttribute(),this._updateForSwipeableAttribute(),this._updateForSwipeTargetWidthAttribute(),this._updateForAnimationOptionsAttribute()}},{key:"_getAnimator",value:function(){return this._animator}},{key:"isSwipeable",value:function(){return this.hasAttribute("swipeable")}},{key:"_emitPostOpenEvent",value:function(){util.triggerElementEvent(this,"postopen",{side:this})}},{key:"_emitPostCloseEvent",value:function(){util.triggerElementEvent(this,"postclose",{side:this})}},{key:"_emitPreOpenEvent",value:function(){return this._emitCancelableEvent("preopen")}},{key:"_emitCancelableEvent",value:function(name){var isCanceled=!1;return util.triggerElementEvent(this,name,{side:this,cancel:function(){return isCanceled=!0}}),isCanceled}},{key:"_emitPreCloseEvent",value:function(){return this._emitCancelableEvent("preclose")}},{key:"_updateForCollapseAttribute",value:function(){if(!this.hasAttribute("collapse"))return void this._updateMode(SPLIT_MODE);var collapse=(""+this.getAttribute("collapse")).trim();this._updateCollapseStrategy(""===collapse?new StaticCollapseDetection:"portrait"===collapse||"landscape"===collapse?new OrientationCollapseDetection(collapse):new MediaQueryCollapseDetection(collapse))}},{key:"_updateCollapseStrategy",value:function(strategy){this._isAttached&&(this._collapseStrategy.inactivate(),strategy.activate(this)),this._collapseStrategy=strategy}},{key:"_updateMode",value:function(mode){if(mode!==COLLAPSE_MODE&&mode!==SPLIT_MODE)throw new Error("invalid mode: "+mode);if(mode!==this._mode){var lastMode=this._getModeStrategy();lastMode&&lastMode.exitMode(),this._mode=mode;var currentMode=this._getModeStrategy();currentMode.enterMode(),this.setAttribute("mode",mode),util.triggerElementEvent(this,"modechange",{side:this,mode:mode})}}},{key:"_getThresholdRatioIfShouldOpen",value:function(){if(this.hasAttribute("threshold-ratio-should-open")){var value=parseFloat(this.getAttribute("threshold-ratio-should-open"));return Math.max(0,Math.min(1,value))}return.3}},{key:"_layout",value:function(){
this._getModeStrategy().layout()}},{key:"_updateForSwipeTargetWidthAttribute",value:function(){this._swipeTargetWidth=this.hasAttribute("swipe-target-width")?Math.max(0,parseInt(this.getAttribute("swipe-target-width"),10)):-1}},{key:"_getWidth",value:function(){function normalize(width){return width=width.trim(),width.match(/^\d+(px|%)$/)?width:"80%"}return this.hasAttribute("width")?normalize(this.getAttribute("width")):"80%"}},{key:"_getWidthInPixel",value:function(){var width=this._getWidth(),_width$match=width.match(/^(\d+)(px|%)$/),_width$match2=babelHelpers.slicedToArray(_width$match,3),num=_width$match2[1],unit=_width$match2[2];if("px"===unit)return parseInt(num,10);if("%"===unit){var percent=parseInt(num,10);return Math.round(this.parentElement.offsetWidth*percent/100)}throw new Error("Invalid state")}},{key:"_getSide",value:function(){function normalize(side){return side=(""+side).trim(),"left"===side||"right"===side?side:"left"}return normalize(this.getAttribute("side"))}},{key:"_isLeftSide",value:function(){return"left"===this._getSide()}},{key:"_updateForWidthAttribute",value:function(){this._getModeStrategy().layout()}},{key:"_updateForSideAttribute",value:function(){this._getModeStrategy().layout()}},{key:"getCurrentMode",value:function(){return this._mode}},{key:"isOpen",value:function(){return this._getModeStrategy().isOpen()}},{key:"open",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._getModeStrategy().openMenu(options)}},{key:"close",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._getModeStrategy().closeMenu(options)}},{key:"load",value:function(page){var _this10=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this._page=page,options.callback=options.callback instanceof Function?options.callback:function(){},ons.getPageHTMLAsync(page).then(function(html){rewritables$1.link(_this10,util.createFragment(html),options,function(fragment){for(;_this10.childNodes[0];)_this10.childNodes[0]._hide instanceof Function&&_this10.childNodes[0]._hide(),_this10.removeChild(_this10.childNodes[0]);_this10.appendChild(fragment),util.arrayFrom(fragment.childNodes).forEach(function(node){node._show instanceof Function&&node._show()}),options.callback()})})}},{key:"toggle",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this.isOpen()?this.close(options):this.open(options)}},{key:"attributeChangedCallback",value:function(name,last,current){"width"===name?this._updateForWidthAttribute():"side"===name?this._updateForSideAttribute():"collapse"===name?this._updateForCollapseAttribute():"swipeable"===name?this._updateForSwipeableAttribute():"swipe-target-width"===name?this._updateForSwipeTargetWidthAttribute():"animation-options"===name?this._updateForAnimationOptionsAttribute():"animation"===name&&this._updateForAnimationAttribute()}},{key:"_updateForAnimationAttribute",value:function(){var isActivated=this._animator&&this._animator.isActivated();isActivated&&this._animator.inactivate(),this._animator=this._createAnimator(),isActivated&&this._animator.activate(this._getContentElement(),this,this._getMaskElement())}},{key:"_updateForSwipeableAttribute",value:function(){this._gestureDetector&&(this.isSwipeable()?this._gestureDetector.on("dragstart dragleft dragright dragend",this._boundHandleGesture):this._gestureDetector.off("dragstart dragleft dragright dragend",this._boundHandleGesture))}},{key:"_assertParent",value:function(){var parentElementName=this.parentElement.nodeName.toLowerCase();if("ons-splitter"!==parentElementName)throw new Error('"'+parentElementName+'" element is not allowed as parent element.')}},{key:"attachedCallback",value:function(){var _this11=this;this._isAttached=!0,this._collapseStrategy.activate(this),this._assertParent(),this._gestureDetector=new GestureDetector(this.parentElement,{dragMinDistance:1}),this._updateForSwipeableAttribute(),this.hasAttribute("page")&&setImmediate(function(){return rewritables$1.ready(_this11,function(){return _this11.load(_this11.getAttribute("page"))})})}},{key:"detachedCallback",value:function(){this._isAttached=!1,this._collapseStrategy.inactivate(),this._gestureDetector.dispose(),this._gestureDetector=null,this._updateForSwipeableAttribute()}},{key:"_handleGesture",value:function(event){return this._getModeStrategy().handleGesture(event)}},{key:"_show",value:function(){util.arrayFrom(this.children).forEach(function(child){child._show instanceof Function&&child._show()})}},{key:"_hide",value:function(){util.arrayFrom(this.children).forEach(function(child){child._hide instanceof Function&&child._hide()})}},{key:"_destroy",value:function(){util.arrayFrom(this.children).forEach(function(child){child._destroy instanceof Function&&child._destroy()}),this.remove()}},{key:"_createAnimator",value:function(){return this._animatorFactory.newAnimator({animation:this.getAttribute("animation"),animationOptions:AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options"))})}},{key:"page",get:function(){return this._page}},{key:"mode",get:function(){this._mode}}]),SplitterSideElement}(BaseElement);window.OnsSplitterSideElement=document.registerElement("ons-splitter-side",{prototype:SplitterSideElement.prototype}),window.OnsSplitterSideElement.rewritables=rewritables$1;var OverlaySplitterAnimator=function(_SplitterAnimator){function OverlaySplitterAnimator(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return babelHelpers.classCallCheck(this,OverlaySplitterAnimator),options=util.extend({timing:"cubic-bezier(.1, .7, .1, 1)",duration:"0.3",delay:"0"},options||{}),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(OverlaySplitterAnimator).call(this,options))}return babelHelpers.inherits(OverlaySplitterAnimator,_SplitterAnimator),babelHelpers.createClass(OverlaySplitterAnimator,[{key:"isActivated",value:function(){return this._isActivated}},{key:"layoutOnClose",value:function(){animit(this._side).queue({transform:"translateX(0%)",width:this._side._getWidth()}).play(),this._mask.style.display="none"}},{key:"layoutOnOpen",value:function(){animit(this._side).queue({transform:"translate3d("+(this._side._isLeftSide()?"":"-")+"100%, 0px, 0px)",width:this._side._getWidth()}).play(),this._mask.style.display="block"}},{key:"activate",value:function(contentElement,sideElement,maskElement){this._isActivated=!0,this._content=contentElement,this._side=sideElement,this._mask=maskElement,this._setupLayout()}},{key:"inactivate",value:function(){this._isActivated=!1,this._clearLayout(),this._content=this._side=this._mask=null}},{key:"translate",value:function(distance){animit(this._side).queue({transform:"translate3d("+(this._side._isLeftSide()?"":"-")+distance+"px, 0px, 0px)"}).play()}},{key:"_clearLayout",value:function(){var side=this._side,mask=this._mask;side.style.zIndex="",side.style.right="",side.style.left="",side.style.transform=side.style.webkitTransform="",side.style.transition=side.style.webkitTransition="",side.style.width="",side.style.display="",mask.style.display="none"}},{key:"_setupLayout",value:function(){var side=this._side;side.style.zIndex=3,side.style.display="block",side._isLeftSide()?(side.style.left="auto",side.style.right="100%"):(side.style.left="100%",side.style.right="auto")}},{key:"open",value:function(done){var transform=this._side._isLeftSide()?"translate3d(100%, 0px, 0px)":"translate3d(-100%, 0px, 0px)";animit.runAll(animit(this._side).wait(this._delay).queue({transform:transform},{duration:this._duration,timing:this._timing}).queue(function(callback){callback(),done()}),animit(this._mask).wait(this._delay).queue({display:"block"}).queue({opacity:"1"},{duration:this._duration,timing:"linear"}))}},{key:"close",value:function(done){var _this2=this;animit.runAll(animit(this._side).wait(this._delay).queue({transform:"translate3d(0px, 0px, 0px)"},{duration:this._duration,timing:this._timing}).queue(function(callback){_this2._side.style.webkitTransition="",done(),callback()}),animit(this._mask).wait(this._delay).queue({opacity:"0"},{duration:this._duration,timing:"linear"}).queue({display:"none"}))}}]),OverlaySplitterAnimator}(SplitterAnimator),SplitterElement=function(_BaseElement){function SplitterElement(){return babelHelpers.classCallCheck(this,SplitterElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SplitterElement).apply(this,arguments))}return babelHelpers.inherits(SplitterElement,_BaseElement),babelHelpers.createClass(SplitterElement,[{key:"createdCallback",value:function(){this._boundOnDeviceBackButton=this._onDeviceBackButton.bind(this),this._boundOnModeChange=this._onModeChange.bind(this)}},{key:"_onModeChange",value:function(event){event.target.parentElement===this&&this._layout()}},{key:"_getSideElement",value:function(side){var result=util.findChild(this,function(element){return"ons-splitter-side"===element.nodeName.toLowerCase()&&element.getAttribute("side")===side});return result&&CustomElements.upgrade(result),result}},{key:"_layout",value:function(){var content=this._getContentElement(),left=this._getSideElement("left"),right=this._getSideElement("right");content&&(content.style.left=left&&left.getCurrentMode&&"split"===left.getCurrentMode()?left._getWidth():"0px",content.style.right=right&&right.getCurrentMode&&"split"===right.getCurrentMode()?right._getWidth():"0px")}},{key:"_getContentElement",value:function(){return util.findChild(this,"ons-splitter-content")}},{key:"attributeChangedCallback",value:function(name,last,current){}},{key:"openRight",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._open("right",options)}},{key:"_getMaskElement",value:function(){var mask=util.findChild(this,"ons-splitter-mask");return mask||this.appendChild(document.createElement("ons-splitter-mask"))}},{key:"openLeft",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._open("left",options)}},{key:"_open",value:function(side){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],menu=this._getSideElement(side);return menu?menu.open(options):!1}},{key:"closeRight",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._close("right",options)}},{key:"closeLeft",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._close("left",options)}},{key:"_close",value:function(side){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],menu=this._getSideElement(side);return menu?menu.close(options):!1}},{key:"toggleLeft",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._toggle("left",options)}},{key:"toggleRight",value:function(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return this._toggle("right",options)}},{key:"_toggle",value:function(side){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],menu=this._getSideElement(side);return menu?menu.toggle(options):!1}},{key:"leftIsOpen",value:function(){return this._isOpen("left")}},{key:"rightIsOpen",value:function(){return this._isOpen("right")}},{key:"_isOpen",value:function(side){var menu=this._getSideElement(side);return menu?menu.isOpen():!1}},{key:"loadContentPage",value:function(page){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],content=this._getContentElement();if(content)return content.load(page,options);throw new Error('child "ons-splitter-content" element is not found in this element.')}},{key:"_onDeviceBackButton",value:function(handler){var left=this._getSideElement("left"),right=this._getSideElement("right");return left.isOpen()?void left.close():right.isOpen()?void right.close():void handler.callParentHandler()}},{key:"attachedCallback",value:function(){var _this2=this;this._deviceBackButtonHandler=deviceBackButtonDispatcher.createHandler(this,this._boundOnDeviceBackButton),this._assertChildren(),this.addEventListener("modechange",this._boundOnModeChange,!1),setImmediate(function(){return _this2._layout()})}},{key:"getDeviceBackButtonHandler",value:function(){return this._deviceBackButtonHandler}},{key:"_assertChildren",value:function(){var names=["ons-splitter-content","ons-splitter-side","ons-splitter-mask"],contentCount=0,sideCount=0,maskCount=0;if(util.arrayFrom(this.children).forEach(function(element){var name=element.nodeName.toLowerCase();if(-1===names.indexOf(name))throw new Error('"'+name+'" element is not allowed in "ons-splitter" element.');"ons-splitter-content"===name?contentCount++:"ons-splitter-content"===name?sideCount++:"ons-splitter-mask"===name&&maskCount++}),contentCount>1)throw new Error("too many <ons-splitter-content> elements.");if(sideCount>2)throw new Error("too many <ons-splitter-side> elements.");if(maskCount>1)throw new Error("too many <ons-splitter-mask> elements.");0===maskCount&&this.appendChild(document.createElement("ons-splitter-mask"))}},{key:"detachedCallback",value:function(){this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=null,this.removeEventListener("modechange",this._boundOnModeChange,!1)}},{key:"_show",value:function(){util.arrayFrom(this.children).forEach(function(child){child._show instanceof Function&&child._show()})}},{key:"_hide",value:function(){util.arrayFrom(this.children).forEach(function(child){child._hide instanceof Function&&child._hide()})}},{key:"_destroy",value:function(){util.arrayFrom(this.children).forEach(function(child){child._destroy instanceof Function&&child._destroy()}),this.remove()}}]),SplitterElement}(BaseElement);window.OnsSplitterElement=document.registerElement("ons-splitter",{prototype:SplitterElement.prototype}),window.OnsSplitterElement._animatorDict={"default":OverlaySplitterAnimator,overlay:OverlaySplitterAnimator},window.OnsSplitterElement.registerAnimator=function(name,Animator){if(!(Animator instanceof SplitterAnimator))throw new Error("Animator parameter must be an instance of SplitterAnimator.");window.OnsSplitterElement._animatorDict[name]=Animator},window.OnsSplitterElement.SplitterAnimator=SplitterAnimator;var scheme$15={"":"switch--*",".switch__input":"switch--*__input",".switch__toggle":"switch--*__toggle"},templateSource=util.createElement('\n  <div>\n    <input type="checkbox" class="switch__input">\n    <div class="switch__toggle"></div>\n  </div>\n'),ExtendableLabelElement=void 0;"function"!=typeof HTMLLabelElement?(ExtendableLabelElement=function(){},ExtendableLabelElement.prototype=document.createElement("label")):ExtendableLabelElement=HTMLLabelElement;var generateId$1=function(){var i=0;return function(){return"ons-switch-id-"+i++}}(),SwitchElement=function(_ExtendableLabelEleme){function SwitchElement(){return babelHelpers.classCallCheck(this,SwitchElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SwitchElement).apply(this,arguments))}return babelHelpers.inherits(SwitchElement,_ExtendableLabelEleme),babelHelpers.createClass(SwitchElement,[{key:"isChecked",value:function(){return this.checked}},{key:"setChecked",value:function(isChecked){this.checked=!!isChecked}},{key:"getCheckboxElement",value:function(){return this._getCheckbox()}},{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$15),this._updateForCheckedAttribute(),this._updateForDisabledAttribute()}},{key:"_updateForCheckedAttribute",value:function(){this._getCheckbox().checked=this.hasAttribute("checked")?!0:!1}},{key:"_updateForDisabledAttribute",value:function(){this.hasAttribute("disabled")?this._getCheckbox().setAttribute("disabled",""):this._getCheckbox().removeAttribute("disabled")}},{key:"_compile",value:function(){this.classList.add("switch");for(var template=templateSource.cloneNode(!0);template.children[0];)this.appendChild(template.children[0]);this._getCheckbox().setAttribute("name",generateId$1())}},{key:"detachedCallback",value:function(){this._getCheckbox().removeEventListener("change",this._onChangeListener)}},{key:"attachedCallback",value:function(){this._getCheckbox().addEventListener("change",this._onChangeListener)}},{key:"_onChangeListener",value:function(){this.checked!==!0?this.removeAttribute("checked"):this.setAttribute("checked","")}},{key:"_isChecked",value:function(){return this._getCheckbox().checked}},{key:"_setChecked",value:function(isChecked){isChecked=!!isChecked;var checkbox=this._getCheckbox();checkbox.checked!=isChecked&&(checkbox.checked=isChecked)}},{key:"_getCheckbox",value:function(){return this.querySelector("input[type=checkbox]")}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$15):void("checked"===name?this._updateForCheckedAttribute():"disabled"===name&&this._updateForDisabledAttribute())}},{key:"checked",get:function(){return this._getCheckbox().checked},set:function(value){this._getCheckbox().checked=value,this.checked?this.setAttribute("checked",""):this.removeAttribute("checked"),this._updateForCheckedAttribute()}},{key:"disabled",get:function(){return this._getCheckbox().disabled},set:function(value){this._getCheckbox().disabled=value,this.disabled?this.setAttribute("disabled",""):this.removeAttribute("disabled")}}]),SwitchElement}(ExtendableLabelElement);window.OnsSwitchElement=document.registerElement("ons-switch",{prototype:SwitchElement.prototype});var TabbarAnimator=function(){function TabbarAnimator(){var options=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];babelHelpers.classCallCheck(this,TabbarAnimator),this.timing=options.timing||"linear",this.duration=void 0!==options.duration?options.duration:"0.4",this.delay=void 0!==options.delay?options.delay:"0"}return babelHelpers.createClass(TabbarAnimator,[{key:"apply",value:function(enterPage,leavePage,enterPageIndex,leavePageIndex,done){throw new Error("This method must be implemented.")}}]),TabbarAnimator}(),TabbarNoneAnimator=function(_TabbarAnimator){function TabbarNoneAnimator(){return babelHelpers.classCallCheck(this,TabbarNoneAnimator),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TabbarNoneAnimator).apply(this,arguments))}return babelHelpers.inherits(TabbarNoneAnimator,_TabbarAnimator),babelHelpers.createClass(TabbarNoneAnimator,[{key:"apply",value:function(enterPage,leavePage,enterIndex,leaveIndex,done){done()}}]),TabbarNoneAnimator}(TabbarAnimator),TabbarFadeAnimator=function(_TabbarAnimator2){function TabbarFadeAnimator(options){return babelHelpers.classCallCheck(this,TabbarFadeAnimator),options.timing=void 0!==options.timing?options.timing:"linear",options.duration=void 0!==options.duration?options.duration:"0.4",options.delay=void 0!==options.delay?options.delay:"0",babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TabbarFadeAnimator).call(this,options))}return babelHelpers.inherits(TabbarFadeAnimator,_TabbarAnimator2),babelHelpers.createClass(TabbarFadeAnimator,[{key:"apply",value:function(enterPage,leavePage,enterPageIndex,leavePageIndex,done){animit.runAll(animit(enterPage).saveStyle().queue({transform:"translate3D(0, 0, 0)",opacity:0}).wait(this.delay).queue({transform:"translate3D(0, 0, 0)",opacity:1},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(callback){done(),callback()}),animit(leavePage).queue({transform:"translate3D(0, 0, 0)",opacity:1}).wait(this.delay).queue({transform:"translate3D(0, 0, 0)",opacity:0},{duration:this.duration,timing:this.timing}))}}]),TabbarFadeAnimator}(TabbarAnimator),TabbarSlideAnimator=function(_TabbarAnimator3){function TabbarSlideAnimator(options){return babelHelpers.classCallCheck(this,TabbarSlideAnimator),options.timing=void 0!==options.timing?options.timing:"ease-in",options.duration=void 0!==options.duration?options.duration:"0.15",options.delay=void 0!==options.delay?options.delay:"0",babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TabbarSlideAnimator).call(this,options))}return babelHelpers.inherits(TabbarSlideAnimator,_TabbarAnimator3),babelHelpers.createClass(TabbarSlideAnimator,[{key:"apply",value:function(enterPage,leavePage,enterIndex,leaveIndex,done){var sgn=enterIndex>leaveIndex;animit.runAll(animit(enterPage).saveStyle().queue({transform:"translate3D("+(sgn?"":"-")+"100%, 0, 0)"}).wait(this.delay).queue({transform:"translate3D(0, 0, 0)"},{duration:this.duration,timing:this.timing}).restoreStyle().queue(function(callback){done(),callback()}),animit(leavePage).queue({transform:"translate3D(0, 0, 0)"}).wait(this.delay).queue({transform:"translate3D("+(sgn?"-":"")+"100%, 0, 0)"},{duration:this.duration,timing:this.timing}))}}]),TabbarSlideAnimator}(TabbarAnimator),scheme$24={".tab-bar__content":"tab-bar--*__content",".tab-bar":"tab-bar--*"},_animatorDict$5={"default":TabbarNoneAnimator,fade:TabbarFadeAnimator,slide:TabbarSlideAnimator,none:TabbarNoneAnimator},rewritables$3={ready:function(tabbarElement,callback){callback()},link:function(tabbarElement,target,options,callback){callback(target)},unlink:function(tabbarElement,target,callback){callback(target)}},generateId$2=function(){var i=0;return function(){return"ons-tabbar-gen-"+i++}}(),TabbarElement=function(_BaseElement){function TabbarElement(){return babelHelpers.classCallCheck(this,TabbarElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TabbarElement).apply(this,arguments))}return babelHelpers.inherits(TabbarElement,_BaseElement),babelHelpers.createClass(TabbarElement,[{key:"createdCallback",value:function(){this._tabbarId=generateId$2(),this._animatorFactory=new AnimatorFactory({animators:_animatorDict$5,baseClass:TabbarAnimator,baseClassName:"TabbarAnimator",defaultAnimation:this.getAttribute("animation")}),this._compile(),this._contentElement=util.findChild(this,".tab-bar__content"),ModifierUtil.initModifier(this,scheme$24)}},{key:"_compile",value:function(){var wrapper=document.createDocumentFragment(),content=document.createElement("div");content.classList.add("ons-tab-bar__content"),content.classList.add("tab-bar__content");var tabbar=document.createElement("div");for(tabbar.classList.add("tab-bar"),tabbar.classList.add("ons-tab-bar__footer"),tabbar.classList.add("ons-tabbar-inner"),wrapper.appendChild(content),wrapper.appendChild(tabbar);this.childNodes[0];)tabbar.appendChild(this.removeChild(this.childNodes[0]));this.appendChild(wrapper),this._hasTopTabbar()&&this._prepareForTopTabbar()}},{key:"_hasTopTabbar",value:function(){return"top"===this.getAttribute("position")}},{key:"_prepareForTopTabbar",value:function(){var _this2=this,content=util.findChild(this,".tab-bar__content"),tabbar=util.findChild(this,".tab-bar");content.setAttribute("no-status-bar-fill",""),content.classList.add("tab-bar--top__content"),tabbar.classList.add("tab-bar--top");var page=util.findParent(this,"ons-page");page&&(this.style.top=window.getComputedStyle(page._getContentElement(),null).getPropertyValue("padding-top")),internal.shouldFillStatusBar(this).then(function(){var fill=_this2.querySelector(".tab-bar__status-bar-fill");return fill instanceof HTMLElement?fill:(fill=document.createElement("div"),fill.classList.add("tab-bar__status-bar-fill"),fill.style.width="0px",fill.style.height="0px",_this2.insertBefore(fill,_this2.children[0]),fill)})["catch"](function(){var el=_this2.querySelector(".tab-bar__status-bar-fill");el instanceof HTMLElement&&el.remove()})}},{key:"_getTabbarElement",value:function(){return util.findChild(this,".tab-bar")}},{key:"loadPage",value:function(page){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return options._removeElement=!0,this._loadPage(page,options)}},{key:"_loadPage",value:function(page,options){var _this3=this;OnsTabElement.prototype._createPageElement(page,function(pageElement){_this3._loadPageDOMAsync(pageElement,options)})}},{key:"_loadPageDOMAsync",value:function(pageElement){var _this4=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];rewritables$3.link(this,pageElement,options,function(pageElement){_this4._contentElement.appendChild(pageElement),_this4._switchPage(pageElement,options)})}},{key:"getTabbarId",value:function(){return this._tabbarId}},{key:"_getCurrentPageElement",value:function(){for(var pages=this._contentElement.children,page=null,i=0;i<pages.length;i++)if("none"!==pages[i].style.display){page=pages[i];break}if(page&&"ons-page"!==page.nodeName.toLowerCase())throw new Error('Invalid state: page element must be a "ons-page" element.');return page}},{key:"_switchPage",value:function(element,options){if(-1!==this.getActiveTabIndex()){var oldPageElement=this._oldPageElement||internal.nullElement;this._oldPageElement=element;var animator=this._animatorFactory.newAnimator(options);oldPageElement!==internal.nullElement&&oldPageElement._hide(),animator.apply(element,oldPageElement,options.selectedTabIndex,options.previousTabIndex,function(){oldPageElement!==internal.nullElement&&(options._removeElement?rewritables$3.unlink(this,oldPageElement,function(pageElement){pageElement._destroy()}):oldPageElement.style.display="none"),element.style.display="block",element._show(),options.callback instanceof Function&&options.callback()})}else options.callback instanceof Function&&options.callback()}},{key:"setActiveTab",value:function(index){var _this5=this,options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];options.animationOptions=util.extend(options.animationOptions||{},AnimatorFactory.parseAnimationOptionsString(this.getAttribute("animation-options")));var previousTab=this._getActiveTabElement(),selectedTab=this._getTabElement(index),previousTabIndex=this.getActiveTabIndex(),selectedTabIndex=index;if(!selectedTab)return!1;if(index===previousTabIndex)return util.triggerElementEvent(this,"reactive",{index:index,tabItem:selectedTab}),!1;var canceled=!1;if(util.triggerElementEvent(this,"prechange",{index:index,tabItem:selectedTab,cancel:function(){return canceled=!0}}),canceled)return selectedTab.setInactive(),previousTab&&previousTab.setActive(),!1;selectedTab.setActive();var needLoad=!selectedTab.isLoaded()&&!options.keepPage;if(util.arrayFrom(this._getTabbarElement().children).forEach(function(tab){tab!=selectedTab?tab.setInactive():needLoad||util.triggerElementEvent(_this5,"postchange",{index:index,tabItem:selectedTab})}),needLoad){var removeElement=!0;previousTab&&previousTab.isPersistent()&&(removeElement=!1);var params={callback:function(){util.triggerElementEvent(_this5,"postchange",{index:index,tabItem:selectedTab}),options.callback instanceof Function&&options.callback()},previousTabIndex:previousTabIndex,selectedTabIndex:selectedTabIndex,_removeElement:removeElement};if(options.animation&&(params.animation=options.animation),selectedTab.isPersistent()){var link=function(element,callback){rewritables$3.link(_this5,element,options,callback)};selectedTab._loadPageElement(function(pageElement){_this5._loadPersistentPageDOM(pageElement,params)},link)}else this._loadPage(selectedTab.getAttribute("page"),params)}return!0}},{key:"_loadPersistentPageDOM",value:function(element){var options=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];util.isAttached(element)||this._contentElement.appendChild(element),element.removeAttribute("style"),this._switchPage(element,options)}},{key:"setTabbarVisibility",value:function(visible){this._contentElement.style[this._hasTopTabbar()?"top":"bottom"]=visible?"":"0px",this._getTabbarElement().style.display=visible?"":"none"}},{key:"getActiveTabIndex",value:function(){for(var tabs=this._getTabbarElement().children,i=0;i<tabs.length;i++)if(tabs[i]instanceof window.OnsTabElement&&tabs[i].isActive&&tabs[i].isActive())return i;return-1}},{key:"_getActiveTabElement",value:function(){return this._getTabElement(this.getActiveTabIndex())}},{key:"_getTabElement",value:function(index){return this._getTabbarElement().children[index]}},{key:"detachedCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"_show",value:function(){var currentPageElement=this._getCurrentPageElement();currentPageElement&&currentPageElement._show()}},{key:"_hide",value:function(){var currentPageElement=this._getCurrentPageElement();currentPageElement&&currentPageElement._hide()}},{key:"_destroy",value:function(){for(var pages=this._contentElement.children,i=pages.length-1;i>=0;i--)pages[i]._destroy();this.remove()}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$24):void 0}}]),TabbarElement}(BaseElement);window.OnsTabbarElement=document.registerElement("ons-tabbar",{prototype:TabbarElement.prototype}),window.OnsTabbarElement.registerAnimator=function(name,Animator){if(!(Animator.prototype instanceof TabbarAnimator))throw new Error('"Animator" param must inherit OnsTabbarElement.TabbarAnimator');_animatorDict$5[name]=Animator},window.OnsTabbarElement.rewritables=rewritables$3,window.OnsTabbarElement.TabbarAnimator=TabbarAnimator;var OnsTabbarElement$1=OnsTabbarElement,scheme$16={"":"tab-bar--*__item",".tab-bar__button":"tab-bar--*__button"},templateSource$1=util.createElement('\n  <div>\n    <input type="radio" style="display: none">\n    <button class="tab-bar__button tab-bar-inner"></button>\n  </div>\n'),defaultInnerTemplateSource=util.createElement('\n  <div>\n    <div class="tab-bar__icon">\n      <ons-icon icon="ion-cloud" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon>\n    </div>\n    <div class="tab-bar__label">label</div>\n  </div>\n'),TabElement=function(_BaseElement){function TabElement(){return babelHelpers.classCallCheck(this,TabElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TabElement).apply(this,arguments))}return babelHelpers.inherits(TabElement,_BaseElement),babelHelpers.createClass(TabElement,[{key:"createdCallback",value:function(){this._compile(),this._boundOnClick=this._onClick.bind(this),ModifierUtil.initModifier(this,scheme$16)}},{key:"_compile",value:function(){for(var fragment=document.createDocumentFragment(),hasChildren=!1;this.childNodes[0];){var node=this.childNodes[0];this.removeChild(node),fragment.appendChild(node),node.nodeType==Node.ELEMENT_NODE&&(hasChildren=!0)}for(var template=templateSource$1.cloneNode(!0);template.children[0];)this.appendChild(template.children[0]);this.classList.add("tab-bar__item");var button=util.findChild(this,".tab-bar__button");hasChildren?(button.appendChild(fragment),this._hasDefaultTemplate=!1):(this._hasDefaultTemplate=!0,this._updateDefaultTemplate())}},{key:"_updateDefaultTemplate",value:function(){function getLabelElement(){return self.querySelector(".tab-bar__label")}function getIconElement(){return self.querySelector("ons-icon")}if(this._hasDefaultTemplate){for(var button=util.findChild(this,".tab-bar__button"),template=defaultInnerTemplateSource.cloneNode(!0);template.children[0];)button.appendChild(template.children[0]);var self=this,icon=this.getAttribute("icon"),label=this.getAttribute("label");if("string"==typeof icon)getIconElement().setAttribute("icon",icon);else{var wrapper=button.querySelector(".tab-bar__icon");wrapper.parentNode.removeChild(wrapper)}"string"==typeof label?getLabelElement().textContent=label:getLabelElement().parentNode.removeChild(getLabelElement())}}},{key:"_onClick",value:function(){var tabbar=this._findTabbarElement();tabbar&&tabbar.setActiveTab(this._findTabIndex())}},{key:"isPersistent",value:function(){return this.hasAttribute("persistent")}},{key:"setActive",value:function(){var radio=util.findChild(this,"input");radio.checked=!0,this.classList.add("active"),util.arrayFrom(this.querySelectorAll("[ons-tab-inactive]")).forEach(function(element){return element.style.display="none"}),util.arrayFrom(this.querySelectorAll("[ons-tab-active]")).forEach(function(element){
return element.style.display="inherit"})}},{key:"setInactive",value:function(){var radio=util.findChild(this,"input");radio.checked=!1,this.classList.remove("active"),util.arrayFrom(this.querySelectorAll("[ons-tab-inactive]")).forEach(function(element){return element.style.display="inherit"}),util.arrayFrom(this.querySelectorAll("[ons-tab-active]")).forEach(function(element){return element.style.display="none"})}},{key:"isLoaded",value:function(){return!1}},{key:"_loadPageElement",value:function(callback,link){var _this2=this;this.isPersistent()?this._pageElement?callback(this._pageElement):this._createPageElement(this.getAttribute("page"),function(element){link(element,function(element){_this2._pageElement=element,callback(element)})}):(this._pageElement=null,this._createPageElement(this.getAttribute("page"),callback))}},{key:"_createPageElement",value:function(page,callback){internal.getPageHTMLAsync(page).then(function(html){callback(util.createElement(html.trim()))})}},{key:"isActive",value:function(){return this.classList.contains("active")}},{key:"canReload",value:function(){return!this.hasAttribute("no-reload")}},{key:"detachedCallback",value:function(){this.removeEventListener("click",this._boundOnClick,!1)}},{key:"attachedCallback",value:function(){var _this3=this;this._ensureElementPosition();var tabbar=this._findTabbarElement();if(tabbar.hasAttribute("modifier")){var prefix=this.hasAttribute("modifier")?this.getAttribute("modifier")+" ":"";this.setAttribute("modifier",prefix+tabbar.getAttribute("modifier"))}this.hasAttribute("active")&&!function(){var tabIndex=_this3._findTabIndex();OnsTabbarElement$1.rewritables.ready(tabbar,function(){setImmediate(function(){return tabbar.setActiveTab(tabIndex,{animation:"none"})})})}(),this.addEventListener("click",this._boundOnClick,!1)}},{key:"_findTabbarElement",value:function(){return this.parentNode&&"ons-tabbar"===this.parentNode.nodeName.toLowerCase()?this.parentNode:this.parentNode.parentNode&&"ons-tabbar"===this.parentNode.parentNode.nodeName.toLowerCase()?this.parentNode.parentNode:null}},{key:"_findTabIndex",value:function(){for(var elements=this.parentNode.children,i=0;i<elements.length;i++)if(this===elements[i])return i}},{key:"_ensureElementPosition",value:function(){if(!this._findTabbarElement())throw new Error("This ons-tab element is must be child of ons-tabbar element.")}},{key:"attributeChangedCallback",value:function(name,last,current){return this._hasDefaultTemplate&&("icon"===name||"label"===name)&&this._updateDefaultTemplate(),"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$16):void 0}}]),TabElement}(BaseElement);window.OnsTabElement=document.registerElement("ons-tab",{prototype:TabElement.prototype}),document.registerElement("ons-tabbar-item",{prototype:Object.create(TabElement.prototype)});var TemplateElement=function(_BaseElement){function TemplateElement(){return babelHelpers.classCallCheck(this,TemplateElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TemplateElement).apply(this,arguments))}return babelHelpers.inherits(TemplateElement,_BaseElement),babelHelpers.createClass(TemplateElement,[{key:"createdCallback",value:function(){for(this.template=this.innerHTML;this.firstChild;)this.removeChild(this.firstChild)}},{key:"attachedCallback",value:function(){var event=new CustomEvent("_templateloaded",{bubbles:!0,cancelable:!0});event.template=this.template,event.templateId=this.getAttribute("id"),this.dispatchEvent(event)}}]),TemplateElement}(BaseElement);window.OnsTemplateElement=document.registerElement("ons-template",{prototype:TemplateElement.prototype});var scheme$17={"":"toolbar-button--*"},ToolbarButtonElement=function(_BaseElement){function ToolbarButtonElement(){return babelHelpers.classCallCheck(this,ToolbarButtonElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ToolbarButtonElement).apply(this,arguments))}return babelHelpers.inherits(ToolbarButtonElement,_BaseElement),babelHelpers.createClass(ToolbarButtonElement,[{key:"createdCallback",value:function(){this.classList.add("toolbar-button"),ModifierUtil.initModifier(this,scheme$17)}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$17):void 0}}]),ToolbarButtonElement}(BaseElement);window.OnsToolbarButton=document.registerElement("ons-toolbar-button",{prototype:ToolbarButtonElement.prototype});var scheme$18={"":"navigation-bar--*",".navigation-bar__left":"navigation-bar--*__left",".navigation-bar__center":"navigation-bar--*__center",".navigation-bar__right":"navigation-bar--*__right"},ToolbarElement=function(_BaseElement){function ToolbarElement(){return babelHelpers.classCallCheck(this,ToolbarElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ToolbarElement).apply(this,arguments))}return babelHelpers.inherits(ToolbarElement,_BaseElement),babelHelpers.createClass(ToolbarElement,[{key:"createdCallback",value:function(){var _this2=this;this._compile(),ModifierUtil.initModifier(this,scheme$18),this._tryToEnsureNodePosition(),setImmediate(function(){return _this2._tryToEnsureNodePosition()})}},{key:"attributeChangedCallback",value:function(name,last,current){return"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$18):void 0}},{key:"attachedCallback",value:function(){var _this3=this;this._tryToEnsureNodePosition(),setImmediate(function(){return _this3._tryToEnsureNodePosition()})}},{key:"_tryToEnsureNodePosition",value:function(){if(this.parentNode&&!this.hasAttribute("inline")&&"ons-page"!==this.parentNode.nodeName.toLowerCase()){for(var page=this;;){if(page=page.parentNode,!page)return;if("ons-page"===page.nodeName.toLowerCase())break}page._registerToolbar(this)}}},{key:"_getToolbarLeftItemsElement",value:function(){return this.querySelector(".left")||internal.nullElement}},{key:"_getToolbarCenterItemsElement",value:function(){return this.querySelector(".center")||internal.nullElement}},{key:"_getToolbarRightItemsElement",value:function(){return this.querySelector(".right")||internal.nullElement}},{key:"_getToolbarBackButtonLabelElement",value:function(){return this.querySelector("ons-back-button .back-button__label")||internal.nullElement}},{key:"_compile",value:function(){var inline=this.hasAttribute("inline");this.classList.add("navigation-bar"),inline||(this.style.position="absolute",this.style.zIndex="10000",this.style.left="0px",this.style.right="0px",this.style.top="0px"),this._ensureToolbarItemElements()}},{key:"_ensureToolbarItemElements",value:function(){for(var center,hasCenterClassElementOnly=1===this.children.length&&this.children[0].classList.contains("center"),i=0;i<this.childNodes.length;i++)1!=this.childNodes[i].nodeType&&this.removeChild(this.childNodes[i]);if(hasCenterClassElementOnly)center=this._ensureToolbarItemContainer("center");else{center=this._ensureToolbarItemContainer("center");var left=this._ensureToolbarItemContainer("left"),right=this._ensureToolbarItemContainer("right");if(this.children[0]!==left||this.children[1]!==center||this.children[2]!==right){left.parentNode&&this.removeChild(left),center.parentNode&&this.removeChild(center),right.parentNode&&this.removeChild(right);var fragment=document.createDocumentFragment();fragment.appendChild(left),fragment.appendChild(center),fragment.appendChild(right),this.appendChild(fragment)}}center.classList.add("navigation-bar__title")}},{key:"_ensureToolbarItemContainer",value:function(name){var container=util.findChild(this,"."+name);return container||(container=document.createElement("div"),container.classList.add(name)),container.classList.add("navigation-bar__"+name),container}}]),ToolbarElement}(BaseElement);window.OnsToolbarElement=document.registerElement("ons-toolbar",{prototype:ToolbarElement.prototype});var scheme$19={".range":"range--*",".range__left":"range--*__left"},INPUT_ATTRIBUTES$1=["autofocus","disabled","inputmode","max","min","name","placeholder","readonly","size","step","validator","value"],MaterialInputElement$1=function(_BaseElement){function MaterialInputElement(){return babelHelpers.classCallCheck(this,MaterialInputElement),babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(MaterialInputElement).apply(this,arguments))}return babelHelpers.inherits(MaterialInputElement,_BaseElement),babelHelpers.createClass(MaterialInputElement,[{key:"createdCallback",value:function(){this._compile(),ModifierUtil.initModifier(this,scheme$19),this._updateBoundAttributes(),this._onChange()}},{key:"_compile",value:function(){this.innerHTML='\n      <input type="range" class="range">\n      <div class="range__left"></div>\n    '}},{key:"_onChange",value:function(){this._left.style.width=100*this._ratio+"%"}},{key:"attributeChangedCallback",value:function(name,last,current){"modifier"===name?ModifierUtil.onModifierChanged(last,current,this,scheme$19):INPUT_ATTRIBUTES$1.indexOf(name)>=0&&(this._updateBoundAttributes(),("min"===name||"max"===name)&&this._onChange())}},{key:"attachedCallback",value:function(){this.addEventListener("input",this._onChange)}},{key:"detachedCallback",value:function(){this.removeEventListener("input",this._onChange)}},{key:"_updateBoundAttributes",value:function(){var _this2=this;INPUT_ATTRIBUTES$1.forEach(function(attr){_this2.hasAttribute(attr)?_this2._input.setAttribute(attr,_this2.getAttribute(attr)):_this2._input.removeAttribute(attr)})}},{key:"_ratio",get:function(){var min=""===this._input.min?0:parseInt(this._input.min),max=""===this._input.max?100:parseInt(this._input.max);return(this.value-min)/(max-min)}},{key:"_input",get:function(){return this.querySelector("input")}},{key:"_left",get:function(){return this.querySelector(".range__left")}},{key:"value",get:function(){return this._input.value},set:function(val){return this._input.value=val,this._onChange(),this._input.val}}]),MaterialInputElement}(BaseElement);return window.OnsRangeElement=document.registerElement("ons-range",{prototype:MaterialInputElement$1.prototype}),ons$1._util=util,ons$1._deviceBackButtonDispatcher=deviceBackButtonDispatcher,ons$1._internal=internal,ons$1.GestureDetector=GestureDetector,ons$1.platform=platform,ons$1.softwareKeyboard=softwareKeyboard,ons$1.pageAttributeExpression=pageAttributeExpression,ons$1.orientation=orientation,ons$1.notification=notification,ons$1._animationOptionsParser=animationOptionsParser,ons$1._DoorLock=DoorLock,window.addEventListener("DOMContentLoaded",function(){ons$1._deviceBackButtonDispatcher.enable()}),window.addEventListener("load",function(){return FastClick.attach(document.body)},!1),window.addEventListener("DOMContentLoaded",function(){ons$1._defaultDeviceBackButtonHandler=deviceBackButtonDispatcher.createHandler(window.document.body,function(){navigator.app.exitApp()})},!1),ons$1.ready(function(){ons$1._setupLoadingPlaceHolders()}),(new Viewport).setup(),Modernizr.testStyles("#modernizr { -webkit-overflow-scrolling:touch }",function(elem,rule){Modernizr.addTest("overflowtouch",window.getComputedStyle&&"touch"==window.getComputedStyle(elem).getPropertyValue("-webkit-overflow-scrolling"))}),ons$1});
/*** <End:monaca-onsenui LoadJs:"components/monaca-onsenui/js/onsenui.min.js"> ***/
/*** <End:monaca-onsenui> ***/

/*** <Start:monaca-jquery> ***/
/*** <Start:monaca-jquery LoadJs:"components/monaca-jquery/jquery.js"> ***/
/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Support: IE9
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: Date.now,

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {
	var input = document.createElement("input"),
		fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Finish early in limited environments
	if ( !input.type ) {
		return support;
	}

	input.type = "checkbox";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Will be defined later
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;
	support.pixelPosition = false;

	// Make sure checked status is properly cloned
	// Support: IE9, IE10
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment.appendChild( input );

	// Support: Safari 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: Firefox, Chrome, Safari
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	support.focusinBubbles = "onfocusin" in window;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			body = document.getElementsByTagName("body")[ 0 ];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		// Check box-sizing and margin behavior.
		body.appendChild( container ).appendChild( div );
		div.innerHTML = "";
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		body.removeChild( container );
	});

	return support;
})( {} );

/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;

Data.accepts = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType ?
		owner.nodeType === 1 || owner.nodeType === 9 : true;
};

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( core_rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};

// These may be used throughout the jQuery core codebase
data_user = new Data();
data_priv = new Data();


jQuery.extend({
	acceptData: Data.accepts,

	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[ 0 ],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return jQuery.access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
		var fn = jQuery.expr.attrHandle[ name ],
			ret = isXML ?
				undefined :
				/* jshint eqeqeq: false */
				// Temporarily disable this handler to check existence
				(jQuery.expr.attrHandle[ name ] = undefined) !=
					getter( elem, name, isXML ) ?

					name.toLowerCase() :
					null;

		// Restore handler
		jQuery.expr.attrHandle[ name ] = fn;

		return ret;
	};
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return core_indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because core_push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because core_push.apply(_, arraylike) throws
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			i = 0,
			l = elems.length,
			fragment = context.createDocumentFragment(),
			nodes = [];

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( Data.accepts( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var l = elems.length,
		i = 0;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}


function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var curCSS, iframe,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ) {
	return window.getComputedStyle( elem, null );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

curCSS = function( elem, name, _computed ) {
	var width, minWidth, maxWidth,
		computed = _computed || getStyles( elem ),

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
		style = elem.style;

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: Safari 5.1
		// A tribute to the "awesome hack by Dean Edwards"
		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret;
};


function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	// Support: Android 2.3
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// Support: Android 2.3
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrSupported = jQuery.ajaxSettings.xhr(),
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	// Support: IE9
	// We need to keep track of outbound xhr and abort them manually
	// because IE is not smart enough to do it all by itself
	xhrId = 0,
	xhrCallbacks = {};

if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
		xhrCallbacks = undefined;
	});
}

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i, id,
					xhr = options.xhr();
				xhr.open( options.type, options.url, options.async, options.username, options.password );
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file protocol always yields status 0, assume 404
									xhr.status || 404,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// #11426: When requesting binary data, IE9 will throw an exception
									// on any attempt to access responseText
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");
				// Create the abort callback
				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		elem = this[ 0 ],
		box = { top: 0, left: 0 },
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top + win.pageYOffset - docElem.clientTop,
		left: box.left + win.pageXOffset - docElem.clientLeft
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.jQuery = window.$ = jQuery;
}

})( window );

/*** <End:monaca-jquery LoadJs:"components/monaca-jquery/jquery.js"> ***/
/*** <End:monaca-jquery> ***/