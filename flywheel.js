!function (context) {
    var flywheel = function(callback){
        
//--------- BOILERPLATE ----------------//
        
        // paul irish shim 
        var req_anim_frame = (function(){
          return  window.requestAnimationFrame   || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     ||
              function(callback, element){
                window.setTimeout(callback, 60)
              }
        })()        
        
        
//------------- LOGIC ----------------------//

        !function loop(){
            callback()
            req_anim_frame(loop)
        }()

    }
    context['flywheel'] = flywheel
}(this)
