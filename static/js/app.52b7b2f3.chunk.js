(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{104:function(e,t,n){"use strict";(function(e){var r=n(7),i=n.n(r),o=n(16),a=n.n(o),c=n(11),l=n.n(c),s=n(0),u=n.n(s),d=n(8),j=n(3),b=n(9),f=n(27),O=n(50),h=n(78),g=n(2),p=n(169),y=n(52),x=n(133),v=n(42),w=n(28),m=n(57),A=n(1);function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var I=j.a.create({shadow:{shadowColor:"#6b6b6b",shadowOpacity:.26,shadowOffset:{width:0,height:2},shadowRadius:10,elevation:10}});t.a=u.a.forwardRef((function(t,n){var r=t.safeArea,i=t.visible,o=t.animated,c=void 0===o||o,u=(t.placement,t.transitionShow),j=void 0===u?"flipUp":u,C=t.transitionHide,D=void 0===C?"flipDown":C,P=t.adjustFrame,B=void 0===P?y.a:P,R=t.onModalWillHide,k=void 0===R?y.b:R,V=t.onModalWillShow,T=void 0===V?y.b:V,E=t.dropdownProps,M=void 0===E?{}:E,W=t.dropdownStyle,U=void 0===W?{}:W,F=t.modalProps,H=void 0===F?{}:F,Q=t.Trigger,N=t.Overlay,G=Object(h.a)(),J=Object(s.useRef)(null),Y=Object(s.useRef)(null),z=Object(s.useRef)({x:0,y:0,w:0,h:0}),q=Object(s.useRef)({x:0,y:0,w:0,h:0}),L=Object(s.useCallback)((function(){var e=q.current.h,t=z.current,n=t.x,r=t.y,i=t.w,o=t.h,a=G.height-r-o,c=G.width-n,l=c>=n,s={top:a>=e||a>=r?r+o:Math.max(0,r-e)};return l?s.left=n:s.right=c-i,B(s)}),[B,G]),K=Object(x.a)(),Z=Object(s.useState)(w.a.Unmounted),X=l()(Z,2),$=X[0],_=X[1],ee=function(e){!1!==k(e)&&(_(w.a.BeforeUnmounted),K.hide({overlayBounds:q.current,triggerBounds:z.current,transitionShow:j,transitionHide:D}).then((function(e){_(w.a.Unmounted)})))},te=function(e){!1!==T(e)&&("slideUp"===j?_(w.a.Measure):(_(w.a.Render),K.show({overlayBounds:q.current,triggerBounds:z.current,transitionShow:j,transitionHide:D})))},ne=function(){return ee(w.b.WithRef)},re=function(){return te(w.c.WithRef)},ie=Object(s.useRef)(i);Object(s.useEffect)((function(){ie.current!==i&&(ie.current=i,i?te(w.c.VisibleStateChange):ee(w.b.VisibleStateChange))}),[i,D,j]),Object(s.useImperativeHandle)(n,(function(){return{hide:ne,show:re}}));var oe=Object(s.useMemo)((function(){return"function"===typeof Q?Object(m.b)(Object(A.jsx)(Q,{}),{onPress:function(){return te(w.c.ClickTrigger)}}):"object"===typeof Q?Q:Object(A.jsx)(f.a,{onPress:function(){return te(w.c.ClickTrigger)},children:Object(A.jsx)(b.a,{style:{color:"#2d8cfe"},children:Q})})}),[Q,j,D]),ae=L(),ce=$!==w.a.Unmounted,le={triggerBounds:z.current,overlayBounds:q.current,windowSize:G,safeArea:r,onRequestClose:function(){return ee(w.b.ClickOverlayInside)},visible:ce,show:re,hide:ne},se=Object(A.jsx)(p.a,S(S({supportedOrientations:["portrait","portrait-upside-down","landscape","landscape-left","landscape-right"],statusBarTranslucent:!0},H),{},{style:[null==H?void 0:H.style,{margin:0}],hasBackdrop:!1,animationInTiming:1,animationOutTiming:1,isVisible:ce,onBackButtonPress:function(){return ee(w.b.ClickBackButton)},children:$===w.a.Measure?Object(A.jsx)(m.c,{onCapture:function(t){return a.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:q.current=t,K.show({overlayBounds:q.current,triggerBounds:z.current,transitionShow:j,transitionHide:D}),e((function(){return _(w.a.Render)}));case 3:case"end":return n.stop()}}),null,null,null,Promise)},style:ae,children:"function"===typeof N?Object(A.jsx)(N,S({},le)):N}):($===w.a.Render||$===w.a.BeforeUnmounted)&&Object(A.jsx)(O.a,{onPress:function(){return ee(w.b.ClickOverlayOutside)},children:Object(A.jsx)(g.a,{style:{flex:1},children:Object(A.jsx)(d.a.View,{ref:Y,onLayout:function(e){var t;(null==(t=Y.current)?void 0:t.measure)&&Y.current.measure((function(e,t,n,r,i,o){q.current={x:i,y:o,w:n,h:r}}))},style:[ae,{position:"absolute"},I.shadow,c&&K.animatedStyle],children:"function"===typeof N?Object(A.jsx)(N,S({},le)):N})})})}));return Object(A.jsx)(v.a,{value:{triggerBounds:z.current,overlayBounds:q.current,windowSize:G,safeArea:r,onRequestClose:function(){return ee(w.b.ClickOverlayInside)},visible:ce,show:re,hide:ne},children:Object(A.jsxs)(g.a,S(S({},M),{},{onLayout:function(e){null==M.onLayout||M.onLayout(e),J.current.measure((function(e,t,n,r,i,o){z.current={x:i,y:o,w:n,h:r}}))},ref:J,style:[U,{position:"relative"}],children:[oe,se]}))})}))}).call(this,n(105).setImmediate)},133:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var r=n(7),i=n.n(r),o=n(11),a=n.n(o),c=n(0),l=n(8);n(3);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=function(e,t){var n=JSON.parse(JSON.stringify(j[e]));switch(e){case"fadeIn":case"fadeOut":case"flipDown":case"flipUp":case"scaleIn":case"scaleOut":return n;case"slideUp":return n.interpolate={inputRange:[0,t.overlayBounds.h],outputRange:[0,t.overlayBounds.h]},n.initialValue=0,n.config.toValue=t.overlayBounds.h,n;case"slideDown":return n.interpolate={inputRange:[0,t.overlayBounds.h],outputRange:[0,t.overlayBounds.h]},n.initialValue=t.overlayBounds.h,n.config.toValue=0,n}},j={flipUp:{config:{duration:200,toValue:0,useNativeDriver:!0},interpolate:{inputRange:[0,180],outputRange:["0deg","180deg"]},initialValue:90,animationType:"timing"},flipDown:{config:{duration:200,toValue:90,useNativeDriver:!0},interpolate:{inputRange:[0,90],outputRange:["0deg","90deg"]},initialValue:0,animationType:"timing"},scaleIn:{config:{duration:200,toValue:1,useNativeDriver:!0},interpolate:{inputRange:[0,1],outputRange:[0,1]},initialValue:0,animationType:"timing"},scaleOut:{config:{duration:200,toValue:0,useNativeDriver:!0},interpolate:{inputRange:[0,1],outputRange:[0,1]},initialValue:1,animationType:"timing"},fadeIn:{config:{toValue:1,duration:200,useNativeDriver:!0},interpolate:{inputRange:[0,1],outputRange:[0,1]},initialValue:0,animationType:"timing"},fadeOut:{config:{toValue:0,duration:200,useNativeDriver:!0},interpolate:{inputRange:[0,1],outputRange:[0,1]},initialValue:1,animationType:"timing"},slideUp:{config:{toValue:0,duration:200,useNativeDriver:!1},initialValue:0,animationType:"timing"},slideDown:{config:{toValue:0,duration:200,useNativeDriver:!1},initialValue:0,animationType:"timing"}},b=function(){var e=Object(c.useRef)(new l.a.Value(90)),t=Object(c.useState)({}),n=a()(t,2),r=n[0],i=n[1];return{animatedStyle:r,show:function(t){var n=t.transitionShow,r=t.overlayBounds,o=d(n,{overlayBounds:r}),a=e.current.interpolate(o.interpolate);switch(e.current.setValue(o.initialValue),n){case"flipUp":i({transform:[{rotateX:a}]});break;case"scaleIn":i({transform:[{scaleX:a,scaleY:1}]});break;case"fadeIn":i({opacity:a});break;case"slideUp":e.current=new l.a.Value(o.initialValue),i({height:e.current,overflow:"hidden"});break;default:i({})}return new Promise((function(t){l.a[o.animationType](e.current,o.config).start((function(){i((function(e){return u(u({},e),{},{overflow:"visible"})})),t()}))}))},hide:function(t){var n=t.overlayBounds,r=t.transitionHide,o=d(r,{overlayBounds:n}),a=e.current.interpolate(o.interpolate);switch(e.current.setValue(o.initialValue),r){case"flipDown":i({transform:[{rotateX:a}]});break;case"scaleOut":i({transform:[{scaleX:a,scaleY:1}]});break;case"fadeOut":i({opacity:a});break;case"slideDown":e.current=new l.a.Value(o.initialValue),i({height:e.current,overflow:"hidden"});break;default:i({})}return new Promise((function(t){l.a[o.animationType](e.current,o.config).start((function(){i((function(e){return u(u({},e),{},{overflow:"visible"})})),t()}))}))}}}},173:function(e,t,n){e.exports=n(240)},237:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABnElEQVR4Ae3WAWQCURjA8SEM4RDCYRhCCGEIMYQBwhBCGIYhDBDCMByGEIYAIQwDhBBCCGEIIYQhhOHbH4GP53uuq4368wO85/XeXfcuTqVz13jCAGMsdkboo4EQB6+MIcTTAAUkXhp9SAw/6CCV5PHMIRrmqCGPAh6whGgYIYu9ymIF0fCBS+gCTCAaZkjHPyb3xGtk4CqHrfuHxDu+NsShD6sJxKER56i2EIcWrLoQhxUu4d0rBC49WI2MOR7h3cKYbGk8nCE2xhxDeJWHeOg6xqfw6fn/FMCsBvE0RAlpBKhgCvFUglkTciRVmLUgR9L4bwuqw6wOMXwhQhV5hLhCATV0sIQYyjArGteJIny7Na4rGXj1rQZuUIGd/65P4V1HDb7Hvg3UnM/wLqcGp7FvN5CdLQJQvF3qJbtD7E6MAvWmvCBOKbypZyeFWOWwUTsVwLdQfdeWyGKvSliru0wTGWMhbfW2LpBDIoUYQ3+tJ+igtfOOqePaGiDx6lhAPM1wh4NXRt+4URZx9CKIEuFPi46/GLsIOMHO/QKl0IiOZRZz1AAAAABJRU5ErkJggg=="},238:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAARElEQVR4Ae3OoREAMAzDwI6T/ZfKGK25UZEN9HfiOugFAABGrbqfrZqWKZ8JTvlMcMpnglM+E5zymeCUz4SnFAAAqPMAcwk4+TkWYQ8AAAAASUVORK5CYII="},239:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAQklEQVR4Ae3OMQEAMAzDsMEpf1KF4QHItSs7LAQ6+pQkSQIGWN4tMP0UmSmmMlNMZaaYykwxlZluqp+JVD8jSZLSBUXSEDBjglPWAAAAAElFTkSuQmCC"},240:function(e,t,n){"use strict";n.r(t);var r=n(261),i=n(11),o=n.n(i),a=n(0),c=n(3),l=n(2),s=n(9),u=n(171),d=n(260),j=n(104),b=n(42),f=n(27),O=n(1);function h(e){var t=e.label,n=e.activeContentContainerStyle,r=e.activeLabelStyle,i=e.labelStyle,o=e.contentContainerStyle,a=e.isActive,c=e.onPress;Object(b.b)();return Object(O.jsx)(f.a,{onPress:c,style:[g.contentContainerStyle,o,a&&n],children:Object(O.jsx)(s.a,{style:[g.labelStyle,i,a&&r],children:t})})}var g=c.a.create({contentContainerStyle:{paddingVertical:6,paddingHorizontal:12},labelStyle:{textAlign:"center"}}),p=n(7),y=n.n(p),x=n(32),v=n.n(x),w=n(64),m=n(57);function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach((function(t){y()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function S(e){var t=e.data,n=e.renderItem,r=e.onAntiSelect,i=e.onSelect,o=e.onItemPress,a=e.index,c=(e.defaultIndex,v()(e,["data","renderItem","onAntiSelect","onSelect","onItemPress","index","defaultIndex"])),l=Object(b.b)(),s=function(e,t){var n={item:e,index:t};null==o||o(n),l.onRequestClose(),a===t?null==r||r(n):null==i||i(n)};return Object(O.jsx)(w.a,C(C({scrollEnabled:!0,data:t,keyExtractor:function(e,t){return t.toString()},renderItem:function(e){var t=e.index,r=e.item,i=t===a;return"function"===typeof n?Object(m.b)(n({item:r,index:a,isActive:i}),{onPress:function(){return s(r,t)}}):Object(O.jsx)(h,{label:r,isActive:i,onPress:function(){return s(r,t)}})},automaticallyAdjustContentInsets:!1,showsVerticalScrollIndicator:!1},c),{},{style:[{backgroundColor:"#ffffff",height:l.windowSize.height/5},{width:l.triggerBounds.w},c.style]}))}var I=n(8);function D(e){var t=Object(b.b)(),n=Object(a.useRef)(new I.a.Value(0));Object(a.useEffect)((function(){t.visible?I.a.spring(n.current,{toValue:180,useNativeDriver:!0}).start():I.a.spring(n.current,{toValue:0,useNativeDriver:!0}).start()}),[t.visible]);var r=n.current.interpolate({inputRange:[0,180],outputRange:["0deg","180deg"]});if("label"in e){var i=null!==e.Icon;return Object(O.jsxs)(f.a,{disabled:e.disabled,onPress:t.show,style:[P.contentContainerStyle,P.border,e.contentContainerStyle],children:[Object(O.jsx)(s.a,{style:[P.label,e.disabled&&P.labelDisabled,e.labelStyle],children:e.label}),i?Object(O.jsx)(l.a,{style:{width:8}}):null,i?e.Icon?e.Icon:Object(O.jsx)(m.a,{style:{transform:[{rotate:r}]}}):null]})}return Object(O.jsx)(l.a,{style:[P.contentContainerStyle,P.border,e.contentContainerStyle],children:e.children})}var P=c.a.create({contentContainerStyle:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",paddingVertical:4,paddingHorizontal:12},border:{borderWidth:c.a.hairlineWidth,borderColor:"#d9d9d9",borderStyle:"solid",borderRadius:2},label:{fontSize:16,color:"#000000d9"},labelDisabled:{color:"rgba(0,0,0,0.5)"}}),B=n(168),R=function(e){var t=e.visible,n=e.color,r=void 0===n?void 0:n,i=Object(a.useRef)(new I.a.Value(0));Object(a.useEffect)((function(){t?I.a.timing(i.current,{toValue:180,useNativeDriver:!0,duration:200}).start():I.a.timing(i.current,{toValue:0,useNativeDriver:!0,duration:200}).start()}),[t]);var o=i.current.interpolate({inputRange:[0,180],outputRange:["0deg","180deg"]});return Object(O.jsx)(I.a.View,{style:[{transform:[{rotate:o}]}],children:Object(O.jsx)(B.a,{color:r,size:18,name:"chevron-down-outline",type:"ionicon"})})},k=function(){return Object(O.jsx)(l.a,{style:{height:1,backgroundColor:"gray",width:"100%",marginVertical:20}})},V=["option 1","option 2","special","option 4","option 5","option 6","option 7","option 8","option 9"],T=["flipUp","scaleIn","fadeIn","slideUp"],E=["flipDown","scaleOut","fadeOut","slideDown"];var M=c.a.create({container:{flex:1,justifyContent:"center",alignItems:"center"},row:{flexDirection:"column",paddingVertical:50,justifyContent:"center",alignItems:"center"}}),W=["option 1","option 2","option 3","option 4","option 5","option 6","option 7","option 8","option 9"];var U=c.a.create({container:{flex:1},row:{flex:1,flexDirection:"row"},cell:{flex:1,flexDirection:"column"}}),F=(n(44),["option 1","option 2","special","option 4","option 5","option 6","option 7","option 8","option 9"]),H=["selectable","selectable","I can't be Selected","option 4","option 5","option 6","I can't be Selected","option 8","option 9"],Q=function(e){var t=e.style;return Object(O.jsx)(I.a.Image,{source:n(238),style:[{width:18,height:18},t]})};var N=c.a.create({container:{flex:1,justifyContent:"center",alignItems:"center"},title:{fontSize:18},label:{fontSize:16},row:{flexDirection:"column",paddingVertical:50,width:"80%",justifyContent:"center",alignItems:"center"},cell:{flex:1,flexDirection:"column"},dropdownContainer:{},labelContainer:{justifyContent:"space-between",flexDirection:"row"},border:{borderColor:"rgb(217, 217, 217)",borderWidth:1,borderStyle:"solid"},pa5:{padding:5}}),G=n(79),J=["option 1","option 2","special","option 4","option 5","option 6","option 7","option 8","option 9"];var Y=c.a.create({container:{flex:1,justifyContent:"center",alignItems:"center"},row:{flexDirection:"column",paddingVertical:50,justifyContent:"center",alignItems:"center"}}),z=["option 1","option 2","option 3","option 4","option 5","option 6","option 7","option 8","option 9"];var q=c.a.create({container:{flex:1},row:{flex:1,flexDirection:"row"},cell:{flex:1,flexDirection:"column"}}),L={BaseExample:function(){var e,t=Object(a.useState)(-1),n=o()(t,2),r=n[0],i=n[1],c=Object(a.useState)(!1),u=o()(c,2),d=u[0],b=u[1],h=Object(a.useState)(!1),g=o()(h,2),p=(g[0],g[1]),y=Object(a.useState)(!1),x=o()(y,2),v=(x[0],x[1]),w=Object(a.useState)(!1),m=o()(w,2),A=(m[0],m[1]),C=Object(a.useState)(!1),P=o()(C,2),B=(P[0],P[1]),R=Object(a.useRef)(new I.a.Value(0));Object(a.useEffect)((function(){d?I.a.timing(R.current,{toValue:180,useNativeDriver:!0,duration:100}).start():I.a.timing(R.current,{toValue:0,useNativeDriver:!0,duration:100}).start()}),[d]);var V=R.current.interpolate({inputRange:[0,180],outputRange:["0deg","180deg"]});return Object(O.jsxs)(l.a,{style:N.container,children:[Object(O.jsx)(s.a,{style:N.title,children:"Dropdown Examples"}),Object(O.jsxs)(l.a,{style:N.row,children:[Object(O.jsx)(s.a,{style:N.label,children:"Basic Picker"}),Object(O.jsx)(j.a,{visible:d,onModalWillShow:function(){return b(!0)},onModalWillHide:function(){return b(!1)},Trigger:Object(O.jsxs)(f.a,{onPress:function(){return b(!0)},style:[{flexDirection:"row"},N.dropdownContainer],children:[Object(O.jsx)(s.a,{children:null!=(e=F[r])?e:"Press me"}),Object(O.jsx)(Q,{style:{transform:[{rotate:V}]}})]}),Overlay:Object(O.jsx)(S,{style:{width:"auto"},onSelect:function(e){var t=e.index;return i(t)},data:F})}),Object(O.jsx)(k,{}),Object(O.jsx)(s.a,{style:N.label,children:"With DropdownButton"}),Object(O.jsx)(j.a,{onModalWillShow:function(){return p(!0)},onModalWillHide:function(){return p(!1)},Overlay:Object(O.jsx)(S,{data:F}),Trigger:Object(O.jsx)(D,{label:"Press me"})}),Object(O.jsx)(k,{}),Object(O.jsx)(s.a,{style:N.label,children:"With Disabled"}),Object(O.jsx)(j.a,{onModalWillShow:function(){return v(!0)},onModalWillHide:function(){return v(!1)},Overlay:Object(O.jsx)(S,{data:F}),Trigger:Object(O.jsx)(D,{disabled:!0,label:"Press me"})}),Object(O.jsx)(k,{}),Object(O.jsx)(s.a,{style:N.label,children:"With FlatList disabled"}),Object(O.jsx)(j.a,{onModalWillShow:function(){return A(!0)},onModalWillHide:function(){return A(!1)},Overlay:Object(O.jsx)(S,{index:r,onItemPress:function(e){var t=e.index;return i(t)},data:H}),Trigger:Object(O.jsx)(D,{label:"Press me"})}),Object(O.jsx)(k,{}),Object(O.jsx)(s.a,{style:N.label,children:"Without Animation"}),Object(O.jsx)(j.a,{animated:!1,onModalWillShow:function(){return B(!0)},onModalWillHide:function(){return B(!1)},Overlay:Object(O.jsx)(S,{index:r,onItemPress:function(e){var t=e.index;return i(t)},data:F}),Trigger:Object(O.jsx)(D,{label:"Press me"})})]})]})},WithAnimation:function(){var e=Object(a.useState)(3),t=o()(e,2),n=t[0],r=t[1],i=Object(a.useState)(3),c=o()(i,2),s=c[0],u=c[1];return Object(O.jsx)(l.a,{style:M.container,children:Object(O.jsxs)(l.a,{style:M.row,children:[Object(O.jsx)(j.a,{Trigger:"click to change transitionShow current is ["+T[n]+"]",Overlay:Object(O.jsx)(S,{onSelect:function(e){var t=e.index;r(t)},data:T})}),Object(O.jsx)(j.a,{Overlay:Object(O.jsx)(S,{index:s,onSelect:function(e){var t=e.index;u(t)},data:E}),Trigger:"click to change transitionHide current is ["+E[s]+"]"}),Object(O.jsx)(k,{}),Object(O.jsx)(j.a,{dropdownProps:{testID:"debug"},transitionShow:T[n],transitionHide:E[s],Overlay:Object(O.jsx)(S,{data:V}),Trigger:"try transition"})]})})},WithAutoPosition:function(){return Object(O.jsxs)(l.a,{style:U.container,children:[Object(O.jsxs)(l.a,{style:U.row,children:[Object(O.jsx)(l.a,{style:U.cell,children:Object(O.jsx)(j.a,{Overlay:Object(O.jsx)(S,{data:W}),Trigger:"upper left corner"})}),Object(O.jsx)(l.a,{style:[U.cell,{alignItems:"flex-end"}],children:Object(O.jsx)(j.a,{Overlay:Object(O.jsx)(S,{data:W}),Trigger:"upper right corner"})})]}),Object(O.jsxs)(l.a,{style:[U.row],children:[Object(O.jsx)(l.a,{style:[U.cell,{justifyContent:"flex-end"}],children:Object(O.jsx)(j.a,{Overlay:Object(O.jsx)(S,{data:W}),Trigger:"lower left corner"})}),Object(O.jsx)(l.a,{style:[U.cell,{alignItems:"flex-end",justifyContent:"flex-end"}],children:Object(O.jsx)(j.a,{Overlay:Object(O.jsx)(S,{data:W}),Trigger:"lower right corner"})})]})]})},WithImperative:function(){var e=Object(a.useRef)(null);return Object(O.jsx)(l.a,{style:Y.container,children:Object(O.jsxs)(l.a,{style:Y.row,children:[Object(O.jsx)(j.a,{ref:e,Overlay:Object(O.jsx)(S,{data:J}),Trigger:"I'am Dropdown",transitionHide:"flipDown",transitionShow:"flipUp"}),Object(O.jsx)(G.a,{title:"click below and after 2 seconds hide",onPress:function(){e.current.show(),setTimeout((function(){e.current.hide()}),2e3)}})]})})},WithSafeArea:function(){var e=Object(u.b)();return Object(O.jsxs)(l.a,{style:q.container,children:[Object(O.jsxs)(l.a,{style:q.row,children:[Object(O.jsx)(l.a,{style:q.cell,children:Object(O.jsx)(j.a,{safeArea:e,Overlay:Object(O.jsx)(S,{data:z}),Trigger:"upper left corner"})}),Object(O.jsx)(l.a,{style:[q.cell,{alignItems:"flex-end"}],children:Object(O.jsx)(j.a,{safeArea:e,Overlay:Object(O.jsx)(S,{data:z}),Trigger:"upper right corner"})})]}),Object(O.jsxs)(l.a,{style:[q.row],children:[Object(O.jsx)(l.a,{style:[q.cell,{justifyContent:"flex-end"}],children:Object(O.jsx)(j.a,{safeArea:e,Overlay:Object(O.jsx)(S,{data:z}),Trigger:"lower left corner"})}),Object(O.jsx)(l.a,{style:[q.cell,{alignItems:"flex-end",justifyContent:"flex-end"}],children:Object(O.jsx)(j.a,{safeArea:e,Overlay:Object(O.jsx)(S,{data:z}),Trigger:"lower right corner"})})]})]})}},K=Object.keys(L);var Z=c.a.create({focus:{borderStyle:"dashed",borderColor:"#7c8686",borderWidth:1,flexDirection:"row",alignItems:"center",padding:5}}),X=["BNA","USDI","SHUIBI","ATC","CTC"];var $=c.a.create({labelContainer:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},item:{backgroundColor:"#363333",padding:10,borderColor:"#3B3B3B",borderStyle:"solid",borderWidth:1},itemActive:{backgroundColor:"#4180ff"}}),_=n(101),ee=n(50),te=n(78),ne=["Default","Latest","3H Hottest","12H Hottest"];function re(e){var t=e.onSelect,n=Object(te.a)(),r=Object(b.b)();return Object(O.jsx)(l.a,{style:{width:n.width,height:n.height-r.triggerBounds.h-r.triggerBounds.y,backgroundColor:"#d0d0d0"},children:Object(O.jsx)(w.a,{keyExtractor:function(e,t){return t.toString()},contentContainerStyle:{backgroundColor:"#ffffff"},data:ne,renderItem:function(e){var n=e.item,r=e.index;return Object(O.jsx)(f.a,{onPress:function(){return t(r)},style:{width:"100%",height:40,justifyContent:"center",alignItems:"center"},children:Object(O.jsx)(s.a,{children:n})})}})})}function ie(e){var t=e.onConfirm,n=e.onClear,r=Object(te.a)(),i=Object(b.b)();return Object(O.jsx)(l.a,{style:{width:r.width,height:r.height-i.triggerBounds.h-i.triggerBounds.y,backgroundColor:"#d0d0d0"},children:Object(O.jsx)(ee.a,{onPress:function(){},children:Object(O.jsxs)(l.a,{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:200,backgroundColor:"#ffffff"},children:[Object(O.jsxs)(l.a,{style:{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",width:"100%"},children:[Object(O.jsx)(_.a,{style:{width:100},placeholder:"Please enter min"}),Object(O.jsx)(s.a,{children:"-"}),Object(O.jsx)(_.a,{style:{width:100},placeholder:"Please enter max"})]}),Object(O.jsx)(l.a,{style:{height:20}}),Object(O.jsx)(G.a,{title:"Confirm",onPress:t}),Object(O.jsx)(G.a,{title:"Clear",onPress:n})]})})})}var oe=c.a.create({root:{flexDirection:"column",flex:1,backgroundColor:"#ffffff"},menus:{flexDirection:"row",alignItems:"center",justifyContent:"space-around"},header:{height:50,backgroundColor:"#ea7c7c",width:"100%",justifyContent:"center",alignItems:"center"}}),ae=n(262),ce=["BNA","USDI","SHUIBI","ATC","CTC"];var le=c.a.create({labelContainer:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},item:{backgroundColor:"#363333",padding:10,borderColor:"#3B3B3B",borderStyle:"solid",borderWidth:1},itemActive:{backgroundColor:"#4180ff"}}),se={VirtualCurrencyDropdown:function(){var e,t=Object(a.useState)(!1),n=o()(t,2),r=n[0],i=n[1],c=Object(a.useState)(-1),u=o()(c,2),d=u[0],b=u[1];return Object(O.jsx)(j.a,{transitionHide:"scaleOut",transitionShow:"scaleIn",onModalWillHide:function(){return i(!1)},onModalWillShow:function(){return i(!0)},visible:r,Overlay:Object(O.jsx)(S,{data:X,index:d,onSelect:function(e){var t=e.index;return b(t)},renderItem:function(e){var t=e.item,n=e.isActive;return Object(O.jsx)(l.a,{style:[$.item,n&&$.itemActive],children:Object(O.jsx)(s.a,{style:{color:"#FFFFFF"},children:t})})}}),Trigger:Object(O.jsxs)(f.a,{onPress:function(){return i(!0)},style:[$.labelContainer,$.item],children:[Object(O.jsx)(s.a,{style:{color:"#FFFFFF"},children:null!=(e=X[d])?e:"Select Currency"}),Object(O.jsx)(R,{visible:r})]})})},DemoFullscreenFilters:function(){var e=Object(a.useState)(!1),t=o()(e,2),n=t[0],r=t[1],i=Object(a.useState)(!1),c=o()(i,2),u=c[0],d=c[1],b=Object(a.useState)(0),h=o()(b,2),g=h[0],p=h[1],y=ne[g],x=Object(a.useState)({max:"",min:""}),v=o()(x,2),w=v[0],m=v[1],A=!!w.min;return Object(O.jsxs)(l.a,{style:oe.root,children:[Object(O.jsx)(l.a,{style:oe.header,children:Object(O.jsx)(s.a,{children:"Header"})}),Object(O.jsxs)(l.a,{style:oe.menus,children:[Object(O.jsx)(j.a,{transitionShow:"fadeIn",transitionHide:"fadeOut",visible:n,onModalWillHide:function(){return r(!1)},onModalWillShow:function(){return r(!0)},adjustFrame:function(e){return e.left=0,e.right=0,e},Trigger:Object(O.jsxs)(f.a,{onPress:function(){return r(!0)},style:{flexDirection:"row"},children:[Object(O.jsx)(s.a,{style:{color:A?"#ff4d4f":"#000000d9"},children:"Orders"}),Object(O.jsx)(R,{color:A?"#ff4d4f":"#b2b2b2",visible:n})]}),Overlay:Object(O.jsx)(ie,{onClear:function(){m({min:"",max:""}),r(!1)},onConfirm:function(){m({min:"10",max:"10000"}),r(!1)},range:w})}),Object(O.jsx)(j.a,{transitionShow:"fadeIn",transitionHide:"fadeOut",visible:u,onModalWillHide:function(){return d(!1)},onModalWillShow:function(){return d(!0)},adjustFrame:function(e){return e.left=0,e.right=0,e},Trigger:Object(O.jsxs)(f.a,{onPress:function(){return d(!0)},style:{flexDirection:"row",alignItems:"center"},children:[Object(O.jsx)(s.a,{style:{color:0!==g?"#ff4d4f":"#000000d9"},children:null!=y?y:"Orders"}),Object(O.jsx)(R,{color:0!==g?"#ff4d4f":"#b2b2b2",visible:u})]}),Overlay:Object(O.jsx)(re,{onSelect:function(e){p(e),d(!1)}})})]})]})},DemoBlurView:function(){var e,t=Object(a.useState)(!1),n=o()(t,2),r=n[0],i=n[1],c=Object(a.useState)(-1),u=o()(c,2),d=u[0],b=u[1];return Object(O.jsx)(l.a,{style:{flex:1,justifyContent:"center",alignItems:"center"},children:Object(O.jsx)(j.a,{onModalWillHide:function(){return i(!1)},onModalWillShow:function(){return i(!0)},visible:r,animated:!1,adjustFrame:function(e){return{top:0,left:0,right:0,bottom:0}},Overlay:function(e){return Object(O.jsx)(ae.a,{tint:"light",intensity:10,style:{left:0,top:0,position:"absolute",width:e.windowSize.width,height:e.windowSize.height},children:Object(O.jsx)(S,{data:ce,index:d,onSelect:function(e){var t=e.index;return b(t)},style:{width:100,position:"absolute",left:e.triggerBounds.x,top:e.triggerBounds.y},renderItem:function(e){var t=e.item,n=e.isActive;return Object(O.jsx)(l.a,{style:[le.item,n&&le.itemActive],children:Object(O.jsx)(s.a,{style:{color:"#FFFFFF"},children:t})})}})})},Trigger:null!=(e=ce[d])?e:"Select Currency"})})}},ue=Object.keys(se);var de=c.a.create({focus:{borderStyle:"dashed",borderColor:"#7c8686",borderWidth:1,flexDirection:"row",alignItems:"center",padding:5}}),je={FeaturesScreen:function(){var e=Object(a.useState)(1),t=o()(e,2),n=t[0],r=t[1],i=L[K[n]];return Object(O.jsxs)(l.a,{style:{flex:1},children:[Object(O.jsx)(i,{}),Object(O.jsxs)(l.a,{style:Z.focus,children:[Object(O.jsx)(s.a,{children:"current example:"}),Object(O.jsx)(j.a,{Trigger:K[n],Overlay:Object(O.jsx)(S,{data:K,onSelect:function(e){var t=e.index;return r(t)}})})]})]})},DemosScreen:function(){var e=Object(a.useState)(2),t=o()(e,2),n=t[0],r=t[1],i=se[ue[n]];return Object(O.jsxs)(l.a,{style:{flex:1},children:[Object(O.jsx)(i,{}),Object(O.jsxs)(l.a,{style:de.focus,children:[Object(O.jsx)(s.a,{children:"current demo:"}),Object(O.jsx)(j.a,{Trigger:ue[n],Overlay:Object(O.jsx)(S,{style:{width:100},data:ue,onSelect:function(e){var t=e.index;return r(t)}})})]})]})}},be=Object.keys(je);var fe=c.a.create({focus:{borderStyle:"dashed",borderColor:"#7c8686",borderWidth:1,flexDirection:"row",alignItems:"center",padding:5}});Object(r.a)((function(){var e=Object(a.useState)(1),t=o()(e,2),n=t[0],r=t[1],i=je[be[n]];return Object(O.jsx)(u.a,{children:Object(O.jsxs)(d.a,{style:{flex:1},children:[Object(O.jsxs)(l.a,{style:fe.focus,children:[Object(O.jsx)(s.a,{children:"current view:"}),Object(O.jsx)(j.a,{Overlay:Object(O.jsx)(S,{index:n,onItemPress:function(e){var t=e.index;return r(t)},data:be}),Trigger:Object(O.jsx)(D,{label:be[n]})})]}),Object(O.jsx)(i,{})]})})}))},28:function(e,t,n){"use strict";var r,i,o;n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o})),function(e){e.WithRef="WithRef",e.VisibleStateChange="VisibleStateChange",e.ClickTrigger="ClickTrigger"}(r||(r={})),function(e){e.WithRef="WithRef",e.VisibleStateChange="VisibleStateChange",e.ClickBackButton="ClickBackButton",e.ClickOverlayOutside="ClickOverlayOutside",e.ClickOverlayInside="ClickOverlayInside"}(i||(i={})),function(e){e.Measure="Measure",e.Render="Render",e.BeforeUnmounted="BeforeUnmounted",e.Unmounted="Unmounted"}(o||(o={}))},42:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return s}));var r=n(0),i=n.n(r),o=n(52),a={onRequestClose:o.a,show:o.a,hide:o.a,visible:!1,overlayBounds:{x:0,y:0,w:0,h:0},triggerBounds:{x:0,y:0,w:0,h:0},windowSize:{height:0,width:0},safeArea:void 0},c=i.a.createContext(a),l=c.Provider,s=function(){return i.a.useContext(c)}},52:function(e,t,n){"use strict";(function(e){n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return i}));var r=function(){return!0};function i(e){return e}}).call(this,n(105).setImmediate)},57:function(e,t,n){"use strict";n.d(t,"a",(function(){return g})),n.d(t,"b",(function(){return y})),n.d(t,"c",(function(){return x}));var r=n(7),i=n.n(r),o=n(32),a=n.n(o),c=n(8),l=n(89),s=n(172),u=n(27),d=n(50),j=n(2),b=n(0),f=n(1);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=function(e){var t=e.style,n=a()(e,["style"]);return Object(f.jsx)(c.a.Image,h(h({},n),{},{style:[{width:10,height:10},t],source:{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAABZklEQVR4nO3aPU7DQBRF4RMKDGw8EkKiTgGLoECsiIYCiR9RmiJxE8Wx48xM3tjnk1z7vqMUkRKQJEmSJEmSJEmSJEmSJMWx2j3F3AIb4Af4AO6BpuSAwhrgAfgE/oAn4K7EizdAu/e8Ms/YDdvb9u99zv3iFfB94MVzjN0XuQV+gavcA756Xj6n2Mcit2wbZPd4ZMAcYg9Fbtk2CDGk1tjhbrsGXgYGvQE3pQYlEPamsMMmCH9L+IEjVHNDNUMPqG57dYOpczNQ1/Cath5UwwE1bBwl8iGRt00S8aCIm5KIdFikLVlEODDChiIueehiIncucfDiIndKHr7YyJ0SARYfuZMzhJH35Ahi5B4pwxh5QIpARh7pnFBGPtGUYEae6JRwRj7T2J/7Q/0loFZjPq1+khOZGtvIE5wa28hnGBvbyAkMxTZyQn2xjZxBA6yB992zxq9wkiRJkiRJkiRJkiRJkqTy/gHHXxTfFM457gAAAABJRU5ErkJggg=="}}))},p=["TouchableHighlight","TouchableOpacity","TouchableWithoutFeedback","TouchableNativeFeedback","Pressable"];function y(e,t){var n={onPress:function(n){null==t.onPress||t.onPress(n),null==e.props.onPress||e.props.onPress(n)}};if(p.find((function(t){return t===e.type.displayName}))){var r=h(h({},e.props),{},{onPress:n.onPress}),i=e.props.children;switch(e.type.displayName){case"TouchableHighlight":return Object(f.jsx)(l.a,h(h({},r),{},{children:i}));case"TouchableOpacity":return Object(f.jsx)(u.a,h(h({},r),{},{children:i}));case"TouchableWithoutFeedback":return Object(f.jsx)(d.a,h(h({},r),{},{children:i}));case"TouchableNativeFeedback":return console.warn("react native web not support TouchableNativeFeedback"),Object(f.jsx)(s.a,h(h({},r),{},{children:e}))}}return Object(f.jsx)(u.a,h(h({},n),{},{children:e}))}var x=function(e){var t=e.children,n=e.style,r=e.onCapture,i=Object(b.useRef)(null),o=Object(b.useRef)({x:0,y:0,w:0,h:0});return Object(f.jsx)(j.a,{ref:i,onLayout:function(e){i.current.measure&&i.current.measure((function(e,t,n,i,a,c){o.current={x:a,y:c,w:n,h:i},r(o.current)}))},style:[{opacity:0,flex:1,position:"absolute"},n],children:t})}}},[[173,1,2]]]);
//# sourceMappingURL=app.52b7b2f3.chunk.js.map