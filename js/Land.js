(function(){
	var Land = window.Land = function(){
		this.image = game.R.land;
		this.x = 0;
		this.y = game.mycanvas.height * 0.65;
		this.w = 942;
		this.h = 157;
	}
	Land.prototype.update = function(){
		// 速度
		game.smallfno += 0.003;
		this.x -= (game.smallfno + 3);
		
		if( this.x < -this.w ){
			this.x = 0;
		}
	}
	Land.prototype.render = function(){
		// 两张图轮播
		game.ctx.drawImage(this.image,0,0,this.w,this.h,this.x,this.y,this.w,this.h);
		game.ctx.drawImage(this.image,0,0,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
		// 矩形猫腻和大地颜色一样
		game.ctx.fillStyle = "#996861";	
		game.ctx.fillRect(0, game.mycanvas.height * 0.64 + 157, game.mycanvas.width,game.mycanvas.height * 0.35)
	}
})();