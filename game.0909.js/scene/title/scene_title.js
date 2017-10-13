class SceneTitle extends SceneBase{
    constructor(game){
        super(game)
        this.game.registerAction('k',function(){
            var s = new SceneEditor(game)
            game.replaceScene(s)
        })
    }
    
    draw(){
        this.game.context.fillText('按 k 开始游戏',5,390)
    }
    update(){
        
    }
}