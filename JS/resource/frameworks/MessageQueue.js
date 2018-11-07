resource.define(
	"MessageQueue",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		var MessageAllocator = new resource.Allocator(
			resource.class(
				function() {
					this.type = "";
					this.source = -1;
					this.destination = -1;
					this.arg0 = 0.0;
					this.arg1 = 0.0;
					this.arg2 = 0.0;
					this.arg3 = 0.0;
				},{
					
				}
			)
		);
		
		return resource.class(
			function() {
				this.queue = new resource.Queue();
				this.subscriptions = new resource.Map();
			},{
				MESSAGES_PER_TICK: 50,
				
				registerSystem: function(system) {
					var subscriptions = this.subscriptions;
					var mask = system.messageMask;
					
					for (var type in mask.map) {
						var listeners = subscriptions.get(type);
						
						if (!listeners) {
							subscriptions.set(type,listeners = []);
						}
						
						listeners.push(system);
					}
				},
				
				post: function(type,source,destination,arg0,arg1,arg2,arg3) {
					var message = MessageAllocator.create();
					
					message.type = type || "";
					message.source = source || -1;
					message.destination = destination || -1;
					message.arg0 = arg0 || 0.0;
					message.arg1 = arg1 || 0.0;
					message.arg2 = arg2 || 0.0;
					message.arg3 = arg3 || 0.0;
					
					this.queue.push(message);
				},
				
				tick: function() {
					var MESSAGES_PER_TICK = this.MESSAGES_PER_TICK;
					var queue = this.queue;
					var subscriptions = this.subscriptions;
					var message = null;
					var count = 0;
					
					while(count++ < MESSAGES_PER_TICK && (message = queue.pop())) {
						var listeners = subscriptions.get(message.type);
						
						if (listeners) {
							for (var i = 0; i < listeners.length; ++i) {
								listeners[i].onMessage(message);
							}
						}
						
						message.type = "";
						message.source = -1;
						message.destination = -1;
						message.arg0 = 0.0;
						message.arg1 = 0.0;
						message.arg2 = 0.0;
						message.arg3 = 0.0;
						MessageAllocator.destroy(message);
					}
				}
			}
		);
	}
);