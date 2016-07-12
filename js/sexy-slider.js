(function(window,$){
	function Slider(element,params){			//构造器
		this.element = element;
		this.img = this.element.find("ul li");
		this.width = this.element.width();
		this.height = this.element.height();
		
		this.settings = {
			horizontal:10,
			vertical:10,
			index:0,
			speed:4000,
			delay:50
		};
				
		$.extend(true,this,this.settings,params||{});		
		this.init();
	}
	
	Slider.prototype = {
		init:function(){
			var me = this;
			this._creatBtn();
			this._bind();			
		},
		_creatBtn:function(){		//创建按钮
			var me = this;
			var length = me._getLength();
			var ol = $("<ol>");
			for(var i = length; i>0; i--){
				var li = $("<li>");
				if(me.index===length-i){
					li.addClass("curr");
				}
				li.appendTo(ol);
			}
			ol.appendTo(me.element);
			this.btn = ol.find("li");
		},
		_gride:function(m){			//格栅化
			var me = this;
			var div = $("<div>");
			var img = m.find("img");
			var width = me.width/me.horizontal;
			var height = me.height/me.vertical;			
			div.css({
				width:me.width,
				height:me.height,
				position:'relative'
			})			
			var arr = [];			
			for(var i = 0; i < me.horizontal; i++){
				arr[i] = new Array();
				for(var j = 0; j <me.vertical; j++){
					var item = $("<span>");
					var targetImg = $("<img>").attr("src",img.attr("src"));
					item.css({
						width:width,
						height:height,
						position:'absolute',
						top:i*height,
						left:j*width
					});
					targetImg.css({
						marginTop:-i*height,
						marginLeft:-j*width
					});
					targetImg.appendTo(item);
					arr[i][j] = item;					
				}
				item.appendTo(div);
			}
			img.replaceWith(div);
			return arr;			
		},		
		_getLength:function(){		//获取个数
			var me = this;
			return this.img.length;
		},
		_move:function(m){
			var me = this;
			var imgList = me._gride(m);
			var x_length = imgList.length,y_length = imgList[0].length;
			
			var le2ri = function(){
				var delay = 0;
				for(var i = 0; i<y_length; i++){
					for(var j = 0; j<x_length; j++){
						window.setTimeout(function(){
							imgList[j][i].addClass("animated fadeOutLeft");
						},20);
					}
					delay+=me.delay;
				}
			};
			
			
			le2ri();
			
			
			
		},
		_bind:function(){			//事件绑定
			var me = this;
			this.btn.on("click",function(){
				var index = $(this).index();
				
				$(this).addClass("curr");
				me._move(me.img.eq(0));
			});
			
			
			
		}
	}
	
	$.fn.sexySlider = function(params){
		return this.each(function(){
			var	me = $(this),
				instance = me.data("slider");
				if(!instance){
					slider = new Slider(me,params);
					instance = me.data("slider",slider);
				}			
		});
	};
		
})(window,jQuery);
