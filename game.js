function getContext(type) {
    var canvas = document.querySelector('#ctx')
    canvas.height = 400
    canvas.width = 400
    canvas.style.cssText += 'border:1px solid black;'
    return canvas.getContext(type)
}

function game() {
    var g = {
        actions: {},
        keydowns: {},
    }
    var context = getContext('2d')
    //var pic = Pic('debug.png', context)
    var ball = Ball(context);
    var paddle = Paddle(context);
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    g.update = function() {
        if(paddle.intersect(ball)){
            ball.speedX *= -1
            ball.speedY *= -1
        }
        ball.update()
        paddle.update()
        //pic.update()
    }
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
    g.clearCanvas = function() {
        context.clearRect(0, 0, 400,400);
    }
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    }, false);
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    }, false);
    g.triggerAllAction = function() {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var k = actions[i]
            if (g.keydowns[k]) {
                g.actions[k]()
            }
        }
    }
    setInterval(function() {
        //log('setInterval')
        g.triggerAllAction()
        g.clearCanvas()
        g.update()
    }, 1000 / 30);
}