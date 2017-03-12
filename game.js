/**
 * Created by Bell on 27/01/2017.
 */
//Add listener for the keyboard when a key is released.
window.addEventListener("keypress", keyboardControls, false);

//Keyboard controller.
function keyboardControls(e) {
    //console.log ("Key pressed" + e.keyCode)
    if (e.keyCode == ("32")) //Space - Refresh page
        window.location.reload();
    if (e.keyCode == ("112")) //P - Pause
    {
        Game.pause = !Game.pause;
        console.log("Pause status: " + Game.pause);
    }
}

//Game object.
var Game = {
    fps: 60,
    width: 640,
    height: 480,
    time: 0,
    pause: false
};

//Does animation stuff, need to look into how this actually works.
Game._onEachFrame = (function () {
    var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    if (requestAnimationFrame) {
        return function (cb) {
            var _cb = function () {
                cb();
                requestAnimationFrame(_cb);
            }
            _cb();
        };
    } else {
        return function (cb) {
            setInterval(cb, 1000 / Game.fps);
        }
    }
})();

Game.run = (function () {
    var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime(),
        lastGameTick;

    return function () {

        while ((new Date).getTime() > nextGameTick) {
            if (Game.pause === false)
                Game.update();
            nextGameTick += skipTicks;
            loops++;
        }

        if (loops) Game.draw();
    }
})();

//Sets up the Game object.
Game.start = function () {
    //Retrieves the canvas from the html file.
    Game.canvas = document.getElementById("canvas");
    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;
    console.log("start");
    //Retrives a copy of the context.
    Game.context = Game.canvas.getContext("2d");

    //Dont know what this does yet.
    document.body.appendChild(Game.canvas);

    //Instantiates a new player.
    Game.player = new Player();

    Game.player.spawn(0,0);

    Game.world = new World();
    Game.world.initialise();

    //Dont know what this does yet.
    Game._onEachFrame(Game.run);
};

Game.update = function () {
    Game.player.update();
    Game.world.update(Game.player.x, Game.player.y);
};

Game.draw = function () {
    Game.context.clearRect(0, 0, Game.width, Game.height);


    //Move camera to camera position (Focused on player
    Game.context.save();
    Game.context.translate(-Game.player.x+Game.width/2, -Game.player.y+Game.height/2);
    Game.world.draw(Game.context);
    Game.context.restore();

    //Draw player and ui on screen
    Game.player.draw(Game.context);
    Game.context.fillText(Game.world.local_x + ", " + Game.world.local_y, 20,20);
};
