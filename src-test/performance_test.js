// This is the test destined for www.jfperf.com/flywheel-optimisation-tests/2

// ---------------------------- TEST CASE A ----------------------------------//
//
//  In this case, everything is stored in 'obj', including _spin_flywheel.
//  This means that everything in _spin_flywheel is a reference to a method,
//  except for, in this case, the recursive callback, which uses the named
//  function expression's name 'spin'*.
//
//  All of the methods of obj starting with _ are 'private' (in that they are
//  not part of the API, they are only there for the conveinence of the API 
//  methods).  The later tests experiment with achieving privacy by closure
//  instead, and seek to test the performance implications of this technique.
//
//
//  * This decision may well be a mistake - in hindsight I should have called
//  this._spin_flywheel, and avoided the need to use 'apply'
//
//----------------------------------------------------------------------------//

!function (context) {
  
    var frame = function (cb) {
      cb(30)
    }

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
                  !function(){}.apply(context, arguments)
              })

          },
          
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
              this._continue_spinning_flywheel = false
              this._spin_flywheel()
              return this                     
          },

          callback: callback
      }

      return obj
    }

    context["flywheelA"] = flywheel
}(this)


// ---------------------------- TEST CASE B ----------------------------------//
//
//  In line with test case A, test case B involves moving _spin_flywheel into
//  the constructor function.  Everything else is left where it is.  
//  _spin_flywheel uses closure itself to get a reference to the object, and 
//  thus avoid an unnecessary call to 'apply'.*
//
//
//  * as discussed in the comments with test case A, this may have been avoided 
//    in test case A as well.
// 
//----------------------------------------------------------------------------//

!function (context) {

    var frame = function (cb) {
      cb(30)
    }

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
          
          start: function(){
              this._continue_spinning_flywheel = true
              _spin_flywheel()
              return this
          },
          
          stop: function(){
              this._continue_spinning_flywheel = false
              return this
          },
          
          step: function(){
              this._continue_spinning_flywheel = false
              _spin_flywheel()
              return this                     
          },

          callback: callback
      }

       // main spin function
      var _spin_flywheel = function spin(timestamp){
              var time_delta = timestamp - obj._last_spin_timestamp,
                  capped_time_delta,
                  context = obj;
          
              ( time_delta < obj._max_frame_duration )? capped_time_delta = time_delta
              : capped_time_delta = obj._max_frame_duration
              
              obj.callback(capped_time_delta, obj)
              
              obj._last_spin_timestamp = timestamp
              
              if ( obj._continue_spinning_flywheel ) frame(function(){
                  !function(){}(arguments)
              })
          }

      return obj
    }

    context["flywheelB"] = flywheel
}(this)


// ---------------------------- TEST CASE C ----------------------------------//
//
//  Following with the theme of moving to things to closure, test case C moves 
//  *everything* needed by _spin_flywheel to closure, except for the callback 
//  method, which still belongs to object so it can be re-assigned.
//
//----------------------------------------------------------------------------//
!function (context) {
  
  var frame = function (cb) {
          cb(30)
    }

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
                  !function(){}(timestamp)
              })

          }

      return obj
  }

  context["flywheelC"] = flywheel
}(this)


// ---------------------------- TEST D ---------------------------------------//
//
//  Finally moves the callback to closure, and makes a necessary API change so 
//  as not to effect the behaviour, except that now, instead of:
//
//  fw.callback = function(){ /* CB code goes here */ }
//
//  we use:
//
//  fw.set_callback(function(){ /* CB code goes here */ })
//
//  where fw is a flywheel object created using flywheel(function(){})
//
//----------------------------------------------------------------------------//
!function (context) {
    
  	var frame = function (cb) {
          cb(30)
    }

    , flywheel = function($callback, $framerate_cap){
        
       
        // convert from $framerate_cap to frame duration
        var _max_frame_duration,
            _last_spin_timestamp = +new Date(),
            _continue_spinning_flywheel = false;
            
        ( $framerate_cap !== undefined )? _max_frame_duration = 1000/$framerate_cap
        : _max_frame_duration = 1000/30

		 // main spin function
        var _spin_flywheel = function spin(timestamp){
                var time_delta = timestamp - _last_spin_timestamp,
                    capped_time_delta;
            
                ( time_delta < _max_frame_duration )? capped_time_delta = time_delta
                : capped_time_delta = _max_frame_duration

                $callback(capped_time_delta)
                
                _last_spin_timestamp = timestamp
                
                if ( _continue_spinning_flywheel ) frame(function(timestamp){
                  	!function(){}(timestamp)
                })
            }
        

        // object to be returned
        var obj = {
            
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

            set_callback: function(callback){
                $callback = callback
            }
        }


        return obj
    }

    context["flywheelD"] = flywheel
}(this)



// ---------- setting up our test objects -------------------------------------//

fwA = flywheelA(function(){})
fwB = flywheelB(function(){})
fwC = flywheelC(function(){})
fwD = flywheelD(function(){})
