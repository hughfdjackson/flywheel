!function (context) {
    
    // poly-fill copy-pasted from https://github.com/ded/morpheus/blob/master/src/morpheus.js
    var frame = function () {
        // native animation frames
        // http://webstuff.nfshost.com/anim-timing/Overview.html
        // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
        return context.requestAnimationFrame  ||
          context.webkitRequestAnimationFrame ||
          context.mozRequestAnimationFrame    ||
          context.oRequestAnimationFrame      ||
          context.msRequestAnimationFrame     ||
          function (callback) {
            context.setTimeout(function () {
              callback(+new Date())
            }, 10)
          }
      }()


    var flywheel = function(callback, framerate_cap){

        // per-flywheel call variables
        var continue_spinning_flywheel = true,
            last_spin_timestamp = +new Date()

        // parameters
        var max_frame_length                    
        if ( framerate_cap !== undefined ) max_frame_length = 1000/framerate_cap
            else max_frame_length = 1000/30
            
        // function to be eterated
        function spin_flywheel(timestamp){
            
            var time_delta = timestamp - last_spin_timestamp,
                capped_time_delta
        
            ( time_delta < max_frame_length )? capped_time_delta = time_delta
            : capped_time_delta = max_frame_length

            callback(capped_time_delta, user_controller)
            
            last_spin_timestamp = timestamp
            
            if ( continue_spinning_flywheel ) frame(spin_flywheel)
        }

        // utility object to let the user manipulate the eteration
        var user_controller = {
                start: function(){
                    continue_spinning_flywheel = true
                    spin_flywheel()
                    return this
                },
                stop: function(){
                    continue_spinning_flywheel = false
                    return this
                },
                step: function(){
                    if ( !continue_spinning_flywheel ) spin_flywheel()
                    return this                     
                }
        }

        return user_controller
    }

    context["flywheel"] = flywheel
}(this)
