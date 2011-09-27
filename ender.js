/*!
  * =============================================================
  * Ender: open module JavaScript framework (https://ender.no.de)
  * Build: ender build .
  * =============================================================
  */

/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * http://ender.no.de
  * License MIT
  */
!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context.$

  function require (identifier) {
    var module = modules[identifier] || window[identifier]
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules[name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  // Implements Ender's $ global access object
  // =========================================

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  function boosh(s, r, els) {
    // string || node || nodelist || window
    if (ender._select && (typeof s == 'string' || s.nodeName || s.length && 'item' in s || s == window)) {
      els = ender._select(s, r)
      els.selector = s
    } else els = isFinite(s.length) ? s : [s]
    return aug(els, boosh)
  }

  function ender(s, r) {
    return boosh(s, r)
  }

  aug(ender, {
      _VERSION: '0.3.4'
    , fn: context.$ && context.$.fn || {} // for easy compat to jQuery plugins
    , ender: function (o, chain) {
        aug(chain ? boosh : ender, o)
      }
    , _select: function (s, r) {
        return (r || document).querySelectorAll(s)
      }
  })

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
      // return self for chaining
      return this
    },
    $: ender // handy reference to self
  })

  ender.noConflict = function () {
    context.$ = old
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender

}(this);

!function () {

  var module = { exports: {} }, exports = module.exports;

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
  
  
      var flywheel = function(callback, framerate_cap){
  
          // internal vars        
          var continue_spinning_flywheel = true,
              last_spin_timestamp = +new Date(),
              user_controller = {
                  start: function(){
                      continue_spinning_flywheel = true
                      spin_flywheel()
                      return this
                  },
                  stop: function(){
                      continue_spinning_flywheel = false
                      return this
                  }
              }
  
          // parameters
          var max_frame_length                    
          if ( framerate_cap !== undefined ) max_frame_length = 1000/framerate_cap
              else max_frame_length = 1000/30
              
          function spin_flywheel(timestamp){
              
              var time_delta = timestamp - last_spin_timestamp,
                  capped_time_delta
          
              ( time_delta < max_frame_length )? capped_time_delta = time_delta
              : capped_time_delta = max_frame_length
  
              callback(capped_time_delta, user_controller)
              
              last_spin_timestamp = timestamp
              
              if ( continue_spinning_flywheel ) frame(spin_flywheel)
          }
  
          return user_controller.start()
      }
  
      context["flywheel"] = flywheel
  }(this)
  

  provide("flywheel", module.exports);

  !function($){
      $.ender({
          flywheel: flywheel
      })
  }(ender)
  

}();