# Flywheel

Flywheel is a micro-lib (maybe even micro-micro lib) for making animation- and game-loops, implementing HTML5's RequestAnimationFrame while maintaining backwards compatibility.

It's available standalone (just use src/flywheel.js), or via ender:

    ender build flywheel

## API

This API section is going to focus on the non-ender API.  If you're using ender, you can simply use `var flywheel = require("flywheel")`
### Basic Usage

#### setting up a function to loop:

    // Sets up flywheel to report the time difference between this frame and the last
    var fw = flywheel(function(time_elapsed_since_last_frame){
                        console.log(time_elapsed_since_last_frame)
                    })


#### start it spinning:

    fw.start()
    
    
#### stop it again:
    
    fw.stop()
    
#### step through a single frame:

    fw.step()
    
    
### Extra Options

#### setting a framerate-cap

In times of exceptional load, or when a user clicks away from the window and back again, the time difference between two frames can be large enough to effect any physics logic negatively.  Capping the framerate helps with this by substituting a fake value for any long delays.

    var fw = flywheel(function(no_less_than_30_frames_a_second){
    
    ), 40) // if the framerate drops below 40fps, cap it
    
#### changing the callback

    // tries to write "blip" 60 times a second, where possible
    var fw.set_callback(function(time_delta){
        console.log("blip")     
    })


### Feature Requests

If you have any suggestions, feel free to add a ticket, or tweet at @hughfdjackson.


## Example

See [the example](http://hughfdjackson.github.com/flywheel/example/) for a demo usage of flywheel.
    

## Test suite and compatability

The src-test directory holds a test-suite designed ensure that flywheel is working properly.  The following browsers have been used with this test suite, and passed:

*Opera 11
*Safari 5
*Firefox 4-6
*IE 6-9
*Chrome 13

You're very welcome to [test it yourself](http://hughfdjackson.github.com/flywheel/src-test/SpecRunner.html).  If you're feeling particularly generous, you could even drop me a line to tell me if there are any problems, or if there's another webbrowser I can add to the compatibility list!
