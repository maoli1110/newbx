(function(w){
    var cookieUtil = {
    	//设置cookie
        setCookie : function(cookieName,cookieValue,expire){
            var time = new Date();
            time.setTime(time.getTime()+expire*1000*60);  //有效期单位为多少分钟
            expire = time;
            document.cookie = cookieName + '=' + escape(cookieValue)
                              +';expires='+expire.toGMTString(); 
        },

        //获取cookie
        getCookie : function(cookieName){
            var oCookie = {},
                cookieArry = [],
                tempArry = [];
            
            cookieArry = document.cookie.split(';');

            for(var i = 0; i<cookieArry.length;i++){
                tempArry = cookieArry[i].split('=');
                oCookie[trim(tempArry[0])] = tempArry[1];
            }

            return oCookie[cookieName];
        },
        
        //销毁cookie
        destoryCookie : function(cookieName){
        	if(!this.getCookie(cookieName)) return;
        	this.setCookie(cookieName,'',-1);
        }
    };

   //去空格
   function trim(str){
      if(Object.prototype.toString.call(str) !== '[object String]') return;
      var reg = /(^\s*)|(\s*$)/g;
      return str.replace(reg,'');
   }

    w.cookieUtil = cookieUtil;
})(window)