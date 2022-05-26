/**@type {import {  } from "def/autocompl.ts";} */


class AlignGrid {
	constructor(config)
	{
		this.config=config;
		if (!config.scene)
		{
			console.log("missing scene");
			return;
		}
		if (!config.rows)
		{
			config.rows=5;
		}
		if (!config.cols)
		{
			config.cols=5;
		}
		if (!config.height)
		{
			config.height=game.config.height;
		}
		if (!config.width)
		{
			config.width=game.config.width;
		}

		this.scene=config.scene;

		//cell width
		this.cw=config.width/config.cols;
		//cell height
		this.ch=config.height/config.rows;
	}

	show()
	{
		this.graphics=this.scene.add.graphics();
		this.graphics.lineStyle(2,0xff0000);

		 for (var i = 0; i < this.config.width; i+=this.cw) {
		            this.graphics.moveTo(i,0);
		            this.graphics.lineTo(i,this.config.height);
		        }

		  for (var i = 0; i < this.config.height; i+=this.ch) {
		            this.graphics.moveTo(0,i);
		            this.graphics.lineTo(this.config.width,i);
		        }


		  this.graphics.strokePath();
	}
	placeAt(xx,yy,obj)
	{
		//calc position based upon the cellwidth and cellheight
		var x2=this.cw*xx+this.cw/2;
		var y2=this.ch*yy+this.ch/2;

		obj.x=x2;
		obj.y=y2;
	}
	placeAtIndex(index,obj)
	{
		var yy=Math.floor(index/this.config.cols);
		var xx=index-(yy*this.config.cols);

		this.placeAt(xx,yy,obj);

	}
	showNumbers()
	{
		this.show();
		var count=0;
		 for (var i = 0; i < this.config.rows; i++) {
		            for(var j=0;j<this.config.cols;j++)
		            {

		            	var numText=this.scene.add.text(0,0,count,{color:'#ff0000'});
		            	numText.setOrigin(0.5,0.5);
		            	this.placeAtIndex(count,numText);


		            	count++;
		            }
		        }
	}
}

class Align
{
	static scaleToGameW(obj,per)
	{
		obj.displayWidth=game.config.width*per;
		obj.scaleY=obj.scaleX;
	}
	static centerH(obj)
	{
		obj.x=game.config.width/2-obj.displayWidth/2;
	}
	static centerV(obj)
	{
		obj.y=game.config.height/2-obj.displayHeight/2;
	}
	static center2(obj)
	{
		obj.x=game.config.width/2-obj.displayWidth/2;
		obj.y=game.config.height/2-obj.displayHeight/2;
	}
	static center(obj)
	{
		obj.x=game.config.width/2;
		obj.y=game.config.height/2;
	}
};




