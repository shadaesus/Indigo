/**
 * Created by Bell on 27/01/2017.
 */

//Add listener for the keyboard when a key is released.
window.addEventListener("keypress", keyboardControls, false);

//Keyboard controller.
function keyboardControls(e) {
    console.log ("Key pressed" + e.keyCode)
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
    this.speed = 0.5;

    this.spawn = function(x, y){
        this.x = x;
        this.y = y;


    }
    this.update = function(){



    }
    this.draw = function(context){
        context.fillRect(this.x, this.y, 10, 10);
    }

    this.move = function (x, y){
        this.x += x * this.speed;
        this.y += y * this.speed;
    }

}