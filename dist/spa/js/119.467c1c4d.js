(self["webpackChunkweb_vue3"]=self["webpackChunkweb_vue3"]||[]).push([[119],{4029:(t,e,a)=>{"use strict";a.d(e,{dE:()=>s,IK:()=>o});var l=a(1082);let s=t=>l.ZP.formatDate(new Date(t),"YYYY/MM/DD - HH:mm:ss");function n(t){let e=new Date,a=l.ZP.getDateDiff(e,t,"minutes");return 0==a?"刚刚":a<60?a+"分钟前":a<1440?l.ZP.getDateDiff(e,t,"hours")+"小时前":l.ZP.getDateDiff(e,t,"days")+"天前"}let o=t=>n(t)},8651:(t,e,a)=>{"use strict";a.d(e,{Z:()=>i});var l=a(3673),s=a(1959),n=a(9582);const o={class:"q-pa-md q-mb-lg flex flex-center"},c=(0,l.aZ)({expose:[],props:{count:{type:Number,default:1}},setup(t){const e=t,a=(0,n.tv)(),c=(0,n.yj)(),r=(0,s.qj)({current_page:1,per:12}),p=(0,l.Fl)((()=>Math.ceil(e.count/r.per)));return(0,l.YP)((()=>c.query),(()=>{c.query.page?r.current_page=parseInt(c.query.page.toString()):r.current_page=1})),(0,l.YP)((()=>r.current_page),(()=>{a.push({query:{page:r.current_page}})})),(t,e)=>{const a=(0,l.up)("q-pagination");return(0,l.wg)(),(0,l.j4)("div",o,[(0,l.Wm)(a,{class:"q-pt-lg q-my-lg",modelValue:(0,s.SU)(r).current_page,"onUpdate:modelValue":e[1]||(e[1]=t=>(0,s.SU)(r).current_page=t),color:"primary",max:(0,s.SU)(p),"max-pages":5},null,8,["modelValue","max"])])}}});var r=a(7300),p=a(7518),u=a.n(p);const i=c;u()(c,"components",{QPagination:r.Z})},6119:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>Y});var l=a(3673),s=a(2323),n=a(1959),o=a(8651),c=a(1768),r=a(9582),p=a(4029);const u=(0,l.HX)("data-v-472db132");(0,l.dD)("data-v-472db132");const i={class:"col-md-9 col-12 q-px-md ztop2 justify-center",style:{margin:"-30px 0 0 0"}},m=(0,l.Wm)("div",{class:"shadowonly bg-white text-center q-pa-md q-mb-md"},[(0,l.Wm)("div",{class:"text-h5 text-bold text-blue-grey-8"},"文章")],-1),d={class:"row q-px-sm"},g={class:"col-md-3 col-lg-3 col-sm-3 col-12 q-mt-md q-pl-sm q-pr-md"},q=(0,l.Wm)("br",null,null,-1),b=(0,l.Uk)("所有标签"),h=(0,l.Wm)("br",null,null,-1),_={class:"\n                      absolute-bottom-right\n                      q-pt-sm q-pb-xs q-pr-none q-mr-xs\n                    "};(0,l.Cn)();const f=(0,l.aZ)({expose:[],setup(t){const e=(0,r.tv)(),a=(0,r.yj)(),f=(0,n.qj)({total_tags:[],articles:[],count:0,toc:{position:"relative"}});(0,l.YP)((()=>a.query),(()=>{console.log("article watch route:"),console.log(a),v()}));const x=()=>{c.api.get("/api/tag").then((t=>{const e=t.data.results;f.total_tags=e.filter((t=>0!==t.article_set.length))})).then((()=>{v()}))};(0,l.bv)((()=>{x(),console.log("Articles getData")}));const v=()=>{const t={page:a.query.page||1};if(a.query.tag){const e=f.total_tags.filter((t=>t.tag_name==a.query.tag));t.tags=e[0].id}c.api.get("/api/article",{params:t}).then((t=>{f.articles=t.data.results,f.count=t.data.count,console.log("tag selectd - count:"+t.data.count)}))},w=t=>{e.push({name:"article",params:{id:t}})},y=t=>{e.push({query:{tag:t,page:1}})};return(t,e)=>{const a=(0,l.up)("q-img"),c=(0,l.up)("q-chip"),r=(0,l.up)("q-card-section"),x=(0,l.up)("q-separator"),v=(0,l.up)("q-icon"),W=(0,l.up)("q-btn"),k=(0,l.up)("q-btn-group"),Z=(0,l.up)("q-card-actions"),C=(0,l.up)("q-card"),j=(0,l.up)("q-list"),D=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(D,{class:"row justify-center"},{default:u((()=>[(0,l.Wm)(a,{src:"https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/articles.jpg",style:{height:"62vh",width:"100vd",opacity:"0.95"}}),(0,l.Wm)("div",i,[m,(0,l.Wm)("div",d,[(0,l.Wm)("div",g,[(0,l.Uk)(" 按标签索引:（当前索引下共有 "+(0,s.zw)((0,n.SU)(f).count)+" 篇） ",1),q,(0,l.Wm)(c,{class:"tag_btn q-ml-none q-mr-sm q-mt-sm",dense:"",clickable:"",onClick:e[1]||(e[1]=t=>y(""))},{default:u((()=>[b])),_:1}),h,((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)((0,n.SU)(f).total_tags,(t=>((0,l.wg)(),(0,l.j4)(c,{class:"tag_btn q-ml-none q-mr-sm",dense:"",clickable:"",onClick:e=>y(t.tag_name)},{default:u((()=>[(0,l.Uk)((0,s.zw)(t.tag_name),1)])),_:2},1032,["onClick"])))),256))]),(0,l.Wm)(j,{class:"col-md-9 col-lg-9 col-sm-9 col-12 q-pr-sm"},{default:u((()=>[((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)((0,n.SU)(f).articles,(t=>((0,l.wg)(),(0,l.j4)(C,{class:"shadowhover q-my-lg"},{default:u((()=>[(0,l.Wm)(r,{horizontal:"",class:"row",style:{height:"200px"}},{default:u((()=>[(0,l.Wm)(a,{class:"col-4 q-qa-none q-ma-none",onClick:e=>w(t.id),src:t.img},null,8,["onClick","src"]),(0,l.Wm)(r,{class:"col-8 q-pt-sm q-pb-none q-px-sm"},{default:u((()=>[(0,l.Wm)(r,{class:"q-py-none q-ma-none",onClick:e=>w(t.id)},{default:u((()=>[(0,l.Wm)("div",{class:"q-ma-none q-pa-none text-h5 text-bold ellipsis",title:t.title},(0,s.zw)(t.title),9,["title"])])),_:2},1032,["onClick"]),(0,l.Wm)(x,{inset:"",class:"q-mt-xs line-1px",color:"orange"}),(0,l.Wm)(r,{class:"q-pt-sm q-pl-md q-pb-none q-px-sm"},{default:u((()=>[(0,l.Wm)(v,{class:"q-pr-xs",size:"xs",color:"purple",name:"sell"}),((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)(t.tags,(t=>((0,l.wg)(),(0,l.j4)(k,{flat:"",class:"inline"},{default:u((()=>[(0,l.Wm)(W,{class:"card_action q-pb-none text-purple","no-caps":"",onClick:e=>y(t),label:t},null,8,["onClick","label"])])),_:2},1024)))),256))])),_:2},1024),(0,l.Wm)(Z,{class:"q-ml-md items-center",onClick:e=>w(t.id)},{default:u((()=>[(0,l.Wm)("div",_,[(0,l.Wm)(c,{dense:"",color:"white","text-color":"positive",icon:"chat",class:"q-pt-sm q-pb-xs q-pr-none q-mr-none",label:"("+t.comments.length+")"},null,8,["label"]),(0,l.Wm)(c,{square:"",outline:"",class:"card_action q-pb-xs q-pr-md q-mr-sm"},{default:u((()=>[(0,l.Wm)(v,{class:"q-pr-sm",size:"xs",color:"orange",name:"update"}),(0,l.Uk)(" "+(0,s.zw)((0,n.SU)(p.dE)(t.update)),1)])),_:2},1024)])])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)])),_:2},1024)))),256))])),_:1})]),(0,l.Wm)(o.Z,{count:(0,n.SU)(f).count},null,8,["count"])])])),_:1})}}});var x=a(4379),v=a(4027),w=a(7030),y=a(5869),W=a(7011),k=a(151),Z=a(5589),C=a(4554),j=a(6375),D=a(2165),U=a(9367),Q=a(7518),S=a.n(Q);f.__scopeId="data-v-472db132";const Y=f;S()(f,"components",{QPage:x.Z,QImg:v.Z,QChip:w.Z,QSeparator:y.Z,QList:W.Z,QCard:k.Z,QCardSection:Z.Z,QIcon:C.Z,QBtnGroup:j.Z,QBtn:D.Z,QCardActions:U.Z})}}]);