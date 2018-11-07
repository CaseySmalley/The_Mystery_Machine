//void function() {
	
	"use strict";
	
	resource.import([
		resource.MODULE,"resource/frameworks/Engine.js",
		resource.MODULE,"resource/state/ECSTestState.js",
		resource.MODULE,"resource/state/SkeletalAnimationTestState.js"
	]);
	
	// Handles
	var Engine = null;
	var ECSTestState = null;
	var SkeletalAnimationTestState = null;
	
	// Variables
	var engine = null;
	
	// Entry Point
	resource.onload = function() {
		Engine = resource.getModule("Engine");
		ECSTestState = resource.getModule("ECSTestState");
		SkeletalAnimationTestState = resource.getModule("SkeletalAnimationTestState");
		
		engine = new Engine(180,160);
		engine.add("ECSTestState",ECSTestState);
		engine.add("SkeletalAnimationTestState",SkeletalAnimationTestState);
		engine.set("SkeletalAnimationTestState");
		engine.start();
	}
	
//}();