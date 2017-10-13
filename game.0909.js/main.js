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
    var speed = document.querySelector('#id-fps')
    speed.addEventListener('input',function(event){
        var input = event.target
        window.fps = Number(input.value)
    })
}
function main() {
    var images = {
        bg:'assets/bg_01.jpg',
        planeMe:'assets/plane1.png',
        planeEnemy:'assets/plane2.png',
        bullet:'assets/bullet.png',
    }
    var game = new Game(30,images,function(g){
        var s = new SceneMain(g)
        g.runWithScene(s)
    })
}
main()
    