class Scene1 extends Phaser.Scene {
    constructor() {
        super({key: "Scene1"});
    }
    preload() {
        this.load.image("bedroom_1", "../materials/bedroom_1.png");
        this.load.image("man", "../materials/man1.png");
		this.load.image("mans_words", "materials/Paul.png");
		this.load.image("girl", "materials/playable ads_2_girl 1.png");
		this.load.image("girls_words", "materials/Lexy.png");
		this.load.image("bedroom", "materials/bedroom.png");
		this.load.image("girl2", "materials/girl_main.png");
		this.load.image("choice", "../materials/choose.png");
		this.load.image("dress1", "materials/clothes_1.png");
		this.load.image("dress2", "materials/clothes_2.png");
		this.load.image("rectangle","materials/rectangle.png");
		this.load.image("hand", "materials/hand.png");
    }
    create() {
		var bg = this.add.image(game.config.width/2, game.config.height/2.3, 'bedroom').setTint(Phaser.Display.Color.GetColor(155, 155, 155));
		bg.displayHeight = game.config.height*1.2;

        this.man = this.add.image(game.config.width * 0.55, game.config.height * .66, "man");
		Align.scaleToGameW(this.man, 1);

        var girl = this.add.image(game.config.width * -1.5, game.config.height * .66, "girl");
		Align.scaleToGameW(girl, .90);

		var girl2 = this.add.image(game.config.width * -1.5, game.config.height * .66, "girl2");
		Align.scaleToGameW(girl2, .90);

		this.mans_words = this.add.image(0, 0 ,"mans_words");

		this.girls_words = this.add.image(-200, -200, "girls_words");

		this.choice = this.add.image(-200, -200, "choice");

		var rectangle1 = this.add.image(-200, -200, "rectangle");
		var rectangle2 = this.add.image(-200, -200, "rectangle");

		var dress1 = this.add.image(-200, -200, "dress1");

		var dress2 = this.add.image(-200, -200, "dress2");

		var hand = this.add.image(-200, -200, "hand");

		// For lansacpe mode
		if(window.innerWidth > window.innerHeight){
			bg.displayHeight = game.config.height * 1.5;
			bg.displayWidth = game.config.width * 1.1;
			bg.y = game.config.height/2.2;
			bg.x = game.config.width/2;

			Align.scaleToGameW(this.man, .4);
			
			Align.scaleToGameW(girl, .3);
			
		};

		class Characteristics {
			constructor(object, x, delay) {
				this.targets = object,
				this.x = { from: game.config.width * x, to: game.config.width * x },
				this.y = { from: game.config.height * .85, to: game.config.height * .85},
				this.displayWidth = {from: 0, to: girl.width * .35 },
				this.displayHeight = {from: 0, to: girl.width * .35 },
				this.duration = 500,
				this.delay = delay,
				this.ease = "Linear";
			}
		};

		var timeline = this.tweens.createTimeline(); //эта анимация занимает в референсе 3 секунды, а в тз написано что должно быть полторы, но за полторы невозможно прочесть что они говорят(
		// adds mans words
		timeline.add({
			targets:this.mans_words,
			x: {from:game.config.width * .4, to:game.config.width * .55,},
			y: {from:game.config.height * .6, to: game.config.height * .7},
			displayWidth: {from: 0, to: this.man.width * .5},
			displayHeight: {from: 0, to: this.man.height * .1},
			duration: 500,
			ease: "Linear",
			completeDelay: 1000,
		});
		//removes man
		timeline.add({
			targets:this.man,
			x: game.config.width * 1.5,
			duration: 150,
			ease: "Linear",
		});
		//removes man's words
		timeline.add({
			targets:this.mans_words,
			displayWidth: 0,
			displayHeight: 0,
			duration: 150,
			offset: 1500,

		});
		//adds girl
		timeline.add({
			targets:girl,
			x: {from:game.config.width * -1.5, to: game.config.width * .55},
			y: {from:game.config.height * .55, to: game.config.height * .66	},
			duration: 500,
			ease: "Linear",
		});
		//adds girls words
		timeline.add({
			targets:this.girls_words,
			x: {from:game.config.width * .4, to:game.config.width * .55,},
			y: {from:game.config.height * .6, to: game.config.height * .7},
			displayWidth: {from: 0, to: girl.width * .5},
			displayHeight: {from: 0, to: girl.height * .1},
			duration: 500,
			ease: "Linear",
		});

		timeline.play();

		//making bg lighter
		this.tweens.addCounter({
			delay: 2650,
			from: 155,
            to: 255,
            duration: 1500,
            onUpdate: function (tween)
            {
                const value = Math.floor(tween.getValue());

                bg.setTint(Phaser.Display.Color.GetColor(value, value, value));
            }
        });

		this.tweens.add({
			targets: girl,
			delay: 2650,
			displayWidth: girl.displayWidth * 1.02,
			displayHeight: girl.displayHeight * 1.02,
			duration: 350,
			onComplete: function() {
				girl.setTexture("girl2")
			}
		});

		this.tweens.add({
			targets: girl,
			delay: 3000,
			displayWidth: {from:girl.displayWidth, to: girl.displayWidth * 1.05},
			displayHeight: {from: girl.displayHeight * 1.05, to:girl.displayHeight * 1.15},
			duration: 1000,
			y: game.config.height * .65,
		});

		this.tweens.add({
			targets:this.girls_words,
			displayWidth: 0,
			displayHeight: 0,
			duration: 350,
			delay: 4000,
		})

		this.tweens.add({
			targets:this.choice,
			x: {from:game.config.width * .5, to:game.config.width * .5,},
			y: {from:game.config.height * .05, to: game.config.height * .05},
			displayWidth: {from: 0, to: girl.width * .7},
			displayHeight: {from: 0, to: girl.height * .05},
			duration: 500,
			delay: 4000,
			ease: "Linear",
		});
		
		//adds buttons and hand
		this.tweens.add(new Characteristics(rectangle1, 0.25, 4000));
		this.tweens.add(new Characteristics(rectangle2, 0.75, 4500));
		this.tweens.add(new Characteristics(dress1, 0.25, 4000));
		this.tweens.add(new Characteristics(dress2, 0.75, 4500));

		var timeline2 = this.tweens.createTimeline();
		timeline2.add({
			targets:hand,
		})

		//adds hand
		this.tweens.add({
			targets: hand,
			x: {from:game.config.width * .25, to:game.config.width * .75,},
			duration: 1000,
			ease: 'Linear',
			yoyo: true,
			repeat: -1,
			delay: 4000
		});
	}

};

class Scene2 extends Phaser.Scene {
    constructor() {
        super({key: "Scene2"});
    }
    preload() {


    }

	create() {
		this.add.image(0, 0, "choice");
		console.log("fuck u");
	}
}

let titleScene = new Scene1();
let mainScene = new Scene2();


var config = {
    scale: {
		height:window.screen.height,
		width:window.screen.width,
        // mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: true,
    scene: {
        Scene1, Scene2
    }
};

let game = new Phaser.Game(config);
console.log(window.screen.height);
console.log(window.screen.width	);
game.scene.add("Scene1", titleScene);
game.scene.start("Scene1")