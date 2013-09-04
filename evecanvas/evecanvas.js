/*!
 * 
 * EveCanvas v0.5
 *
 * Requires:
 *    - jQuery (v1.5+)
 *    - oCanvas (v2.2.0+)
 *    - Mapdata set (included with distro)
 *
 * Copyright (C) 2013, Ben Pottier (Ramirez Dora)
 *
 * Licensed under the MIT license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
jQuery.noConflict();

(function($) { 	 
	
	 	var blankf = function () { return ''; };
	 	var config = {
            'datastore' 		: './mapdata/',
            'padding'			: 0.1,
            'system_colour'		: "#02AB18",
            'system_sel_colour' : "#DEE602",
            'system_radius' 	: 4,
            'system_sel_radius'	: 5,
            'jump_colour'  		: "#DE2C04",
            'jump_ooc_colour'	: "blue",
            'jump_stroke'		: 2,
            'label_colour'		: "#fff",
            'label_font'      	: "12px sans-serif",
            'label_sel_font'    : "bold 12px sans-serif",
            'shadow'			: "0 0 5px #000",
            'system_click'		: blankf,
            'background' 		: "#222",
            'fps'				: 60,
            'info_target'		: "#map-label"
        };
   		
   		// Global stuffs
	 	var gSystems;
	 	var target;
	 	var canvas;
	 	var currentRegion;
    	
	 	// Method encapsulation
	 	var methods = {
	 		 init : function (settings) {	
	 		 	if (settings) $.extend(config, settings);
	 		 	target = this 		 	
	 		   	$.when($.ajax({
		 		 	type : 'GET',
		 		 	url : config.datastore + 'index.js',
		 		 	data: {},
		 		 	success : function (data){
		 		 		 gSystems = data;
		 		 		 canvas = oCanvas.create({ canvas: $(target).selector, background: config.background, fps: config.fps});
			 		},
			 		fail: function (){
			 			$.error('EveCanvas could not load system data');
			 			return null;
			 		},
			 		async : false
		 		})).done(function () {
		 			return target;
		 		});
	 		 },
	 		 getSystems : function (systems) {
	 		 	return getSystems(systems);
	 		 },
	 		 getConstellations : function (cons, region_name) {
	 		 	return getConstellations(cons, region_name);
	 		 },
	 		 changeConstellation : function(url, cons_name, region_name) {
	 		 	return changeConstellation(url, cons_name, region_name);
	 		 }
	 	};
	 
		// Get array of system names
		var getSystems = function(systems) {
			if(!gSystems){
				return null;
			}else{
		 		if(systems) {
		 			$.each(gSystems, function(name, details){
						systems.push({ "name" : name, "id" : details.id});
					});
				}
			}
		}
		
		// get list of 
		var getConstellations = function(cons, region_name){
			if(!gSystems[region_name]){
				return null;
			}else{
				var c = gSystems[region_name].constellations;
				$.each(c, function(index, entry){
					cons.push({ "url" : entry.url, "name" : entry.name, "id" : entry.id});
				});
			}
		}
		
		// Change constellation by its data URL (prob want by ID and Name too)
		var changeConstellation = function(url, cons_name, region_name){
			$.ajax({
	 		 	type : 'GET',
	 		 	url : url, // need to clean this up
	 		 	data: {},
	 		 	success : function (constellation){
	 		 		 showConstellation(constellation);  
	 		 		 if (region_name && cons_name) {
	 		 		 	$(config.info_target).html(region_name + ' :: ' + cons_name);
	 		 		 	$(config.info_target).show(); // it's hidden by default
	 		 		 } 
		 		},
		 		fail: function (){
		 			$.error('EveCanvas could not load constellation data');
		 			return null;
		 		},
		 		async : true
	 		})
		}
				
		// Displays a constellation on the map, this also stores the canvas specific coordinates 
		// For 2D display we're dropping the Y coordinate and normalising X and Z to be (X,Y) on the canvas
		// Added padding to the normalisation so the scaling isn't up to the border
		var showConstellation = function(constellation) {
			// WHY does canvas.clear() not do its fucking job?!
			canvas.children = [];
			var adjust = canvas.width * config.padding;
			$.each(constellation.systems, function (name, details) {
				// Store these for jump point coords
				details.cvs_x = normaliseCoord(canvas.width, 0, details.x, constellation.x_max, constellation.x_min, adjust);
		   		details.cvs_z = normaliseCoord(canvas.height, 0, details.z, constellation.z_max, constellation.z_min, adjust);
		   		addSystem(details.cvs_x, details.cvs_z, name);
		   	});
		
		   	$.each(constellation.jumps, function (index, jump) {
		   	  	var sys_from = constellation.systems[jump.from.name];
		   	  	var sys_to = constellation.systems[jump.to.name];
		   	  	if(sys_to){ // don't jump into the unknown
		   	  		linkSystems(sys_from.cvs_x, sys_from.cvs_z, sys_to.cvs_x, sys_to.cvs_z, 0);
		   	  	}else{
		   	  		// Jumping out of constellation (and maybe region)
		   	  		var to_x = normaliseCoord(canvas.width, 0, jump.to.x, constellation.x_max, constellation.x_min, adjust);
		   	  		var to_z = normaliseCoord(canvas.height, 0, jump.to.z, constellation.z_max, constellation.z_min, adjust);
		   	  		linkSystems(sys_from.cvs_x, sys_from.cvs_z, to_x, to_z, 1);
		   	  	}
		   	});
		   	
		};
		
	// Adds a single system to the canvas with its label
	// System event binds are located here
	var addSystem = function(x, y, name){
		var system = canvas.display.ellipse({
			x: x, y: y,
			radius: config.system_radius,
			fill: config.system_colour,
			shadow: config.shadow
		});
		var label = canvas.display.text({
			x: x + 20,
			y: y + 8,
			origin: { x: "center", y: "top" },
			font: config.label_font,
			text: name,
			fill: config.label_colour
		});
		label.system = system; // for event binding
		system.label = label; // and the other way
		canvas.addChild(system);
		canvas.addChild(label);
	
		// Event binding examples
		label.zIndex = "front"; // don't need to redraw here
		label.bind("mouseenter", function (){
			this.font = config.label_sel_font;
			this.system.radius = config.system_sel_radius;
			this.system.fill = config.system_sel_colour;
			canvas.redraw();
		});
		label.bind("mouseleave", function (){
			this.font = config.label_font;
			this.system.radius = config.system_radius;
			this.system.fill = config.system_colour;
			canvas.redraw();
		}); 
		label.bind("click", function (e){
			config.system_click(this.text); 
		});
		system.bind("mouseenter", function (){
			this.label.font = config.label_sel_font;
			this.radius = config.system_sel_radius;
			this.fill = config.system_sel_colour;
			canvas.redraw();
		});
		system.bind("mouseleave", function (){
			this.label.font = config.label_font;
			this.radius = config.system_radius;
			this.fill = config.system_colour;
			canvas.redraw();
		});
		system.bind("click", function (){
			config.system_click(this.label.text); 
		});
	};
	
	// Links two systems together to generate a jump-line
	var linkSystems = function(x1, y1, x2, y2, ooc){
		var link = canvas.display.line({
			start: { x: x1, y: y1 },
			end: { x: x2, y: y2 },
			stroke: config.jump_stroke + " " + (ooc == 0 ? config.jump_colour : config.jump_ooc_colour),
			cap: "round",
			shadow: config.shadow
		});
		canvas.addChild(link);
		link.zIndex = "back"; // put the system links in the back
		canvas.redraw();
	};
	
	// Normalises the coordinates (new min/max are the canvas bounds, with potentially some padding of your choice)
	var normaliseCoord = function(new_max, new_min, c, max, min, padding){
		// padding
		var local_max = new_max - padding;
		var local_min = new_min + padding;
		// Some sign flipping shenanigans due to the way Eve data is built at times 
		if(!((c * -1) > max)){
			c *= -1;
		}
		return Math.round((c - min) / (max - min) * (local_max - local_min) + local_min);
	};
	
	$.fn.eveCanvas = function(method) {
	    if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) { 		
	      target = this;
	      return methods.init.apply(this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.evecanvas' );
	    }    
	 };
})(jQuery);