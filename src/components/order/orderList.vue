<template>
    <!--有消费订单-->
<div class="shopmanmain  bghui" id="orderList"  >
    <template v-if="hasOrder" >
       
                    
           
        <template  v-for="item in orderList">
             
            <div class="xf_notes_yy">
                <div  @click="orderDetailUrl(item.subOrderNo, item.orderId,item.shopNo,item.orderStatus,item.orderWay,item.orderPayStatus,item.shopId,item.type)">

                    <div class="xf_notes_shop_title" >
                        <div class="xf_notes_shop_title_center">
                            <a href="javascript:;" class="xf_notes_shop_title_btn">
                                <span class="xf_notes_shop_title_icon sp"></span>
                                <span class="xf_notes_shop_name" v-text="item.shopName"> </span>
                                <span class="xf_notes_shop_title_jt sp"></span>
                            </a>
                            <span class="xf_notes_shop_zt" v-text='item.orderStatusDesc'></span>
                        </div>
                    </div>
                    <div class="xf_notes_yy_inf">
                        <div class="xf_notes_yy_inf_pic">
                            <img v-bind:src="item.imageId " onerror="this.src='{{defaultImg}}'"  alt="">
                        </div>
                        <div class="xf_notes_yy_inf_text">
                            <p class="xf_notes_yy_inf_text_p1" v-if="item.title" ><span v-text="item.title"></span></p>
                            
                            <div v-if="item.type==0"><!-- 扫码支付 -->
                               <p class="xf_notes_yy_inf_text_time">完成时间：<span v-text="item.createDateDesc"></span> </p>
                            </div>
                             <div v-if="item.type==1"><!-- 订单支付 -->
                                  <p class="xf_notes_yy_inf_text_time" v-if="item.orderStatus==1 || item.orderStatus==4 || item.orderStatus==2">
                                        <span v-if="item.orderStatus==2 || item.orderStatus==4">预约时间：<span v-text="item.orderDate"></span></span>
                                        <span v-if="item.orderStatus==1">完成时间：<span v-text="item.createDateDesc"></span></span>
                                  </p>
                                  <p class="xf_notes_yy_inf_text_time" v-else></p>
                            
                             </div>
                            
                           
                            <div class="xf_notes_yy_inf_prc">
                                <span>总价：￥<font v-text="item.orderMoney"></font> <span v-if="item.orderStatus==1">（<span   v-text="item.orderWayDesc"></span>）</span> </span>
                               
                                   <span  v-if="item.type==1"><!-- 订单支付 -->
                                      <span>|</span>
                                      <span>数量：<span v-text="item.productNumber"></span></span>
                                   </span>
                                   <span v-else><!-- 扫码支付 -->
                                   </span>
                               
                            </div>

                        </div>
                    </div>
                </div>
               <!-- 暂时不
               支付状态 -1 待支付，0支付未成功 1 支付已成功
                定单状态 0：进行中（待支付或确认）:1：已完成、2：付定金:3：已撤消（失效）4：待开始（针对预约订单）5退款中 6退款已完成 7退款失败 8已结束（未收款）-->
                <div class="xf_notes_yy_btn">
                    <div class="xf_notes_yy_btn_center">
                        <!-- v-if="(item.orderStatus==2 || item.orderStatus==4) && item.orderPayStatus==-1 && item.orderWay==6"-->




                        <div v-if="(item.orderStatus==2 || item.orderStatus==4) && item.orderPayStatus==-1 && item.orderWay==6">
                            <a href="javascript:;" class="btn_go_fk" @click="weixinPay(item.subOrderNo ,item.shopId,item.shopNo,item.orderId)">去付款</a>
                        </div>


                        <div v-if="(item.orderStatus==1 ||  item.orderStatus==2 || item.orderStatus==4)  && item.orderWay !=6 &&  item.orderPayStatus !=1">
                            <!--<a href="javascript:;" class="btn_change_time">修改预约时间</a>-->
                            <a class="orderLisTime">
                                <div class="page page-current page-datetime-picker changePreTime"  data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}" >
                                    <input type="text"  @click="modifyReserveTime(this,item.shopId,item.orderId,$event)"  data-order-id="{{ item.orderId}}" data-shop-id="{{item.shopId }}" placeholder="修改预约时间" class='datetime-picker' readonly  />
                                    <a class="yyxfdat_but0 yyxfdat_but2"  >修改预约时间</a>
                                </div>
                            </a>
                            <a href="javascript:;" class="btn_qx_yy" @click="cancelYuyue(item.shopId,item.orderId)">取消预约</a>
                        </div>


                        <a href="javascript:;" class="btn_change_time"
                           v-if="item.orderStatus==1 && item.orderPayStatus== 1 && !item.hasComment" @click="evaluateFun(item.shopNo,item.subOrderNo,item.shopId,item.orderId,item.type)"
                        >去评价</a>

                        <div v-if=" (item.orderStatus ==4 ||item.orderStatus ==2 ) &&  item.orderPayStatus== 1  && item.orderWay ==6 ">
                            <!--<a href="javascript:;" class="btn_change_time">修改预约时间</a>-->
                            <a class="orderLisTime">
                                <div class="page page-current page-datetime-picker changePreTime"  data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}" >
                                    <input type="text" @click="modifyReserveTime(this,item.shopId,item.orderId)"  data-order-id="{{ item.orderId}}" data-shop-id="{{item.shopId }}" placeholder="修改预约时间" class='datetime-picker' readonly  />
                                    <a class="yyxfdat_but0 yyxfdat_but2"  >修改预约时间</a>
                                </div>
                            </a>
                            <a href="javascript:;" class="btn_qx_yy" @click="refundMony( item.orderMoney,item.shopId,item.shopNo,item.orderId,item.subOrderNo)">申请退款</a>
                        </div>




                    </div>



                </div>
            </div>
         
        </template>  
       
    </template>
  
    <template  v-else>
        <div class="my_shop_gl_box" >
            <div class="my_shop_gl_false" style="display:block">
                <div class="my_xf_notes_icon"></div>
                <p class="my_shop_gl_false_p1">当前关联的店铺中暂无消费记录</p>
                <p class="my_shop_gl_false_p2">请前往商家确认手机号码和消费记录</p>
            </div>
        </div>
    </template>
