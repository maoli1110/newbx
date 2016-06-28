angular.module('core').directive('tree',function(){
    return{  
        require:'?ngModel',  
        restrict:'A',  
        link:function($scope,element,attrs,ngModel){  
            var setting = {  
                data :{  
                    simpleData:{  
                        enable:true  
                    }  
                },  
                callback:{  
                    beforeClick:function(treeId, treeNode) {//点击菜单时进行的处理  
                        var zTree = $.fn.zTree.getZTreeObj("tree");  
                        if (treeNode.isParent) {  
                            zTree.expandNode(treeNode);  
                            return false;  
                        } else {  
                            window.location.href=treeNode.url;  
                            return true;  
                        }  
                    }  
                }  
            };  
            //向控制器发送消息，进行菜单数据的获取  
            $scope.$emit("menu",attrs["value"]);//此处attrs["value"]为ul中的value值，此处作为标记使用  
            //接受控制器返回的菜单的消息  
            $scope.$on("menuData",function(event,data){  
                $.fn.zTree.init(element, setting, data);//进行初始化树形菜单  
                var zTree = $.fn.zTree.getZTreeObj("tree");  
                var selectName = $("#selectName").val();  
                if(typeof selectName == "undefined" || selectName == ""){  
                    zTree.selectNode(zTree.getNodeByParam("id","1"));//默认第一个选中  
                    $("#selectName").val(zTree.getSelectedNodes()[0].code);//赋值  
                }else{  
                    for(var i =0; i<data.length;i++){  
                        if(data[i]["code"] == selectName ){  
                            zTree.selectNode(zTree.getNodeByParam("code", data[i]["code"]));  
                        }  
                    }  
                }  
            });  
  
        }  
    }  
});  