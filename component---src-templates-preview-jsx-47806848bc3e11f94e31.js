(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{bL53:function(e,a,t){"use strict";t.r(a);t("KKXr"),t("91GP");var o=t("q1tI"),r=t.n(o),i=(t("tUrg"),t("Wbzz")),n=t("R/WZ"),c=t("tRbT"),s=t("k1TG"),l=t("aXB2"),d=(t("17x9"),t("iuhU")),b=t("kKAo"),p=t("H2TA"),m=r.a.forwardRef((function(e,a){var t=e.classes,o=e.className,i=e.raised,n=void 0!==i&&i,c=Object(l.a)(e,["classes","className","raised"]);return r.a.createElement(b.a,Object(s.a)({className:Object(d.a)(t.root,o),elevation:n?8:1,ref:a},c))})),u=Object(p.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(m),f=t("VD++"),g=r.a.forwardRef((function(e,a){var t=e.children,o=e.classes,i=e.className,n=e.focusVisibleClassName,c=Object(l.a)(e,["children","classes","className","focusVisibleClassName"]);return r.a.createElement(f.a,Object(s.a)({className:Object(d.a)(o.root,i),focusVisibleClassName:Object(d.a)(n,o.focusVisible),ref:a},c),t,r.a.createElement("span",{className:o.focusHighlight}))})),h=Object(p.a)((function(e){return{root:{display:"block",textAlign:"inherit",width:"100%","&:hover $focusHighlight":{opacity:e.palette.action.hoverOpacity},"&$focusVisible $focusHighlight":{opacity:.12}},focusVisible:{},focusHighlight:{overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:e.transitions.create("opacity",{duration:e.transitions.duration.short})}}}),{name:"MuiCardActionArea"})(g),v=(t("V+eJ"),["video","audio","picture","iframe","img"]),y=r.a.forwardRef((function(e,a){var t=e.children,o=e.classes,i=e.className,n=e.component,c=void 0===n?"div":n,b=e.image,p=e.src,m=e.style,u=Object(l.a)(e,["children","classes","className","component","image","src","style"]),f=-1!==v.indexOf(c),g=!f&&b?Object(s.a)({backgroundImage:'url("'.concat(b,'")')},m):m;return r.a.createElement(c,Object(s.a)({className:Object(d.a)(o.root,i,f&&o.media,-1!=="picture img".indexOf(c)&&o.img),ref:a,style:g,src:f?b||p:void 0},u),t)})),O=Object(p.a)({root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"},img:{objectFit:"cover"}},{name:"MuiCardMedia"})(y),j=r.a.forwardRef((function(e,a){var t=e.classes,o=e.className,i=e.component,n=void 0===i?"div":i,c=Object(l.a)(e,["classes","className","component"]);return r.a.createElement(n,Object(s.a)({className:Object(d.a)(t.root,o),ref:a},c))})),x=Object(p.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(j),k=t("ofer"),S=r.a.forwardRef((function(e,a){var t=e.disableSpacing,o=void 0!==t&&t,i=e.classes,n=e.className,c=Object(l.a)(e,["disableSpacing","classes","className"]);return r.a.createElement("div",Object(s.a)({className:Object(d.a)(i.root,n,!o&&i.spacing),ref:a},c))})),C=Object(p.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(S),w=t("qKvR"),N=Object(n.a)({root:{display:"flex",width:"100%",minHeight:"80vh",justifyContent:"center"},list:{margin:"auto",width:"80vw",minHeight:"50vh"},card:{},media:{height:120},title:{paddingBottom:0,fontSize:".9rem"},footer:{width:"100%",fontSize:".9rem"},link:{textDecoration:"none"}});function z(e){var a=e.title,t=e.date,o=e.slug,r=N();return Object(w.a)(c.a,{item:!0,xs:12,sm:3},Object(w.a)(i.Link,{className:r.link,to:"/blogs"+o},Object(w.a)(u,{className:r.card},Object(w.a)(h,null,Object(w.a)(O,{className:r.media,image:"/static/images/cards/contemplative-reptile.jpg",title:"Contemplative Reptile"}),Object(w.a)(x,{className:r.title},Object(w.a)(k.a,{variant:"h6",component:"div"},a))),Object(w.a)(C,null,Object(w.a)(k.a,{className:r.footer,align:"right",gutterBottom:!0,variant:"caption",component:"span"},t)))))}var R=function(e){var a=e.list,t=N();return Object(w.a)("div",{className:t.root},Object(w.a)(c.a,{className:t.list,container:!0,spacing:2},a.map((function(e,a){return Object(w.a)(z,{key:a,title:e.node.frontmatter.title,date:e.node.frontmatter.date,slug:e.node.fields.slug})}))))},E=t("aXM8"),I=t("cNwE");function B(){return Object(E.a)()||I.a}t("bWfx");var M=t("t8Zj"),P=t("NqtD"),L=t("ye/S"),$=r.a.forwardRef((function(e,a){var t=e.classes,o=e.className,i=e.color,n=void 0===i?"primary":i,c=e.value,b=e.valueBuffer,p=e.variant,m=void 0===p?"indeterminate":p,u=Object(l.a)(e,["classes","className","color","value","valueBuffer","variant"]),f=B(),g={},h={bar1:{},bar2:{}};if("determinate"===m||"buffer"===m)if(void 0!==c){g["aria-valuenow"]=Math.round(c);var v=c-100;"rtl"===f.direction&&(v=-v),h.bar1.transform="translateX(".concat(v,"%)")}else 0;if("buffer"===m)if(void 0!==b){var y=(b||0)-100;"rtl"===f.direction&&(y=-y),h.bar2.transform="translateX(".concat(y,"%)")}else 0;return r.a.createElement("div",Object(s.a)({className:Object(d.a)(t.root,t["color".concat(Object(P.a)(n))],o,{determinate:t.determinate,indeterminate:t.indeterminate,buffer:t.buffer,query:t.query}[m]),role:"progressbar"},g,{ref:a},u),"buffer"===m?r.a.createElement("div",{className:Object(d.a)(t.dashed,t["dashedColor".concat(Object(P.a)(n))])}):null,r.a.createElement("div",{className:Object(d.a)(t.bar,t["barColor".concat(Object(P.a)(n))],("indeterminate"===m||"query"===m)&&t.bar1Indeterminate,{determinate:t.bar1Determinate,buffer:t.bar1Buffer}[m]),style:h.bar1}),"determinate"===m?null:r.a.createElement("div",{className:Object(d.a)(t.bar,("indeterminate"===m||"query"===m)&&t.bar2Indeterminate,"buffer"===m?[t["color".concat(Object(P.a)(n))],t.bar2Buffer]:t["barColor".concat(Object(P.a)(n))]),style:h.bar2}))})),V=Object(p.a)((function(e){var a=function(a){return"light"===e.palette.type?Object(L.e)(a,.62):Object(L.a)(a,.5)},t=a(e.palette.primary.main),o=a(e.palette.secondary.main);return{root:{position:"relative",overflow:"hidden",height:4},colorPrimary:{backgroundColor:t},colorSecondary:{backgroundColor:o},determinate:{},indeterminate:{},buffer:{backgroundColor:"transparent"},query:{transform:"rotate(180deg)"},dashed:{position:"absolute",marginTop:0,height:"100%",width:"100%",animation:"$buffer 3s infinite linear"},dashedColorPrimary:{backgroundImage:"radial-gradient(".concat(t," 0%, ").concat(t," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0px -23px"},dashedColorSecondary:{backgroundImage:"radial-gradient(".concat(o," 0%, ").concat(o," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0px -23px"},bar:{width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},barColorPrimary:{backgroundColor:e.palette.primary.main},barColorSecondary:{backgroundColor:e.palette.secondary.main},bar1Indeterminate:{width:"auto",animation:"$indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite"},bar1Determinate:{transition:"transform .".concat(4,"s linear")},bar1Buffer:{zIndex:1,transition:"transform .".concat(4,"s linear")},bar2Indeterminate:{width:"auto",animation:"$indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite"},bar2Buffer:{transition:"transform .".concat(4,"s linear")},"@keyframes indeterminate1":{"0%":{left:"-35%",right:"100%"},"60%":{left:"100%",right:"-90%"},"100%":{left:"100%",right:"-90%"}},"@keyframes indeterminate2":{"0%":{left:"-200%",right:"100%"},"60%":{left:"107%",right:"-8%"},"100%":{left:"107%",right:"-8%"}},"@keyframes buffer":{"0%":{opacity:1,backgroundPosition:"0px -23px"},"50%":{opacity:0,backgroundPosition:"0px -23px"},"100%":{opacity:1,backgroundPosition:"-200px -23px"}}}}),{name:"MuiLinearProgress"})($),T=r.a.forwardRef((function(e,a){var t=e.activeStep,o=void 0===t?0:t,i=e.backButton,n=e.classes,c=e.className,p=e.LinearProgressProps,m=e.nextButton,u=e.position,f=void 0===u?"bottom":u,g=e.steps,h=e.variant,v=void 0===h?"dots":h,y=Object(l.a)(e,["activeStep","backButton","classes","className","LinearProgressProps","nextButton","position","steps","variant"]);return r.a.createElement(b.a,Object(s.a)({square:!0,elevation:0,className:Object(d.a)(n.root,n["position".concat(Object(P.a)(f))],c),ref:a},y),i,"text"===v&&r.a.createElement(r.a.Fragment,null,o+1," / ",g),"dots"===v&&r.a.createElement("div",{className:n.dots},Object(M.a)(new Array(g)).map((function(e,a){return r.a.createElement("div",{key:a,className:Object(d.a)(n.dot,a===o&&n.dotActive)})}))),"progress"===v&&r.a.createElement(V,Object(s.a)({className:n.progress,variant:"determinate",value:Math.ceil(o/(g-1)*100)},p)),m)})),q=Object(p.a)((function(e){return{root:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",background:e.palette.background.default,padding:8},positionBottom:{position:"fixed",bottom:0,left:0,right:0,zIndex:e.zIndex.mobileStepper},positionTop:{position:"fixed",top:0,left:0,right:0,zIndex:e.zIndex.mobileStepper},positionStatic:{},dots:{display:"flex",flexDirection:"row"},dot:{backgroundColor:e.palette.action.disabled,borderRadius:"50%",width:8,height:8,margin:"0 2px"},dotActive:{backgroundColor:e.palette.primary.main},progress:{width:"50%"}}}),{name:"MuiMobileStepper"})(T),A=r.a.forwardRef((function(e,a){var t=e.children,o=e.classes,i=e.className,n=e.color,c=void 0===n?"default":n,b=e.component,p=void 0===b?"button":b,m=e.disabled,u=void 0!==m&&m,g=e.disableElevation,h=void 0!==g&&g,v=e.disableFocusRipple,y=void 0!==v&&v,O=e.endIcon,j=e.focusVisibleClassName,x=e.fullWidth,k=void 0!==x&&x,S=e.size,C=void 0===S?"medium":S,w=e.startIcon,N=e.type,z=void 0===N?"button":N,R=e.variant,E=void 0===R?"text":R,I=Object(l.a)(e,["children","classes","className","color","component","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"]),B=w&&r.a.createElement("span",{className:Object(d.a)(o.startIcon,o["iconSize".concat(Object(P.a)(C))])},w),M=O&&r.a.createElement("span",{className:Object(d.a)(o.endIcon,o["iconSize".concat(Object(P.a)(C))])},O);return r.a.createElement(f.a,Object(s.a)({className:Object(d.a)(o.root,o[E],i,"inherit"===c?o.colorInherit:"default"!==c&&o["".concat(E).concat(Object(P.a)(c))],"medium"!==C&&[o["".concat(E,"Size").concat(Object(P.a)(C))],o["size".concat(Object(P.a)(C))]],h&&o.disableElevation,u&&o.disabled,k&&o.fullWidth),component:p,disabled:u,focusRipple:!y,focusVisibleClassName:Object(d.a)(o.focusVisible,j),ref:a,type:z},I),r.a.createElement("span",{className:o.label},B,t,M))})),D=Object(p.a)((function(e){return{root:Object(s.a)({},e.typography.button,{boxSizing:"border-box",minWidth:64,padding:"6px 16px",borderRadius:e.shape.borderRadius,color:e.palette.text.primary,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),"&:hover":{textDecoration:"none",backgroundColor:Object(L.c)(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"},"&$disabled":{backgroundColor:"transparent"}},"&$disabled":{color:e.palette.action.disabled}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},text:{padding:"6px 8px"},textPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(L.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},textSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(L.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},outlined:{padding:"5px 15px",border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"&$disabled":{border:"1px solid ".concat(e.palette.action.disabled)}},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(Object(L.c)(e.palette.primary.main,.5)),"&:hover":{border:"1px solid ".concat(e.palette.primary.main),backgroundColor:Object(L.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(Object(L.c)(e.palette.secondary.main,.5)),"&:hover":{border:"1px solid ".concat(e.palette.secondary.main),backgroundColor:Object(L.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{border:"1px solid ".concat(e.palette.action.disabled)}},contained:{color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],boxShadow:e.shadows[2],"&:hover":{backgroundColor:e.palette.grey.A100,boxShadow:e.shadows[4],"@media (hover: none)":{boxShadow:e.shadows[2],backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}},"&$focusVisible":{boxShadow:e.shadows[6]},"&:active":{boxShadow:e.shadows[8]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}},containedPrimary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},containedSecondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},disableElevation:{boxShadow:"none","&:hover":{boxShadow:"none"},"&$focusVisible":{boxShadow:"none"},"&:active":{boxShadow:"none"},"&$disabled":{boxShadow:"none"}},focusVisible:{},disabled:{},colorInherit:{color:"inherit",borderColor:"currentColor"},textSizeSmall:{padding:"4px 5px",fontSize:e.typography.pxToRem(13)},textSizeLarge:{padding:"8px 11px",fontSize:e.typography.pxToRem(15)},outlinedSizeSmall:{padding:"3px 9px",fontSize:e.typography.pxToRem(13)},outlinedSizeLarge:{padding:"7px 21px",fontSize:e.typography.pxToRem(15)},containedSizeSmall:{padding:"4px 10px",fontSize:e.typography.pxToRem(13)},containedSizeLarge:{padding:"8px 22px",fontSize:e.typography.pxToRem(15)},sizeSmall:{},sizeLarge:{},fullWidth:{width:"100%"},startIcon:{display:"inherit",marginRight:8,marginLeft:-4,"&$iconSizeSmall":{marginLeft:-2}},endIcon:{display:"inherit",marginRight:-4,marginLeft:8,"&$iconSizeSmall":{marginRight:-2}},iconSizeSmall:{"& > *:first-child":{fontSize:18}},iconSizeMedium:{"& > *:first-child":{fontSize:20}},iconSizeLarge:{"& > *:first-child":{fontSize:22}}}}),{name:"MuiButton"})(A),H=t("HR5l");function W(e,a){var t=r.a.memo(r.a.forwardRef((function(a,t){return r.a.createElement(H.a,Object(s.a)({ref:t},a),e)})));return t.muiName=H.a.muiName,t}var F=W(r.a.createElement("path",{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"})),X=W(r.a.createElement("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"})),K=Object(n.a)((function(e){return{root:{margin:"auto",width:"70vw"},stepper:{background:"#fff"}}}));var J=function(e){var a=e.pageCount,t=e.skipFn,r=void 0!==t&&t,i=B(),n=K(),c=Object(o.useState)(0),s=c[0],l=c[1],d=a;return Object(o.useEffect)((function(){r&&r(s+1)}),[s]),Object(w.a)("div",{className:n.root},Object(w.a)(q,{className:n.stepper,steps:d,position:"static",variant:"text",activeStep:s,nextButton:Object(w.a)(D,{size:"small",onClick:function(){l((function(e){return e+1}))},disabled:s===d-1},"Next","rtl"===i.direaction?Object(w.a)(F,null):Object(w.a)(X,null)),backButton:Object(w.a)(D,{size:"small",onClick:function(){l((function(e){return e-1}))},disabled:0===s},"rtl"===i.direction?Object(w.a)(X,null):Object(w.a)(F,null),"Back")}))};t.d(a,"query",(function(){return G}));var G="2298034340";a.default=function(e){var a=e.data,t=e.pathContext.base,i=Object.assign([],a.allMarkdownRemark.edges),n=Math.ceil(i.length/8),c=Object(o.useState)(0),s=c[0],l=c[1],d=Object(o.useState)(i),b=d[0],p=d[1];return Object(o.useEffect)((function(){p(i.slice(s,s+8)),l(s+8)}),[]),Object(w.a)(r.a.Fragment,null,Object(w.a)(R,{list:b,type:t.split("/")[1]}),Object(w.a)(J,{pageCount:n,skipFn:function(e){p(i.slice(s,8*e)),l(s+8)}}))}}}]);
//# sourceMappingURL=component---src-templates-preview-jsx-47806848bc3e11f94e31.js.map