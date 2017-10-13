class SceneEnd extends SceneBase{
    constructor(game){
        super(game)
    }
    draw(){
        this.game.context.fillText('Game Over')
    }
    update(){
        
    }
}