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
class Game{
    constructor(fps,images,runCallback){
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        var canvas = e('#ctx')
        canvas.style.cssText += 'border:1px solid black;'
        var context = canvas.getContext('2d')
    
        debug.context = context
        enableDebugMode(debug.debugMode)

        this.scene = null
        this.canvas = canvas
        this.context = context
        this.actions = {}
        this.keydowns = {}
        
        var self = this
        window.addEventListener('keydown', function(event) {
            self.keydowns[event.key] = true
        }, false);
        window.addEventListener('keyup', function(event) {
            self.keydowns[event.key] = false
        }, false);
        
        this.init()
        //timer
        //this.__start()
    }
    init(){
        var self = this
        var loads = []
        var keys = Object.keys(self.images)
        var count = 0
        for(var i=0;i<keys.length;i++){
            let name = keys[i] // let
            var path = self.images[name]
            let img = new Image() //let 
            img.src = path
            img.onload = function(){
                self.images[name] = img
                loads.push(1)
                if(loads.length == keys.length){
                    log('load images', self.images)
                    self.__start()
                }
            }
        }
    }
    imageByName(name) {
        var img = this.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    drawImage(img,width,height) {
        if(!width && !height){
            this.context.drawImage(img.image, img.x, img.y)
        }
        else{
            this.context.drawImage(img.image, img.x, img.y,width,height)
        }
    }
    drawRect(rect,color){
        this.context.save()
        this.context.fillStyle = color || this.context.fillStyle
        this.context.fillRect(rect.x, rect.y, rect.width, rect.height)
        this.context.restore()
    }
    draw(){
        this.scene.draw()
    }
    update() {
        if(debug.pause){
            return
        }
        this.scene.update()
    }
    clearCanvas() {
        this.context.clearRect(0, 0, 400,400);
    }
    triggerAllAction() {
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var k = actions[i]
            if (this.keydowns[k]) {
                this.actions[k]()
            }
        }
    }
    
    runloop(){
        this.triggerAllAction()
        this.update()
        this.clearCanvas()
        this.draw()
        var self = this
        setTimeout(function() {
            self.runloop()
        }, 1000 / window.fps);
    }
    run (){
        var self = this
        setTimeout(function(){
            self.runloop()
        },1000/window.fps)
    }
    runWithScene(scene){
        this.scene = scene
        var self = this
        setTimeout(function(){
            self.runloop()
        },1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(){
        this.runCallback(this)
    }
}