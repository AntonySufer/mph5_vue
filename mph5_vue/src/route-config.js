var store = require('store')
export function configRouter (router) {
  // normal routes
    router.map({
	     "/login":{
		    name:"login",
		    component:require('./components/Login.vue'),
	    },
	    "/":{
		       component: require('./components/Index.vue'),
		      
		        
	    },   
	   '*': {
	          component: require('./components/Index.vue')
	     },
	    '/feedBack':{
	    	   name :"feedBack", //意见提交
	          component: require('./components/advice/feedBack.vue')
	     },
	     '/orderList':{
	    	   name :"orderList", //订单列表
	          component: require('./components/order/orderList.vue')
	     },
	     '/orderInfo':{
	    	   name :"orderInfo", //订单详情
	          component: require('./components/order/orderInfo.vue')
	     },
	     '/shopList':{
	    	   name :"shopList", //店铺列表
	          component: require('./components/shop/shopList.vue')
	     },
	     '/shopNoInfo':{
	    	   name :"shopNoInfo", //无关联，公用跳转页面
	          component: require('./components/shop/shopNoInfo.vue')
	     },
	      '/cardList':{
	    	   name :"cardList", //店铺详情
	          component: require('./components/card/cardList.vue')
	     }

    
  });

	/*router.beforeEach(function (transition) {
           
		     if(store.get('user') == null){
			     router.go({"path":"/login",append: false});
			       transition.next();
		     }else{
		        transition.next();
	     }
	      
	  
	       
	  
	})*/
}