</div>


</template>

<script>
 
import * as ajaxUtil from '../../util/Ajax.js'; //ajax 请求\
import store from 'store';
import * as commonUtil from '../../util/commonUtil.js';
export default {
  //数据初始化
  data () {
     return {
        downLoadImgUrl:GLOBAL.mpDownLoadImgUrl,
        defaultImg : "/resources/images/meirong/shop/20160718_yy_fwh/my_xf_notes_icon12.png",//默认图片
        orderList:[],
        myOrderList:[],
        offset:0,//索引0 请求数据
        loading : false ,
        hasOrder:true  //判断是否有订单
     }
   },
   computed:{
        mpGlobal :function(){
            return store.get("mpGlobal");
        }
    },
   beforeCompile(){
        //清理全部localStore
        // localStorage.clear();
        //获取来源入口， orally=info 说明是从  我的  入口进入   orally=telCheck 验证手机的入口
        var _this = this ;
        document.title = "消费记录";
        var scrolltop = store.get("scrollTop");//获取滚动条位置
        if (scrolltop) {      
                setTimeout('document.body.scrollTop=' + scrolltop + ';', 1000);
        }
        store.remove("globalVar");
        store.set("globalVar",this.mpGlobal);  
        sessionStorage.clear();
        var mpGlobal = store.get("mpGlobal");
            if(mpGlobal){
                var openId= mpGlobal.openId;
                var accessToken = mpGlobal.accessToken ;
            }
         _this.getUserInfo();   
       

   },
   ready(){
       var  _this = this ;
       
   },
   //方法
   methods:{
         //获取用户信息
        getUserInfo : function(){
            var _this =this;
            var mpGlobal = store.get("mpGlobal");
            var openId = mpGlobal.openId;
            var accessToken = mpGlobal.accessToken;

            ajaxUtil.getUserInfo({
                openId:openId,
                accessToken:accessToken
            },function(jsonData){
                if(jsonData){
                    _this.relation_status = jsonData.strongCorrelation;
                    store.set("strongCorrelation",_this.relation_status);//强关联标识 很重要
                    _this.queryOrderList();//获取数据
                    var mpGlobal = store.get("mpGlobal");
                    if(mpGlobal.appId){
                        store.remove(mpGlobal.appId);
                        mpGlobal.appId=jsonData.appId;
                        store.set("mpGlobal",mpGlobal)
                    }else{
                        mpGlobal.appId=jsonData.appId;
                        store.set("mpGlobal",mpGlobal)

                    }
                }
            })
        },
        //进入详情
         orderDetailUrl:function (subOrderNo,orderId,shopNo,orderStatus,orderWay,orderPayStatus,shopId,type){
            var _this = this ;
            var scrollTop = $(document).scrollTop();//获取滚动条高度
            store.set("scrollTop",scrollTop);//
            
            if (type !=1 && type != 0) {
              type = 1 ;
                }
            
            //type  0 扫码支付   1订单支付
            if (type ==1) {
              if((orderStatus==5 || orderStatus==6 || orderStatus==7) && orderWay==6 &&  (orderPayStatus==1 || orderPayStatus==0)){
                   /* location.href= GLOBAL.contextPath+"manager-user-info-wx_user_refund_details?orderId="+subOrderNo+"&shopId="+ shopId+ "&shopSid="+shopNo;*/
                }else{
                 _this.$router.go({name: 'orderInfo',query:{"orderId": subOrderNo,"shop_no":shopNo,'shop_id':shopId,'type':type}});  
                }
      } else {
         //location.href= GLOBAL.contextPath+"order-order_info?orderId="+ subOrderNo+"&shop_no="+shopNo+"&type="+type;
          _this.$router.go({name: 'orderInfo',query:{"orderId":subOrderNo,"shop_no":shopNo,'type':type}}); 
      }
            

        },

          //申请退款

        refundMony: function(orderMoney,shopId,shopSid,orderId,orderNo){
            //申请退款
            /*window.location.href= GLOBAL.webRoot + "/manager-user-catalog-wx_user_apply_refund?shopId="+shopId+"&orderMoney="+orderMoney+"&orderId="+orderId+"&shopSid="+shopSid+"&orderNo="+ orderNo;*/

        },
        //去评价  type;//消费记录类型：0:扫码支付，1:saas消费记录
        evaluateFun :function(shopSid,orderNo,shopId,orderId,type){
            
            var mpGlobal =store.get('mpGlobal');
            
            if (type == 0) {
                 ////massage 1 消息模板 2，订单列表
                window.location.href = GLOBAL.webRoot +"/assess-order_assess?shop_no="+ shopSid 
                +"&orderId="+orderId
                +"&shopId="+shopId
                + "&orderNo="+orderNo
                +"&openid="+mpGlobal.openId
                +"&app_id="+mpGlobal.appId
                +"&pay_order_no="+orderNo
                +"&message=2"
                +"&urlFrom=orderList";
              return ;
            }
            //massage 1 消息模板 2，订单列表
            window.location.href = GLOBAL.webRoot +"/assess-order_sass_assess?shopNo="+ shopSid +"&orderId="+orderId+"&shopId="+shopId + "&orderNo="+orderNo + "&message=2";

        },


        //微信支付
        weixinPay:function(subOrderId,shopId,shopSid,orderId){

            var _this = this ;
            var mpGlobal =store.get('mpGlobal');
            //包装数据
            var opt={};
            opt.appId=_this.mpGlobal.appId;
            opt.openId= _this.mpGlobal.openId;
            opt.subOrderId = subOrderId;
            opt.orderId = orderId;
            opt.shopId = shopSid;
            opt.realShopId =shopId;
            opt.activityId = 0;
            opt.from = "orderLis";//orderLis  or  orderdetail
            opt.contextUrl =GLOBAL.contextPath;
            opt.accessToken = _this.mpGlobal.accessToken;

            ajaxUtil.doGet({
                url: request.reserved.getWXOrderPayInfo,
                type:"get",
                async: false,
                data:{
                    app_id: opt.appId,
                    open_id :opt.openId,
                    pay_open_id:opt.openId,
                    order_id:  opt.orderId,
                    shop_id:opt.shopId,
                    access_token :opt.accessToken
                },
                dataType:"json",
                success: function(data){
                    //alert("data:"+JSON.stringify(data));
                    if(200 == data.status && data.content){
                        var contentJSONData =ajaxUtil.decodeContent(data.content);
                        contentJSONData = JSON.parse(contentJSONData);

                        //唤起微信支付
                        contentJSONData.contextUrl=GLOBAL.contextPath;
                        contentJSONData.shopId=opt.shopId;
                        contentJSONData.activityId=opt.activityId;
                        contentJSONData.from=opt.from;
                        contentJSONData.failUrl=location.href.toString();

                        globalUtil.callWXPay(contentJSONData);
                    }else{
                        alert('获取后台支付签名失败');
                    }
                },
                error:function(e){}

            });
        },

        

         /* 查该用户的所有订单 */
        queryOrderList : function(){
            
            var _this =this;
            var mpGlobal = store.get("mpGlobal");
            var openId = mpGlobal.openId;
            var accessToken = mpGlobal.accessToken;
            var shopSid = getUrlParam("shopSid") || 0;
            if (_this.offest== 0) {
                _this.orderList =[] ;
            }


            //如果存在shopSid 则查询个人店铺
            if(openId && !shopSid){
                //定单状态 0：进行中（待支付或确认）:1：已完成、2：付定金:3：已撤消（失效）4：待开始（针对预约订单）5退款中 6退款已完成 7退款失败 8已结束（未收款）
               ajaxUtil.doPost({
                    url:request.user.fetchOrderList+openId + "/orders",
                    data:{token:accessToken,offset:_this.offset,limit:20}
                },function(data){
                    var orderList = data.orders;
                    if (orderList.length>0){
                        //时间转毫秒
                       orderList.forEach(function(item, index) {
                            //转日期  //预约时间
                            if (item.orderDate) {
                                var orderDate=new Date(item.orderDate);
                                orderList[index].orderDate= orderDate.format("yyyy-MM-dd hh:mm");
                            }
                          //生成
                  if (item.createDate) {
                    var preDate=new Date(item.createDate);
                    orderList[index].createDateDesc= preDate.format("yyyy-MM-dd hh:mm");
                  }
                            //图片
                            var logoUrl =item.imageId;
                            if (logoUrl) {
                                if (logoUrl.indexOf('/0') != -1) {
                                    orderList[index].imageId =_this.defaultImg;
                                }else{
                                   orderList[index].imageId =_this.downLoadImgUrl+commonUtil.checkImgIsNumber(logoUrl);
                                }

                            }else{
                               orderList[index].imageId =_this.defaultImg;
                            }
                            //付款方式
                           orderList[index].orderWayDesc = commonUtil.getPayDesc(item.orderWay);

                            //店铺名
                            if (!item.shopName) {
                                orderList[index].shopName = '默认店铺';
                            }

                            if (item.type==0) {
                               orderList[index].title = '扫码支付';
                            }
                          

                            //金额
                            if (item.orderPayMoney) {
                               orderList[index].orderPayMoney ="¥"+item.orderPayMoney.toFixed(2);
                            }else{
                               orderList[index].orderPayMoney ="¥0.00";
                            }

                        });
                       _this.orderList =  _this.orderList.concat(orderList); //数组
                        _this.hasOrder=true;
                        _this.loading=false;

                        


                    }else {
                         if (_this.offset==0) {
                            _this.hasOrder=false;
                            if (!_this.relation_status) {
                                window.location.href =GLOBAL.contextPath+ "/shop-self_no_ref_shop"+"?from=orderList";
                            }
                         }else{
                            //不是第一页
                          $("#downScroll").hide();//加载隐藏
                         }

                       
                    }
                })
                //查该用户在这个店铺的订单
            }else if(openId && shopSid){
                //定单状态 0：进行中（待支付或确认）:1：已完成、2：付定金:3：已撤消（失效）4：待开始（针对预约订单）5退款中 6退款已完成 7退款失败 8已结束（未收款）
               ajaxUtil.doPost({
                    url:request.user.fetchOrderList+openId + "/orders",
                    data:{shop_no:shopSid,token:accessToken,offset:0,limit:20}
                },function(data){
                    var orderList = data.orders;
                    if (orderList.length>0){
                        //时间转毫秒
                       orderList.forEach(function(item, index) {
                            //转日期  //预约时间
                            if (item.orderDate) {
                                var orderDate=new Date(item.orderDate);
                                orderList[index].orderDate= orderDate.format("yyyy-MM-dd hh:mm");
                            }
                          //生成
                  if (item.createDate) {
                    var preDate=new Date(item.createDate);
                    orderList[index].createDateDesc= preDate.format("yyyy-MM-dd hh:mm");
                  }
                            //图片
                            var logoUrl =item.imageId;
                            if (logoUrl) {
                                if (logoUrl.indexOf('/0') != -1) {
                                    orderList[index].imageId =_this.defaultImg;
                                }else{
                                   orderList[index].imageId =_this.downLoadImgUrl+commonUtil.checkImgIsNumber(logoUrl);
                                }

                            }else{
                               orderList[index].imageId =_this.defaultImg;
                            }
                            //付款方式
                           orderList[index].orderWayDesc = commonUtil.getPayDesc(item.orderWay);

                            //店铺名
                            if (!item.shopName) {
                                orderList[index].shopName = '默认店铺';
                            }

                            if (item.type==0) {
                               orderList[index].title = '扫码支付';
                            }
                          

                            //金额
                            if (item.orderPayMoney) {
                               orderList[index].orderPayMoney ="¥"+item.orderPayMoney.toFixed(2);
                            }else{
                               orderList[index].orderPayMoney ="¥0.00";
                            }

                        });
                       _this.orderList =  _this.orderList.concat(orderList); //数组合并
                       //判断是否第一页
                       
                        _this.hasOrder=true;
                        _this.loading=false;

                    }else {
                       
                        if (_this.offset==0) {
                            _this.hasOrder=false;
                            if (!_this.relation_status) {
                                window.location.href =GLOBAL.contextPath+ "/shop-self_no_ref_shop"+"?from=orderList";
                            }
                         }else{
                            //不是第一页

                          $("#downScroll").hide();//加载隐藏
                         }
                    }
                })

            }


        }

    
 
   },
   //销毁 
   beforeDestroy(){
       $(document.body).pullToRefresh().on("pull-to-refresh",{});  //注销滚动
       $(document.body).infinite().on("infinite",{});
   }


  }



