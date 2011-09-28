# Flywheel

Flywheel is a micro-lib (maybe even micro-micro lib) for making animation- and game-loops, implementing HTML5's RequestAnimationFrame while maintaining backwards compatibility.

It's available standalone (just use src/flywheel.js), or via ender:

    ender build flywheel

## API

This API section is going to focus on the non-ender API.  Note that the only difference is that, with ender, flywheel is written $.flywheel.

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

    var fw = flywheel(function(no_less_than_30_frames_a_second){
    
    ), 30)  // 
    
    

## Example Implementation

See [the example](http://hughfdjackson.github.com/flywheel/example/) for a demo usage of flywheel.
    

## Test suite and compatability


You're very welcome to [test it yourself](http://hughfdjackson.github.com/flywheel/src-test/SpecRunner.html).  If you're feeling particularly generous, you could even drop me a line to tell me if there are any problems, or if there's another webbrowser I can add to the compatibility list!
