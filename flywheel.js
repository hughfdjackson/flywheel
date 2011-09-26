!function (context) {
    var flywheel = function(callback){
        
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
        
        function loop(timestamp){
            var time_delta = timestamp
        
            callback(time_delta, this)
            req_anim_frame(loop)
        }()
        req_anim_frame(loop)
    }
    
    
    
    context['flywheel'] = flywheel
}(this)
