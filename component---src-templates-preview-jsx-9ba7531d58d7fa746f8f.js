(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{bL53:function(e,a,t){"use strict";t.r(a);var o=t("q1tI"),r=t.n(o),i=t("lTWe"),n=t("Wbzz"),c=t("R/WZ"),l=t("tRbT"),s=t("6u8J"),d=t("wx14"),b=t("Ff2n"),p=t("iuhU"),m=t("kKAo"),u=t("H2TA"),f=o.forwardRef((function(e,a){var t=e.classes,r=e.className,i=e.raised,n=void 0!==i&&i,c=Object(b.a)(e,["classes","className","raised"]);return o.createElement(m.a,Object(d.a)({className:Object(p.a)(t.root,r),elevation:n?8:1,ref:a},c))})),g=Object(u.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(f),h=t("VD++"),v=o.forwardRef((function(e,a){var t=e.children,r=e.classes,i=e.className,n=e.focusVisibleClassName,c=Object(b.a)(e,["children","classes","className","focusVisibleClassName"]);return o.createElement(h.a,Object(d.a)({className:Object(p.a)(r.root,i),focusVisibleClassName:Object(p.a)(n,r.focusVisible),ref:a},c),t,o.createElement("span",{className:r.focusHighlight}))})),O=Object(u.a)((function(e){return{root:{display:"block",textAlign:"inherit",width:"100%","&:hover $focusHighlight":{opacity:e.palette.action.hoverOpacity},"&$focusVisible $focusHighlight":{opacity:.12}},focusVisible:{},focusHighlight:{overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:e.transitions.create("opacity",{duration:e.transitions.duration.short})}}}),{name:"MuiCardActionArea"})(v),y=["video","audio","picture","iframe","img"],j=o.forwardRef((function(e,a){var t=e.children,r=e.classes,i=e.className,n=e.component,c=void 0===n?"div":n,l=e.image,s=e.src,m=e.style,u=Object(b.a)(e,["children","classes","className","component","image","src","style"]),f=-1!==y.indexOf(c),g=!f&&l?Object(d.a)({backgroundImage:'url("'.concat(l,'")')},m):m;return o.createElement(c,Object(d.a)({className:Object(p.a)(r.root,i,f&&r.media,-1!=="picture img".indexOf(c)&&r.img),ref:a,style:g,src:f?l||s:void 0},u),t)})),x=Object(u.a)({root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"},img:{objectFit:"cover"}},{name:"MuiCardMedia"})(j),k=o.forwardRef((function(e,a){var t=e.classes,r=e.className,i=e.component,n=void 0===i?"div":i,c=Object(b.a)(e,["classes","className","component"]);return o.createElement(n,Object(d.a)({className:Object(p.a)(t.root,r),ref:a},c))})),w=Object(u.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(k),S=t("ofer"),C=o.forwardRef((function(e,a){var t=e.disableSpacing,r=void 0!==t&&t,i=e.classes,n=e.className,c=Object(b.a)(e,["disableSpacing","classes","className"]);return o.createElement("div",Object(d.a)({className:Object(p.a)(i.root,n,!r&&i.spacing),ref:a},c))})),N=Object(u.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(C),z=t("qKvR"),R=Object(c.a)((function(e){return{root:{display:"flex",width:"100%",minHeight:"80vh",justifyContent:"center"},list:{margin:"auto",width:"80vw",minHeight:"50vh"},card:{},media:{height:120,backgroundColor:e.palette.warning.light},title:{paddingTop:8,paddingBottom:0},footer:{paddingTop:0,width:"100%",fontSize:".8rem"},link:{textDecoration:"none"},cardTitle:{whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}}));function E(e){var a=e.title,t=e.date,o=e.thumbnail,r=e.slug,i=e.index,c=R();return Object(z.a)(l.a,{item:!0,xs:12,sm:3},Object(z.a)(s.a,{direction:"down",in:!0,timeout:200+30*i,key:i},Object(z.a)("div",null,Object(z.a)(n.Link,{className:c.link,to:"/blogs"+r},Object(z.a)(g,{className:c.card},Object(z.a)(O,null,Object(z.a)(x,{className:c.media,image:"/thumbnail/"+o,title:"Contemplative Reptile"}),Object(z.a)(w,{className:c.title},Object(z.a)(S.a,{className:c.cardTitle,variant:"subtitle1",component:"div"},a))),Object(z.a)(N,null,Object(z.a)(S.a,{className:c.footer,align:"right",gutterBottom:!0,variant:"body2",component:"span"},t)))))))}var I=function(e){var a=e.list,t=R();return Object(z.a)("div",{className:t.root},Object(z.a)(l.a,{className:t.list,container:!0,spacing:2},a.map((function(e,a){return Object(z.a)(E,{key:a,index:a,title:e.node.frontmatter.title,date:e.node.frontmatter.date,thumbnail:e.node.frontmatter.thumbnail,slug:e.node.fields.slug})}))))},B=t("tr08"),T=t("KQm4"),L=t("NqtD"),M=t("ye/S"),P=o.forwardRef((function(e,a){var t=e.classes,r=e.className,i=e.color,n=void 0===i?"primary":i,c=e.value,l=e.valueBuffer,s=e.variant,m=void 0===s?"indeterminate":s,u=Object(b.a)(e,["classes","className","color","value","valueBuffer","variant"]),f=Object(B.a)(),g={},h={bar1:{},bar2:{}};if("determinate"===m||"buffer"===m)if(void 0!==c){g["aria-valuenow"]=Math.round(c),g["aria-valuemin"]=0,g["aria-valuemax"]=100;var v=c-100;"rtl"===f.direction&&(v=-v),h.bar1.transform="translateX(".concat(v,"%)")}else 0;if("buffer"===m)if(void 0!==l){var O=(l||0)-100;"rtl"===f.direction&&(O=-O),h.bar2.transform="translateX(".concat(O,"%)")}else 0;return o.createElement("div",Object(d.a)({className:Object(p.a)(t.root,t["color".concat(Object(L.a)(n))],r,{determinate:t.determinate,indeterminate:t.indeterminate,buffer:t.buffer,query:t.query}[m]),role:"progressbar"},g,{ref:a},u),"buffer"===m?o.createElement("div",{className:Object(p.a)(t.dashed,t["dashedColor".concat(Object(L.a)(n))])}):null,o.createElement("div",{className:Object(p.a)(t.bar,t["barColor".concat(Object(L.a)(n))],("indeterminate"===m||"query"===m)&&t.bar1Indeterminate,{determinate:t.bar1Determinate,buffer:t.bar1Buffer}[m]),style:h.bar1}),"determinate"===m?null:o.createElement("div",{className:Object(p.a)(t.bar,("indeterminate"===m||"query"===m)&&t.bar2Indeterminate,"buffer"===m?[t["color".concat(Object(L.a)(n))],t.bar2Buffer]:t["barColor".concat(Object(L.a)(n))]),style:h.bar2}))})),$=Object(u.a)((function(e){var a=function(a){return"light"===e.palette.type?Object(M.e)(a,.62):Object(M.b)(a,.5)},t=a(e.palette.primary.main),o=a(e.palette.secondary.main);return{root:{position:"relative",overflow:"hidden",height:4,"@media print":{colorAdjust:"exact"}},colorPrimary:{backgroundColor:t},colorSecondary:{backgroundColor:o},determinate:{},indeterminate:{},buffer:{backgroundColor:"transparent"},query:{transform:"rotate(180deg)"},dashed:{position:"absolute",marginTop:0,height:"100%",width:"100%",animation:"$buffer 3s infinite linear"},dashedColorPrimary:{backgroundImage:"radial-gradient(".concat(t," 0%, ").concat(t," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"},dashedColorSecondary:{backgroundImage:"radial-gradient(".concat(o," 0%, ").concat(o," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"},bar:{width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},barColorPrimary:{backgroundColor:e.palette.primary.main},barColorSecondary:{backgroundColor:e.palette.secondary.main},bar1Indeterminate:{width:"auto",animation:"$indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite"},bar1Determinate:{transition:"transform .".concat(4,"s linear")},bar1Buffer:{zIndex:1,transition:"transform .".concat(4,"s linear")},bar2Indeterminate:{width:"auto",animation:"$indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite"},bar2Buffer:{transition:"transform .".concat(4,"s linear")},"@keyframes indeterminate1":{"0%":{left:"-35%",right:"100%"},"60%":{left:"100%",right:"-90%"},"100%":{left:"100%",right:"-90%"}},"@keyframes indeterminate2":{"0%":{left:"-200%",right:"100%"},"60%":{left:"107%",right:"-8%"},"100%":{left:"107%",right:"-8%"}},"@keyframes buffer":{"0%":{opacity:1,backgroundPosition:"0 -23px"},"50%":{opacity:0,backgroundPosition:"0 -23px"},"100%":{opacity:1,backgroundPosition:"-200px -23px"}}}}),{name:"MuiLinearProgress"})(P),A=o.forwardRef((function(e,a){var t=e.activeStep,r=void 0===t?0:t,i=e.backButton,n=e.classes,c=e.className,l=e.LinearProgressProps,s=e.nextButton,u=e.position,f=void 0===u?"bottom":u,g=e.steps,h=e.variant,v=void 0===h?"dots":h,O=Object(b.a)(e,["activeStep","backButton","classes","className","LinearProgressProps","nextButton","position","steps","variant"]);return o.createElement(m.a,Object(d.a)({square:!0,elevation:0,className:Object(p.a)(n.root,n["position".concat(Object(L.a)(f))],c),ref:a},O),i,"text"===v&&o.createElement(o.Fragment,null,r+1," / ",g),"dots"===v&&o.createElement("div",{className:n.dots},Object(T.a)(new Array(g)).map((function(e,a){return o.createElement("div",{key:a,className:Object(p.a)(n.dot,a===r&&n.dotActive)})}))),"progress"===v&&o.createElement($,Object(d.a)({className:n.progress,variant:"determinate",value:Math.ceil(r/(g-1)*100)},l)),s)})),V=Object(u.a)((function(e){return{root:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",background:e.palette.background.default,padding:8},positionBottom:{position:"fixed",bottom:0,left:0,right:0,zIndex:e.zIndex.mobileStepper},positionTop:{position:"fixed",top:0,left:0,right:0,zIndex:e.zIndex.mobileStepper},positionStatic:{},dots:{display:"flex",flexDirection:"row"},dot:{backgroundColor:e.palette.action.disabled,borderRadius:"50%",width:8,height:8,margin:"0 2px"},dotActive:{backgroundColor:e.palette.primary.main},progress:{width:"50%"}}}),{name:"MuiMobileStepper"})(A),q=o.forwardRef((function(e,a){var t=e.children,r=e.classes,i=e.className,n=e.color,c=void 0===n?"default":n,l=e.component,s=void 0===l?"button":l,m=e.disabled,u=void 0!==m&&m,f=e.disableElevation,g=void 0!==f&&f,v=e.disableFocusRipple,O=void 0!==v&&v,y=e.endIcon,j=e.focusVisibleClassName,x=e.fullWidth,k=void 0!==x&&x,w=e.size,S=void 0===w?"medium":w,C=e.startIcon,N=e.type,z=void 0===N?"button":N,R=e.variant,E=void 0===R?"text":R,I=Object(b.a)(e,["children","classes","className","color","component","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"]),B=C&&o.createElement("span",{className:Object(p.a)(r.startIcon,r["iconSize".concat(Object(L.a)(S))])},C),T=y&&o.createElement("span",{className:Object(p.a)(r.endIcon,r["iconSize".concat(Object(L.a)(S))])},y);return o.createElement(h.a,Object(d.a)({className:Object(p.a)(r.root,r[E],i,"inherit"===c?r.colorInherit:"default"!==c&&r["".concat(E).concat(Object(L.a)(c))],"medium"!==S&&[r["".concat(E,"Size").concat(Object(L.a)(S))],r["size".concat(Object(L.a)(S))]],g&&r.disableElevation,u&&r.disabled,k&&r.fullWidth),component:s,disabled:u,focusRipple:!O,focusVisibleClassName:Object(p.a)(r.focusVisible,j),ref:a,type:z},I),o.createElement("span",{className:r.label},B,t,T))})),D=Object(u.a)((function(e){return{root:Object(d.a)({},e.typography.button,{boxSizing:"border-box",minWidth:64,padding:"6px 16px",borderRadius:e.shape.borderRadius,color:e.palette.text.primary,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),"&:hover":{textDecoration:"none",backgroundColor:Object(M.a)(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"},"&$disabled":{backgroundColor:"transparent"}},"&$disabled":{color:e.palette.action.disabled}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},text:{padding:"6px 8px"},textPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(M.a)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},textSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(M.a)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},outlined:{padding:"5px 15px",border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"&$disabled":{border:"1px solid ".concat(e.palette.action.disabledBackground)}},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(Object(M.a)(e.palette.primary.main,.5)),"&:hover":{border:"1px solid ".concat(e.palette.primary.main),backgroundColor:Object(M.a)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(Object(M.a)(e.palette.secondary.main,.5)),"&:hover":{border:"1px solid ".concat(e.palette.secondary.main),backgroundColor:Object(M.a)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{border:"1px solid ".concat(e.palette.action.disabled)}},contained:{color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],boxShadow:e.shadows[2],"&:hover":{backgroundColor:e.palette.grey.A100,boxShadow:e.shadows[4],"@media (hover: none)":{boxShadow:e.shadows[2],backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}},"&$focusVisible":{boxShadow:e.shadows[6]},"&:active":{boxShadow:e.shadows[8]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}},containedPrimary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},containedSecondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},disableElevation:{boxShadow:"none","&:hover":{boxShadow:"none"},"&$focusVisible":{boxShadow:"none"},"&:active":{boxShadow:"none"},"&$disabled":{boxShadow:"none"}},focusVisible:{},disabled:{},colorInherit:{color:"inherit",borderColor:"currentColor"},textSizeSmall:{padding:"4px 5px",fontSize:e.typography.pxToRem(13)},textSizeLarge:{padding:"8px 11px",fontSize:e.typography.pxToRem(15)},outlinedSizeSmall:{padding:"3px 9px",fontSize:e.typography.pxToRem(13)},outlinedSizeLarge:{padding:"7px 21px",fontSize:e.typography.pxToRem(15)},containedSizeSmall:{padding:"4px 10px",fontSize:e.typography.pxToRem(13)},containedSizeLarge:{padding:"8px 22px",fontSize:e.typography.pxToRem(15)},sizeSmall:{},sizeLarge:{},fullWidth:{width:"100%"},startIcon:{display:"inherit",marginRight:8,marginLeft:-4,"&$iconSizeSmall":{marginLeft:-2}},endIcon:{display:"inherit",marginRight:-4,marginLeft:8,"&$iconSizeSmall":{marginRight:-2}},iconSizeSmall:{"& > *:first-child":{fontSize:18}},iconSizeMedium:{"& > *:first-child":{fontSize:20}},iconSizeLarge:{"& > *:first-child":{fontSize:22}}}}),{name:"MuiButton"})(q),F=t("5AJ6"),W=Object(F.a)(o.createElement("path",{d:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"}),"KeyboardArrowLeft"),H=Object(F.a)(o.createElement("path",{d:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"}),"KeyboardArrowRight"),K=Object(c.a)((function(e){return{root:{margin:"auto",width:"70vw"},stepper:{background:"#303030",color:"#fff"},button:{color:"#fff !important"},disabled:{color:"#b2b2b2 !important"}}}));var J=function(e){var a=e.pageCount,t=e.skipFn,r=void 0!==t&&t,i=Object(B.a)(),n=K(),c=Object(o.useState)(0),l=c[0],s=c[1],d=a;return Object(o.useEffect)((function(){r&&r(l+1)}),[l]),Object(z.a)("div",{className:n.root},Object(z.a)(V,{className:n.stepper,steps:d,position:"static",variant:"text",activeStep:l,nextButton:Object(z.a)(D,{className:l===d-1?n.disabled:n.button,size:"small",onClick:function(){s((function(e){return e+1}))},disabled:l===d-1},"Next","rtl"===i.direction?Object(z.a)(W,null):Object(z.a)(H,null)),backButton:Object(z.a)(D,{className:0===l?n.disabled:n.button,size:"small",onClick:function(){s((function(e){return e-1}))},disabled:0===l},"rtl"===i.direction?Object(z.a)(H,null):Object(z.a)(W,null),"Back")}))};a.default=function(e){var a=e.data,t=e.pathContext.base,n=Object.assign([],a.allMarkdownRemark.edges),c=Math.ceil(n.length/8),l=Object(o.useState)(n),s=l[0],d=l[1];return Object(o.useEffect)((function(){d(n.slice(0,8))}),[]),Object(z.a)(r.a.Fragment,null,Object(z.a)(i.a,{siteTitle:"R-AS Blog"}),Object(z.a)(I,{list:s,type:t.split("/")[1]}),Object(z.a)(J,{pageCount:c,skipFn:function(e){var a=8*(e-1),t=8*e;d(n.slice(a,t))}}))}}}]);
//# sourceMappingURL=component---src-templates-preview-jsx-9ba7531d58d7fa746f8f.js.map