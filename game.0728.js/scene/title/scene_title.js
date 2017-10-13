var SceneTitle = function(game){
    var s = {
        game:game
    }
    var g = game
    g.registerAction('s',function(){
        var s = Scene(game)
        game.replaceScene(s)
    })
    s.draw = function(){
        g.context.fillText('按 s 开始游戏',5,390)
    }
    s.update = function(){
        
    }
    return s
}