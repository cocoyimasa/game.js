var log = console.log.bind(console)
var intersect = function(a,b){
    if(b.y + b.height >= a.y && b.y+b.height <= a.y + a.height){
        if(b.x >= a.x && b.x <= a.x + a.width){
            log('相撞')
            return true
        }
    }
    else if(b.y >= a.y + a.height)
    return false
}