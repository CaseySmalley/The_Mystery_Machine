resource.define(
	"BoxAssemblage",
	
	[
		resource.MODULE,"resource/frameworks/Assemblage.js",
		resource.MODULE,"resource/components/PositionComponent.js",
		resource.MODULE,"resource/components/VelocityComponent.js",
		resource.MODULE,"resource/components/SizeComponent.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var Assemblage = this.Assemblage;
		var PositionComponent = this.PositionComponent;
		var VelocityComponent = this.VelocityComponent;
		var SizeComponent = this.SizeComponent;
		
		return new Assemblage([
			PositionComponent,
			VelocityComponent,
			SizeComponent
		]);
	}
);