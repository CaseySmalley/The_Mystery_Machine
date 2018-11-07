resource.define(
	"PositionComponent",
	
	[
		resource.MODULE,"resource/frameworks/Component.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var Component = this.Component;
		
		return new Component(
			"position",
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