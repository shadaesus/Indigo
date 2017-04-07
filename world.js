/**
 * Created by Bell on 19/02/2017.
 */


function World (){
    this.originx = 0;
    this.originy = 0;
    this.layers = 11; //Layers of chunks (Keep odd for centralized chunk)
    this.density = 1; //Density per layer
    this.size = 25; //Tile size
    this.chunks = [];
    this.chunk = new Chunk( this.originx, this.originy, this.size, this.density);

    this.origin_x;
    this.origin_y;

    this.initialise = function(){
        for (var a = 0; a < this.layers; a ++)
            for (var b = 0; b < this.layers; b ++){
                this.chunks[a * this.layers + b] = new Chunk(
                    this.originx + this.density * this.size * a,
                    this.originy + this.density * this.size * b,
                    this.size,
                    this.density);
            }
    }
    this.update = function(x,y){
        this.origin_x = x;
        this.origin_y = y

        var chunkDensity = this.density  * this.size;

        this.local_x = this.origin_x%chunkDensity;
        this.local_y = this.origin_y%chunkDensity;

        //If there is a change in chunk:
        //Find direction according to hash table. (overkill?) (all 8 possibilities(x, +))
        //Update origin chunk and positioning of chunks in array.

        //Update chunk density and size according to zoom to fill entire screen.

    }
    this.draw = function(context){
        var mid = this.layers / 2 - 0.5;
        var oneOut = this.layers / 2 - 1.5;

        for (var a = 0; a < this.layers; a ++)
            for (var b = 0; b < this.layers; b ++){
                if (a === mid && b == mid)
                    this.chunks[a * this.layers + b].draw(context, 0);
                else if (
                    a >= mid -1 && a <= mid +1 && b >= mid -1 && b <= mid +1
                )
                    this.chunks[a * this.layers + b].draw(context, 1);
                else
                    this.chunks[a * this.layers + b].draw(context, -1);
        }
    }
}



function Chunk (originx, originy, tileSize, tileDensity){

    this.originx = originx;
    this.originy = originy;
    this.tileSize = tileSize;
    this.tileDensity = tileDensity;


        this.update = function(){
    }

    this.draw = function(context, type){
        for (var a = 0; a < this.tileDensity; a ++){
            for (var b = 0; b < this.tileDensity; b ++){
                context.beginPath();
                switch (type) {
                    case 0:
                        context.fillStyle = "red";
                        break;
                    case 1:
                        context.fillStyle = "green";
                        break;
                    case 2:
                        context.fillStyle = "blue";
                        break;

                    default:
                        context.fillStyle = "grey";
                        break;
                }

                context.fill();
                context.fillRect(this.originx + this.tileSize * a, this.originy + this.tileSize * b, this.tileSize, this.tileSize);
                context.fillStyle = "white";
                //Chunk id.
                context.fillText(this.originx / this.tileSize + ", " + this.originy / this.tileSize, this.originx + this.tileSize * a,this.originy + this.tileSize * b + 10);

                //Tile id.
                context.fillText(a + ", " + b, this.originx + this.tileSize * a,this.originy + this.tileSize * b + 20);
                //context.fillText(a * this.tileDensity + b, this.originx + this.tileSize * a,this.originy + this.tileSize * b + 10);
            }
        }
    }
}