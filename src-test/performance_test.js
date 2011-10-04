var _step_by = 1000/60,
    _max_frame_duration = 1000/30,
    $callback = function(){},
    _last_frame_timestamp,
    _continue_spinning_flywheel = true,
    frame = function(timestamp){
        !function(){}(timestamp)
    }

_spin_flywheel1 = function (timestamp){
    var time_delta = timestamp - _last_spin_timestamp,
        capped_time_delta

	_last_spin_timestamp = timestamp
	
	// cap the time_delta to be passed to the callback as appropriate
    ;(time_delta < _max_frame_duration)? capped_time_delta = time_delta
    : capped_time_delta = _max_frame_duration
		
	// set up the next spin
    if ( _continue_spinning_flywheel ) frame(function(timestamp){
    	!function(){}(timestamp)
	})

    // call the callback
    $callback(capped_time_delta)
}

_spin_flywheel2 = function (timestamp){
    var time_delta = timestamp - _last_spin_timestamp,
        capped_time_delta

    if ( timestamp !== undefined ) {
        _last_spin_timestamp = timestamp
        
        // cap the framerate
        if ( time_delta < _max_frame_duration ) capped_time_delta = time_delta
        else  capped_time_delta = _max_frame_duration           
    
    } else {
        _last_spin_timestamp = undefined
        capped_time_delta = _step_by
    }
        
    // set up the next spin
    if ( _continue_spinning_flywheel ) frame(function(timestamp){
        !function(){}(timestamp)
    })
        
    // call the callback
    $callback(capped_time_delta)
}

_spin_flywheel3 = function (timestamp){
    var time_delta = timestamp - _last_spin_timestamp,
        capped_time_delta

    if ( timestamp !== undefined ) {
        _last_spin_timestamp = timestamp
        
        // cap the framerate
        if ( time_delta < _max_frame_duration ) capped_time_delta = time_delta
        else  capped_time_delta = _max_frame_duration           
    
    } else {
        _last_spin_timestamp = undefined
        capped_time_delta = _step_by
    }
        
    // set up the next spin
    if ( _continue_spinning_flywheel ) frame(function(timestamp){
        !function(){}(timestamp)
    })
        
    // call the callback
    $callback(capped_time_delta)
}


_spin_flywheel4 = function (timestamp){
    var time_delta = timestamp - _last_spin_timestamp,
        capped_time_delta

    if ( timestamp !== undefined ) {
        
        // cap the framerate
        if ( time_delta < _max_frame_duration ) capped_time_delta = time_delta
        else  capped_time_delta = _max_frame_duration           
    
    } else {
        capped_time_delta = _step_by
    }
        
    _last_spin_timestamp = timestamp
        
    // set up the next spin
    if ( _continue_spinning_flywheel ) frame(function(timestamp){
        !function(){}(timestamp)
    })
        
    // call the callback
    $callback(capped_time_delta)
}


_spin_flywheel5 = function (timestamp){
    var time_delta = timestamp - _last_spin_timestamp,
        capped_time_delta

        _last_spin_timestamp = timestamp

    // cap the framerate
    if ( time_delta !== undefined && time_delta < _max_frame_duration ) capped_time_delta = time_delta
    else  capped_time_delta = _max_frame_duration
    
        
    // set up the next spin
    if ( _continue_spinning_flywheel ) frame(function(timestamp){
        !function(){}(timestamp)
    })
        
    // call the callback
    $callback(capped_time_delta)
}


_spin_flywheel6 = function (timestamp){
    var time_delta = timestamp - _last_spin_timestamp,
        capped_time_delta

        _last_spin_timestamp = timestamp

    // cap the framerate
    ;( time_delta < _max_frame_duration )? capped_time_delta = time_delta
    : capped_time_delta = _max_frame_duration
    
        
    // set up the next spin
    if ( _continue_spinning_flywheel ) frame(function(timestamp){
        !function(){}(timestamp)
    })
        
    // call the callback
    $callback(capped_time_delta)
}

