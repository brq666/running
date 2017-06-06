(function(){
	var Fangkuai = window.Fangkuai = function(){

		this.image = game.R.kuai1;
		// 方块的位置在屏幕的最右面
		this.x = game.mycanvas.width;
		// 大地上面方块的位置
		this.y0 = game.mycanvas.height * 0.65 - 20;
		// 大地下面方块的位置
		this.y1 = game.mycanvas.height * 0.65 + 30;
		// 一个方块数组来管理自己
		this.yArr = [ this.y0 , this.y1];
		// 数组中随机出来一个上方块或下方块
		this.yy= this.yArr[parseInt(Math.random() * 2)];
		// 方块的宽高
		this.w = 20;
		this.h = 20;
		//是否已经成功通过
		this.alreadyPass = false;
		// 将自己放入new出来的数组里面
		game.fangkuaiArr.push(this);
	}
	Fangkuai.prototype.update = function(){
		// 修改这里的参数来改变游戏的难度，和大地类同步
		game.smallfno += 0.003;
		this.x -= game.smallfno + 5;
		//加分
		if(game.man.R > this.x + 20 && !this.alreadyPass){
			//顺利通过了
			game.score ++;	
			//标记为已经通过了
			this.alreadyPass = true;
		}

		//检测这个方块是不是已经出了视口，如果是，要从数组中删除这个方块
		if(this.x < -20){
			for (var i = 0; i < game.fangkuaiArr.length; i++) {
				if(game.fangkuaiArr[i] === this){
					game.fangkuaiArr.splice(i,1);
				}
			}
		}
		// 人是否在大地的上或下
		if(!game.man.updown){
		//检测人是否撞上方块
			if(game.man.R > this.x && game.man.L < this.x + this.w){
				if( this.yy == this.y1 ){
					//播放音乐
					game.Music["pen"].loop = false;
					game.Music["pen"].play();
					game.sm.enter(3);
				}
			}
		}else{
			if(game.man.R > this.x && game.man.L < this.x + this.w){
				if( this.yy == this.y0 ){
					//播放音乐
					game.Music["pen"].loop = false;
					game.Music["pen"].play();
					game.sm.enter(3);
				}
			}
		}
	}
	Fangkuai.prototype.render = function(){
		game.ctx.drawImage(this.image,0,0,128,128,this.x,this.yy,this.w,this.h);
	};
})();