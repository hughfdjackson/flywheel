# Flywheel

Flywheel is a lightweight tool to make working with HTML5's requestAnimationFrame simpler.

## API

#### Setting up a loop

Flywheel takes a callback to loop over.  `time_delta` represents the number of ms passed between this frame and the last one.  It also takes an optional element, which allows some browsers to make more optimisations to ensure smooth animation.  The loop is `stopped` by default.

```javascript
    
    var element = document.getElementsByTagName("canvas")[0]

    function animation_loop(time_delta){
        /* do animation work here */
    }

    var fw = flywheel(time_delta, element)
```


#### Starting, stopping and toggling a loop

```javascript
    
    // start and stop 
    fw.start()
    fw.stop()

    // toggle loop on and off
    fw.toggle()
    fw.toggle()
```


#### Changing the callback and element

To change a callback:

```javascript
    fw.callback = function(time_delta){
        /* do alternative animation work here */
    }
```

To change an element:

```javascript
    fw.element = document.getElementById("my_other_canvas")
```


#### Framerate capping:

When a page loses focus or the loop is paused, the gap between frames can be large enough to cause problems in games (especially where acceleration or collision detection is involved).  To combat this, flywheel limits the `time_delta` value passed to the callback ( to 33ms; equivilent to ~30fps ).

To change the cap:

```javascript
    fw.framerate_cap = 40
```


#### Step for debugging:

```javascript

    // step forwards a frame (assuming a time delta of 16ms; equivilent to ~60fps)
    fw.step()

    // step forwards with a custom time delta.
    fw.step(30)
```


## Testing

[Feel free to run the test suite](http://hughfdjackson.github.com/flywheel/src-test/SpecRunner.html)

## Licensing

This software is available under the MIT license.
