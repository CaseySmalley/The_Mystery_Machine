resource.define(
	"Component",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		return resource.class(
			function(name,constructor) {
				this.name = name;
				this.allocator = new resource.Allocator(constructor);
			},{
				create: function() {
					return this.allocator.create();
				},
				
				destroy: function(component) {
					this.allocator.destroy(component);
				}
			}
		);
	}
);