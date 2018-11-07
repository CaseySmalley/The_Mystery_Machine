resource.define(
	"TimingSystem",
	
	[
		resource.MODULE,"resource/frameworks/System.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var System = this.System;
		
		return resource.class_extends(System,
			function() {
				this.lastEvent = Date.now();
			},{
				DELAY: 200,
				
				run: function(canvas) {
					if (Date.now() - this.lastEvent > this.DELAY) {
						this.lastEvent = Date.now();
						this.messageQueue.post("PULSE");
					}
				}
			}
		);
	}
);