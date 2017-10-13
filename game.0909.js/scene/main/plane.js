class Plane{
    constructor(position,game,imgName){
        var p = position
        var img = game.imageByName(imgName)
        //column edit : alt+shift+鼠标左键
        this.game = game 
        this.x = p[0]
        this.y =  p[1]
        this.life = p[2] || 1
        this.image = img
        this.width = img.width
        this.height = img.height
        
        this.init()
    }
    init() {
        this.cooldown = config.bullet_cooldown
        this.alive = true
        this.speed = 15
        var border = {
            width:this.game.canvas.width,
            height:this.game.canvas.height,
        }
        this.border = border
    }
    clear() {
        this.game.context.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
    }
    move(direction) {
        if (direction == 'left') {
            this.x -= (this.x <= 0 ? 0 : this.speed);
        } else if(direction == 'right'){
            this.x += (this.x + this.width>= this.border.width ? 0 : this.speed);
        }
        else if (direction == 'up') {
            this.y -= (this.y <= 0 ? 0 : this.speed);
        } else {
            this.y += (this.y + this.height>= this.border.height ? 0 : this.speed);
        }
    }
    fire(){
        if(this.cooldown == 0){
            this.fired = true
            this.cooldown = config.bullet_cooldown
            var x  = this.x + this.width / 2
            var y = this.y
            var b = new Bullet(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            log(b,this.scene)
        }
    }
    moveLeft() {
        this.move('left')
    }
    moveRight() {
        this.move('right')
    }
    moveUp() {
        this.move('up')
    }
    moveDown() {
        this.move('down')
    }
    update() {
        this.speed = config.player_speed
        if(this.cooldown > 0){
            this.cooldown--
        }
        this.clear()
        this.game.context.fillRect(this.x, this.y, this.width, this.height)
    }
    intersectWith(ball){
        var isIntersect = intersect(this,ball)
        isIntersect && (ball.y = this.y - ball.height - 1)
        return isIntersect
    }
}
class Bullet{
    constructor(game){
        var img = game.imageByName('bullet')
        this.game = game
        this.image = img
        this.width = img.width
        this.height = img.height
        this.init()
    }
    init(){
        this.speed = 2
    }
    update(){
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}