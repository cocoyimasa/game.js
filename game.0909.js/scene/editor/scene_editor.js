class SceneEditor extends SceneBase{
    constructor(game){
        super(game)
        window.blocks = []
        this.editing = false
        var self = this
        function edit(event){
            var x = event.offsetX
            var y = event.offsetY
            if( x>0 && 
                y>0 && 
                x<self.game.canvas.width && 
                y<self.game.canvas.height){
                    self.editing = true
            }
            if(self.editing){
                var rect = Block(self.game.context,[x,y])
                window.blocks.push(rect)
                self.editing = false
                //self.game.drawRect(rect,'blue')
            }
        }
        this.game.canvas.addEventListener('mouseup',edit)
        this.game.registerAction('s',function(){
            self.game.canvas.removeEventListener('mouseup',edit)
            var s = new SceneMain(self.game)
            self.game.replaceScene(s)
        })
    }
    
    draw(){
        for(var i in window.blocks){
            if(window.blocks[i].alive)
                this.game.drawRect(blocks[i],'blue')
        }
        this.game.context.fillText('地图编辑器,按 s 保存地图',5,390)
    }
    update(){
        
    }
}