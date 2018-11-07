resource.define(
	"vector",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		var Vector = resource.class(
			function(x,y) {
				this.x = x || 0.0;
				this.y = y || 0.0;
			},{
				set: function(x,y) {
					this.x = x || 0.0;
					this.y = y || 0.0;
				}
			}
		);
		
		return {
			create: function(x,y) {
				return new Vector(x,y);
			},
			
			add: function(out,a,b) {
				out.x = a.x + a.x;
				out.y = a.y + a.y;
			},
			
			sub: function(out,a,b) {
				out.x = a.x - a.x;
				out.y = a.y - a.y;
			},
			
			mul: function(out,a,b) {
				out.x = a.x * a.x;
				out.y = a.y * a.y;
			},
			
			mul_scalar: function(out,a,b) {
				out.x = a.x * b;
				out.y = a.y * b;
			},
			
			mul_transformation: function(out,a,b) {
				out.x = a.x * b.dx + a.y * (-b.dy) + b.x;
				out.y = a.x * b.dy + a.y * b.dx + b.y;
			},
			
			div: function(out,a,b) {
				out.x = a.x / a.x;
				out.y = a.y / a.y;
			},
			
			div_scalar: function(out,a,b) {
				b = 1.0 / b;
				
				out.x = a.x * b;
				out.y = a.y * b;
			},
			
			lerp: function(out,a,b,t) {
				out.x = a.x + (b.x - a.x) * t;
				out.y = a.y + (b.y - a.y) * t;
			},
			
			nlerp: function() {
				var x = a.x + (b.x - a.x) * t;
				var y = a.y + (b.y - a.y) * t;
				var invLength = 1.0 / Math.sqrt(x * x + y * y);
				
				out.x = x * invLength;
				out.y = y * invLength;
			},
			
			dot: function(a,b) {
				return a.x * b.x + a.y * b.y;
			},
			
			length: function(a) {
				return Math.sqrt(a.x * a.x + a.y * a.y);
			},
			
			normalize: function(out,a) {
				var invLength = 1.0 / Math.sqrt(x * x + y * y);
				
				out.x = a.x * invLength;
				out.y = a.y * invLength;
			}
		};
	}
);