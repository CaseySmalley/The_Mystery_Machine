resource.define(
	"ECSTestState",
	
	[
		resource.MODULE,"resource/frameworks/State.js",
		resource.MODULE,"resource/frameworks/Enviroment.js",
		resource.MODULE,"resource/assemblages/BoxAssemblage.js",
		resource.MODULE,"resource/systems/MovementSystem.js",
		resource.MODULE,"resource/systems/SquareSystem.js",
		resource.MODULE,"resource/systems/TimingSystem.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var State = this.State;
		var Enviroment = this.Enviroment;
		var BoxAssemblage = this.BoxAssemblage;
		var MovementSystem = this.MovementSystem;
		var SquareSystem = this.SquareSystem;
		var TimingSystem = this.TimingSystem;
		
		return resource.class_extends(State,
			function() {
				this.enviroment = new Enviroment();
				this.enviroment.registerAssemblage(BoxAssemblage);
				this.enviroment.registerTickSystem(TimingSystem);
				this.enviroment.registerRenderSystem(MovementSystem);
				this.enviroment.registerRenderSystem(SquareSystem);
				
				var directory = this.enviroment.directory;
				
				for (var i = 0; i < 10; ++i) {
					var entityID = directory.create(BoxAssemblage.id);
					var entity = directory.get(entityID);
					
					entity.position.x = Math.random() * 180;
					entity.position.y = Math.random() * 160.0;
					entity.velocity.x = Math.random() * 2.0 - 1.0;
					entity.velocity.y = Math.random() * 2.0 - 1.0;
					entity.size.width = 5.0 + Math.random() * 10.0;
					entity.size.height = 5.0 + Math.random() * 10.0;
				}
			},{
				onTick: function() {
					this.enviroment.tick();
				},
				
				onRender: function(canvas) {
					var ctx = canvas.ctx;
					/*
					ctx.fillStyle = "gray";
					ctx.fillRect(0,0,canvas.width,canvas.height);
					*/
					
					this.enviroment.render(canvas);
				}
			}
		);
	}
);