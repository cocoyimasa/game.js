var config = {
    player_speed : 15,
    bullet_speed:2,
    bullet_cooldown:0,
}
class SceneMain extends SceneBase{
    constructor(game){
        super(game)
        
        this.init()
        //this.__removeActions()

        //ball and paddle key binding
        this.__addKeyBinding()

        //mouse event
        //this.__addDragEvent()
    }
    init(){
        var g = this.game
        this.numOfEnemies = 10
        this.score = 0
        this.bg = new Texture([0,0],this.game,'bg')
        this.planeMe =new Plane([200,400],g,'planeMe')
        
        //window.blocks = window.blocks || loadLevel(g.context,2)
        this.addElement(this.bg)
        this.addElement(this.planeMe)
        this.__addEnemies()
    }
    __addEnemies(){
        var es = []
        for(var i=0;i<this.numOfEnemies;i++){
            var e = new Enemy(this.game,'planeEnemy')
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    __removeActions(){
        var g = this.game
        g.actions['k'] = function(){}
        g.actions['s'] = function(){} 
    }
    __addKeyBinding(){
        var g = this.game
        var self = this
        g.registerAction('a', function(event) {
            self.planeMe.moveLeft()
        })
        g.registerAction('d', function(event) {
            self.planeMe.moveRight()
        })
        g.registerAction('w', function(event) {
            self.planeMe.moveUp()
        })
        g.registerAction('x', function(event) {
            self.planeMe.moveDown()
        })
        g.registerAction('f',function(event){
            self.planeMe.fire()
        })
    }
    __addDragEvent(){
        var g = this.game
        var self = this
        var dragging = false
        g.canvas.addEventListener('mousedown',function(event){
            var x = event.offsetX
            var y = event.offsetY
            if(self.ball.hasPoint(x,y)){
                dragging = true
            }
        })
    
        g.canvas.addEventListener('mousemove',function(event){
            if(dragging){
                self.ball.x = event.offsetX
                self.ball.y = event.offsetY
            }
        })
        g.canvas.addEventListener('mouseup',function(event){
            dragging = false
        })
    }
    draw(){
        super.draw()
        // for(var i in blocks){
        //     if(window.blocks[i].alive)
        //     this.game.drawRect(window.blocks[i],'blue')
        // }
        this.game.context.fillText('分数：' + this.score,5,390)
    }
    update(){
        super.update()
        // if(this.planeMe.fired){
        //     this.planeMe.fire()
        // }
        // this.ball.move()
        // if(this.paddle.intersectWith(this.ball)){
        //     this.ball.rebound()
        // }
        // for(var i in window.blocks){
        //     var block = window.blocks[i]
        //     if(block.intersectWith(this.ball)){
        //         block.kill()
        //         this.score += 10
        //         this.ball.rebound()
        //     }
        // }
    }
}
// var SceneMain = function(game){
//     var s = {
//         game:game
//     }
//     var g = game
//     var score = 0
//     var ball = Ball(g.context)
//     var paddle = Paddle(g.context)
//     window.blocks = window.blocks || loadLevel(g.context,2)

//     //remove actions
//     game.actions['k'] = function(){}
//     game.actions['s'] = function(){}

//     //mouse event
//     var dragging = false
//     game.canvas.addEventListener('mousedown',function(event){
//         var x = event.offsetX
//         var y = event.offsetY
//         if(ball.hasPoint(x,y)){
//             dragging = true
//         }
//     })

//     game.canvas.addEventListener('mousemove',function(event){
//         if(dragging){
//             ball.x = event.offsetX
//             ball.y = event.offsetY
//         }
//     })
//     game.canvas.addEventListener('mouseup',function(event){
//         dragging = false
//     })
//     //注意小写
//     g.registerAction('a', function(event) {
//         paddle.moveLeft()
//     })
//     g.registerAction('d', function(event) {
//         paddle.moveRight()
//     })
//     g.registerAction('f',function(event){
//         ball.fire()
//     })
//     s.draw = function(){
//         g.drawRect(paddle)
//         g.drawRect(ball,'red')
//         for(var i in blocks){
//             if(blocks[i].alive)
//                 g.drawRect(blocks[i],'blue')
//         }
//         g.context.fillText('分数：'+score,5,390)
//     }
//     s.update = function(){
//         ball.move()
//         if(paddle.intersectWith(ball)){
//             ball.rebound()
//         }
//         for(var i in blocks){
//             var block = blocks[i]
//             if(block.intersectWith(ball)){
//                 block.kill()
//                 score += 10
//                 ball.rebound()
//             }
//         }
//     }
//     return s
// }