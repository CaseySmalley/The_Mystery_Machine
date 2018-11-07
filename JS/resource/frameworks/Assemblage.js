resource.define(
	"Assemblage",
	
	[
		resource.MODULE,"resource/frameworks/Entity.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var Entity = this.Entity;
		
		// Variables
		var nextID = 0;
		
		return resource.class(
			function(components) {
				this.components = components;
				this.id = nextID++;
				this.mask = new resource.Mask();
				
				for (var i = 0; i < this.components.length; ++i) {
					this.mask.add(this.components[i].name);
				}
			},{
				create: function(id) {
					var components = this.components;
					var entity = Entity.create();
					
					entity.id = id;
					entity.assemblageID = this.id;
					
					for (var i = 0; i < components.length; ++i) {
						entity.add(components[i]);
					}
					
					return entity;
				},
				
				destroy: function(entity) {
					var components = this.components;
					
					for (var i = 0; i < components.length; ++i) {
						entity.remove(components[i]);
					}
					
					Entity.destroy(entity);
				}
			}
		);
	}
);