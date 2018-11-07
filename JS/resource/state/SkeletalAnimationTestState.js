resource.define(
	"SkeletalAnimationTestState",
	
	[
		resource.MODULE,"resource/frameworks/State.js",
		resource.MODULE,"resource/util/vector.js",
		resource.MODULE,"resource/util/transformation.js"
	],
	
	function() {
		
		"use strict";
		
		// Handles
		var State = this.State;
		var vector = this.vector;
		var transformation = this.transformation;
		
		var Bone = resource.class(
			function(name,x,y,angle,children) {
				this.name = name;
				this.origin = transformation.create(x,y,Math.cos(angle),Math.sin(angle));
				this.offset = transformation.create(0.0,0.0,1.0,0.0);
				this.world = transformation.create(0.0,0.0,1.0,0.0);
				this.children = children;
			},{
				set: function(dx,dy) {
					var children = this.children;
					
					for (var i = 0; i < children.length; ++i) {
						var child = children[i];
						
						child.offset.dx = dx;
						child.offset.dy = dy;
						child.set(dx,dy);
					}
				},
				
				register: function(map) {
					var children = this.children;
					
					map.set(this.name,this);
					
					for (var i = 0; i < children.length; ++i) {
						children[i].register(map);
					}
					
					return map;
				},
				
				calculateTransformation: function(parent) {
					var origin = this.origin;
					var offset = this.offset;
					var world = this.world;
					var children = this.children;
					
					transformation.mul(world,origin,offset);
					
					if (parent) {
						transformation.mul(world,world,parent.world);
					}
					
					for (var i = 0; i < children.length; ++i) {
						children[i].calculateTransformation(this);
					}
				},
				
				render: function(ctx) {
					var world = this.world;
					var children = this.children;
					
					ctx.lineTo(world.x,world.y);
					ctx.moveTo(world.x + 1,world.y);
					ctx.arc(world.x,world.y,1,0.0,2.0 * Math.PI,false);
					ctx.moveTo(world.x,world.y);
					
					for (var i = 0; i < children.length; ++i) {
						children[i].render(ctx);
					}
				}
			}
		);
		
		var Animation = resource.class(
			function() {
				
			},{
				
			}
		);
		
		var Skeleton = resource.class(
			function(x,y,root) {
				this.world = transformation.create(x,y,1.0,0.0);
				this.root = root;
				this.bones = this.root.register(new resource.Map());
			},{
				set: function(dx,dy) {
					this.root.set(dx,dy);
				},
				
				calculateTransformation: function() {
					this.root.calculateTransformation(this);
				},
				
				render: function(ctx) {
					var world = this.world;
					var root = this.root;
					
					ctx.lineWidth = 2;
					ctx.strokeStyle = "black";
					ctx.beginPath();
					ctx.moveTo(world.x,world.y);
					root.render(ctx);
					ctx.stroke();
				}
			}
		);
		
		return resource.class_extends(State,
			function() {
				this.x = 0.0;
				this.y = 0.0;
				this.skeleton = new Skeleton(
					90.0,
					160.0,
					new Bone(
						"root",
						0.0,
						0.0,
						0.0,
						[
							new Bone(
								"stem_1",
								0.0,
								-30.0,
								-1.0,
								[
									new Bone(
										"stem_2",
										0.0,
										-30.0,
										1.0,
										[
											new Bone(
												"stem_3",
												0.0,
												-30.0,
												1.0,
												[
													new Bone(
														"stem_4",
														0.0,
														-30.0,
														1.0,
														[
															new Bone(
																"stem_5",
																0.0,
																-30.0,
																0.0,
																[
																	
																]
															)
														]
													)
												]
											)
										]
									)
								]
							)
						]
					)
				);
				
				this.angle = 0.0;
			},{				
				onTick: function() {
					this.angle += 0.025;
					
					if (this.angle > 2.0 * Math.PI) {
						this.angle = 0.0;
					}
					
					var angle = 0.1 * Math.PI * Math.sin(this.angle);
					
					this.skeleton.set(Math.cos(angle),Math.sin(angle));
					this.skeleton.calculateTransformation();
				},
				
				onRender: function(canvas) {
					var ctx = canvas.ctx;
					
					ctx.fillStyle = "gray";
					ctx.fillRect(0,0,canvas.width,canvas.height);
					
					this.skeleton.render(ctx);
				}
			}
		);
	}
);