(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{170:function(t,e,n){"use strict";e.a=function(t){var title=t.title,e=t.desc,desc=void 0===e?"令狐少侠的个人空间":e,n=t.script,script=void 0===n?[]:n;return{head:{title:"".concat(title," - ").concat(desc),script:script}}}},182:function(t,e,n){var content=n(200);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(14).default)("eb8b29e0",content,!0,{sourceMap:!1})},199:function(t,e,n){"use strict";var o=n(182);n.n(o).a},200:function(t,e,n){(e=n(13)(!1)).push([t.i,'[data-v-5d952a48]:root{--ns-primary:247,148,0;--ns-success:70,201,58;--ns-warning:255,186,0;--ns-danger:255,71,87;--ns-dark:30,30,30}.creation-list[data-v-5d952a48]{max-width:1000px;margin:0 auto}.creation-list__item[data-v-5d952a48]{margin-bottom:1rem;padding-top:2rem;padding-bottom:2rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-bottom:1px solid rgba(0,0,0,.05)}.creation-list__item .img-wrapper[data-v-5d952a48]{background-color:#edf2f7;overflow:hidden;width:350px;height:200px;border-radius:10px;-webkit-box-shadow:0 0 20px 5px rgba(0,0,0,.06);box-shadow:0 0 20px 5px rgba(0,0,0,.06)}.creation-list__item .text-content[data-v-5d952a48]{margin-left:2.5rem;padding:1rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1 1 0%;-ms-flex:1 1 0%;flex:1 1 0%;min-height:200px}.creation-list__item .text-content .links[data-v-5d952a48]{color:#718096;margin-top:auto}.creation-list__item .text-content .links .link[data-v-5d952a48]{position:relative;padding:0 .8rem}.creation-list__item .text-content .links .link[data-v-5d952a48]:first-child{padding-left:0}.creation-list__item .text-content .links .link[data-v-5d952a48]:not(:last-child):after{background-color:#cbd5e0;content:"";position:absolute;top:50%;right:0;width:1px;height:15px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.creation-list__item .text-content .links .link .icon[data-v-5d952a48]{margin-right:.25rem;font-size:1.5rem}@media (max-width:800px){.creation-list[data-v-5d952a48]{margin:0 auto}.creation-list__item[data-v-5d952a48]{margin-bottom:1rem;padding-top:2rem;padding-bottom:2rem;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;border-bottom:1px solid rgba(0,0,0,.05)}.creation-list__item .img-wrapper[data-v-5d952a48]{width:100%}.creation-list__item .text-content[data-v-5d952a48]{margin:10px 0 0;min-height:auto}.creation-list__item .text-content .desc[data-v-5d952a48]{padding:0!important;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3}}',""]),t.exports=e},211:function(t,e,n){"use strict";n.r(e);var head=n(170),o={mixins:[Object(head.a)({title:"作品"})],data:function(){return{creations:[{img:"https://gitee.com/chinesee/images/raw/master/img/img_011.jpg",title:"意想社团 - 高校社团 APP",description:"在意想社团，你可以找到感兴趣的社团组织，也可以作为管理者来管理自己的组织。该应用可以用来宣传社团活动，加强社团间的交流。本项目使用 React Native 开发。",github:"https://github.com/Chinesee/eason-club"},{img:"https://gitee.com/chinesee/images/raw/master/img/img_004.jpg",title:"意想课表 - 教务信息查询助手",description:"微信小程序，在这里你可以查课表、查成绩、查考勤",github:"https://github.com/Chinesee/eason-campus",preview:"https://github.com/Chinesee"},{img:"https://gitee.com/chinesee/images/raw/master/img/img_027.png",title:"乐享校园后台系统 - 校园二手交易平台",description:"我的毕业设计，是我使用 vue 做的第一个后台管理系统。",github:"https://gitee.com/chinesee/love-share-admin",preview:""},{img:"https://gitee.com/chinesee/images/raw/master/img/img_028.png",title:"乐享校园客户端 - 校园二手交易平台",description:"我的毕业设计，一个可以发布和购买二手商品的交易平台，具有订单查询、在线沟通、商品评价等功能。",github:"https://github.com/Chinesee/love-share-client",preview:""}],icons:{online:{icon:"🎨",label:"在线地址"},repository:{icon:"🎉",label:"项目仓库"}}}},methods:{linkTo:function(link){window.open(link)}}},r=(n(199),n(2)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"creation p-6 md:p-8 lg:p-10 transition"},[n("ul",{staticClass:"creation-list"},t._l(t.creations,(function(e){var img=e.img,title=e.title,o=e.description,r=e.github,l=e.preview;return n("li",{key:title,staticClass:"creation-list__item"},[n("div",{staticClass:"img-wrapper"},[n("img",{staticClass:"cover-img w-full h-full object-cover",attrs:{src:img,alt:"封面图片"}})]),t._v(" "),n("div",{staticClass:"text-content"},[n("h3",{staticClass:"text-lg font-bold truncate"},[t._v(t._s(title))]),t._v(" "),n("p",{staticClass:"desc my-2 text-sm"},[t._v(t._s(o))]),t._v(" "),n("ul",{staticClass:"links flex items-center"},[r?n("li",{staticClass:"link"},[n("a",{staticClass:"flex items-center",attrs:{rel:"noopener noreferrer",target:"_blank",href:r}},[n("i",{staticClass:"bx bxl-github icon"}),t._v("\n              GitHub\n            ")])]):t._e(),t._v(" "),l?n("li",{staticClass:"link"},[n("a",{staticClass:"flex items-center",attrs:{rel:"noopener noreferrer",target:"_blank",href:l}},[n("i",{staticClass:"bx bx-chalkboard icon"}),t._v("\n              Preview\n            ")])]):t._e()])])])})),0)])}),[],!1,null,"5d952a48",null);e.default=component.exports}}]);