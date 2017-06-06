(function(){
	var Man = window.Man = function(){
		// 准备上下两个人
		this.image = game.R.man;
		this.image1 = game.R.man1;
		// 位于画布的x和y
		this.x = 52;
		// 大地上
		this.y = game.mycanvas.height * 0.65 - 40;
		// 大地下
		this.y1 = game.mycanvas.height * 0.65 + 30;
		// 自己的宽高
		this.w = 48;
		this.h = 40;
		// 切片的x
		this.qpx = 0;
		// 信号量，位置是否在大地的上或下
		this.updown = true;
	}	
	Man.prototype.update = function(){
		// 人奔跑的状态
		this.run();
		// 计算自己身前身后的两个碰撞值
		this.R = this.x + 48;
		this.L = this.x;
	};
	Man.prototype.render = function(){
		if(this.updown){
			// 这个人位置是在大地的上面
			game.ctx.drawImage(this.image,this.qpx,0,this.w,this.h,this.x,this.y,this.w,this.h);
		}else{
			// 这个人位置是在大地的下面
			game.ctx.drawImage(this.image1,this.qpx,0,this.w,this.h,this.x,this.y1,this.w,this.h);
		}
	}
	// 人物奔跑的状态
	Man.prototype.run = function(){
		game.fno % 5 == 0 && (this.qpx += this.w);
		if(this.qpx == 240){
			this.qpx = 0;
		}
	}
	// 切换人物上下方向
	Man.prototype.ud = function(){
		// 切换上下
		this.updown = !this.updown;

	}
})();