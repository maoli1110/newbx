angular.module('home').directive('siderDirective', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				var hash = window.location.hash;
				var index = hash.lastIndexOf('/');
				hash = hash.slice(index+1);
				var eles = element.find('li');
				eles.on('click',function(e){
                    e.preventDefault();
                    $('li.active').removeClass('active');
                    $('.step.active').removeClass('active');
                    var stepsactive = $('i.active');
                    $(this).addClass('active');
                    var now = $(this).index();
                    for(var i = 0;i<=now;i++){
                    	$('.step').eq(i).addClass('active');
                    }
				});
				for(var i = 0;i<eles.length;i++){
					if($(eles[i]).data('url') === hash){
						var index = $(eles[i]).addClass('active').find('.step').addClass('active').index();
						for(var i = 0;i<=index;i++){
                    	  $('.step').eq(i).addClass('active');
                        }
				    }
			    }
                
                  //收缩按钮
			  var toggler = $('.sidebar-toggler'),
                  pageSiderbar = $('#page-siderbar'),
                  pageContent = $('#page-content');
               toggler.on('click',function(){
               	  var right = $(this).css('right') === '1px'? '-28px' : '1px';
               	  pageSiderbar.toggleClass('siderbar-close');
               	  $(this).animate({
               	  	'right':right
               	  },500);
               	  pageContent.toggleClass('page-content-open');
               	  pageContent.hasClass('maxWidth')? pageContent.removeClass('maxWidth') : pageContent.addClass('maxWidth');
               })

			}
		};
	}).directive('popoverDirective',function(){
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				$(element).popover({
					"placement":"bottom",
					"html":true,
 					 "template" : '<div class="popover" role="tooltip"><div class="arrow"></div><img src="img/weixin.png" class="popover-content" style="width:152px;height:152px;display:block;"/></div>',
 					 "trigger":"hover"
				});
			}
		};
	});