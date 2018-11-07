resource.define(
	"SquareSystem",
	
	[
		resource.MODULE,"resource/frameworks/System.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var System = this.System;
		
		return resource.class_extends(System,
			function() {
				this.assemblageMask.set(
					"position",
					"size"
				);
				
				this.messageMask.set(
					"PULSE"
				);
				
				this.current = false;
				this.colour = "darkred";
			},{
				onMessage: function(message) {
					switch(message.type) {
						case "PULSE":
							this.current = !this.current;
							this.colour = this.current ? "darkblue" : "darkred";
						break;
					}
				},
				
				preTick: function(canvas) {
					var ctx = canvas.ctx;
					
					ctx.lineWidth = 1;
					ctx.strokeStyle = "black";
					ctx.fillStyle = this.colour;
					ctx.beginPath();
				},
				
				tick: function(canvas,entity) {
					var ctx = canvas.ctx;
					var position = entity.position;
					var size = entity.size;
					
					ctx.rect(
						position.x - (size.width >> 1),
						position.y - (size.height >> 1),
						size.width,
						size.height
					);
				},
				
				postTick: function(canvas) {
					var ctx = canvas.ctx;
					
					ctx.fill();
					ctx.stroke();
				}
			}
		);
	}
);