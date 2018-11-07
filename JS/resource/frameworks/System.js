resource.define(
	"System",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		return resource.class(
			function(directory,messageQueue) {
				this.directory = directory;
				this.messageQueue = messageQueue;
				this.assemblageMask = new resource.Mask();
				this.messageMask = new resource.Mask();
				this.active = new resource.Map();
				this.toRemove = new resource.Stack();
			},{
				MESSAGE_FILTER: [],
				
				onMessage: function(message) {
					
				},
				
				preTick: function(canvas) {
					
				},
				
				tick: function(entity,canvas) {
					
				},
				
				postTick: function(canvas) {
					
				},
				
				run: function(canvas) {
					var directory = this.directory;
					var active = this.active;
					var toRemove = this.toRemove;
					
					this.preTick(canvas);
					
					for (var id in active.map) {
						var entity = directory.get(id);
						
						if (entity) {
							this.tick(canvas,entity);
						} else {
							toRemove.push(id);
						}
					}
					
					while(toRemove.length) {
						active.remove(toRemove.pop());
					}
					
					this.postTick(canvas);
				}
			}
		);
	}
);