void function(root){
    
    // shim for cross-browser requestAnimationFrame, 
    // with setTimeout for a backup for older browser
    var request_animation = function () {
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
    

    // controller 
    // the object responsible 
    var controller = {
        
        // --- Attributes --- // 
        callback:        undefined,
        
        _last_timestamp: undefined,
        _running:        false,

    
        // --- Methods --- //
        start: function(){
            this._running = true
            this.callback() 
        },

        stop: function(){
            this._running = false 
        },
        
        toggle: function(){
            this._running ? this.stop()
            : /*otherwise*/ this.start() 
        },

        step: function(){
            this.callback()
        },

        
    }


    //// (callback : Function) -> controller : Object
    //
    //  Public API for flywheel.  Just a wrapper around
    //  an instance of the controller object, really.
    function flywheel(callback){
        
        var ret_controller = Object.create(controller)
        
        ret_controller.callback = callback
        ret_controller.constructor()
        
        return ret_controller 
    }

    //// export using commonjs or into the global scope
    if ( typeof module !== "undefined" && module["exports"] )
        module["exports"] = flywheel
    else
        window["flywheel"] = flywheel

}(this)
