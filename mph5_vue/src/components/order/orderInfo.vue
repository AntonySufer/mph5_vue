<template>
      <div class="shopmanmain wx_guanlian bghui" id="orderInfo">
    
    <div v-if="isShow">
      <div class="top_yh_box" v-if="orderData.myOrderWay==6 && orderData.orderPayStatus==1">
         <div v-if="orderData.consumeCode != 0 ">
            <p class="top_yh_box_p1">消费码：</p>
          <p class="top_yh_box_p2" v-text="orderData.consumeCode"></p>
         </div>
    
      <div v-else></div>
    </div>
    </div>

  <div class="xf_notes_yy">
    <div class="xf_notes_shop_title">
      <div class="xf_notes_shop_title_center">
        <a href="javascript:;" class="xf_notes_shop_title_btn">
          <span class="xf_notes_shop_title_icon sp"></span>
          <span class="xf_notes_shop_name" v-text='orderData.shopName'></span>
          <span class="xf_notes_shop_title_jt sp"></span>
        </a>
      </div>
    </div>
    <div class="xf_notes_yy_inf">
      <div class="xf_notes_yy_inf_pic">
        <img v-bind:src="orderData.imageId" alt="">
      </div>
      <div class="xf_notes_yy_inf_text">
        <p class="xf_notes_yy_inf_text_p1" v-text='orderData.title'></p>
        <p class="xf_notes_yy_inf_text_p2">总价：<span v-text="orderData.orderMoney"></span><span v-if=" orderData.orderStatus == 1">（<span v-text="orderData.orderWay"></span>）</span> </p>
        <p class="xf_notes_yy_inf_text_p3">数量：<span v-text="orderData.productNumber"></span></p>
        <p class="xf_notes_yy_inf_text_p4 hid_slh1">服务员工:<span v-text="orderData.orderStaffNamesdesc"></span></p>
      </div>
    </div>
  </div>
  <!-- 消费已经开始或者结束 E -->
        
  <!-- 预约信息 S -->
  <div class="yy_inf_box" v-if="orderData.orderStatus == 4 || orderData.orderStatus == 2 ">
    <div class="yy_inf_title">
      <div class="yy_inf_title_center">
        <span class="yy_inf_title_icon sp"></span>
        预约信息
      </div>
    </div>
    <div class="yy_inf_cont">
      <p class="yy_inf_cont_p1">预约时间：<span v-text="orderData.orderDateDesc"></span></p>
      <p class="yy_inf_cont_p2">预约员工：<span v-text="orderData.orderStaffNamesdesc"></span></p>
    </div>
  </div>
  <!-- 预约信息 E -->

  <!--<div class="infomore_pj" id="infomore_pj">
    <a><i class="icon-starbig icon-starbig01 "></i></a>
    <a><i class="icon-starbig icon-starbig01 "></i></a>
    <a><i class="icon-starbig icon-starbig01 "></i></a>
    <a><i class="icon-starbig icon-starbig01 "></i></a>
    <a><i class="icon-starbig icon-starbig01"></i></a>
    <span class="ml20 mr30 fr"><a ><img src="{{d.webRoot}}/resources/images/meirong/shop/arrow_r4_c4.gif" width="20" height="34" class="mbm5"></a></span><span class="cpyy_tatle_scoer fz30 fr mt6">分</span><span class="cpyy_tatle_scoer fz50 fr">{{d.content.order_score}}</span>
  </div>-->
  <!-- 订单信息 S -->
  <div class="yy_inf_box" >
    <div class="yy_inf_title">
      <div class="yy_inf_title_center">
        <span class="dd_inf_title_icon sp"></span>
        订单信息
      </div>
    </div>
    <div class="yy_inf_cont">
      <p class="yy_inf_cont_p1">订单编号：<span v-text="orderData.subOrderNo"></span></p>
      <p class="yy_inf_cont_p2">生成时间：<span v-text="orderData.createDateDesc"></span></p>
    </div>
  </div>
  <!-- 订单信息 E -->

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
        orderId: "",//订单
        shop_no :"",//店铺编号
        shopId : "",//店铺主键
        type :"",// 0 扫码付款  1订单付款   为空的情况，都是 saas
        defaultImg : "/resources/images/meirong/shop/20160718_yy_fwh/my_xf_notes_icon12.png",//默认图片
        orderStatus:"", //订单状态
        orderData:[], //订单资料
        isShow : false  //是否显示消费码区域  display :none
     }
   },
   beforeCompile(){
        let _this = this;
            _this.orderId = _this.$route.query.orderId;//订单
            _this.shop_no = _this.$route.query.shop_no;//店铺编号
            _this.shopId =  _this.$route.query.shop_id;//店铺主键
            _this.type = _this.$route.query.type ;// 0 扫码付款  1订单付款   为空的情况，都是 saas  
   },
   ready(){
      
        document.title="消费详情";
        this.getOrderInfo();
   },
   //方法
   methods:{

       //获获取信息
      getOrderInfo(){
        let _this = this ;
        let mpGlobal =store.get("mpGlobal");
        let openId = mpGlobal.openId || this.$route.query.openId;
        let accessToken = mpGlobal.accessToken;
        ajaxUtil.doPost({
      url:request.user.fetchOrderDetails+openId+"/order/"+_this.orderId,
      data:{shop_no:_this.shop_no,type:_this.type}
    },function(resultVo){
      if (resultVo.returnCode == "success") {
        var orderData = resultVo.order;
        if (orderData) {
          //添加图片
          var logoUrl =orderData.imageId;
          if (logoUrl) {
            if (logoUrl.indexOf('/0') != -1)  {
              orderData.imageId =_this.defaultImg;
            }else{
              orderData.imageId =_this.downLoadImgUrl+commonUtil.checkImgIsNumber(logoUrl);
            }

          }else{
            orderData.imageId =_this.defaultImg;
          }
          orderData.myOrderWay=orderData.orderWay
          //付款方式
          orderData.orderWay = commonUtil.getPayDesc(orderData.orderWay);  //0orderWay   付款方式 0:现金；1：信用卡；2：借记卡；3：其他；4退款记录；5：支付宝支付 6 ：微信支付 ,7 团购 -1卡项支付
          //时间转毫秒 订单完成时间//预约
          if (orderData.orderDate) {
            var orderDate=new Date(orderData.orderDate);
            orderData.orderDateDesc= orderDate.format("yyyy-MM-dd hh:mm:ss");
          }
          //生成
          if (orderData.createDate) {
            var preDate=new Date(orderData.createDate);
            orderData.createDateDesc= preDate.format("yyyy-MM-dd hh:mm:ss");
          }
          //服务员工
          if (!orderData.orderStaffNamesdesc) {
            orderData.orderStaffNamesdesc = "暂无";
          }
          //扫码支付
          if (orderData.type==0) {
            orderData.title = '扫码支付';
                    }
          //消费码
          if (!orderData.consumeCode) {
            //自定义
            _this.isShow = false;
            orderData.consumeCode = "0";
          }else{
            _this.isShow = true;
          }
          //金额
          if (orderData.orderMoney) {
            orderData.orderMoney ="¥"+orderData.orderMoney.toFixed(2);
          }else{
            orderData.orderMoney ="¥0.00";
          }


          //员工
          var orderStaffNamesList =orderData.orderStaffNames;
          var orderStaffNamesHtml ="";
          if (orderStaffNamesList !=null && orderStaffNamesList.length>0) {
            if (orderStaffNamesList.length==1) {
              orderStaffNamesHtml =orderStaffNamesList[0];
            }else{
              for (var i = 0; i < orderStaffNamesList.length; i++) {
                if (i ==orderStaffNamesList.length-1) {
                  orderStaffNamesHtml += orderStaffNamesList[i];
                }
                orderStaffNamesHtml += orderStaffNamesList[i]+"/";
              }
            }
            orderData.orderStaffNamesdesc =orderStaffNamesHtml;
          }

          _this.orderData = orderData;
        }


          }else{
            console.log("错误信息："+resultVo.errCode+resultVo.errDesc);
          }
        })
      }

   }


  }



