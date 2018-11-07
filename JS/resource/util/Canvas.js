resource.define(
	"Canvas",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		return resource.class(
			function(parent,width,height,type) {
				if (!(parent instanceof HTMLElement)) {
					resource.error("A canvas can only be the child of a valid HTML element");
				}
				
				if (typeof width !== "number") {
					resource.error("A canvas must have a valid width");
				}
				
				if (typeof height !== "number") {
					resource.error("A canvas must have a valid height");
				}
				
				this.canvas = document.createElement("canvas");
				this.canvas.width = this.width = width;
				this.canvas.height = this.height = height;
				this.hWidth = this.width >> 1;
				this.hHeight = this.height >> 1;
				this.ctx = null;
				this.gl = null;
				
				if (!type || type === this.SOFT) {
					this.ctx = this.canvas.getContext("2d") || resource.error("Could not get 2D context");
				} else if (type === this.HARD) {
					this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl") || resource.error("Could not get WebGL context");
				}
				
				parent.appendChild(this.canvas);
			},{
				SOFT: 0,
				HARD: 1,
				
				resize: function(width,height) {
					this.canvas.width = this.width = width;
					this.canvas.height = this.height = height;
					this.hWidth = this.width >> 1;
					this.hHeight = this.height >> 1;
				},
				
				setEventListeners: function(
					onKeyDown,
					onKeyUp,
					onMouseDown,
					onMouseUp,
					onMouseMove
				) {
					var canvas = this.canvas;
					
					canvas.onkeydown = onKeyDown;
					canvas.onkeyup = onKeyUp;
					canvas.onmousedown = onMouseDown;
					canvas.onmouseup = onMouseUp;
					canvas.onmousemove = onMouseMove;
				}
			}
		);
	}
);