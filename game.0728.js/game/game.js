var debug = {
    debugMode: true,
    context:null,
    pause: false,
    debugBlocks: [],
}
function e(sel){
    return document.querySelector(sel)
}
function es(sel){
    return document.querySelectorAll(sel)
}
var Game = function(fps,images,runCallback){
    var canvas = e('#ctx')
    canvas.style.cssText += 'border:1px solid black;'
    var context = canvas.getContext('2d')

    debug.context = context
    enableDebugMode(debug.debugMode)
    var g = {
        scene:null,
        canvas:canvas,
        context:context,
        actions: {},
        keydowns: {},
    }
    
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    g.drawImage = function(img) {
        g.context.drawImage(img.image, img.x, img.y)
    }
    g.draw = function(){
        g.scene.draw()
    }
    g.update = function() {
        if(debug.pause){
            return
        }
        g.scene.update()
    }
    g.clearCanvas = function() {
        context.clearRect(0, 0, 400,400);
    }
    g.triggerAllAction = function() {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var k = actions[i]
            if (g.keydowns[k]) {
                g.actions[k]()
            }
        }
    }
    
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    }, false);
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    }, false);

    //timer
    window.fps = 30
    
    var runloop = function(){
        g.triggerAllAction()
        g.update()
        g.clearCanvas()
        g.draw()
        setTimeout(function() {
            runloop()
        }, 1000 / window.fps);
    }
    g.run = function(){
        setTimeout(function(){
            runloop()
        },1000/window.fps)
    }
    g.runWithScene = function(scene){
        g.scene = scene
        setTimeout(function(){
            runloop()
        },1000/window.fps)
    }
    g.replaceScene = function(scene) {
        g.scene = scene
    }
    g.__start = function(scene){
        runCallback(g)
    }
    g.__start()
    return g
}