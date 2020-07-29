var defaults = null, setting = null, clientWidth = 0;
var obj, o, d, oban, nav, len, index, timer, datas;
		
		function init(options) {
			defaults={
				animateTime:300,
				delayTime:3000
			};
			setting=$.extend({},defaults,options);
			datas = setting.datas;
			
			var listObj = $(".banner-list");
			var liHTML = '';
			for(var i=0;i<datas.length;i++) {
				liHTML = '<li>'+
							'<div>'+
								'<img src="images/'+datas[i]+'" alt="'+i+'"/>'+
								'<p class="l-cover"></p>'+
								'<p class="title">Title</p>'+
								'<p class="des">DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription</p>'+
								'<p class="info">button</p>'+
							'</div>'+
						'</li>';
				listObj.append(liHTML);
			}
			
			clientWidth = $(window).width();
			listObj.width(datas.length*clientWidth);
			$(".banner-list>li").width(clientWidth);
			$(".control-box").width(datas.length*60);
			
			obj = $(".banner"), o=setting.animateTime, d=setting.delayTime;
			oban = obj.find(".banner-list li"), nav = obj.find(".control-box");
			len = oban.length, index = 1;
			
	  		$(".banner-list, .control-box span").css("transition", o/1000+"s");
			oban.eq(0).addClass("active");
		}
		
		function banner(options){
			init(options);
			bindEvent();
			player();
		}
		
	  
		//图片轮换
		function showImg(n){
			//$(".banner-list").css("margin-left", -n*clientWidth+"px");
			//$(".control-box span").css("margin-left", n*33.333333+"%");
			$(".banner-list").css("transform", "translate3d("+(-n*clientWidth+"px")+", 0, 0)");
			$(".control-box span").css("transform", "translate3d("+(n*60+"px")+", 0, 0)");
			oban.removeClass("active");
			
			setTimeout(function() {
				oban.eq(n).addClass("active");
			}, 500);
		}
		
		//自动播放
		function player(){
			timer=setInterval(function(){
				showImg((index++) % len);
			}, d);
		}
		
		//导航点击
		function bindEvent() {
			nav.on("click", function(event) {
				if(!(oban.is(":animated"))){
					var boxWidth = $(this).width();
					var eventX = event.pageX - $(this).offset().left;
					index = Math.floor(eventX/boxWidth*len);
					
					clearInterval(timer);
					showImg(index);
					player();
				}
			});
		}