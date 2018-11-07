resource.define(
	"Entity",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		return new resource.Allocator(
			resource.class(
				function() {
					this.id = 0;
					this.assemblageID = 0;
				},{
					has: function(component) {
						return this[component.name] !== undefined;
					},
					
					add: function(component) {
						if (!this[component.name]) {
							this[component.name] = component.create();
						}
					},
					
					remove: function(component) {
						if (this[component.name]) {
							component.destroy(this[component.name]);
							delete this[component.name];
						}
					}
				}
			)
		);
	}
);