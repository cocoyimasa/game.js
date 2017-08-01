var Paddle = function(context) {
    var obj = {
        img: new Image(),
        width: 200,
        height: 20,
        x: 20,
        y: 380,
    }
    obj.init = function() {

    }
    obj.clear = function() {
        context.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
    }
    obj.move = function(direction) {
        if (direction == 'left') {
            this.x -= (this.x <= 0 ? 0 : 30);
        } else {
            this.x += (this.x + this.width>= 400 ? 0 : 30);
        }
    }
    obj.moveLeft = function() {
        this.move('left')
    }
    obj.moveRight = function() {
        this.move('right')
    }
    obj.update = function() {
        this.clear()
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    obj.intersect = function(ball){
        if(ball.y + ball.width >= this.y){
            if(ball.x >= this.x && ball.x <= this.x + this.width){
                log('相撞')
                ball.y = this.y - ball.width - 1
                return true
            }
        }
        return false
    }
    obj.init()
    return obj;
}