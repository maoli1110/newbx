<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="<%=basePath %>js/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="<%=basePath %>js/jquery.md5.js"></script>
<title>Insert title here</title>
  <script type="text/javascript">
      function login(){
    	  var username = $("#username").val();
    	  var password = $("#password").val();
    	  var data = {
    			  'username':username,
    			  'password':$.md5(password),
    			  'enterpriseId':1,
    			  'enterpriseName':'2'
    	  };
    	  $.ajax({ 
  		    url: "<%=basePath%>login.do?method=doLogin",
  		    data: data,
  		    type: "POST",
  		   // contentType: "application/json; charset=utf-8",
  		    dataType : 'json',
  		    success: function (result) {
  		    	if(result.success == false){
  		    		console.log(result);
  		    	}else{
  		    		var enterpriseId = result.validate[0].companyList[0].enterpriseId;
  		    		var enterpriseName = result.validate[0].companyList[0].enterpriseName;
  		    		data['enterpriseId'] = enterpriseId;
  		    		data['enterpriseName'] = enterpriseName;
  		    		data['username'] = username;
  		    		data['password'] = $.md5(password);
  		    		$.ajax({
  		    		    url: "<%=basePath%>login.do?method=userLogin",
  		    		    data: data,
  		    		    type: "POST",
  		    		   // contentType: "application/json; charset=utf-8",
  		    		    dataType : 'json',
  		    		  success: function (results) {
  		    			   if(results.success == true){
  		    				 $.ajax({ 
  		  		    		    url: "<%=basePath%>login.do?method=queryZJOrganizeNodes",
  		  		    		    data: data,
  		  		    		    type: "POST",
  		  		    		   // contentType: "application/json; charset=utf-8",
  		  		    		    dataType : 'json',
  		  		    		    success: function (results) {
  		  		    		        console.log(results.json)
  		  		    		    }
  		    				});	
  		    			  }
  		    		  },
  		    		  
  		    		});	
  		    	}
  		    },
  		    error: function () {
  		    }
  		});
      }
  </script>
</head>
<body>
    username : <input type="text" id="username"><br><br>
    password : <input type="password" id="password"><br><br>
    <input type="button" onclick="login()" value="submit">
</body>
</html>