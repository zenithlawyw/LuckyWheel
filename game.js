var game;
var pin;
var wheel; 
var canSpin;
var slices = 8;
var slicePrizes = ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"];
var prize;
var prizeText;
var gwidth = gheight = 800;

var img_pin = "img/pin.png";
var img_wheel = "img/wheel.png";
var bgcolor = "#000000";

window.onload = function() {	
	//game = new Phaser.Game(458, 488, Phaser.AUTO, "");
	game = new Phaser.Game(gwidth, gheight, Phaser.AUTO, "");
  game.state.add("PlayGame",playGame);
  game.state.start("PlayGame");
}

var playGame = function(game){};

playGame.prototype = {
  preload: function() {
    game.load.image("wheel", img_wheel);
		game.load.image("pin", img_pin);
  },
  create: function() {
    game.stage.backgroundColor = bgcolor;
    wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
    wheel.anchor.set(0.5);
    pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
    pin.anchor.set(0.5);
		pin.events.onInputDown.add(this.buttonDown, this);
    prizeText = game.add.text(game.world.centerX, 480, "");
    prizeText.anchor.set(0.5);
    prizeText.align = "center";
    canSpin = true;
    game.input.onDown.add(this.spin, this);		
	},
	buttonDown() {
    if (canSpin) {
      prizeText.text = "";
      var rounds = game.rnd.between(2, 4);
      var degrees = game.rnd.between(0, 360);
      prize = slices - 1 - Math.floor(degrees / (360 / slices));
      canSpin = false;
      var spinTween = game.add.tween(wheel).to({
        angle: 360 * rounds + degrees
      }, 3000, Phaser.Easing.Quadratic.Out, true);
      spinTween.onComplete.add(this.winPrize, this);
    }
	},
  spin(){
    if (canSpin) {
      prizeText.text = "";
      var rounds = game.rnd.between(2, 4);
      var degrees = game.rnd.between(0, 360);
      prize = slices - 1 - Math.floor(degrees / (360 / slices));
      canSpin = false;
      var spinTween = game.add.tween(wheel).to({
        angle: 360 * rounds + degrees
      }, 3000, Phaser.Easing.Quadratic.Out, true);
      spinTween.onComplete.add(this.winPrize, this);
    }
  },
  winPrize(){
    canSpin = true;
    //prizeText.text = slicePrizes[prize];
  }
}
