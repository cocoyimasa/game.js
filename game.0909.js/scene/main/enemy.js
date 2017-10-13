class Enemy{
    constructor(game,imgName){
        this.game = game
        var img = game.imageByName(imgName)
        this.image = img
        this.width = img.width
        this.height = img.height
        this.init()
    }
    init(){
        this.speed = randomBetween(1,5)
        this.alive = true
        this.life = 1
        this.x = randomBetween(0,300)
        this.y = -randomBetween(0,200)
    }
    moveDown(){
        this.y += this.speed
    }
    update(){
        this.moveDown()
        if(this.y > this.game.canvas.height){
            this.init()
        }
    }
}