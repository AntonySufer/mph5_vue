
  /***
      * 判断图片是否存在download/image/    118456
      */
export  function checkImgIsNumber(imageValue){
        if (isNaN(imageValue)) {
        	return imageValue;
        }else{
            return "download/image/"+imageValue;
        }
	
     }
     
     /***
      * 获取付款方式的desc描述
      *  付款方式 0:现金；1：信用卡；2：借记卡；3：其他；4退款记录；5：支付宝支付 6 ：微信支付 ,7 团购 -1卡项支付              
      */
export  function getPayDesc(payType){
    	 var payDesc ="";
    	if (!isNaN(payType)) {
    		payType =parseInt(payType);
    		switch (payType)
            {
            case 0:
              payDesc="现金";
              break;
            case 1:
              payDesc="信用卡";
              break;
            case 2:
              payDesc="借记卡";
              break;
            case 3:
              payDesc="其他";
              break;
            case 4:
              payDesc="退款";
              break;
            case 5:
              payDesc="支付宝";
              break;
            case 6:
              payDesc="微信";
              break;
            case 7:
              payDesc="团购";
              break;
            default:
              payDesc="卡项";
            } 
    	}else{
    	   payDesc = '其他';
    	}
       return payDesc;
    }
    
    
  /***
   * 计算店铺星级
   */
export function getStartNum(startNum){
        var startHtml ="";
        //蓝钻1-5
        if(startNum <= 10){
           startHtml = '<span class="shop_inf_lv_zuan lv1"></span>';
        }else if(11<= startNum && startNum <=30){
           startHtml = '<span class="shop_inf_lv_zuan lv1"></span>' 
           		     + '<span class="shop_inf_lv_zuan lv1"></span>';
         }else if(31<= startNum && startNum <=60){ 
           startHtml = '<span class="shop_inf_lv_zuan lv1"></span>'
           		     + '<span class="shop_inf_lv_zuan lv1"></span>' 
           		     + '<span class="shop_inf_lv_zuan lv1"></span>';
         }else if(61<= startNum && startNum <=100){ 
          startHtml = '<span class="shop_inf_lv_zuan lv1"></span>' 
              		+ '<span class="shop_inf_lv_zuan lv1"></span>' 
              		+ '<span class="shop_inf_lv_zuan lv1"></span>' 
              		+ '<span class="shop_inf_lv_zuan lv1"></span>';
         }else if(101<=startNum && startNum <=150){ 
           startHtml = '<span class="shop_inf_lv_zuan lv1"></span>' 
               		+ '<span class="shop_inf_lv_zuan lv1"></span>' 
               		+ '<span class="shop_inf_lv_zuan lv1"></span>' 
               		+ '<span class="shop_inf_lv_zuan lv1"></span>' 
               		+ '<span class="shop_inf_lv_zuan lv1"></span>';
          //紫钻1-5
         }else if(151<=startNum && startNum <=300){ 
            startHtml = '<span class="shop_inf_lv_zuan lv2"></span>';
        }else if(301<=startNum && startNum <=600){ 
          startHtml = '<span class="shop_inf_lv_zuan lv2"></span>' 
                     + '<span class="shop_inf_lv_zuan lv2"></span>';
        }else if(601<=startNum && startNum <=1000){ 
           startHtml = '<span class="shop_inf_lv_zuan lv2"></span>'
                     + '<span class="shop_inf_lv_zuan lv2"></span>' 
                     + '<span class="shop_inf_lv_zuan lv2"></span>';
        }else if(1001<=startNum && startNum <=1500){ 
          startHtml = '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv2"></span>' 
                    + '<span class="shop_inf_lv_zuan lv2"></span>' 
                    + '<span class="shop_inf_lv_zuan lv2"></span>';
        }else if(1501<=startNum && startNum <=3000){ 
          startHtml = '<span class="shop_inf_lv_zuan lv2"></span>' 
                    + '<span class="shop_inf_lv_zuan lv2"></span>' 
                    + '<span class="shop_inf_lv_zuan lv2"></span>' 
                    + '<span class="shop_inf_lv_zuan lv2"></span>' 
                    + '<span class="shop_inf_lv_zuan lv2"></span>';
          //蓝 冠
        }else if(3001<=startNum && startNum <=5000){ 
           startHtml = '<span class="shop_inf_lv_zuan lv3"></span>';
        }else if(5001<=startNum && startNum <=8000){ 
            startHtml = '<span class="shop_inf_lv_zuan lv3"></span>' 
                     + '<span class="shop_inf_lv_zuan lv3"></span>';
        }else if(8001<=startNum && startNum <=15000){ 
            startHtml = '<span class="shop_inf_lv_zuan lv3"></span>'
                     + '<span class="shop_inf_lv_zuan lv3"></span>' 
                     + '<span class="shop_inf_lv_zuan lv3"></span>';
        }else if(15001<=startNum && startNum <=30000){ 
           startHtml = '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv3"></span>';
        }else if(30001<=startNum && startNum <=50000){ 
           startHtml = '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv3"></span>' 
                    + '<span class="shop_inf_lv_zuan lv3"></span>';
         //红冠1-5
        }else if(50001<=startNum && startNum <=80000){ 
           startHtml = '<span class="shop_inf_lv_zuan lv4"></span>';
        }else if(80001<=startNum && startNum <=150000){ 
           startHtml = '<span class="shop_inf_lv_zuan lv4"></span>' 
                     + '<span class="shop_inf_lv_zuan lv4"></span>';
        }else if(150001<=startNum && startNum <=300000){ 
           startHtml = '<span class="shop_inf_lv_zuan lv4"></span>'
                     + '<span class="shop_inf_lv_zuan lv4"></span>' 
                     + '<span class="shop_inf_lv_zuan lv4"></span>';
        }else if(300001<=startNum && startNum <=500000){ 
          startHtml = '<span class="shop_inf_lv_zuan lv4"></span>' 
                    + '<span class="shop_inf_lv_zuan lv4"></span>' 
                    + '<span class="shop_inf_lv_zuan lv4"></span>' 
                    + '<span class="shop_inf_lv_zuan lv4"></span>';
        }else if(500001<=startNum){ 
            startHtml = '<span class="shop_inf_lv_zuan lv4"></span>' 
                    + '<span class="shop_inf_lv_zuan lv4"></span>' 
                    + '<span class="shop_inf_lv_zuan lv4"></span>' 
                    + '<span class="shop_inf_lv_zuan lv4"></span>' 
                    + '<span class="shop_inf_lv_zuan lv4"></span>';
        } 
        
        return startHtml;
        
    }

 //唤起微信支付
    export function callWXPay(opt){



        var callBackUrl;
        if(opt.from == "orderLis" || opt.from =="orderdetail"){
            callBackUrl=opt.failUrl;
        }else{
            callBackUrl=opt.contextUrl+"manager-pay-wx_pay_success?shopId="+ opt.shopId +"&activityId="+opt.activityId+"&from="+opt.from+"&wxPay=1";
        }


        var timeStamp = opt.time_stamp || opt.timeStamp;
        var nonceStr  =opt.nonce_str || opt.nonceStr;
       // var package = opt.package ;
        var paySign = opt.pay_sign || opt.paySign;
        var failureUrl = opt.failUrl;


        location.href = request.user.callWXpay+"?timestamp="+timeStamp+
            "&nonce_str="+nonceStr+
          /*  "&package="+package+*/
            "&pay_sign="+paySign+
            "&return_url="+ globalUtil.utf8ToB64(callBackUrl)+
            "&fail_url="+  globalUtil.utf8ToB64(failureUrl);

    };