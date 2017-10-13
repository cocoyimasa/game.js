class SceneBase {
    constructor(game){
        this.game = game
        this.elements = []
    }
    addElement(element){
        element.scene = this
        this.elements.push(element)
    }
    draw(){
        for(var i=0;i<this.elements.length;i++){
            this.game.drawImage(this.elements[i])
        }
    }
    update(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].update()
        }
    }
}