(self["webpackChunkweb_vue3"]=self["webpackChunkweb_vue3"]||[]).push([[204],{7590:(t,s,o)=>{"use strict";o.d(s,{Z:()=>i});var e=o(3673),a=o(2323);const l=(0,e.aZ)({expose:[],props:{tip:{type:String},delay:{type:Number,default:100},offset:{type:Array,default:()=>[0,8]}},setup(t){return(s,o)=>{const l=(0,e.up)("q-tooltip");return(0,e.wg)(),(0,e.j4)(l,{id:"chiptip",delay:t.delay,offset:t.offset,class:"bg-grey-12 text-black shadowonly","transition-show":"jump-up","transition-hide":"jump-down"},{default:(0,e.w5)((()=>[(0,e.Uk)((0,a.zw)(t.tip),1)])),_:1},8,["delay","offset"])}}});var c=o(8870),n=o(7518),r=o.n(n);const i=l;r()(l,"components",{QTooltip:c.Z})},7204:(t,s,o)=>{"use strict";o.r(s),o.d(s,{default:()=>H});var e=o(3673),a=o(2323),l=o(1959),c=o(7590),n=o(1768);const r=(0,e.HX)("data-v-51671cae");(0,e.dD)("data-v-51671cae");const i={key:0,class:"\n          absolute-bottom-right\n          text-grey-9 text-caption\n          q-mb-sm q-ml-lg q-mr-sm\n        "},d={key:1,class:"\n          absolute-bottom-right\n          text-grey-9 text-caption\n          q-mb-sm q-ml-lg q-mr-sm\n        "};(0,e.Cn)();const p=(0,e.aZ)({expose:[],setup(t){const s=(0,l.qj)({hitokoto:"给岁月以文明，而不是给文明以岁月",from:"三体II · 黑暗森林",from_who:"罗辑"});(0,e.bv)((()=>{console.log("hitokoto getData");setInterval(o,8e3)}));const o=()=>{n.api.get("https://v1.hitokoto.cn?encode=json").then((t=>{s.hitokoto=t.data.hitokoto,s.from=t.data.from,s.from_who=t.data.from_who,console.log("get 1 Hitokoto; type = "+t.data.type)}))},p=()=>{window.open("https://hitokoto.cn/")};return(t,o)=>{const n=(0,e.up)("q-avatar"),m=(0,e.up)("q-chip"),u=(0,e.up)("q-card"),h=(0,e.up)("q-parallax");return(0,e.wg)(),(0,e.j4)(h,{class:"q-pa-none",speed:1,src:"https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/hitokoto.png"},{default:r((()=>[(0,e.Wm)(u,{padding:"",bordered:"",id:"hito_card",class:"absolute-full text-center flex flex-center q-pa-xl"},{default:r((()=>[(0,e.Wm)(m,{square:"",size:"xs",color:"grey-3",class:"absolute-top-left z-top"},{default:r((()=>[(0,e.Wm)(n,{class:"cursor-pointer",onClick:p,icon:"bubble_chart",color:"primary","text-color":"white"}),(0,e.Wm)("div",{class:"cursor-pointer",onClick:p},"一言"),(0,e.Wm)(c.Z,{tip:"有时是一颦一簇，有时是一字一句。"})])),_:1}),(0,e.Uk)(" "+(0,a.zw)((0,l.SU)(s).hitokoto)+" ",1),null!==(0,l.SU)(s).from_who?((0,e.wg)(),(0,e.j4)("div",i," —— "+(0,a.zw)((0,l.SU)(s).from_who)+" /《"+(0,a.zw)((0,l.SU)(s).from)+"》 ",1)):((0,e.wg)(),(0,e.j4)("div",d," —— 《"+(0,a.zw)((0,l.SU)(s).from)+"》 ",1))])),_:1})])),_:1})}}});var m=o(9443),u=o(151),h=o(7030),g=o(5096),f=o(7518),v=o.n(f);p.__scopeId="data-v-51671cae";const w=p;v()(p,"components",{QParallax:m.Z,QCard:u.Z,QChip:h.Z,QAvatar:g.Z});var y=o(9582);const b=(0,e.HX)("data-v-73fdf72b");(0,e.dD)("data-v-73fdf72b");const q={class:"q-gutter-y-lg row"},x=(0,e.Wm)("div",{class:"col-12 text-center q-my-md text-h5 text-bold"},"最新文章",-1);(0,e.Cn)();const k=(0,e.aZ)({expose:[],setup(t){const s=(0,l.qj)({all:[]});(0,e.bv)((()=>{o()}));const o=()=>{n.api.get("/api/article").then((t=>{s.all=t.data.results.slice(0,4)}))},c=(0,y.tv)(),r=t=>{c.push({path:`/article/${t}`,params:{id:t}})};return(t,o)=>{const c=(0,e.up)("q-img"),n=(0,e.up)("q-card-section"),i=(0,e.up)("q-card");return(0,e.wg)(),(0,e.j4)("div",q,[x,((0,e.wg)(!0),(0,e.j4)(e.HY,null,(0,e.Ko)((0,l.SU)(s).all,(t=>((0,e.wg)(),(0,e.j4)("div",{class:"col-12 col-sm-6 col-md-6 col-lg-6 q-px-md",key:t.id},[(0,e.Wm)(i,{class:"shadowhover",onClick:s=>r(t.id)},{default:b((()=>[(0,e.Wm)(n,{class:"q-pa-none"},{default:b((()=>[(0,e.Wm)(c,{src:t.img,class:"card_img",ratio:16/9},null,8,["src"])])),_:2},1024),(0,e.Wm)(n,{class:"text-h6 ellipsis"},{default:b((()=>[(0,e.Uk)((0,a.zw)(t.title),1)])),_:2},1024)])),_:2},1032,["onClick"])])))),128))])}}});var _=o(5589),W=o(4027);k.__scopeId="data-v-73fdf72b";const j=k;v()(k,"components",{QCard:u.Z,QCardSection:_.Z,QImg:W.Z});const Z=(0,e.HX)("data-v-d9f1db26");(0,e.dD)("data-v-d9f1db26");const C={class:"col-md-9 col-12 ztop2 q-px-md q-pb-lg justify-center items-center",style:{margin:"-44.5px"}},Q=(0,e.Wm)("div",{class:"shadowonly bg-white text-center q-pa-sm q-mb-md"},[(0,e.Wm)("div",{class:"text-h4 text-bold text-blue-grey-8 q-mb-sm"},"Evensyell's blog"),(0,e.Wm)("div",null,"兴趣使然的个人博客")],-1),z={class:"row q-mt-md"},U={class:"col-12 row q-my-md q-px-sm justify-between"};(0,e.Cn)();const I=(0,e.aZ)({expose:[],setup(t){(0,l.iH)("");return(t,s)=>{const o=(0,e.up)("q-img"),a=(0,e.up)("q-page");return(0,e.wg)(),(0,e.j4)(a,{class:"row justify-center"},{default:Z((()=>[(0,e.Wm)(o,{class:"gt-xs",src:"https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/index.png",style:{height:"100vh",width:"100vd",opacity:"0.95"}}),(0,e.Wm)(o,{class:"xs",src:"https://evens-oss.oss-cn-shanghai.aliyuncs.com/img/index_mobile.png",style:{height:"74vh",width:"100vd",opacity:"0.95"}}),(0,e.Wm)("div",C,[Q,(0,e.Wm)("div",z,[(0,e.Wm)("div",U,[(0,e.Wm)(w,{class:"col-12 q-pa-sm shadowonly text-black",style:{height:"280px"}})]),(0,e.Wm)(j,{class:"col-12 q-my-sm q-px-sm"})])])])),_:1})}}});var S=o(4379);I.__scopeId="data-v-d9f1db26";const H=I;v()(I,"components",{QPage:S.Z,QImg:W.Z})}}]);