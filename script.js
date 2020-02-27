class Game{
	constructor(){
		Game.c.beginPath()
         Game.c.fillStyle='black'
         Game.c.fillRect(0,0,600,600)
         this.qanak=0
         this.boll=new Boll
         this.boll.arc()
         this.rak=new raket
		 this.rak.update()
		 this.ad=new kub
         this.st=setInterval(()=>{
		     Game.c.beginPath()
		     Game.c.fillStyle='black'
		     Game.c.fillRect(0,0,600,600)
		     this.boll.update()
		     this.rak.board()
		     this.ad.show()
		     this.Gameover()
		     if(this.boll.y+10>=this.rak.y && this.boll.x+10>=this.rak.x &&
		     	this.rak.x+100>=this.boll.x+10 ){
		     		this.boll.vy=-this.boll.vy
		     }
		     if(this.qanak!=16){
			     for(let i=this.ad.arr.length-1; i>=0; i--){
			     	for(let j=0; j<this.ad.arr[i].length; j++){
			     		if(this.ad.arr[i][j].active==true &&
			     			this.ad.arr[i][j].x<=this.boll.x+10 &&
			     			this.ad.arr[i][j].x+130>=this.boll.x+10 &&
			     			this.ad.arr[i][j].y+30>=this.boll.y-10 &&
			     			this.ad.arr[i][j].y<=this.boll.y+10){
			     				
			     				this.ad.arr[i][j].active=false
			     				this.boll.vy=-this.boll.vy
			     				this.qanak++
			     		}
	         		}
	         	}
         	} else { 
         			Game.c.fillStyle='white'
					Game.c.font = "50px Verdana";
					Game.c.fillText('ՀԱՂԹԱՆԱԿ',130,250)
					clearInterval(this.st)
         			}
        },100)
	}
	Gameover(){
		if(this.boll.y+10>cnv.width-70){
			Game.c.fillStyle='white'
			Game.c.font = "50px Verdana";
			Game.c.fillText('GAME OVER',130,250)
			clearInterval(this.st)
		}
	}
}

Game.c=cnv.getContext('2d')

class Boll{
	constructor(){
		this.x=cnv.width/2
		this.y=cnv.height-100
		this.vx=Math.round(Math.random()*10+10)
		this.vy=Math.round(Math.random()*10+10)
	}
	arc(){
		Game.c.fillStyle='red'
		Game.c.arc(this.x,this.y,10,0,2*Math.PI)
		Game.c.fill()
	}
	update(){
		this.x +=this.vx
		this.y +=-this.vy
	
		if(this.x-10<0 || this.x+10>cnv.width){
			this.vx=-this.vx
		}
		if(this.y-10<0){
			this.vy=-this.vy
		}
		this.arc()
	}
}


class raket{
	constructor(){
		this.x=270
		this.y=520	
	}
	board(){
		Game.c.fillStyle='blue'
		Game.c.fillRect(this.x,this.y,80,20)
	}
	update(){
		document.addEventListener('keydown',(e)=>{
			if(e.key=='ArrowRight' && this.x+80+30<cnv.width){
				this.x+=30
			}
			if(e.key=='ArrowLeft' && this.x>0){
				this.x-=30
			}
		})
	}
}


class kub{
	constructor(){
		this.a=10
		this.b=30
		this.rows=4
		this.colums=4
		this.arr=[]
		this.addData()
	}

	addData(){
		for(let i=0;i<this.rows;i++){
			this.arr.push([])
			for(let j=0; j<this.colums; j++){
				this.arr[i].push({x:j*140+this.a+10 ,y:i*50+this.b+10 ,active:true})
			}
		}

		console.log(this.arr)
	}

	show(){
		for(let i=0; i<this.arr.length;i++){
			for(let j=0; j<this.arr[i].length;j++){
				if(this.arr[i][j].active==true){
					Game.c.beginPath()
					Game.c.fillStyle='#C0F013'
					Game.c.fillRect(this.arr[i][j].x, this.arr[i][j].y , 130 , this.b)
				}
			}
		}
	}
}


let a=new Game