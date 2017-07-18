webpackJsonp([1],[,,,,,,,,,,,function(t,e){t.exports={hostip:"172.104.103.251",hostport:"9000"}},function(t,e,a){"use strict";var n=a(3),i=a(56),s=a(46),o=a.n(s),r=a(47),c=a.n(r),l=a(48),v=a.n(l),d=a(49),u=a.n(d);n.a.use(i.a),e.a=new i.a({mode:"history",routes:[{path:"/",name:"wfucsd",component:o.a},{path:"/members",name:"members",component:u.a},{path:"/lottery",name:"wfucsd lottery",component:c.a},{path:"/Marketplace",name:"wfucsd marketplace",component:v.a},{path:"*",name:"wfucsd",component:o.a}]})},function(t,e,a){function n(t){a(39)}var i=a(1)(a(31),a(52),n,null,null);t.exports=i.exports},,,,,,,,,,,,,,,,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(45),i=a.n(n);e.default={name:"app",components:{appHeader:i.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Home",data:function(){return{}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(10),i=a.n(n),s=a(4),o=a.n(s),r=a(11),c=a.n(r);e.default={data:function(){return{newlotteryObj:{wfid:"",lotteryKey:""},lotteries:null,prize1:"",prize2:"",prize3:"",prize4:"",prize5:"",timeLeft:"",luckyNumber:0,winners:[],distance:0,showTimeLeft:!0,eventState:0,eventStartTime:"",eventEndTime:""}},methods:{addLottery:function(){var t=this;if(2===this.eventState)return void i.a.warning("本期抽奖活动已经结束，尽请关注下次活动信息！");if(0===this.eventState)return void i.a.warning("抽奖活动还没开始，请稍后回来！");if(1===this.eventState){!0===confirm("重复投票，ID不正确或者非氏族成员，抽奖结果将被视为作废处理！请确认你的 warframe Id："+this.newlotteryObj.wfid)&&this.newlotteryObj.wfid&&(this.newlotteryObj.lotteryKey=Math.floor(1e3*Math.random()+1),o.a.post("http://"+c.a.hostip+":"+c.a.hostport+"/api/lotteries",t.newlotteryObj).then(function(e){i.a.success("奖票添加成功,感谢您的参与!"),t.getlotteries(),t.newlotteryObj.wfid=""}).catch(function(t){console.log(t)}))}},getlotteries:function(){var t=this;o.a.get("http://"+c.a.hostip+":"+c.a.hostport+"/api/lotteries").then(function(e){t.lotteries=e.data}).catch(function(e){console.log(t.errors)})},getWinner:function(){var t=this;o.a.get("http://"+c.a.hostip+":"+c.a.hostport+"/api/winners").then(function(e){t.winners=e.data}).catch(function(e){console.log(t.errors)})},getLuckyNumber:function(){var t=this;o.a.get("http://"+c.a.hostip+":"+c.a.hostport+"/api/luckynumberdb").then(function(e){t.luckyNumber=e.data}).catch(function(e){console.log(t.errors)})},getPrize:function(){var t=this;o.a.get("http://"+c.a.hostip+":"+c.a.hostport+"/api/eventdata").then(function(e){t.prize1=e.data.prize1,t.prize2=e.data.prize2,t.prize3=e.data.prize3,t.prize4=e.data.prize4,t.prize5=e.data.prize5,t.eventStartTime=e.data.eventStartTime,t.eventEndTime=e.data.eventEndTime}).catch(function(e){console.log(t.errors)})},getTime:function(){var t=this;o.a.get("http://"+c.a.hostip+":"+c.a.hostport+"/api/eventdata/countdown").then(function(e){t.distance=e.data.countdown}).catch(function(e){console.log(t.errors)})},getEventState:function(){var t=this;o.a.get("http://"+c.a.hostip+":"+c.a.hostport+"/api/eventdata/state").then(function(e){t.eventState=e.data.state}).catch(function(e){console.log(t.errors)})}},watch:{showTimeLeft:{handler:function(){this.getLuckyNumber(),this.getWinner()}}},created:function(){var t=this;return this.getEventState(),this.getPrize(),this.getTime(),this.getlotteries(),this.getWinner(),this.getLuckyNumber(),t.distance=this.distance,setInterval(function(){var e=Math.floor(t.distance/864e5),a=Math.floor(t.distance%864e5/36e5),n=Math.floor(t.distance%36e5/6e4),i=Math.floor(t.distance%6e4/1e3);t.distance>0?(t.timeLeft=e+"d "+a+"h "+n+"m "+i+"s ",t.showTimeLeft=!0):t.showTimeLeft=!1,t.distance=t.distance-1e3},1e3),t.timeLeft}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(10),i=a.n(n),s=a(4),o=a.n(s),r=a(11),c=a.n(r);e.default={name:"MarketPlace",data:function(){return{newItemObj:{selectedType:"",wfid:"",itemName:"",NumberOfItem:"",itemPrice:"",contact:""},items:""}},methods:{addItem:function(){var t=this;if(this.newItemObj.itemName&&this.newItemObj.itemPrice&&(this.newItemObj.wfid||this.newItemObj.contact)){this.newItemObj.NumberOfItem||(this.newItemObj.NumberOfItem="1");!0===confirm("请确认您发布的信息 \n物品名称: "+this.newItemObj.itemName+"\n物品价格: "+this.newItemObj.itemPrice+"\n物品数量: "+this.newItemObj.NumberOfItem+"\nwfid: "+this.newItemObj.wfid+"\n联系方式: "+this.newItemObj.contact+"\n")&&o.a.post("http://"+c.a.hostip+":"+c.a.hostport+"/api/marketplacedb",t.newItemObj).then(function(e){i.a.success("发布成功！"),t.getItems(),t.newItemObj.wfid="",t.newItemObj.itemName="",t.newItemObj.itemPrice="",t.newItemObj.NumberOfItem="",t.newItemObj.wfid="",t.newItemObj.contact=""}).catch(function(t){console.log(t)})}else i.a.warning("请输入必要的物品信息！")},getItems:function(){var t=this;o.a.get("http://"+c.a.hostip+":"+c.a.hostport+"/api/marketplacedb").then(function(e){t.items=e.data}).catch(function(e){console.log(t.errors)})},removeItem:function(t){var e=this;console.log(t),o.a.delete("http://"+c.a.hostip+":"+c.a.hostport+"/api/marketplacedb/"+t._id).then(function(t){e.Item=t.data,e.getItems()}).catch(function(t){console.log(e.errors)}),i.a.success("物品信息成功删除！")}},created:function(){this.getItems()}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),i=a(13),s=a.n(i),o=a(12);n.a.config.productionTip=!1,new n.a({el:"#app",router:o.a,template:"<App/>",components:{App:s.a}})},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e,a){var n=a(1)(null,a(55),null,null,null);t.exports=n.exports},function(t,e,a){function n(t){a(40)}var i=a(1)(a(32),a(53),n,"data-v-5c735121",null);t.exports=i.exports},function(t,e,a){function n(t){a(41)}var i=a(1)(a(33),a(54),n,null,null);t.exports=i.exports},function(t,e,a){function n(t){a(38)}var i=a(1)(a(34),a(51),n,null,null);t.exports=i.exports},function(t,e,a){function n(t){a(37)}var i=a(1)(a(35),a(50),n,null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[t._v("\n    Warframe UCSD Member page! \n  ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"panel panel-default"},[a("div",{staticClass:"panel-heading "},[t._v("\n      发布信息\n      ")]),t._v(" "),a("div",{staticClass:"panel-body "},[a("form",{staticClass:"input-group col-md-9 col-md-offset-1  ",attrs:{id:"form"},on:{submit:function(e){e.preventDefault(),t.addItem(e)}}},[a("div",{staticClass:"form-group col-sm-1"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.newItemObj.selectedType,expression:"newItemObj.selectedType"}],staticClass:"selectType",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.newItemObj.selectedType=e.target.multiple?a:a[0]}}},[a("option",[t._v("收")]),t._v(" "),a("option",[t._v("出")])])]),t._v(" "),a("div",{staticClass:"form-group col-sm-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newItemObj.itemName,expression:"newItemObj.itemName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"物品名称"},domProps:{value:t.newItemObj.itemName},on:{input:function(e){e.target.composing||(t.newItemObj.itemName=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group col-sm-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newItemObj.itemPrice,expression:"newItemObj.itemPrice"}],staticClass:"form-control",attrs:{type:"text",placeholder:"物品价格"},domProps:{value:t.newItemObj.itemPrice},on:{input:function(e){e.target.composing||(t.newItemObj.itemPrice=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group col-sm-1"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.newItemObj.NumberOfItem,expression:"newItemObj.NumberOfItem"}],staticClass:"selectType",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.newItemObj.NumberOfItem=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:""}},[t._v("1")]),t._v(" "),a("option",[t._v("2")]),t._v(" "),a("option",[t._v("3")]),t._v(" "),a("option",[t._v("4")]),t._v(" "),a("option",[t._v("5")])])]),t._v(" "),a("div",{staticClass:"form-group col-sm-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newItemObj.wfid,expression:"newItemObj.wfid"}],staticClass:"form-control",attrs:{type:"text",placeholder:"wfid"},domProps:{value:t.newItemObj.wfid},on:{input:function(e){e.target.composing||(t.newItemObj.wfid=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group col-sm-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newItemObj.contact,expression:"newItemObj.contact"}],staticClass:"form-control",attrs:{type:"text",placeholder:"QQ"},domProps:{value:t.newItemObj.contact},on:{input:function(e){e.target.composing||(t.newItemObj.contact=e.target.value)}}})]),t._v(" "),t._m(1)])])]),t._v(" "),a("div",{staticClass:"panel panel-default"},[a("div",{staticClass:"panel-heading"},[t._v("物品列表")]),t._v(" "),a("table",{staticClass:"table table-hover"},[t._m(2),t._v(" "),a("tbody",t._l(t.items,function(e){return a("tr",[a("td",[t._v(t._s(e.selectedType))]),t._v(" "),a("td",[t._v(t._s(e.itemName))]),t._v(" "),a("td",[t._v(t._s(e.itemPrice))]),t._v(" "),a("td",[t._v(t._s(e.NumberOfItem))]),t._v(" "),a("td",[t._v(t._s(e.wfid))]),t._v(" "),a("td",[t._v(t._s(e.contact))]),t._v(" "),a("td",[a("span",{staticClass:"glyphicon glyphicon-trash",attrs:{"aria-hidden":"true"},on:{click:function(a){t.removeItem(e)}}})])])}))])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row col-sm-12 "},[a("div",{staticClass:"panel panel-info "},[a("div",{staticClass:"panel-heading  "},[t._v("公告")]),t._v(" "),a("div",{staticClass:"panel-body "},[t._v("\n          本平台为氏族内部交易信息发布页面，同时也欢迎非氏族成员积极参与。祝大家游戏愉快！\n          "),a("br"),t._v("注意：发布交易信息必包括 物品名称，价格和一种联系方式。\n        ")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"input-group-btn col-sm-2"},[a("input",{staticClass:"btn btn-primary",attrs:{type:"submit",value:"Add"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("收/出")]),t._v(" "),a("th",[t._v("物品名称")]),t._v(" "),a("th",[t._v("物品价格")]),t._v(" "),a("th",[t._v("物品数量")]),t._v(" "),a("th",[t._v("warfarme Id")]),t._v(" "),a("th",[t._v("QQ")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("app-header"),t._v(" "),a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12"},[a("transition",{attrs:{name:"slide",mode:"out-in"}},[a("router-view")],1)],1)])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("h1",[t._v(" Home Page")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"container"},[t.showTimeLeft?a("div",{staticClass:"row col-sm-12 "},[a("div",{staticClass:"panel panel-info "},[a("div",{staticClass:"panel-heading  "},[t._v("奖品")]),t._v(" "),a("div",{staticClass:"panel-body "},[a("ol",[a("li",[t._v(t._s(t.prize1))]),t._v(" "),a("li",[t._v(t._s(t.prize2))]),t._v(" "),a("li",[t._v(t._s(t.prize3))]),t._v(" "),a("li",[t._v(t._s(t.prize4))]),t._v(" "),a("li",[t._v(t._s(t.prize5))])])])])]):a("div",[a("div",{staticClass:"row col-sm-5 "},[a("div",{staticClass:"panel panel-info "},[a("div",{staticClass:"panel-heading  "},[t._v("奖品")]),t._v(" "),a("div",{staticClass:"panel-body "},[a("ol",[a("li",[t._v(t._s(t.prize1))]),t._v(" "),a("li",[t._v(t._s(t.prize2))]),t._v(" "),a("li",[t._v(t._s(t.prize3))]),t._v(" "),a("li",[t._v(t._s(t.prize4))]),t._v(" "),a("li",[t._v(t._s(t.prize5))])])])])]),t._v(" "),a("div",{staticClass:"row col-sm-5 col-sm-offset-2 "},[a("div",{staticClass:"panel panel-info "},[a("div",{staticClass:"panel-heading  "},[t._v("中奖名单")]),t._v(" "),a("div",{staticClass:"panel-body"},[a("ol",t._l(t.winners,function(e,n){return n<5?a("li",[t._v(t._s(e.wfid))]):t._e()}))])])])])]),t._v(" "),0==t.eventState?a("div",{staticClass:"panel panel-info "},[a("div",{staticClass:"panel-heading "},[t._v("新一期的活动时间为 "),a("span",{staticStyle:{color:"red"}},[t._v(" "+t._s(t.eventStartTime)+" ")]),t._v(" 到 "),a("span",{staticStyle:{color:"red"}},[t._v(" "+t._s(t.eventEndTime)+" ")]),t._v("。")])]):t._e(),t._v(" "),1==t.eventState?a("div",{staticClass:"panel panel-info "},[a("div",{staticClass:"panel-heading "},[t._v("活动剩余时间: "),a("span",{staticStyle:{color:"red"}},[t._v(" "+t._s(t.timeLeft)+" ")])])]):t._e(),t._v(" "),2==t.eventState?a("div",{staticClass:"panel panel-info"},[a("div",{staticClass:"panel-heading "},[t._v("本期幸运数字: "),a("span",{staticStyle:{color:"red"}},t._l(t.luckyNumber,function(e,n){return n<1?a("tr",[a("td",[t._v(t._s(e.luckyNumber))])]):t._e()}))])]):t._e(),t._v(" "),a("div",{staticClass:"panel panel-default"},[a("div",{staticClass:"panel-heading "},[t._v("开始抽奖")]),t._v(" "),a("div",{staticClass:"panel-body "},[a("form",{staticClass:"input-group  col-sm-8 col-sm-offset-2 ",attrs:{id:"form"},on:{submit:function(e){e.preventDefault(),t.addLottery(e)}}},[a("span",{staticClass:"input-group-addon",attrs:{id:"basic-addon1"}},[t._v("@")]),t._v(" "),a("div",{staticClass:"form-group "},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newlotteryObj.wfid,expression:"newlotteryObj.wfid"}],staticClass:"form-control",attrs:{type:"text",placeholder:"warframe Id"},domProps:{value:t.newlotteryObj.wfid},on:{input:function(e){e.target.composing||(t.newlotteryObj.wfid=e.target.value)}}})]),t._v(" "),t._m(0)])])]),t._v(" "),a("div",{staticClass:"panel panel-default"},[a("div",{staticClass:"panel-heading"},[t._v("参与者名单")]),t._v(" "),a("table",{staticClass:"table table-hover"},[a("thead",[a("tr",[a("th",[t._v("warframe Id")]),t._v(" "),a("th",[t._v("抽奖号码")]),t._v(" "),0==t.showTimeLeft?a("th",[t._v("差值")]):t._e()])]),t._v(" "),a("tbody",t._l(this.lotteries,function(e){return a("tr",[a("td",[t._v(t._s(e.wfid))]),t._v(" "),a("td",[t._v(t._s(e.lotteryKey))]),t._v(" "),0==t.showTimeLeft?a("td",[a("span",[t._v(t._s(e.diff))])]):t._e()])}))])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"input-group-btn"},[a("input",{staticClass:"btn btn-default",attrs:{type:"submit",value:"Go!"}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar navbar-default"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"navbar-header"},[a("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[t._v("wfucsd")])],1),t._v(" "),a("div",{staticClass:"collapse navbar-collapse"},[a("ul",{staticClass:"nav navbar-nav"},[a("router-link",{attrs:{to:"/Members","active-class":"active",tag:"li"}},[a("a",[t._v("成员")])]),t._v(" "),a("router-link",{attrs:{to:"/lottery","active-class":"active",tag:"li"}},[a("a",[t._v("抽奖")])]),t._v(" "),a("router-link",{attrs:{to:"/Marketplace","active-class":"active",tag:"li"}},[a("a",[t._v("买卖")])])],1),t._v(" "),a("ul",{staticClass:"nav navbar-nav navbar-right"})])])])},staticRenderFns:[]}}],[36]);