resource.define(
	"EntityDirectory",
	
	[
		
	],
	
	function() {
		
		"use strict";
		
		return resource.class(
			function() {
				this.nextID = 0;
				this.active = new resource.Map();
				this.assemblages = new resource.Map();
				this.systemsToNotify = new resource.Map();
			},{
				registerAssemblage: function(assemblage) {
					var assemblages = this.assemblages;
					var systemsToNotify = this.systemsToNotify;
					
					assemblages.set(assemblage.id,assemblage);
					systemsToNotify.set(assemblage.id,[]);
					
					return assemblage.id;
				},
				
				registerSystem: function(system) {
					var assemblages = this.assemblages;
					var systemsToNotify = this.systemsToNotify;
					
					for (var id in assemblages.map) {
						var assemblage = assemblages.get(id);
						
						if (system.assemblageMask.match(assemblage.mask)) {
							systemsToNotify.get(assemblage.id).push(system);
						}
					}
				},
				
				create: function(assemblageID) {
					var active = this.active;
					var assemblage = this.assemblages.get(assemblageID);
					var systems = this.systemsToNotify.get(assemblageID);
					var entity = assemblage.create(this.nextID++);
					
					active.set(entity.id,entity);
					
					for (var i = 0; i < systems.length; ++i) {
						systems[i].active.set(entity.id,true);
					}
					
					return entity.id;
				},
				
				destroy: function(entityID) {
					var active = this.active;
					var assemblages = this.assemblages;
					var entity = active.get(entityID);
					
					if (entity) {
						active.remove(entityID);
						assemblages.get(entity.assemblageID).destroy(entity);
					}
				},
				
				clear: function() {
					var active = this.active;
					var assemblages = this.assemblages;
					
					for (var id in active.map) {
						var entity = active.get(id);
						assemblages.get(entity.assemblageID).destroy(entity);
					}
					
					active.clear();
				},
				
				get: function(entityID) {
					return this.active.get(entityID);
				}
			}
		);
	}
);