</script>

<style>
/*超出显示省略号（1行）*/
.hid_slh1{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-overflow:ellipsis;}
/*超出显示省略号（2行）*/
.hid_slh2{overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
.hid_slh2{overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}

 #orderInfo .sp{background: url("/resources/images/meirong/shop/20160718_yy_fwh/my_xf_sp.png") no-repeat; background-size: 578px 600px;}

.xf_notes_yy{width: 640px; overflow: hidden; padding-bottom: 18px; background-color: #fff; margin-bottom: 20px;}
.xf_notes_shop_title{width: 640px; height: 88px; border-bottom: 1px solid #e4e4e4; }
.xf_notes_shop_title_center{width: 610px; height: 88px; margin-left: 29px;}
.xf_notes_shop_title_btn{}
 #orderInfo .xf_notes_shop_title_icon{display: block; width: 26px; height: 23px; background-position: -32px -481px; float: left; margin: 33px 0 0 0;}
.xf_notes_shop_name{color: #7c7c7c; font-size: 24px; line-height: 88px; float: left; margin-left: 5px; text-decoration: none}
#orderInfo .xf_notes_shop_title_jt{display: block; width: 12px; height: 20px; background-position: -72px -482px; float: left; margin: 36px 0 0 5px;}
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
 #orderInfo  .yy_inf_title_icon{display: block; width: 26px; height: 26px; background-position: -149px -481px; float: left; margin: 31px 10px 0 0; }
.yy_inf_cont{width: 580px; overflow: hidden; margin: 0 auto 0;}
.yy_inf_cont_p1{width: 100%; height: 45px; color: #7c7c7c; font-size: 24px; line-height: 45px; margin: 30px 0 0 0;}
.yy_inf_cont_p2{width: 100%; height: 45px; color: #7c7c7c; font-size: 24px; line-height: 45px; margin: 0px;}

/*订单信息*/
#orderInfo .dd_inf_title_icon{display: block; width: 26px; height: 26px; background-position: -102px -481px; float: left; margin: 31px 10px 0 0; }



/*优惠码*/
.top_yh_box{width: 100%; height: 110px; background-color: #ffffff; }
.top_yh_box_p1{width: 120px; height: 110px; float: left; text-align: right; color: #b3b3b3; line-height: 110px; font-size: 24px;}
.top_yh_box_p2{width: 400px; height: 110px; float: left; text-align: center; color: #444444; line-height: 110px; font-size: 36px;}









































</style>
