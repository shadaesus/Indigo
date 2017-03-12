/**
 * Created by Bell on 27/01/2017.
 */

//Add listener for the keyboard when a key is released.
window.addEventListener("keypress", keyboardControls, false);

//Keyboard controller.
function keyboardControls(e) {
    //console.log ("Key pressed" + e.keyCode)
    if (e.keyCode == ("119")) //W
        Game.player.move(0,-1);
    if (e.keyCode == ("97")) //A
        Game.player.move(-1, 0);
    if (e.keyCode == ("115")) //S
        Game.player.move(0,1);
    if (e.keyCode == ("100")) //D
        Game.player.move(1,0);
}

function Player (){

    this.x = 50;
    this.y = 50;
    this.speed = 1;
    this.acceleration = 0.25;
    this.topSpeed = 2;
    this.accX = 0;
    this.accY = 0;


    this.spawn = function(x, y){
        this.x = x;
        this.y = y;


    }
    this.update = function(){

        this.x += this.accX;
        this.y += this.accY;

        //this.accX /= this.accX;
        //this.accY /= this.accY;

    }
    this.draw = function(context){
        context.beginPath();
        context.fillStyle = "black";
        context.fill();
        context.fillRect(Game.width/2, Game.height/2, 10, 10);
    }

    this.move = function (x, y){
        this.accX += x * this.speed;
        this.accY += y * this.speed;
        //console.log(Math.hypot(this.accX, this.accY));
    }

}