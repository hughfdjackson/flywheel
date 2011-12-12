function sleep(ms){
    var initial = +new Date(),
        loop = true
           
    while(loop){
        if (+new Date() - ms > initial) loop = false
    }
    return true
}

describe("flywheel", function(){
    
    describe("eteration properties", function(){
        it("should eterate over a callback", function(){

            var e = 0;
            
            flywheel(function(){
                e += 1      
            }).start()

            waitsFor(function() {
              return e > 100
            }, "flywheel to reach 100 eterations", 5000);

            runs(function () {
                expect(e).toBeGreaterThan(100)
            })

        })
        
        it("should cap at the default framerate", function(){
            
            var time_delta,
                fly = flywheel(function(timeDelta){
                    sleep(100)
                    time_delta = timeDelta
                }).start()
                
            waits(100)
            
            runs(function(){
                fly.stop()
                expect(time_delta).toEqual(1000/30)
                
            })
        
        })
        
        
        it("should cap at any user-set framerate", function(){
            
            var time_delta,
                fly = flywheel(function(timeDelta){
                    sleep(100)
                    time_delta = timeDelta                    
                }, 20).start()
                
                 waits(100)

                 runs(function(){
                    fly.stop()
                    expect(time_delta).toEqual(1000/20)
                })            
        })

        it("must pass in a time_stamp which is equal to last_frame + td", function(){
            
            var last_frame, 
                test = false,
                fly = flywheel(function(time_delta, time_stamp){
                    if ( last_frame + time_delta == time_stamp ) test = true
                    last_frame = time_stamp
                }).step().step()
        
            expect(test).toEqual(true)
        })
        
    })
    
    describe("controls", function(){

        it("should stop and restart when told", function(){
			var e = 0,
				fly = flywheel(function(){
	                e += 1
	                })
	            
            fly.start()

            waitsFor(function(){
                return e > 10
            }, "e > 10", 1000)

            
            runs(function () {
                fly.stop()
                expect(e).toBeGreaterThan(10)
                fly.start()
            })

            waitsFor(function(){
                return e > 20
            }, "e > 20", 1000)

            runs(function () {

                fly.stop()
                expect(e).toBeGreaterThan(20)
            })
        })
        
        it("should be able to step through frames", function(){
        
			var e = 0,
				fly = flywheel(function(){
	                e += 1
	                })
	            
            
            fly.step()  // Mah step's so fly
            expect(e).toEqual(1)
            fly.step()
            expect(e).toEqual(2)
            
            // 2-step now
            fly.step().step()
            expect(e).toEqual(4)
        
        })
        
        it("should pass 1000/60 back as the timedelta when using step()", function(){

 			var timeDelta,
 				fly = flywheel(function(time_delta){
 	                timeDelta = time_delta
 	                })


             fly.step()  // Mah step's so fly
             expect(timeDelta).toEqual(1000/60)
             fly.step().step()
             expect(timeDelta).toEqual(1000/60)

         })
         
         it("should let you step with a fake time delta bigger than the framerate cap", function(){
             var time_delta,
                 fly = flywheel(function(timeDelta){
                     time_delta = timeDelta
                 })


 			fly.set_framerate_cap(20).step(10).step(100)

 			expect(time_delta).toEqual(100)

 		})
        
        it("should let you swap callback whenever", function(){
        	
			var e = 0,
				fly = flywheel(function(){
	                e += 1
	                })
	            
            ecopy = e
            
            fly.set_callback(function(){
                e += 5
            })
            
            fly.step()
            
            expect(ecopy+5).toEqual(e)
                        
        
        })
        
        it("should pass you the instance of the controller as third param", function(){
            
            var e = 0
            
            flywheel(function(time_delta, time_stamp, fly){
                
                e += 1
                fly.stop()
            }).start()
            
            waits(100)
            
            runs(function(){
                
                expect(e).toEqual(1)
                
            })
        })

		it("should let you redefine framerate cap whenever", function(){
            var time_delta,
                fly = flywheel(function(timeDelta){
                    sleep(100)
                    time_delta = timeDelta                    
                })
			
		    
			fly.set_framerate_cap(20).start()
			
			waits(1000)
			
			runs(function(){
			    expect(time_delta).toEqual(1000/20)			    
			})
			
		})
		
		

		
    });
});
