var Scene = function(game){
    var s = {
        game:game
    }
    var g = game
    var score = 0
    var ball = Ball(g.context)
    var paddle = Paddle(g.context)
    window.blocks = loadLevel(g.context,2)
    
    //mouse event
    var dragging = false
    game.canvas.addEventListener('mousedown',function(event){
        var x = event.offsetX
        var y = event.offsetY
        if(ball.hasPoint(x,y)){
            dragging = true
        }
    })

    game.canvas.addEventListener('mousemove',function(event){
        if(dragging){
            ball.x = event.offsetX
            ball.y = event.offsetY
        }
    })
    game.canvas.addEventListener('mouseup',function(event){
        dragging = false
    })
    //注意小写
    g.registerAction('a', function(event) {
        paddle.moveLeft()
    })
    g.registerAction('d', function(event) {
        paddle.moveRight()
    })
    g.registerAction('f',function(event){
        ball.fire()
    })
    
    s.drawRect = function(rect,color){
        g.context.save()
        g.context.fillStyle = color || g.context.fillStyle
        g.context.fillRect(rect.x, rect.y, rect.width, rect.height)
        g.context.restore()
    }
    s.draw = function(){
        s.drawRect(paddle)
        s.drawRect(ball,'red')
        for(var i in blocks){
            if(blocks[i].alive)
                s.drawRect(blocks[i],'blue')
        }
        g.context.fillText('分数：'+score,5,390)
    }
    s.update = function(){
        ball.move()
        if(paddle.intersectWith(ball)){
            ball.rebound()
        }
        for(var i in blocks){
            var block = blocks[i]
            if(block.intersectWith(ball)){
                block.kill()
                score += 10
                ball.rebound()
            }
        }
    }
    return s
}