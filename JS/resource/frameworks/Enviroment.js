resource.define(
	"Enviroment",
	
	[
		resource.MODULE,"resource/frameworks/EntityDirectory.js",
		resource.MODULE,"resource/frameworks/MessageQueue.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var EntityDirectory = this.EntityDirectory;
		var MessageQueue = this.MessageQueue;
		
		return resource.class(
			function() {
				this.directory = new EntityDirectory();
				this.messageQueue = new MessageQueue();
				this.tickSystems = [];
				this.renderSystems = [];
			},{
				registerAssemblage: function(assemblage) {
					return this.directory.registerAssemblage(assemblage);
				},
				
				registerTickSystem: function(SystemConstructor) {
					var directory = this.directory;
					var messageQueue = this.messageQueue;
					var system = new SystemConstructor(directory,messageQueue);
					
					this.tickSystems.push(system);
					
					directory.registerSystem(system);
					messageQueue.registerSystem(system);
				},
				
				registerRenderSystem: function(SystemConstructor) {
					var directory = this.directory;
					var messageQueue = this.messageQueue;
					var system = new SystemConstructor(directory,messageQueue);
					
					this.renderSystems.push(system);
					directory.registerSystem(system);
					messageQueue.registerSystem(system);
				},
				
				createEntity: function(assemblageID) {
					return this.directory.create(assemblageID);
				},
				
				getEntity: function(entityID) {
					return this.directory.get(entityID);
				},
				
				tick: function() {
					var messageQueue = this.messageQueue;
					var tickSystems = this.tickSystems;
					
					messageQueue.tick();
					
					for (var i = 0; i < tickSystems.length; ++i) {
						tickSystems[i].run();
					}
				},
				
				render: function(canvas) {
					var renderSystems = this.renderSystems;
					
					for (var i = 0; i < renderSystems.length; ++i) {
						renderSystems[i].run(canvas);
					}
				}
			}
		);
	}
);