(function(){
	var Yuncai = window.Yuncai = function(){
		this.image = game.R.yuncai;
		this.x = 0;
		this.y = 0;
		this.w = 530;
		this.h = 310;
	}
	Yuncai.prototype.update = function(){
		// 速度
		this.x -= game.steep;
		if( this.x < -this.w ){
			this.x = 0;
		}
	}
	Yuncai.prototype.render = function(){
		game.ctx.drawImage(this.image,0,0,this.w,this.h,this.x,this.y,this.w,this.h);
		game.ctx.drawImage(this.image,0,0,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
	}
})();