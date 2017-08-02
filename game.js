var debug = {
    debugMode: true,
    context:null,
    pause: false,
    debugBlocks: [],
}
function getContext(type) {
    var canvas = document.querySelector('#ctx')
    canvas.height = 400
    canvas.width = 400
    canvas.style.cssText += 'border:1px solid black;'
    return canvas.getContext(type)
}
function loadLevel(context,n){
    var level = levels[n]
    var blocks = []
    for(var i=0;i<level.length;i++){
        var block = Block(context,level[i])
        blocks.push(block)
    }
    return blocks
}
function enableDebugMode(enable){
    if(!enable){
        return
    }
    window.addEventListener('keydown',function(event){
        var k = event.key
        if(k == 'p'){
            debug.pause = !debug.pause
        }
        else if('01234567'.includes(k)){
            blocks = loadLevel(debug.context,Number(k))
        }
    })
    var speed = document.querySelector('#id-speed')
    speed.addEventListener('input',function(event){
        var input = event.target
        window.fps = Number(input.value)
    })
}
var blocks = []
function game() {
    var context = getContext('2d')
    debug.context = context
    enableDebugMode(debug.debugMode)
    var g = {
        actions: {},
        keydowns: {},
    }
    //var pic = Pic('debug.png', context)
    var ball = Ball(context)
    var paddle = Paddle(context)
    blocks = loadLevel(context,2)
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    g.drawRect = function(rect,color){
        context.save()
        context.fillStyle = color || context.fillStyle
        context.fillRect(rect.x, rect.y, rect.width, rect.height)
        context.restore()
    }
    g.draw = function(){
        g.drawRect(paddle,)
        g.drawRect(ball,'red')
        for(var i in blocks){
            if(blocks[i].alive)
                g.drawRect(blocks[i],'blue')
        }
    }
    g.update = function() {
        if(debug.pause){
            return
        }
        ball.move()
        if(paddle.intersectWith(ball)){
            ball.rebound()
        }
        for(var i in blocks){
            var block = blocks[i]
            if(block.intersectWith(ball)){
                block.kill()
                ball.rebound()
            }
        }
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
    window.fps = 30
    g.run = function(){
        setTimeout(function(){
            runloop()
        },1000/window.fps)
    }
    var runloop = function(){
        //log(window.fps)
        //log('setInterval')
        g.triggerAllAction()
        g.update()
        g.clearCanvas()
        g.draw()
        setTimeout(function() {
            runloop()
        }, 1000 / window.fps);
    }
    g.run()
}