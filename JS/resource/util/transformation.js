resource.define(
	"transformation",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		var Transformation = resource.class(
			function(x,y,dx,dy) {
				this.x = x;
				this.y = y;
				this.dx = dx;
				this.dy = dy;
			},{
				
			}
		);
		
		return {
			create: function(x,y,dx,dy) {
				return new Transformation(x,y,dx,dy);
			},
			
			copy: function(out,a) {
				out.x = a.x;
				out.y = a.y;
				out.dx = a.dx;
				out.dy = a.dy;
			},
			
			mul: function(out,a,b) {
				var nx = b.dx * a.x - b.dy * a.y + b.x;
				var ny = b.dy * a.x + b.dx * a.y + b.y;
				var ndx = b.dx * a.dx - b.dy * a.dy;
				var ndy = b.dy * a.dx + b.dx * a.dy;
				
				out.x = nx;
				out.y = ny;
				out.dx = ndx;
				out.dy = ndy;
			},
			
			mul_scalar: function(out,a,b) {
				out.x = a.x * b;
				out.y = a.y * b;
				out.dx = a.dx * b;
				out.dy = a.dy * b;
			},
			
			lerp: function(out,a,b,t) {
				var dx = a.dx + (b.dx - a.dx) * t;
				var dy = a.dy + (b.dy - a.dy) * t;
				var invLength = 1.0 / Math.sqrt(out.x * out.x + out.y * out.y);
				
				out.x = a.x + (b.x - a.x) * t;
				out.y = a.y + (b.y - a.y) * t;
				out.dx = dx * invLength;
				out.dy = dy * invLength;
			}
		};
	}
);