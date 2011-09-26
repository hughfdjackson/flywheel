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
        , last_frame_time = new Date().getTime()
        
        
        function loop(timestamp){
            var time_delta = timestamp - last_frame_time
            last_frame_time = timestamp
            
            // cap framerate 
            if ( time_delta > 33 ) time_delta = 33
            
            callback(time_delta, this)
            req_anim_frame(loop)

        }
        req_anim_frame(loop)
    }
    
    
    
    context['flywheel'] = flywheel
}(this)
