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
            window.blocks = loadLevel(debug.context,Number(k))
        }
    })
    var speed = document.querySelector('#id-speed')
    speed.addEventListener('input',function(event){
        var input = event.target
        window.fps = Number(input.value)
    })
}
function main() {
    var images = {}
    var game = Game(30,images,function(g){
        var s = SceneTitle(g)
        g.runWithScene(s)
    })
}
main()
    
