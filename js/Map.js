(function(){
	var Map = window.Map = function(){
		//自己的背景
		this.image = game.R.bg1;
		// 图片的位置
		this.x = 0 ;
		this.y = game.mycanvas.height * 0.33 - 20;
		// png宽高
		this.w = 512;
		this.h = 256;
	}
	Map.prototype.update = function(){
		// 速度
		this.x -= game.steep;
		if ( this.x < -this.w){
			this.x = 0;
		}
	}
	Map.prototype.render = function(){

		game.ctx.drawImage(this.image,753,532,this.w,this.h,this.x,this.y,this.w,this.h);
		game.ctx.drawImage(this.image,753,532,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
			
	}
})();