var Ball = function(context) {
    var obj = {
        img: new Image(),
        width: 15,
        height: 15,
        x: 20,
        y: 120,
        speedX: 5,
        speedY: 5,
    }
    obj.init = function() {

    }
    obj.clear = function() {
        context.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
    }
    obj.translateX = function(){
        var deltaX = 400 / (3 * 60)
        this.x += (this.x + 20 >= 400 ? 0 : deltaX)
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    obj.fire = function(){
        this.fired = true
    }
    obj.move = function(){
        if(this.fired){
            if(this.x < 0 || this.x+this.width >400){
                this.speedX *= -1
            }
            if(this.y < 0|| this.y + this.height > 400){
                this.speedY *= -1
            }
            this.x += this.speedX
            this.y += this.speedY
        }
    }
    obj.update = function() {
        //this.clear()
        this.move()
        //context.fillRect(this.x, this.y, this.width, this.height)
    }
    obj.rebound = function(){
        this.speedY *= -1
    }
    obj.init()
    return obj;
}