</script>

<style>
 .scroll_user{
    height: 50px; 
    line-height: 50px;
    background-color: #fff;
    margin-bottom: 5px;
    font-size: 18px;
    padding-top: 0px;
 }
/*超出显示省略号（1行）*/
.hid_slh1{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-overflow:ellipsis;}
/*超出显示省略号（2行）*/
.hid_slh2{overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
.hid_slh2{overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}

 #orderList .sp{background: url("/resources/images/meirong/shop/20160718_yy_fwh/my_xf_sp.png") no-repeat; background-size: 578px 600px;}

.xf_notes_yy{width: 640px; overflow: hidden; padding-bottom: 18px; background-color: #fff; margin-bottom: 20px;}
.xf_notes_shop_title{width: 640px; height: 88px; border-bottom: 1px solid #e4e4e4; }
.xf_notes_shop_title_center{width: 610px; height: 88px; margin-left: 29px;}
.xf_notes_shop_title_btn{}
#orderList.xf_notes_shop_title_icon{display: block; width: 26px; height: 23px; background-position: -32px -481px; float: left; margin: 33px 0 0 0;}
.xf_notes_shop_name{color: #7c7c7c; font-size: 24px; line-height: 88px; float: left; margin-left: 5px; text-decoration: none}
#orderList .xf_notes_shop_title_jt{display: block; width: 12px; height: 20px; background-position: -72px -482px; float: left; margin: 36px 0 0 5px;}
.xf_notes_shop_zt{float: right; text-align: right; line-height: 88px; color: #ff4f4f; font-size: 24px; margin-right: 25px;}
.xf_notes_yy_inf{width: 610px; overflow: hidden; margin: 30px 0px 0 29px;}
.xf_notes_yy_inf_pic{width: 110px; height: 110px; float: left; margin-right: 20px;}
.xf_notes_yy_inf_pic img{display: block; width: 100%; height: 100%;}
.xf_notes_yy_inf_text{width: 477px; overflow: hidden; float: left;}
.xf_notes_yy_inf_text_p1{width: 100%; height: 50px; color: #444444; font-size: 30px; line-height: 30px;  margin: 0px;}
.xf_notes_yy_inf_text_time{width: 100%; height: 30px; color: #7c7c7c; font-size: 24px; line-height: 30px; margin: 0px;}
.xf_notes_yy_inf_prc{width: 100%; height: 30px; color: #444444; font-size: 24px; line-height: 35px;}
.xf_notes_yy_inf_prc font{color: #ff5ebd;}
.xf_notes_yy_inf_prc c{color: #d5d5d5;}
.xf_notes_yy_btn{width: 610px; height: 78px; margin-top: 18px; border-top: 1px solid #e4e4e4; margin-left: 29px;}
.xf_notes_yy_btn_center{width: 585px; height: 78px; }
.btn_go_fk{display: block; width: 158px; height: 58px; border: 1px solid #ff5ebd; color: #ff5ebd; font-size: 24px; text-align: center; line-height: 58px; text-decoration: none; border-radius: 10px; float: right; margin: 18px 0 0 20px;}
.btn_change_time{display: block; width: 158px; height: 58px; border: 1px solid #32abff; color: #32abff; font-size: 24px; text-align: center; line-height: 58px; text-decoration: none; border-radius: 10px; float: right; margin: 18px 0 0 20px;}
.btn_qx_yy{display: block; width: 158px; height: 58px; border: 1px solid #ff4f4f; color: #ff4f4f; font-size: 24px; text-align: center; line-height: 58px; text-decoration: none; border-radius: 10px; float: right; margin: 18px 0 0 20px;}
.btn_go_fk:hover{color: #ff5ebd;}
.btn_change_time:hover{color: #32abff;}
.btn_qx_yy:hover{color: #ff4f4f;}


/*消费已经开始或者结束*/
.xf_notes_yy_inf_text_p2{width: 100%; height: 30px; color: #444444; font-size: 24px; line-height: 30px; margin: 0px;}
.xf_notes_yy_inf_text_p2 span{color: #ff5ebd;}
.xf_notes_yy_inf_text_p3{width: 100%; height: 30px; color: #444444; font-size: 24px; line-height: 35px; margin: 0px;}
.xf_notes_yy_inf_text_p4{width: 465px; height: 30px; color: #444444; font-size: 24px; line-height: 30px; margin: 8px 0 0 0; }

.xf_notes_shop_zt_g{float: right; text-align: right; line-height: 88px; color: #b3b3b3; font-size: 24px; margin-right: 25px;}


/*头部详情*/
.top_inf_text{width: 100%; height: 110px; background-color: #fff6e2; color: #ff9126; font-size: 30px; line-height: 110px; text-align: center; margin: 0px;}
.top_inf_text_g{width: 100%; height: 110px; background-color: #e4e4e4; color: #b3b3b3; font-size: 30px; line-height: 110px; text-align: center; margin: 0px;}

/*预约信息*/
.yy_inf_box{width: 100%; background-color: #fff; overflow: hidden; padding-bottom: 30px; margin-bottom: 20px;}
.yy_inf_title{width: 100%; height: 88px; border-bottom: 1px solid #e4e4e4; color: #7c7c7c; font-size: 24px; line-height: 88px;}
.yy_inf_title_center{width: 580px; height: 88px;margin: 0 auto 0;}
.yy_inf_title_icon{display: block; width: 26px; height: 26px; background-position: -149px -481px; float: left; margin: 31px 10px 0 0; }
.yy_inf_cont{width: 580px; overflow: hidden; margin: 0 auto 0;}
.yy_inf_cont_p1{width: 100%; height: 45px; color: #7c7c7c; font-size: 24px; line-height: 45px; margin: 30px 0 0 0;}
.yy_inf_cont_p2{width: 100%; height: 45px; color: #7c7c7c; font-size: 24px; line-height: 45px; margin: 0px;}

/*订单信息*/
.dd_inf_title_icon{display: block; width: 26px; height: 26px; background-position: -102px -481px; float: left; margin: 31px 10px 0 0; }



/*优惠码*/
.top_yh_box{width: 100%; height: 110px; background-color: #ffffff; }
.top_yh_box_p1{width: 120px; height: 110px; float: left; text-align: right; color: #b3b3b3; line-height: 110px; font-size: 24px;}
.top_yh_box_p2{width: 400px; height: 110px; float: left; text-align: center; color: #444444; line-height: 110px; font-size: 36px;}


/*超出显示省略号（1行）*/
.hid_slh1{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-overflow:ellipsis;}
/*超出显示省略号（2行）*/
.hid_slh2{overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
.hid_slh2{overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}

.my_shop_gl_box{width: 100%; height: 642px;}
.my_shop_gl_false{width: 640px; height: 642px; overflow: hidden;}
.my_xfk_gl_false_icon{width: 220px; height: 220px; background: url("/resources/images/meirong/shop/20160718_yy_fwh/my_xfk_iocon.png") no-repeat; margin: 74px auto 0;}
.my_shop_gl_false_p1{width: 100%; height: 45px; color: #7c7c7c; font-size: 30px; line-height: 45px; text-align: center; margin: 35px 0 0px 0}
.my_shop_gl_false_p2{width: 100%; height: 45px; color: #7c7c7c; font-size: 30px; line-height: 45px; text-align: center;}
.btn_gl_my_shop{display: block; width: 580px; height: 84px; background-color: #ff5ebd; font-size: 30px; color: #ffffff; text-align: center; line-height: 84px; margin: 0 auto 0; text-decoration: none; border-radius: 10px; margin-top: 40px;}
.btn_gl_my_shop:hover{color: #fff;}



/*附近美丽店*/
.near_beautiful_shop{width: 620px; overflow: hidden; margin: 0 auto 0;}
.near_beautiful_shop_title{width: 620px; height: 35px; color: #7c7c7c; font-size: 30px; line-height: 35px; }
.near_beautiful_shop_title span{display: block; width: 4px; height: 30px; background-color: #ff5ebd; float: left; margin: 3px 10px 0 0; margin-left: 20px;}

.near_beautiful_shop_list{width: 620px; overflow: hidden; }
.near_beautiful_shop_box{width: 180px; margin: 20px 0 0 20px; float: left;}
.near_beautiful_shop_pic{width: 180px; height: 180px; position: relative;}
.near_beautiful_shop_pic img{display: block; width: 100%; }
.near_beautiful_shop_distance{display: block; width: 68px; height: 34px; background: rgba(0,0,0,0.8); position: absolute; bottom: 0px; right: 0px; color: #e4e4e4; font-size: 18px; text-align: center; line-height: 34px;}
.near_beautiful_shop_add{width: 180px; color: #444444; font-size: 24px; margin-top: 12px;}


/*消费记录*/
#orderList .my_xf_notes_icon{width: 220px; height: 220px; background: url("/resources/images/meirong/shop/20160718_yy_fwh/my_xf_notes_icon.png") no-repeat; margin: 74px auto 0;}


</style>
