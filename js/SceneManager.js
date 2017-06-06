(function(){
	var SceneManager = window.SceneManager = function(){
		// 1表示初始化界面，2表示游戏内容，3表示爆炸白屏，4表示gameover
		this.sceneNumber = 1;
		//地图类实例化
		game.map = new Map();
		// 大地实例化
		game.Land = new Land();
		// 方块类实例化		
		game.fangkuaiArr = new Array();
		// 实例化云彩
		game.yuncai = new Yuncai();
		// 实例化奔跑的人
		game.man = new Man();
		//场景1一直跑下去logo
		this.cj1logo = 0;
		// 1号场景的按钮
		this.button_playX = game.mycanvas.width / 2 - 51.5;
		this.button_playY = game.mycanvas.height;
		//  4号场景的再来一次按钮
		this.againX = game.mycanvas.width / 2 - 150;
		this.againY = game.mycanvas.height;
		//  4号场景的返回主菜单按钮
		this.returnX = game.mycanvas.width / 2 - 150;
		this.returnY = game.mycanvas.height;
		// 绑定监听
		this.bindEvent();
	};
	SceneManager.prototype.update = function(){
		switch(this.sceneNumber){
			case 1 : 
				// 让logo移动
				this.cj1logo += 9;
				if(this.cj1logo > game.mycanvas.height * 0.22){
					this.cj1logo = game.mycanvas.height * 0.22;
				}	
				//让按钮移动
				this.button_playY -= 9;
				if(this.button_playY < game.mycanvas.height * 0.78){
					this.button_playY = game.mycanvas.height * 0.78;
				}
				break;
			case 2 : 
				//更新云彩
				game.yuncai.update();
				//更新地图
				game.map.update();
				// 更新大地
				game.Land.update();
				// 更新man
				game.man.update();
				//更新所有方块
				for (var i = 0; i < game.fangkuaiArr.length; i++) {
					game.fangkuaiArr[i] && game.fangkuaiArr[i].update();
				}
				break;
			case 3 :
				//白屏慢慢的回来
				this.maskOpacity -= 0.1;
				if(this.maskOpacity < 0){
					this.maskOpacity = 0;
				}
				break;
			case 4 :
				//再来一次按钮移动
				this.againY -= 14;
				if(this.againY < game.mycanvas.height * 0.7){
					this.againY = game.mycanvas.height * 0.7;
				}
				//返回按钮移动
				this.returnY -= 9;
				if(this.returnY < game.mycanvas.height * 0.85){
					this.returnY = game.mycanvas.height * 0.85;
				}
				break;
		}
	};
	SceneManager.prototype.render = function(){
		switch(this.sceneNumber){
			case 1 :
				// 渲染云彩
				game.yuncai.render();
				// 渲染地图
				game.map.render();
				// 渲染大地
				game.Land.render();
				// 场景1背景和lOGO画按钮
				game.ctx.drawImage(game.R["cj1"],0,0,game.mycanvas.width,game.mycanvas.height);
				game.ctx.drawImage(game.R["button_play"],this.button_playX,this.button_playY);
				game.ctx.drawImage(game.R["cj1logo"],game.mycanvas.width / 2 - 140,this.cj1logo);
				break;
			// 游戏内容
			case 2 :
				// 渲染云彩
				game.yuncai.render();
				// 渲染地图
				game.map.render();
				// 渲染大地
				game.Land.render();
				// 渲染人
				game.man.render();
				// 实例化方块数组	
				game.fno % 50 == 0 && (new Fangkuai());	
				//渲染所有方块
				for (var i = 0; i < game.fangkuaiArr.length; i++) {
					game.fangkuaiArr[i] && game.fangkuaiArr[i].render();
				}
				//打印当前分数
				var scoreLength = game.score.toString().length;
				//循环语句去设置图片的显示
				for(var j = 0 ; j < scoreLength ; j++ ){
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(j)],game.mycanvas.width / 2 - scoreLength / 2 * 34 + 34 * j,100);
				}
				break;
			case 3 :
				// 渲染云彩
				game.yuncai.render();
				// 渲染地图
				game.map.render();
				// 渲染大地
				game.Land.render();
				// 实例化方块数组	
				game.fno % 30 == 0 && (new Fangkuai());	
				//渲染所有方块
				for (var i = 0; i < game.fangkuaiArr.length; i++) {
					game.fangkuaiArr[i] && game.fangkuaiArr[i].render();
				}
				game.fno % 4 == 0 && this.bombStep ++;
				if(this.bombStep <= 11){
					game.ctx.drawImage(game.R["b" + this.bombStep],38,370);
				}else{
					this.enter(4);
				}
				//渲染闪一下双眼的大白屏
				game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
				game.ctx.fillRect(0,0,game.mycanvas.width , game.mycanvas.height);

				break;
			case 4 :
				// 渲染云彩
				game.yuncai.render();
				// 渲染地图
				game.map.render();
				// 渲染大地
				game.Land.render();
				//打印当前分数
				var scoreLength = game.score.toString().length;
				//循环语句去设置图片的显示
				for(var j = 0 ; j < scoreLength ; j++ ){
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(j)],game.mycanvas.width / 2 - scoreLength / 2 * 34 + 34 * j,100,48,88);
				}
				//渲染重新再来
				game.ctx.drawImage(game.R["text_game_over"],game.mycanvas.width / 2 - 192 ,210,384,192);
				game.ctx.drawImage(game.R["again"],this.againX,this.againY);
				game.ctx.drawImage(game.R["return"],this.returnX,this.returnY);
				break;
		};
	};
	SceneManager.prototype.enter = function(number){
		this.sceneNumber = number;
		switch(this.sceneNumber){
			case 1 : 
				// 进入一号场景要做的事情
				this.cj1logo = 0;
				this.button_playY = game.mycanvas.height;
				break;
			case 2 :
				game.fno = 0;
				game.score = 0;
				game.smallfno = 0;
				game.fangkuaiArr = new Array();
				break;
			case 3 :
				this.maskOpacity = 1;
				this.bombStep = 0;
				break;
			case 4 :
				this.againY = game.mycanvas.height;
				this.returnY = game.mycanvas.height;
				break;
		}

	};
	SceneManager.prototype.bindEvent = function(){
		var self = this;
		game.mycanvas.onclick = function(event){
			clickHandler(event.clientX,event.clientY);
		};
		function clickHandler(mousex,mousey){
			// 点击的时候判断当前是第几个场景
			switch(self.sceneNumber){
				case 1 :
					// 进入一号场景要做的事情
					if(mousex > self.button_playX && mousex < self.button_playX + 103 && mousey > self.button_playY && mousey < self.button_playY + 100){
						//说明用户点击到了按钮上
						self.enter(2);	//去2号场景
					break;
					}
				case 2 :
					// 点击画布，使人物切换上下方向
					game.man.ud();
					//播放音乐
					game.Music["xiuxiuxiu"].load();
					game.Music["xiuxiuxiu"].loop = false;
					game.Music["xiuxiuxiu"].play();
					break;
				case 4 : 
					// 进入4号场景要做的事情
					if(mousex > self.againX && mousex < self.againX + 300 && mousey > self.againY && mousey < self.againY + 60){
						//说明用户点击到了按钮上
						self.enter(2);	//去2号场景
					}
					if(mousex > self.returnX && mousex < self.returnX + 300 && mousey > self.returnY && mousey < self.returnY + 60){
						//说明用户点击到了按钮上
						self.enter(1);	//去1号场景
					break;
					}
			}
		}

	};
})();