resource.define(
	"MovementSystem",
	
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
					"velocity",
					"size"
				);
			},{
				tick: function(canvas,entity) {
					var position = entity.position;
					var velocity = entity.velocity;
					var size = entity.size;
					var hWidth = size.width >> 1;
					var hHeight = size.height >> 1;
					
					if (position.x - hWidth < 0.0) {
						position.x = hWidth;
						velocity.x = Math.abs(velocity.x);
					} else if (position.x + hWidth > canvas.width) {
						position.x = canvas.width - hWidth;
						velocity.x = -Math.abs(velocity.x);
					}
					
					if (position.y - hHeight < 0.0) {
						position.y = hHeight;
						velocity.y = Math.abs(velocity.y);
					} else if (position.y + hHeight > canvas.height) {
						position.y = canvas.height - hHeight;
						velocity.y = -Math.abs(velocity.y);
					}
					
					position.x += velocity.x;
					position.y += velocity.y;
				}
			}
		);
	}
);