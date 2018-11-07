resource.define(
	"VelocityComponent",
	
	[
		resource.MODULE,"resource/frameworks/Component.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var Component = this.Component;
		
		return new Component(
			"velocity",
			resource.class(
				function() {
					this.x = 0.0;
					this.y = 0.0;
				},{
					
				}
			)
		);
	}
);