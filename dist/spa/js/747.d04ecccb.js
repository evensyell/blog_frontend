(self["webpackChunkweb_vue3"]=self["webpackChunkweb_vue3"]||[]).push([[747],{4029:(e,t,o)=>{"use strict";o.d(t,{dE:()=>s,IK:()=>n});var l=o(1082);let s=e=>l.ZP.formatDate(new Date(e),"YYYY/MM/DD - HH:mm:ss");function a(e){let t=new Date,o=l.ZP.getDateDiff(t,e,"minutes");return 0==o?"刚刚":o<60?o+"分钟前":o<1440?l.ZP.getDateDiff(t,e,"hours")+"小时前":l.ZP.getDateDiff(t,e,"days")+"天前"}let n=e=>a(e)},7590:(e,t,o)=>{"use strict";o.d(t,{Z:()=>i});var l=o(3673),s=o(2323);const a=(0,l.aZ)({expose:[],props:{tip:{type:String},delay:{type:Number,default:100},offset:{type:Array,default:()=>[0,8]}},setup(e){return(t,o)=>{const a=(0,l.up)("q-tooltip");return(0,l.wg)(),(0,l.j4)(a,{id:"chiptip",delay:e.delay,offset:e.offset,class:"bg-grey-12 text-black shadowonly","transition-show":"jump-up","transition-hide":"jump-down"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(e.tip),1)])),_:1},8,["delay","offset"])}}});var n=o(8870),r=o(7518),c=o.n(r);const i=a;c()(a,"components",{QTooltip:n.Z})},747:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>de});var l=o(3673),s=o(1959),a=o(2323),n=o(8880);const r=(0,l.HX)("data-v-3fb170d8");(0,l.dD)("data-v-3fb170d8");const c={class:"toc"},i=(0,l.Uk)(" 目录 "),m={key:0},d={key:1};(0,l.Cn)();const p=(0,l.aZ)({expose:[],props:{toc_tree:{type:[]}},setup(e){const t=e,o=(0,l.FN)(),p=(0,s.iH)(""),u=e=>{o.emit("anchorto",e)},g=()=>{const e=document.querySelectorAll("h2,h3"),t=[];e.forEach((e=>{t.push(e.offsetTop)}));const o=document.documentElement.scrollTop||document.body.scrollTop;let l=0;for(let s=0;s<t.length;s++)o+100>=t[s]&&(l=s);0!=l&&(p.value=e[l].id)};return(0,l.bv)((()=>{window.addEventListener("scroll",g)})),(0,l.Ah)((()=>{window.removeEventListener("scroll",g)})),(e,o)=>{const s=(0,l.up)("q-avatar"),g=(0,l.up)("q-chip");return(0,l.wg)(),(0,l.j4)("ol",c,[t.toc_tree.length?((0,l.wg)(),(0,l.j4)(g,{key:0,class:"text-black q-ml-none q-mb-sm"},{default:r((()=>[(0,l.Wm)(s,{class:"glossy",icon:"toc",color:"primary","text-color":"white"}),i])),_:1})):(0,l.kq)("",!0),((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)(t.toc_tree,((e,t)=>((0,l.wg)(),(0,l.j4)("li",null,[0!=e.children?((0,l.wg)(),(0,l.j4)("ol",m,[(0,l.Wm)("a",{onClick:t=>u(e.id),class:p.value==e.id?"current_toc":""},(0,a.zw)(t+1)+". "+(0,a.zw)(decodeURIComponent(e.id)),11,["onClick"]),((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)(e.children,((o,s)=>(0,l.wy)(((0,l.wg)(),(0,l.j4)("ol",null,[(0,l.Wm)("a",{onClick:e=>u(o.id),class:p.value==o.id?"current_toc":""},(0,a.zw)(t+1)+"."+(0,a.zw)(s+1)+" "+(0,a.zw)(decodeURIComponent(o.id)),11,["onClick"])],512)),[[n.F8,-1!=e.children.map((e=>e.id)).indexOf(p.value)||e.id==p.value]]))),256))])):((0,l.wg)(),(0,l.j4)("ol",d,[(0,l.Wm)("a",{onClick:t=>u(e.id),class:p.value==e.id?"current_toc":""},(0,a.zw)(t+1)+" "+(0,a.zw)(decodeURIComponent(e.id)),11,["onClick"])]))])))),256))])}}});var u=o(7030),g=o(5096),h=o(7518),w=o.n(h);p.__scopeId="data-v-3fb170d8";const v=p;w()(p,"components",{QChip:u.Z,QAvatar:g.Z});var f=o(1768),y=o(9273),q=o(8825),_=o(4029);const k={class:"text-h6 text-bold q-pb-md"},b={class:"col-10"},x={class:"col-2 q-px-sm row"},W=(0,l.Wm)("div",null,[(0,l.Uk)(" 发布 "),(0,l.Wm)("br"),(0,l.Uk)("评论 ")],-1),S={key:0,class:"text-bold text-h5 q-mt-md"},U={key:1,class:"q-gutter-xs q-mt-xl"},Z={class:"q-mt-lg row"},j=(0,l.Wm)("span",{class:"inline_ text-h6 text-bold"},"历史评论：",-1),Q={class:"text-bold text-blue-grey-9"},C={class:"text-subtitle2 text-grey"},z={key:0,class:"text-grey-7"},T={key:1,class:"text-grey-7"},D=(0,l.aZ)({expose:[],props:{aid:{type:String||Number,default:0}},setup(e){const t=e,o=(0,y.useStore)(),n=(0,q.Z)(),r=(0,s.qj)({comments:[],reverse:!1,edit_comment:""}),c=()=>{(0,f.api)("/api/comment?article="+t.aid).then((e=>{r.comments=e.data.results}))};(0,l.YP)((()=>r.reverse),(()=>{r.comments=r.comments.reverse()})),(0,l.bv)((()=>{c()}));const i=()=>{let e={article:t.aid,content:r.edit_comment,user:o.getters.getUid};f.api.post("api/comment/",e).then((e=>{n.notify("评论发布成功！"),r.edit_comment="",c()})).catch((e=>{n.notify({message:"评论发布失败！",color:"red"})}))};return(t,o)=>{const n=(0,l.up)("q-input"),c=(0,l.up)("q-btn"),m=(0,l.up)("q-form"),d=(0,l.up)("q-space"),p=(0,l.up)("q-toggle"),u=(0,l.up)("q-img"),g=(0,l.up)("q-avatar"),h=(0,l.up)("q-card-section"),w=(0,l.up)("q-separator"),v=(0,l.up)("q-card");return(0,l.wg)(),(0,l.j4)("div",null,[(0,l.Wm)("div",k,(0,a.zw)((0,s.SU)(r).comments.length)+" 评论 ",1),(0,l.Wm)(m,{onSubmit:i,class:"row flex"},{default:(0,l.w5)((()=>[(0,l.Wm)("div",b,[(0,l.Wm)(n,{modelValue:(0,s.SU)(r).edit_comment,"onUpdate:modelValue":o[1]||(o[1]=e=>(0,s.SU)(r).edit_comment=e),autogrow:"",outlined:"",type:"textarea"},null,8,["modelValue"])]),(0,l.Wm)("div",x,[(0,l.Wm)(c,{unelevated:"","no-wrap":"",align:"evenly",color:"primary",class:"col-12 text-white shadowhover",type:"submit"},{default:(0,l.w5)((()=>[W])),_:1})])])),_:1}),0==e.aid?((0,l.wg)(),(0,l.j4)("div",S,"暂无评论")):((0,l.wg)(),(0,l.j4)("div",U,[(0,l.Wm)("div",Z,[j,(0,l.Wm)(d),(0,l.Wm)(p,{class:"text-body2 text-grey q-mr-md",color:"primary","keep-color":"",modelValue:(0,s.SU)(r).reverse,"onUpdate:modelValue":o[2]||(o[2]=e=>(0,s.SU)(r).reverse=e),label:"倒序查看"},null,8,["modelValue"])]),((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)((0,s.SU)(r).comments,((e,t)=>((0,l.wg)(),(0,l.j4)(v,{square:"",flat:""},{default:(0,l.w5)((()=>[(0,l.Wm)(h,{class:"row items-center q-pl-sm"},{default:(0,l.w5)((()=>[(0,l.Wm)(g,{size:"lg",class:"on-left"},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{src:e.user_avatar||"img/akari.jpg",ratio:"1","img-style":{width:"2em",height:"2em"}},null,8,["src"])])),_:2},1024),(0,l.Wm)("div",Q,(0,a.zw)(e.user_nickname?e.user_nickname:"友人A"),1),(0,l.Wm)(d),(0,l.Wm)("div",C,[(0,l.Uk)((0,a.zw)((0,s.SU)(_.IK)(e.created))+"    ",1),(0,s.SU)(r).reverse?((0,l.wg)(),(0,l.j4)("span",z,(0,a.zw)((0,s.SU)(r).comments.length-t)+"楼",1)):((0,l.wg)(),(0,l.j4)("span",T,(0,a.zw)(t+1)+"楼",1))])])),_:2},1024),(0,l.Wm)(h,{id:"comment_card",class:"inline_ q-pl-xl q-py-none q-ml-xs"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,a.zw)(e.content),1)])),_:2},1024),(0,l.Wm)(w,{class:"line-1px q-mt-none q-mb-md",inset:""})])),_:2},1024)))),256))]))])}}});var I=o(8689),E=o(4689),A=o(2165),H=o(2025),V=o(8886),Y=o(151),P=o(5589),B=o(4027),K=o(5869);const N=D;w()(D,"components",{QForm:I.Z,QInput:E.Z,QBtn:A.Z,QSpace:H.Z,QToggle:V.Z,QCard:Y.Z,QCardSection:P.Z,QAvatar:g.Z,QImg:B.Z,QSeparator:K.Z});var F=o(7590),R=o(535),L=o.n(R);const M={class:"markdwon"},X=(0,l.aZ)({expose:[],props:{mkd:{default:""}},setup(e){const t=e,o=(0,l.FN)(),a={anchor:{level:2,slugify:e=>encodeURIComponent(String(e).trim()),permalink:!0,permalinkSpace:!0,permalinkBefore:!0,permalinkSymbol:"#",permalinkHref:(e,t)=>window.location.href+"#"+e},highlight:{}};(0,l.bv)((()=>{setTimeout((()=>{r()}),500)}));const n=(e,t)=>{t.forEach((t=>{for(let o=e.length-1;o>-1;o--)if(t.top>e[o].top){e[o].children.push(t);break}}))},r=()=>{let e=[],t=[];document.getElementsByTagName("h2").forEach((t=>{e.push({id:t.getAttribute("id"),top:t.offsetTop,level:2,children:[]})})),setTimeout((()=>{document.getElementsByTagName("h3").forEach((e=>{t.push({id:e.getAttribute("id"),top:e.offsetTop,level:3})}))}),10),setTimeout((()=>{n(e,t)}),200),setTimeout((()=>{o.emit("toctree",e)}),200)};return(e,o)=>((0,l.wg)(),(0,l.j4)("div",M,[(0,l.Wm)((0,s.SU)(L()),{source:t.mkd,breaks:"",llinkify:"",html:"",anchor:a.anchor,highlight:a.highlight},null,8,["source","anchor","highlight"])]))}}),O=X;var G=o(9582);const J=(0,l.HX)("data-v-8bd9065a");(0,l.dD)("data-v-8bd9065a");const $={class:"\n        col-lg-9 col-md-10 col-sm-12 col-xs-12\n        q-px-sm\n        ztop2\n        justify-center\n      ",style:{margin:"-50px 0 0 0"}},ee={class:"row"},te={class:" gt-xs col-3 q-pt-xl q-px-sm",style:{position:"relative"}},oe={class:"\n            col-md-9 col-lg-9 col-xl-9 col-sm-9 col-12\n            bg-white\n            shadowonly\n            q-px-lg q-pt-sm q-pb-xl\n          "},le={class:"flex"},se=(0,l.Wm)("div",{class:"q-mb-md q-mt-xl text-center text-blue-grey-5"}," — 全文结束，感谢阅读 — ",-1);(0,l.Cn)();const ae=(0,l.aZ)({expose:[],setup(e){const t=(0,G.yj)(),o=(0,G.tv)(),n=(0,s.qj)({is_show_toc_sider:!1,toctree:[],article:{},mkd:"Markdown file is Loading..."}),r=((0,s.iH)(),e=>{f.api.get("api/article/"+e).then((e=>{n.article=e.data})).then((()=>{f.api.get(n.article.markdown).then((e=>{n.mkd=e.data}))}))});(0,l.bv)((()=>{r(t.params.id)}));const c=e=>{n.toctree=e},i=e=>{o.push({path:"/articles",query:{tag:e}})},m=e=>{document.getElementById(e).scrollIntoView({behavior:"smooth"})},d=e=>{setTimeout((()=>{m(e)}),10)};return(e,o)=>{const r=(0,l.up)("q-img"),p=(0,l.up)("q-icon"),u=(0,l.up)("q-btn"),g=(0,l.up)("q-space"),h=(0,l.up)("q-chip"),w=(0,l.up)("q-separator"),f=(0,l.up)("q-drawer"),y=(0,l.up)("q-page-sticky"),q=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(q,{class:"row justify-center"},{default:J((()=>[(0,l.Wm)(r,{src:(0,s.SU)(n).article.img,style:{height:"54vh",width:"100vd"}},null,8,["src"]),(0,l.Wm)("div",$,[(0,l.Wm)("div",ee,[(0,l.Wm)("div",te,[(0,l.Wm)(v,{toc_tree:(0,s.SU)(n).toctree,onAnchorto:m,class:"q-pt-lg tocarea toc-sticky"},null,8,["toc_tree"])]),(0,l.Wm)("div",oe,[(0,l.Wm)("div",le,[(0,l.Wm)(p,{size:"xs",color:"purple",name:"sell",class:"q-mt-sm q-mr-md"},{default:J((()=>[(0,l.Wm)(F.Z,{tip:"标签"})])),_:1}),((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)((0,s.SU)(n).article.tags,(e=>((0,l.wg)(),(0,l.j4)(u,{class:"q-py-none",flat:"","no-caps":"",dense:"",type:"a",onClick:t=>i(e),label:e},null,8,["onClick","label"])))),256)),(0,l.Wm)(g),(0,l.Wm)(h,{square:"",outline:"",class:"relative-top-right q-pr-none q-mr-none card_action"},{default:J((()=>[(0,l.Wm)(p,{class:"q-pr-sm",size:"xs",color:"orange",name:"update"}),(0,l.Uk)(" "+(0,a.zw)((0,s.SU)(_.dE)((0,s.SU)(n).article.update))+" ",1),(0,l.Wm)(F.Z,{tip:"最后更新时间"})])),_:1})]),(0,l.Wm)(w,{class:"q-my-sm bg-blue-grey-3"}),(0,l.Wm)(O,{mkd:(0,s.SU)(n).mkd,onToctree:c},null,8,["mkd"]),se,(0,l.Wm)(N,{class:"q-pt-lg",aid:(0,s.SU)(t).params.id.toString()},null,8,["aid"])])])]),(0,l.Wm)(f,{modelValue:(0,s.SU)(n).is_show_toc_sider,"onUpdate:modelValue":o[1]||(o[1]=e=>(0,s.SU)(n).is_show_toc_sider=e),width:"50vw",side:"right",overlay:"",class:"tocsider shadowonly",onClick:o[2]||(o[2]=e=>(0,s.SU)(n).is_show_toc_sider=!1)},{default:J((()=>[(0,l.Wm)(v,{toc_tree:(0,s.SU)(n).toctree,onAnchorto:d,class:"q-mx-md"},null,8,["toc_tree"])])),_:1},8,["modelValue"]),(0,l.Wm)(y,{class:"lt-sm",position:"bottom-right",style:{"z-index":"10"},offset:[28,80]},{default:J((()=>[(0,l.Wm)(u,{round:"",color:"purple",icon:"toc",class:"shadow-1",onClick:o[3]||(o[3]=e=>(0,s.SU)(n).is_show_toc_sider=!(0,s.SU)(n).is_show_toc_sider)})])),_:1})])),_:1})}}});var ne=o(4379),re=o(7704),ce=o(4554),ie=o(2901),me=o(1007);ae.__scopeId="data-v-8bd9065a";const de=ae;w()(ae,"components",{QPage:ne.Z,QImg:B.Z,QScrollArea:re.Z,QIcon:ce.Z,QBtn:A.Z,QSpace:H.Z,QChip:u.Z,QSeparator:K.Z,QDrawer:ie.Z,QPageSticky:me.Z})}}]);