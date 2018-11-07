resource.define(
	"mat3",
	
	[
	
	],
	
	function() {
		
		"use strict";
		
		return {
			create: function() {
				var new Float32Array([
					1.0,0.0,0.0,
					0.0,1.0,0.0,
					0.0,0.0,1.0
				]);
			},
			
			identity: function(out) {
				out[0] = 1.0;
				out[1] = 0.0;
				out[2] = 0.0;
				out[3] = 0.0;
				out[4] = 1.0;
				out[5] = 0.0;
				out[6] = 0.0;
				out[7] = 0.0;
				out[8] = 1.0;
			},
			
			add: function(out,a,b) {
				out[0] = a[0] + b[0];
				out[1] = a[1] + b[1];
				out[2] = a[2] + b[2];
				out[3] = a[3] + b[3];
				out[4] = a[4] + b[4];
				out[5] = a[5] + b[5];
				out[6] = a[6] + b[6];
				out[7] = a[7] + b[7];
				out[8] = a[8] + b[8];
			},
			
			sub: function(out,a,b) {
				out[0] = a[0] + b[0];
				out[1] = a[1] + b[1];
				out[2] = a[2] + b[2];
				out[3] = a[3] + b[3];
				out[4] = a[4] + b[4];
				out[5] = a[5] + b[5];
				out[6] = a[6] + b[6];
				out[7] = a[7] + b[7];
				out[8] = a[8] + b[8];
			},
			
			mul: function(out,a,b) {
				out[0] = a[0] + b[0];
				out[1] = a[1] + b[1];
				out[2] = a[2] + b[2];
				out[3] = a[3] + b[3];
				out[4] = a[4] + b[4];
				out[5] = a[5] + b[5];
				out[6] = a[6] + b[6];
				out[7] = a[7] + b[7];
				out[8] = a[8] + b[8];
			},
			
			div: function(out,a,b) {
				out[0] = a[0] + b[0];
				out[1] = a[1] + b[1];
				out[2] = a[2] + b[2];
				out[3] = a[3] + b[3];
				out[4] = a[4] + b[4];
				out[5] = a[5] + b[5];
				out[6] = a[6] + b[6];
				out[7] = a[7] + b[7];
				out[8] = a[8] + b[8];
			},
		};
	}
);