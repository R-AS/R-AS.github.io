(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"0mN4":function(e,t,a){"use strict";a("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"9eSz":function(e,t,a){"use strict";a("rGqo"),a("yt8O"),a("Btvt"),a("XfO3"),a("EK0E"),a("0mN4");var r=a("5NKs");t.__esModule=!0,t.default=void 0;var o,i=r(a("v06X")),n=r(a("XEEL")),l=r(a("uDP2")),c=r(a("j8BX")),s=r(a("q1tI")),d=r(a("17x9")),u=function(e){var t=(0,c.default)({},e),a=t.resolutions,r=t.sizes,o=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),o&&(t.loading="eager"),t.fluid&&(t.fluid=S([].concat(t.fluid))),t.fixed&&(t.fixed=S([].concat(t.fixed))),t},f=function(e){var t=e.fluid,a=e.fixed;return(t&&t[0]||a&&a[0]).src},p=Object.create({}),g=function(e){var t=u(e),a=f(t);return p[a]||!1},m="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,b="undefined"!=typeof window,h=b&&window.IntersectionObserver,y=new WeakMap;function v(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,o=e.media,i=e.sizes;return s.default.createElement(s.default.Fragment,{key:t},r&&s.default.createElement("source",{type:"image/webp",media:o,srcSet:r,sizes:i}),s.default.createElement("source",{media:o,srcSet:a,sizes:i}))}))}function S(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function O(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return s.default.createElement("source",{key:t,media:a,srcSet:r})}))}function C(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return s.default.createElement("source",{key:t,media:a,srcSet:r})}))}function j(e,t){var a=e.srcSet,r=e.srcSetWebp,o=e.media,i=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(o?'media="'+o+'" ':"")+'srcset="'+(t?r:a)+'" '+(i?'sizes="'+i+'" ':"")+"/>"}var k=function(e,t){var a=(void 0===o&&"undefined"!=typeof window&&window.IntersectionObserver&&(o=new window.IntersectionObserver((function(e){e.forEach((function(e){if(y.has(e.target)){var t=y.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(o.unobserve(e.target),y.delete(e.target),t())}}))}),{rootMargin:"200px"})),o);return a&&(a.observe(e),y.set(e,t)),function(){a.unobserve(e),y.delete(e)}},w=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",o=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',n=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",c=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",s=e.loading?'loading="'+e.loading+'" ':"",d=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?j(e,!0):"")+j(e)})).join("")+"<img "+s+n+l+a+r+t+i+o+c+d+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},E=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,o=e.spreadProps,i=s.default.createElement(I,(0,c.default)({src:t},o));return a.length>1?s.default.createElement("picture",null,r(a),i):i},I=s.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,o=e.src,i=e.style,n=e.onLoad,d=e.onError,u=e.loading,f=e.draggable,p=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable"]);return s.default.createElement("img",(0,c.default)({sizes:a,srcSet:r,src:o},p,{onLoad:n,onError:d,ref:t,loading:u,draggable:f,style:(0,c.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))}));I.propTypes={style:d.default.object,onError:d.default.func,onLoad:d.default.func};var x=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=b&&g(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!m&&h&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||b&&(m||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=s.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,i.default)(a)),a.handleRef=a.handleRef.bind((0,i.default)(a)),a}(0,n.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=k(e,(function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=f(t),p[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,o=e.style,i=void 0===o?{}:o,n=e.imgStyle,l=void 0===n?{}:n,d=e.placeholderStyle,f=void 0===d?{}:d,p=e.placeholderClassName,g=e.fluid,m=e.fixed,b=e.backgroundColor,h=e.durationFadeIn,y=e.Tag,S=e.itemProp,j=e.loading,k=e.draggable,x=!1===this.state.fadeIn||this.state.imgLoaded,L=!0===this.state.fadeIn&&!this.state.imgCached,R=(0,c.default)({opacity:x?1:0,transition:L?"opacity "+h+"ms":"none"},l),z="boolean"==typeof b?"lightgray":b,N={transitionDelay:h+"ms"},T=(0,c.default)({opacity:this.state.imgLoaded?0:1},L&&N,{},l,{},f),V={title:t,alt:this.state.isVisible?"":a,style:T,className:p,itemProp:S};if(g){var P=g,$=P[0];return s.default.createElement(y,{className:(r||"")+" gatsby-image-wrapper",style:(0,c.default)({position:"relative",overflow:"hidden"},i),ref:this.handleRef,key:"fluid-"+JSON.stringify($.srcSet)},s.default.createElement(y,{style:{width:"100%",paddingBottom:100/$.aspectRatio+"%"}}),z&&s.default.createElement(y,{title:t,style:(0,c.default)({backgroundColor:z,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},L&&N)}),$.base64&&s.default.createElement(E,{src:$.base64,spreadProps:V,imageVariants:P,generateSources:C}),$.tracedSVG&&s.default.createElement(E,{src:$.tracedSVG,spreadProps:V,imageVariants:P,generateSources:O}),this.state.isVisible&&s.default.createElement("picture",null,v(P),s.default.createElement(I,{alt:a,title:t,sizes:$.sizes,src:$.src,crossOrigin:this.props.crossOrigin,srcSet:$.srcSet,style:R,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:j,draggable:k})),this.addNoScript&&s.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:w((0,c.default)({alt:a,title:t,loading:j},$,{imageVariants:P}))}}))}if(m){var W=m,q=W[0],U=(0,c.default)({position:"relative",overflow:"hidden",display:"inline-block",width:q.width,height:q.height},i);return"inherit"===i.display&&delete U.display,s.default.createElement(y,{className:(r||"")+" gatsby-image-wrapper",style:U,ref:this.handleRef,key:"fixed-"+JSON.stringify(q.srcSet)},z&&s.default.createElement(y,{title:t,style:(0,c.default)({backgroundColor:z,width:q.width,opacity:this.state.imgLoaded?0:1,height:q.height},L&&N)}),q.base64&&s.default.createElement(E,{src:q.base64,spreadProps:V,imageVariants:W,generateSources:C}),q.tracedSVG&&s.default.createElement(E,{src:q.tracedSVG,spreadProps:V,imageVariants:W,generateSources:O}),this.state.isVisible&&s.default.createElement("picture",null,v(W),s.default.createElement(I,{alt:a,title:t,width:q.width,height:q.height,sizes:q.sizes,src:q.src,crossOrigin:this.props.crossOrigin,srcSet:q.srcSet,style:R,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:j,draggable:k})),this.addNoScript&&s.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:w((0,c.default)({alt:a,title:t,loading:j},q,{imageVariants:W}))}}))}return null},t}(s.default.Component);x.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var L=d.default.shape({width:d.default.number.isRequired,height:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string}),R=d.default.shape({aspectRatio:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,sizes:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string});x.propTypes={resolutions:L,sizes:R,fixed:d.default.oneOfType([L,d.default.arrayOf(L)]),fluid:d.default.oneOfType([R,d.default.arrayOf(R)]),fadeIn:d.default.bool,durationFadeIn:d.default.number,title:d.default.string,alt:d.default.string,className:d.default.oneOfType([d.default.string,d.default.object]),critical:d.default.bool,crossOrigin:d.default.oneOfType([d.default.string,d.default.bool]),style:d.default.object,imgStyle:d.default.object,placeholderStyle:d.default.object,placeholderClassName:d.default.string,backgroundColor:d.default.oneOfType([d.default.string,d.default.bool]),onLoad:d.default.func,onError:d.default.func,onStartLoad:d.default.func,Tag:d.default.string,itemProp:d.default.string,loading:d.default.oneOf(["auto","lazy","eager"]),draggable:d.default.bool};var z=x;t.default=z},RXBc:function(e,t,a){"use strict";a.r(t);var r=a("q1tI"),o=a.n(r),i=a("R/WZ"),n=a("SbVv"),l=a("cj7Z"),c=a("WV/z"),s=(a("tUrg"),a("UsdU")),d=a("Wbzz"),u=a("k1TG"),f=a("aXB2"),p=(a("17x9"),a("iuhU")),g=a("HR5l");var m,b,h=(m=o.a.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),(b=o.a.memo(o.a.forwardRef((function(e,t){return o.a.createElement(g.a,Object(u.a)({},e,{ref:t}),m)})))).muiName=g.a.muiName,b),y=a("H2TA"),v=a("ye/S"),S=a("bfFb"),O=a("NqtD"),C=a("VD++"),j=o.a.forwardRef((function(e,t){var a=e.avatar,r=e.classes,i=e.className,n=e.clickable,l=e.color,c=void 0===l?"default":l,s=e.component,d=e.deleteIcon,g=e.disabled,m=void 0!==g&&g,b=e.icon,y=e.label,v=e.onClick,j=e.onDelete,k=e.onKeyUp,w=e.size,E=void 0===w?"medium":w,I=e.variant,x=void 0===I?"default":I,L=Object(f.a)(e,["avatar","classes","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyUp","size","variant"]),R=o.a.useRef(null),z=Object(S.a)(R,t),N=function(e){e.stopPropagation(),j&&j(e)},T=!(!1===n||!v)||n,V="small"===E,P=s||(T?C.a:"div"),$=P===C.a?{component:"div"}:{},W=null;if(j){var q=Object(p.a)("default"!==c&&("default"===x?r["deleteIconColor".concat(Object(O.a)(c))]:r["deleteIconOutlinedColor".concat(Object(O.a)(c))]),V&&r.deleteIconSmall);W=d&&o.a.isValidElement(d)?o.a.cloneElement(d,{className:Object(p.a)(d.props.className,r.deleteIcon,q),onClick:N}):o.a.createElement(h,{className:Object(p.a)(r.deleteIcon,q),onClick:N})}var U=null;a&&o.a.isValidElement(a)&&(U=o.a.cloneElement(a,{className:Object(p.a)(r.avatar,a.props.className,V&&r.avatarSmall,"default"!==c&&r["avatarColor".concat(Object(O.a)(c))])}));var D=null;return b&&o.a.isValidElement(b)&&(D=o.a.cloneElement(b,{className:Object(p.a)(r.icon,b.props.className,V&&r.iconSmall,"default"!==c&&r["iconColor".concat(Object(O.a)(c))])})),o.a.createElement(P,Object(u.a)({role:T||j?"button":void 0,className:Object(p.a)(r.root,i,"default"!==c&&[r["color".concat(Object(O.a)(c))],T&&r["clickableColor".concat(Object(O.a)(c))],j&&r["deletableColor".concat(Object(O.a)(c))]],"default"!==x&&[r.outlined,{primary:r.outlinedPrimary,secondary:r.outlinedSecondary}[c]],m&&r.disabled,V&&r.sizeSmall,T&&r.clickable,j&&r.deletable),"aria-disabled":!!m||void 0,tabIndex:T||j?0:void 0,onClick:v,onKeyUp:function(e){if(k&&k(e),e.currentTarget===e.target){var t=e.key;!j||"Backspace"!==t&&"Delete"!==t?"Escape"===t&&R.current&&R.current.blur():j(e)}},ref:z},$,L),U||D,o.a.createElement("span",{className:Object(p.a)(r.label,V&&r.labelSmall)},y),W)})),k=Object(y.a)((function(e){var t="light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],a=Object(v.c)(e.palette.text.primary,.26);return{root:{fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:e.palette.getContrastText(t),backgroundColor:t,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:"none",padding:0,verticalAlign:"middle",boxSizing:"border-box","&$disabled":{opacity:.5,pointerEvents:"none"},"& $avatar":{marginLeft:5,marginRight:-6,width:24,height:24,color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],fontSize:e.typography.pxToRem(12)},"& $avatarColorPrimary":{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark},"& $avatarColorSecondary":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.dark},"& $avatarSmall":{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)}},sizeSmall:{height:24},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},disabled:{},clickable:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover, &:focus":{backgroundColor:Object(v.b)(t,.08)},"&:active":{boxShadow:e.shadows[1]}},clickableColorPrimary:{"&:hover, &:focus":{backgroundColor:Object(v.b)(e.palette.primary.main,.08)}},clickableColorSecondary:{"&:hover, &:focus":{backgroundColor:Object(v.b)(e.palette.secondary.main,.08)}},deletable:{"&:focus":{backgroundColor:Object(v.b)(t,.08)}},deletableColorPrimary:{"&:focus":{backgroundColor:Object(v.b)(e.palette.primary.main,.2)}},deletableColorSecondary:{"&:focus":{backgroundColor:Object(v.b)(e.palette.secondary.main,.2)}},outlined:{backgroundColor:"transparent",border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(v.c)(e.palette.text.primary,e.palette.action.hoverOpacity)},"& $avatar":{marginLeft:4},"& $avatarSmall":{marginLeft:2},"& $icon":{marginLeft:4},"& $iconSmall":{marginLeft:2},"& $deleteIcon":{marginRight:5},"& $deleteIconSmall":{marginRight:3}},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(e.palette.primary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(v.c)(e.palette.primary.main,e.palette.action.hoverOpacity)}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(e.palette.secondary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(v.c)(e.palette.secondary.main,e.palette.action.hoverOpacity)}},avatar:{},avatarSmall:{},avatarColorPrimary:{},avatarColorSecondary:{},icon:{color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],marginLeft:5,marginRight:-6},iconSmall:{width:18,height:18,marginLeft:4,marginRight:-4},iconColorPrimary:{color:"inherit"},iconColorSecondary:{color:"inherit"},label:{overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},labelSmall:{paddingLeft:8,paddingRight:8},deleteIcon:{WebkitTapHighlightColor:"transparent",color:a,height:22,width:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:Object(v.c)(a,.4)}},deleteIconSmall:{height:16,width:16,marginRight:4,marginLeft:-4},deleteIconColorPrimary:{color:Object(v.c)(e.palette.primary.contrastText,.7),"&:hover, &:active":{color:e.palette.primary.contrastText}},deleteIconColorSecondary:{color:Object(v.c)(e.palette.secondary.contrastText,.7),"&:hover, &:active":{color:e.palette.secondary.contrastText}},deleteIconOutlinedColorPrimary:{color:Object(v.c)(e.palette.primary.main,.7),"&:hover, &:active":{color:e.palette.primary.main}},deleteIconOutlinedColorSecondary:{color:Object(v.c)(e.palette.secondary.main,.7),"&:hover, &:active":{color:e.palette.secondary.main}}}}),{name:"MuiChip"})(j),w=a("qKvR"),E=Object(i.a)((function(e){return{root:{display:"flex",margin:"auto",width:"70%",justifyContent:"center",flexWrap:"wrap",padding:e.spacing(.5)},chip:{margin:e.spacing(.5),"&:hover":{cursor:"pointer"}},link:{textDecoration:"none"}}})),I=function(){var e=E(),t=s.data;return Object(w.a)("div",{className:e.root},t.allDirectory.edges.map((function(t,a){return Object(w.a)(d.Link,{className:e.link,to:"/blogs/"+t.node.base,key:a},Object(w.a)(k,{label:t.node.base,className:e.chip}))})))};a.d(t,"query",(function(){return L}));var x=Object(i.a)((function(e){return{image:{maxWidth:"400px",margin:"10% auto",marginBottom:"1.45rem"},h1:{padding:"20px 0",textAlign:"center"}}})),L="44015135";t.default=function(e){var t=e.data,a=x();return Object(w.a)(n.a,null,Object(w.a)(l.a,{title:"Home"}),Object(w.a)("div",{className:a.image},Object(w.a)(c.a,{data:t}),Object(w.a)("h1",{className:a.h1},t.site.siteMetadata.author)),Object(w.a)(I,null))}},UsdU:function(e){e.exports=JSON.parse('{"data":{"allDirectory":{"totalCount":5,"edges":[{"node":{"base":"javascript"}},{"node":{"base":"nodejs"}},{"node":{"base":"typescript"}},{"node":{"base":"react"}},{"node":{"base":"redux-tool-kit"}}]}}}')},"WV/z":function(e,t,a){"use strict";a("q1tI");var r=a("9eSz"),o=a.n(r),i=a("R/WZ"),n=a("qKvR"),l=Object(i.a)((function(e){return{img:{zIndex:-1}}}));t.a=function(e){var t=e.data,a=l();return Object(n.a)(o.a,{className:a.img,fluid:t.placeholderImage.childImageSharp.fluid})}}}]);
//# sourceMappingURL=component---src-pages-index-js-70f96ee3d15630c29e5e.js.map