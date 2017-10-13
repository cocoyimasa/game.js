class Texture{
    constructor(position,game,imgName){
        var img = game.imageByName(imgName)
        var p = position
        this.game = game
        this.x = p[0]
        this.y = p[1]
        this.image = img
        this.width = img.width
        this.height = img.height
        this.speed = 10
    }
    clear(){
        this.game.context.clearRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
    }
    update() {
        this.clear()
        this.game.drawImage(this)
    }
}