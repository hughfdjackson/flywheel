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
        var max_frame_duration
        ( framerate_cap !== undefined )? max_frame_duration = 1000/framerate_cap
        : max_frame_duration = 1000/30

        // object to be returned
        var obj = {

            _last_spin_timestamp: +new Date(),
            _continue_spinning_flywheel: false,
            _max_frame_duration: max_frame_duration,
            
            // main spin function
            _spin_flywheel: function spin(timestamp){
                var time_delta = timestamp - this._last_spin_timestamp,
                    capped_time_delta,
                    context = this;
            
                ( time_delta < this._max_frame_duration )? capped_time_delta = time_delta
                : capped_time_delta = this._max_frame_duration
                
                this.callback(capped_time_delta, this)
                
                this._last_spin_timestamp = timestamp
                
                if ( this._continue_spinning_flywheel ) frame(function(){
                    spin.apply(context, arguments)
                })

            },
            

            
            // function to be eterated
            start: function(){
                this._continue_spinning_flywheel = true
                this._spin_flywheel()
                return this
            },
            
            stop: function(){
                this._continue_spinning_flywheel = false
                return this
            },
            
            step: function(){
                if ( !this._continue_spinning_flywheel ) 
                    this._spin_flywheel()
                return this                     
            },

            callback: callback
        }

        return obj
    }

    context["flywheel"] = flywheel
}(this)
