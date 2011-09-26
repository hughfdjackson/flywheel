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

        // loop logic
        ,prev_timestamp = new Date().getTime()
        ,run_loop = true
        ,controller = {
            stop: function(){
                run_loop = false            
            },
            start: function(){
                run_loop = true
                req_anim_frame(loop)
            }
        }
        ,loop(timestamp){
            var time_delta = timestamp - prev_timestamp
            prev_timestamp = timestamp
            
            // cap framerate 
            if(time_delta > 33) time_delta = 33
            
            callback(time_delta, controller)
            
            if(run_loop) req_anim_frame(loop)

        }

        // initialise 
        req_anim_frame(loop)
        
        // return the controller
        return controller
    }
    
    context['flywheel'] = flywheel
}(this)
