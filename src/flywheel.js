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

    , flywheel = function(callback, framerate_cap){
        
       
        // convert from framerate_cap to frame duration
        var max_frame_duration,
            _last_spin_timestamp = +new Date(),
            _continue_spinning_flywheel = false;
            
        ( framerate_cap !== undefined )? max_frame_duration = 1000/framerate_cap
        : max_frame_duration = 1000/30

        // object to be returned
        var obj = {

            _max_frame_duration: max_frame_duration,
            
            // function to be eterated
            start: function(){
                _continue_spinning_flywheel = true
                _spin_flywheel()
                return this
            },
            
            stop: function(){
                _continue_spinning_flywheel = false
                return this
            },
            
            step: function(){
                _continue_spinning_flywheel = false
                _spin_flywheel()
                return this                     
            },

            callback: callback
        }

         // main spin function
        var _spin_flywheel = function spin(timestamp){
                var time_delta = timestamp - _last_spin_timestamp,
                    capped_time_delta,
                    context = obj;
            
                ( time_delta < obj._max_frame_duration )? capped_time_delta = time_delta
                : capped_time_delta = obj._max_frame_duration
                
                obj.callback(capped_time_delta, obj)
                
                _last_spin_timestamp = timestamp
                
                if ( _continue_spinning_flywheel ) frame(function(timestamp){
                    _spin_flywheel(timestamp)
                })

            }

        return obj
    }

    context["flywheel"] = flywheel
}(this)
