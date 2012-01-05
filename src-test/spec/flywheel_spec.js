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
                return e > 10
            }, "flywheel to reach 10 eterations", 5000);

            runs(function () {
                expect(e).toBeGreaterThan(10)
            })

        })
        
        it("should cap at the default framerate", function(){
            
            var time_delta,
                fly = flywheel(function(timeDelta){
                    sleep(50)
                    time_delta = timeDelta
                }).start()
                
            waits(50)
            
            runs(function(){
                fly.stop()
                expect(time_delta).toEqual(33)
            })
        
        })
        
        it("should cap at any user-set framerate", function(){
            
            var time_delta,
                fly = flywheel(function(timeDelta){
                    sleep(50)
                    time_delta = timeDelta                    
                })
                fly.framerate_cap = 20
                fly.start()

                waits(50)
                
                runs(function(){
                   fly.stop()
                   expect(time_delta).toEqual(20)
                })            
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
        
        it("should pass 16ms back as the timedelta when using step()", function(){

 			var timeDelta,
 				fly = flywheel(function(time_delta){
 	                timeDelta = time_delta
 	                })


             fly.step()  // Mah step's so fly
             expect(timeDelta).toEqual(16)
             fly.step().step()
             expect(timeDelta).toEqual(16)

         })
         
         it("should let you step with a fake time delta bigger than the framerate cap", function(){
             var time_delta,
                 fly = flywheel(function(timeDelta){
                     time_delta = timeDelta
                 })


 			fly.step(10).step(100)

 			expect(time_delta).toEqual(100)

 		})
        
        it("should let you swap callback whenever", function(){
        	
            var e = 0, 
                ecopy = e,
                fly = flywheel(function(){
                    e += 1
                })
	            
            
            fly.callback = function(){
                e += 5
            }
            fly.step()
            
            expect(ecopy+5).toEqual(e)
        })
        
    });

});
