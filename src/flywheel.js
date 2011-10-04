!function (context, undefined) {
    
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
          function ($callback) {
            context.setTimeout(function () {
              $callback(+new Date())
            }, 10)
          }
      }()

    , flywheel = function($callback, $framerate_cap){
        
        // 'private attr'
        var _max_frame_duration,
            _last_spin_timestamp = +new Date(),
            _continue_spinning_flywheel = false,
            _step_by = 1000/60,
            
        // 'private methods'
            _set_max_frame_duration_by_framerate_cap = function(framerate_cap){
                 _max_frame_duration = 1000/framerate_cap
            },
            _spin_flywheel = function spin(timestamp){
                var time_delta,
                    capped_time_delta
            
            
                if ( timestamp !== undefined ) {
                    time_delta  = timestamp - _last_spin_timestamp
                    _last_spin_timestamp = timestamp
                    
                    // cap the framerate
                    if ( time_delta < _max_frame_duration ) capped_time_delta = time_delta
                    else  capped_time_delta = _max_frame_duration           
                
                } else {
                    _last_spin_timestamp = +new Date()
                    capped_time_delta = _step_by
                }
                    
                // set up the next spin
                if ( _continue_spinning_flywheel ) frame(function(timestamp){
                    spin(timestamp)
                })
                    
                // call the callback
                $callback(capped_time_delta)
            }

        // convert the given framerate cap to a duration
        if ( $framerate_cap !== undefined ) _set_max_frame_duration_by_framerate_cap($framerate_cap)
        else _max_frame_duration = 1000/30


        // return an API object, to let users manipulate the loop
        return {
            
            start: function(){
                _continue_spinning_flywheel = true
                _spin_flywheel()
                return this
            },
            
            stop: function(){
                _continue_spinning_flywheel = false
                return this
            },
            
            step: function(fake_time_delta){
                
                var cache_step_by = _step_by
                
                if ( fake_time_delta !== undefined ) _step_by = fake_time_delta
                _continue_spinning_flywheel = false
                _spin_flywheel()
                
                // re-instate intial _step_by value
                _step_by = cache_step_by
                
                return this                     
            },
            
            set_callback: function(callback){
                $callback = callback
                return this
            },

            set_framerate_cap: function(framerate_cap){
                _set_max_frame_duration_by_framerate_cap(framerate_cap)
                return this
            }
        
        }
    }

    context["flywheel"] = flywheel
}(this)