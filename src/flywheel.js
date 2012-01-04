void function(root){
    
    // shim for cross-browser requestAnimationFrame, 
    // with setTimeout for a backup for older browser
    var request_animation_frame = function () {
        return  window.requestAnimationFrame       
            ||  window.webkitRequestAnimationFrame 
            ||  window.mozRequestAnimationFrame
            ||  window.oRequestAnimationFrame
            ||  window.msRequestAnimationFrame
            ||  function (callback) {
                setTimeout(function () {
                    callback(+new Date())
                }, 1000 / 60)
            } 
    }()
    

    //// controller : Object
    // 
    // gets returned from flywheel to let the
    // user manipulate the looping
    var controller = {
        
        // --- Attributes --- // 
        callback:        undefined,
        element:         undefined,

        _last_timestamp: undefined,
        _running:        false,
        

        // --- Methods --- //
        start: function(){
            this._running = true
            this._next_frame() 
            return this
        },

        stop: function(){
            this._running = false
            return this
        },
        
        toggle: function(){
            this._running ? this.stop()
            : /*otherwise*/ this.start()
            return this
        },

        step: function(){
            this._next_frame()
            return this
        },
    
        _next_frame: function(){
        
            request_animation_frame(function(){
                callback
            }, this.element)
        }
    }


    //// (callback : Function[, element : HTMLElement ]) -> controller : Object
    //
    //  Public API for flywheel.  Just a wrapper around
    //  an instance of the controller object, really.
    function flywheel(callback, element){
        
        var ret_controller = Object.create(controller)
        
        ret_controller.callback = callback
        ret_controller.element = element

        ret_controller.constructor()
        
        return ret_controller 
    }

    //// export using commonjs or into the global scope
    if ( typeof module !== "undefined" && module["exports"] )
        module["exports"] = flywheel
    else
        window["flywheel"] = flywheel

}(this)
