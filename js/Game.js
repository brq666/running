(function(){
	var Game = window.Game = function(params){
		// 得到画布
		this.mycanvas = document.querySelector(params.canvasid);
		// 上下文
		this.ctx = this.mycanvas.getContext("2d");
		// 资源文件地址
		this.rjsonurl = params.rjsonurl;
		// 帧编号
		this.fno = 0;
		// 初始化设置画布宽高
		this.init();
		// 小编号
		this.smallfno = 0.1;
		// 速度
		this.steep = 1;
		//分数
		this.score = 0;
		// 读取资源
		var self = this;
		// 读取资源这个异步函数
		this.loadAllResource(function(){
			self.start();      
		});
	};
	Game.prototype.init = function(){

		var windowwidth = document.documentElement.clientWidth;
		var windowheight = document.documentElement.clientHeight;

		//验收
		if( windowwidth > 414 ){
			windowwidth = 414;
		}else if( windowwidth < 320){
			windowwidth = 320;
		}
		if( windowheight > 736 ){
			windowheight = 736;
		}else if( windowheight < 414){
			windowheight = 414;
		}

		this.mycanvas.width = windowwidth;
		this.mycanvas.height = windowheight;
	};

	//读取资源
	Game.prototype.loadAllResource = function(callback){
		//准备一个R对象
		this.R = {};
		// 音乐对象
		this.Music = {};
		// 备份
		var self = this;
		// 计数器
		var alreadyDoneNumber = 0 ;
		// 发出请求，请求JSON文件
		var xhr = new XMLHttpRequest();
 
		xhr.onreadystatechange = function(){

			if( xhr.readyState == 4 ){

				var Robj = JSON.parse(xhr.responseText);
				// 遍历数组
				for( var j = 0 ; j < Robj.images.length ; j++ ){
					//创建一个同名的KEY
					self.R[Robj.images[j].name] = new Image();
					//请求
					self.R[Robj.images[j].name].src = Robj.images[j].url;
					//监听
					self.R[Robj.images[j].name].onload = function(){
						alreadyDoneNumber++ ;
						//清屏
						self.ctx.clearRect(0,0,self.mycanvas.width,self.mycanvas.height);
						// 提示文字
						var txt = "正在加载资源" + alreadyDoneNumber + "/" + Robj.images.length + "请稍后……";
						//放置居中的位置，屏幕的黄金分割点
						self.ctx.textAlign = "center";
						self.ctx.font = "20px 微软雅黑";
						self.ctx.fillText( txt , self.mycanvas.width / 2,self.mycanvas.height * ( 1 - 0.618 ));
						// 判断是否已经加载完毕
						if( alreadyDoneNumber == Robj.images.length ){
							callback();
						}
					};
				};
				for (var j = 0; j < Robj.music.length; j++) {
				//创建一个同名的key
				self.Music[Robj.music[j].name] = document.createElement("audio");
				//请求
				self.Music[Robj.music[j].name].src = Robj.music[j].url;
				}
			}
		}
		xhr.open("get",this.rjsonurl,true);
		xhr.send(null);
	}
	Game.prototype.start = function(){
		// 实例化自己的场景管理器
		this.sm = new SceneManager();
		// //播放音乐
		game.Music["bgm2"].loop = true;
		game.Music["bgm2"].play();
		//备份
		var self = this;

		//设置定时器
		this.timer = setInterval(function(){
			//清屏
			self.ctx.clearRect(0,0,self.mycanvas.width,self.mycanvas.height);
			//帧编号
			self.fno++;
			// 场景管理器的渲染和更新
			self.sm.update();
			self.sm.render();
			//打印帧编号
			self.ctx.font = "16px consolas";
			self.ctx.textAlign = "left";
			self.ctx.fillStyle = "black";
			self.ctx.fillText("FNO ：" + self.fno,20,30);
			self.ctx.fillText("场景编号 ：" + self.sm.sceneNumber,20,50);
		},20);
	};
})();