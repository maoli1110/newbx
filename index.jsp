<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html >
<head lang="en">
	<meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
	<script type="text/javascript">
	// function clickbutton2(){
	// 	$.ajax({ type: "POST",
	// 	    url: "http://172.16.21.47:8080/bx/rs/TestRestServices/testRestMethod?str=15221113063",
	// 	    data: '{"name":"彭佳佳","age":"25","birthDate":"1992-01-07"}',
	// 	    contentType: "application/json; charset=utf-8",
	// 	    dataType : 'json',
	// 	    success: function (data) {
	// 	    	console.log(data)
	// 	    },
	// 	    error: function () {
	// 	    }
	// 	});
	// }
	var contextPath='${pageContext.request.contextPath}';
	var parm = {
			sn : "测试项目方案4",
			projid : "csxmid1"
			};
	
	function addSchemes(){
		$.ajax({ 
			type: "post",
		    url: contextPath+"/scheme.do?method=addSchemes",
		    data: parm,
		    //contentType: "text/xml",
		    //contentType: "application/json; charset=utf-8",
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType : 'json',
		    success: function (data) {
		    	console.log(data)
		    },
		    error: function () {
		    }
		});
	};
	
	var parm1 ={
		id:"5767be7beb379ee8f4c6d158",
		sn:"测试项目方案3"
	}
	
	function updateSchemes(){
		$.ajax({ 
			type: "post",
		    url: contextPath+"/scheme.do?method=updateSchemes",
		    data: parm1,
		    //contentType: "text/xml",
		    //contentType: "application/json; charset=utf-8",
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType : 'json',
		    success: function (data) {
		    	console.log(data)
		    },
		    error: function () {
		    }
		});
	};
	
	var parm3 ={
			projid:"csxmid1"
		}
		
		function findSchemes(){
			$.ajax({ 
				type: "post",
			    url: contextPath+"/scheme.do?method=findSchemes",
			    data: parm3,
			    //contentType: "text/xml",
			    //contentType: "application/json; charset=utf-8",
			    contentType: "application/x-www-form-urlencoded; charset=utf-8",
			    dataType : 'json',
			    success: function (data) {
			    	console.log(data)
			    },
			    error: function () {
			    }
			});
		};
	</script>
</head>
<body>
<input type="button" value="添加方案" onclick="addSchemes()"/>
<br>
<input type="button" value="修改方案" onclick="updateSchemes()"/>
<br>
<input type="button" value="查询方案" onclick="findSchemes()"/>
<h2>Hello World!</h2>
</body>
</html>
