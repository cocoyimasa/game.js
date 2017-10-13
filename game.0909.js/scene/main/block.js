var Block = function(context,position){
    var p = position
    var obj = {
        x: p[0],
        y: p[1],
        width: 50,
        height: 20,
        alive: true,
        life: p[2] || 1,
    }
    obj.init = function() {

    }
    obj.clear = function() {
        //context.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
    }
    obj.update = function() {
        this.clear()
        if(this.alive)
            context.fillRect(this.x, this.y, this.width, this.height)
    }
    obj.kill = function(){
        this.life--
        !this.life && (this.alive = false)
    }
    obj.intersectWith = function(ball){
        var intersectBelow = this.alive && intersect(ball,this) 
        var intersectAbove = this.alive && intersect(this,ball)
        intersectBelow && (ball.y = this.y + ball.width + 1)
        return obj.alive && (intersectBelow || intersectAbove)
    }
    obj.init()
    return obj;
}