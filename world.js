/**
 * Created by Bell on 19/02/2017.
 */


function World (x, y){
    this.origin_x = x;
    this.origin_y = y;
    this.layers = 3; //Layers of chunks (Keep odd for centralized chunk)
    this.density = 2; //Density per layer
    this.size = 25; //Tile size
    this.chunks = [];

    this.origin_x;
    this.origin_y;

    this.initialise = function(){
        for (var a = 0; a < this.layers; a ++)
            for (var b = 0; b < this.layers; b ++){
                this.chunks[a * this.layers + b] = new Chunk(
                    this.origin_x + this.density * this.size * a,
                    this.origin_y + this.density * this.size * b,
                    this.size,
                    this.density);
            }
    }

    //Updates the world chunks based on the players position
    this.update = function(x,y){

        var chunkDensity = this.density  * this.size;

        //POSITIONS
        //Global position.
        this.origin_x = x;
        this.origin_y = y;

        //Local position.
        this.local_x = this.origin_x%chunkDensity;
        this.local_y = this.origin_y%chunkDensity;

        //Chunk position.
        old_chunk_x = this.chunk_x;
        old_chunk_y = this.chunk_y;

        this.chunk_x = (this.origin_x-this.local_x)/chunkDensity;
        this.chunk_y = (this.origin_y-this.local_y)/chunkDensity;

        this.local_chunk_x = this.chunk_x%this.layers;
        this.local_chunk_y = this.chunk_y%this.layers;

        //UPDATES
        //Horizontal chunk movement.
        if(old_chunk_x != this.chunk_x){
            //Find direction
            var direction = this.chunk_x - old_chunk_x;
            console.log("X change: " + direction);

            //Move right
            if (direction > 0) {
                console.log("\nX chunk id:" + this.chunk_x);
                for (var a = 0; a < this.layers; a ++){
                //Location of chunk to be added
                var x = old_chunk_x;
                    console.log("Remove chunk id: " + (this.layers * a));
                    console.log("Add chunk: " + (this.layers + this.chunk_x - 1) + ", " + a);
                    this.chunks[this.layers * a] = new Chunk(
                        //this.origin_x + this.density * this.size*(this.layers + this.chunk_x - 1),
                        this.size * this.density * (this.layers + this.chunk_x-1),
                        a* this.density * this.size,
                        this.size,
                        this.density);

                }

                //Location of chunk to be replaced
            }
            else if (direction < 0){



            }
        }
        //Vertical chunk movement.
        if(old_chunk_y != this.chunk_y){
            //Find direction
            console.log("Y change: " + (this.chunk_y - old_chunk_y));
            //Move up or down
        }


        //If there is a change in chunk:
        //Find direction according to hash table. (overkill?) (all 8 possibilities(x, +))
        //Update origin chunk and positioning of chunks in array.

        //Update chunk density and size according to zoom to fill entire screen.

    }
    this.draw = function(context){
        var mid = this.layers / 2 - 0.5;
        //var oneOut = this.layers / 2 - 1.5;
        //var
        //console.log("DRAW")

        for (var a = 0; a < this.layers; a ++)
            for (var b = 0; b < this.layers; b ++){
                //Debug: Chunk positions to be drawn
                //console.log((a + this.chunk_x) + " " + (b + this.chunk_y));

                //Highlight current chunk
                if (a == this.local_chunk_x && b == this.local_chunk_y)
                    this.chunks[a * this.layers + b].draw(context, 0);
                //Highlight custom chunks
                else if (a >= mid -1 && a <= mid +1 && b >= mid -1 && b <= mid +1)
                    this.chunks[a * this.layers + b].draw(context, 3);
                //Highlight middle chunk
                else if (a == mid && b == mid)
                    this.chunks[a * this.layers + b].draw(context, 1);
                //Highlight surrounding chunks
                else if (a >= mid -1 && a <= mid +1 && b >= mid -1 && b <= mid +1)
                    this.chunks[a * this.layers + b].draw(context, 2);
                //Draw normal colour
                else
                    this.chunks[a * this.layers + b].draw(context, -1);
        }
    }


}



function Chunk (x, y, tileSize, tileDensity){

    this.origin_x = x;
    this.origin_y = y;
    this.tileSize = tileSize;
    this.tileDensity = tileDensity;


        this.update = function(){
    }

    this.draw = function(context, type){
        for (var a = 0; a < this.tileDensity; a ++){
            for (var b = 0; b < this.tileDensity; b ++){
                context.beginPath();
                switch (type) {
                    //Highlight current chunk
                    case 0:
                        context.fillStyle = "red";
                        break;
                    //Highlight middle chunk
                    case 1:
                        context.fillStyle = "green";
                        break;
                    //Highlight surrounding chunks
                    case 2:
                        context.fillStyle = "blue";
                        break;
                    //Highlight custom chunks
                    case 3:
                        context.fillStyle = "blue";
                        break;
                    //Draw normal colour
                    default:
                        context.fillStyle = "grey";
                        break;
                }

                context.fill();
                context.fillRect(this.origin_x + this.tileSize * a, this.origin_y + this.tileSize * b, this.tileSize, this.tileSize);
                context.fillStyle = "white";

                //In game debug
                //Chunk id.
                context.fillText(this.origin_x / this.tileSize / this.tileDensity + ", " + this.origin_y / this.tileSize / this.tileDensity, this.origin_x + this.tileSize * a,this.origin_y + this.tileSize * b + 10);

                //Tile id.
                //context.fillText(a * this.tileDensity + b, this.originx + this.tileSize * a,this.originy + this.tileSize * b + 10);
            }
        }
    }
}