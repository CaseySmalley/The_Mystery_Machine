resource.define(
	"Engine",
	
	[
		resource.MODULE,"resource/util/Canvas.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var Canvas = this.Canvas;
		
		// Variables
		var keyEvent = {
			code: 0,
			char: ""
		};
		
		var mouseEvent = {
			x: 0.0,
			y: 0.0,
			button: 0.0
		};
		
		// Functions
		function onKeyDown(e) {
			var stack = this.stack;
			
			if (stack.length) {
				keyEvent.code = e.code;
				keyEvent.char = e.key;
				
				stack.top().onKeyDown(keyEvent);
			}
		}
		
		function onKeyUp(e) {
			var stack = this.stack;
			
			if (stack.length) {
				keyEvent.code = e.code;
				keyEvent.char = e.key;
				
				stack.top().onKeyUp(keyEvent);
			}
		}
		
		function onMouseDown(e) {
			var stack = this.stack;
			
			if (stack.length) {
				var bounds = this.canvas.canvas.getBoundingClientRect();
			
				mouseEvent.x = e.clientX - bounds.left;
				mouseEvent.y = e.clientY - bounds.top;
				mouseEvent.button = e.button;
			
				stack.top().onMouseDown(mouseEvent);
			}
		}
		
		function onMouseUp(e) {
			var stack = this.stack;
			
			if (stack.length) {
				var bounds = this.canvas.canvas.getBoundingClientRect();
			
				mouseEvent.x = e.clientX - bounds.left;
				mouseEvent.y = e.clientY - bounds.top;
				mouseEvent.button = e.button;
			
				stack.top().onMouseUp(mouseEvent);
			}
		}
		
		function onMouseMove(e) {
			var stack = this.stack;
			
			if (stack.length) {
				var bounds = this.canvas.canvas.getBoundingClientRect();
			
				mouseEvent.x = e.clientX - bounds.left;
				mouseEvent.y = e.clientY - bounds.top;
				mouseEvent.button = e.button;
			
				stack.top().onMouseMove(mouseEvent);
			}
		}
		
		function loop() {
			var stack = this.stack;
			var canvas = this.canvas;
			
			stack.top().onTick();
			
			for (var i = 0; i < stack.length; ++i) {
				stack.at(i).onRender(canvas);
			}
			
			if (this.isRunning) {
				requestAnimationFrame(this.loop);
			}
		}
	
		// Export
		return resource.class(
			function(width,height) {
				this.canvas = new Canvas(document.body,width,height,Canvas.SOFT);
				this.states = new resource.Map();
				this.stack = new resource.Stack();
				this.isRunning = false;
				this.loop = loop.bind(this);
				
				this.canvas.setEventListeners(
					this.onKeyDown = onKeyDown.bind(this),
					this.onKeyUp = onKeyUp.bind(this),
					this.onMouseDown = onMouseDown.bind(this),
					this.onMouseUp = onMouseUp.bind(this),
					this.onMouseMove = onMouseMove.bind(this)
				);
			},{
				start: function() {
					if (!this.isRunning) {
						this.isRunning = true;
						requestAnimationFrame(this.loop);
					}
				},
				
				stop: function() {
					var stack = this.stack;
					
					while(stack.length) {
						stack.pop().onExit(); 
					}
					
					this.isRunning = false;
				},
				
				add: function(id,constructor) {
					this.states.set(id,new constructor(this));
				},
				
				set: function(id) {
					var stack = this.stack;
					var state = this.states.get(id);
					
					if (state) {
						while(stack.length) {
							stack.pop().onExit();
						}
						
						stack.push(state);
						state.onEnter();
					}
				},
				
				push: function(id) {
					var stack = this.stack;
					var state = this.states.get(id);
					
					if (state) {
						if (stack.length) {
							stack.top().onPause();
						}
						
						state.onEnter();
						stack.push(state);
					}
				},
				
				pop: function() {
					var stack = this.stack;
					
					if (stack.length) {
						stack.pop().onExit();
					}
					
					if (stack.length) {
						stack.bottom().onResume();
					} else {
						this.stop();
					}
				}
			}
		);
	}
);