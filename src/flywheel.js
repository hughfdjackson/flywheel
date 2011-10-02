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
                
        // 'private methods'
            _set_max_frame_duration_by_framerate_cap = function(framerate_cap){
                 _max_frame_duration = 1000/framerate_cap
            },
            _spin_flywheel = function spin(timestamp){
                var time_delta = timestamp - _last_spin_timestamp,
                    capped_time_delta
            
                _last_spin_timestamp = timestamp
                
                // cap the time_delta to be passed to the callback as appropriate
                ;(time_delta < _max_frame_duration)? capped_time_delta = time_delta
                : capped_time_delta = _max_frame_duration
                    
                // set up the next spin
                if ( _continue_spinning_flywheel ) frame(function(timestamp){
                    spin(timestamp)
                })
                    
                // call the callback
                $callback(capped_time_delta)
            }

        // convert the given framerate cap to a duration
        ;( $framerate_cap !== undefined )?_set_max_frame_duration_by_framerate_cap($framerate_cap)
        : _max_frame_duration = 1000/30


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
            
            step: function(){
                _continue_spinning_flywheel = false
                _spin_flywheel(+Date())
                return this                     
            },

            step_by: function(fake_time_delta){
                var real_max_frame_duration = _max_frame_duration
                
                _continue_spinning_flywheel = false
                _max_frame_duration = fake_time_delta
                _last_spin_timestamp = +new Date() - fake_time_delta
                
                _spin_flywheel(_last_spin_timestamp + fake_time_delta)
                _max_frame_duration = real_max_frame_duration
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