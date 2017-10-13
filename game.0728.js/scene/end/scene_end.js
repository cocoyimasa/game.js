var SceneEnd = function(game){
    var s = {
        game:game
    }
    var g = game
    
    s.draw = function(){
        g.context.fillText('Game Over')
    }
    s.update = function(){
        
    }
    return s
}