var Pic = function(path, context) {
    var obj = {
        img: new Image(),
        width: 60,
        height: 42,
        x: 50,
        y: 50,
    }
    obj.init = function() {
        obj.img.src = path;
        obj.img.onload = function() {
            context.drawImage(obj.img, obj.x, obj.y)
        }
    }
    obj.update = function() {
        context.drawImage(this.img, this.x, this.y);
    }
    obj.init()
    return obj;
}