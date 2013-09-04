/*!
 * 
 * EveCanvas v0.5
 *
 * Requires:
 *    - jQuery (v1.5+)
 *    - oCanvas (v2.0.0+)
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

oCanvas.domReady(function () {
   var cvs = oCanvas.create({ canvas: "#canvas", background: "#222", fps: 60});
   
   var constellation = {"name" : "Wyvern", "id" : "20000666","jumps" : [{"from" : {"name" : "PNQY-Y"},"to" : {"constellation" : "Pegasus","name" : "9-VO0Q","x" : "-424230670378910000","x_max" : "-411575424319095000","x_min" : "-424230670378910000","y" : "38948812487795500","y_max" : "53408125917181300","y_min" : "38948812487795500","z" : "25540823391990600","z_max" : "-21913121528916900","z_min" : "-44348221085353500"}},{"from" : {"name" : "PNQY-Y"},"to" : {"name" : "RP2-OQ"}},{"from" : {"name" : "PNQY-Y"},"to" : {"name" : "R3W-XU"}},{"from" : {"name" : "RP2-OQ"},"to" : {"name" : "YVBE-E"}},{"from" : {"name" : "RP2-OQ"},"to" : {"name" : "CL-BWB"}},{"from" : {"name" : "RP2-OQ"},"to" : {"name" : "R3W-XU"}},{"from" : {"name" : "YVBE-E"},"to" : {"name" : "BYXF-Q"}},{"from" : {"name" : "YVBE-E"},"to" : {"name" : "AC2E-3"}},{"from" : {"name" : "BYXF-Q"},"to" : {"name" : "AC2E-3"}},{"from" : {"name" : "BYXF-Q"},"to" : {"name" : "C-C99Z"}},{"from" : {"name" : "BYXF-Q"},"to" : {"constellation" : "Taurus","name" : "P5-EFH","x" : "-401523701058917000","x_max" : "-388093427814196000","x_min" : "-401523701058917000","y" : "16823413806456900","y_max" : "23377721103131700","y_min" : "2274087838604390","z" : "1346719785787480","z_max" : "15264620301373300","z_min" : "-12042334872788100"}},{"from" : {"name" : "AC2E-3"},"to" : {"name" : "CL-BWB"}}],"systems" : {"AC2E-3" : {"border" : "0","constellation" : "0","corridor" : "0","fac_id" : "","fringe" : "0","hub" : "1","id" : "30004563","international" : "0","lum" : "0.02153","rad" : "758931064992","regional" : "0","sec" : "-0.307185276","sec_class" : "J1","sun_typ" : "6","x" : "-404942478185863000","x_max" : "-404941537386900000","x_min" : "-404943055249030000","y" : "15302292276746000","y_max" : "15302310180939500","y_min" : "15302263080271500","z" : "12707865778080400","z_max" : "-12707761245347800","z_min" : "-12708582274250600"},"BYXF-Q" : {"border" : "1","constellation" : "1","corridor" : "0","fac_id" : "","fringe" : "0","hub" : "1","id" : "30004562","international" : "0","lum" : "0.3785","rad" : "2781094988288","regional" : "0","sec" : "-0.241359182","sec_class" : "J","sun_typ" : "9","x" : "-409977344574497000","x_max" : "-409975391685661000","x_min" : "-409980953875638000","y" : "20080920827531800","y_max" : "20080933933596200","y_min" : "20080896603869700","z" : "10175902847707500","z_max" : "-10172893415246900","z_min" : "-10177582792267600"},"C-C99Z" : {"border" : "0","constellation" : "0","corridor" : "0","fac_id" : "","fringe" : "1","hub" : "0","id" : "30004564","international" : "0","lum" : "0.826","rad" : "3481677427515","regional" : "0","sec" : "-0.321232153","sec_class" : "J1","sun_typ" : "3801","x" : "-405638787304164000","x_max" : "-405638604003554000","x_min" : "-405642551063325000","y" : "6436117356129690","y_max" : "6436669647691960","y_min" : "6436090457436490","z" : "17264876717872100","z_max" : "-17263516622223700","z_min" : "-17270479977078700"},"CL-BWB" : {"border" : "0","constellation" : "0","corridor" : "1","fac_id" : "","fringe" : "0","hub" : "0","id" : "30004565","international" : "0","lum" : "0.01315","rad" : "2773768751392","regional" : "0","sec" : "-0.285093347","sec_class" : "J1","sun_typ" : "3800","x" : "-400533707343535000","x_max" : "-400530027888925000","x_min" : "-400535575426428000","y" : "19285385748858900","y_max" : "19285738290100700","y_min" : "19285206764647300","z" : "17715695820372000","z_max" : "-17714536099274500","z_min" : "-17718507733612900"},"PNQY-Y" : {"border" : "1","constellation" : "1","corridor" : "0","fac_id" : "","fringe" : "0","hub" : "1","id" : "30004559","international" : "0","lum" : "0.03911","rad" : "1485866874528","regional" : "0","sec" : "-0.132287833","sec_class" : "J","sun_typ" : "3802","x" : "-416624886653878000","x_max" : "-416624635353670000","x_min" : "-416626011254692000","y" : "35186522817909100","y_max" : "35186631347462000","y_min" : "35186498561339000","z" : "23265170532400100","z_max" : "-23262603651459900","z_min" : "-23265575385208900"},"R3W-XU" : {"border" : "0","constellation" : "0","corridor" : "1","fac_id" : "","fringe" : "0","hub" : "0","id" : "30004566","international" : "0","lum" : "0.0576","rad" : "1521046739424","regional" : "0","sec" : "-0.106247013","sec_class" : "J","sun_typ" : "6","x" : "-409161737122243000","x_max" : "-409159849581516000","x_min" : "-409162891674995000","y" : "24022293104585500","y_max" : "24022345575763300","y_min" : "24022207320182300","z" : "25834399478257000","z_max" : "-25834198041461400","z_min" : "-25836912895537500"},"RP2-OQ" : {"border" : "0","constellation" : "0","corridor" : "0","fac_id" : "","fringe" : "0","hub" : "1","id" : "30004560","international" : "0","lum" : "0.6659","rad" : "4199917985100","regional" : "0","sec" : "-0.151054141","sec_class" : "J","sun_typ" : "3799","x" : "-412971397267335000","x_max" : "-412970874872978000","x_min" : "-412973298271094000","y" : "23851785238310300","y_max" : "23851897760933600","y_min" : "23851754314810000","z" : "18929999242759000","z_max" : "-18927618035361500","z_min" : "-18936017871331700"},"YVBE-E" : {"border" : "0","constellation" : "0","corridor" : "0","fac_id" : "","fringe" : "0","hub" : "1","id" : "30004561","international" : "0","lum" : "1.033","rad" : "4329383597693","regional" : "0","sec" : "-0.284406556","sec_class" : "J1","sun_typ" : "6","x" : "-413400741787744000","x_max" : "-413396961829275000","x_min" : "-413405000799026000","y" : "26628770063805800","y_max" : "26629112775197000","y_min" : "26628465900969900","z" : "8313398449552840","z_max" : "-8306597134984450","z_min" : "-8315255902179840"}},"x_max" : "-400533707343535000","x_min" : "-416624886653878000","y_max" : "35186522817909100","y_min" : "6436117356129690","z_max" : "-8313398449552840","z_min" : "-25834399478257000"};

   var region = { "name" : "Fountain"};

   showConstellation(cvs, normaliseConstellation(constellation));
});

// Displays a constellation on the map, this also stores the canvas specific coordinates 
// For 2D display we're dropping the Y coordinate and normalising X and Z to be (X,Y) on the canvas
// Added a 10% padding to the normalisation so the scaling isn't up to the border
var showConstellation = function(canvas, constellation) {
	var adjust = canvas.width * 0.1;
	$.each(constellation.systems, function (name, details) {
		// Store these for jump point coords
		details.cvs_x = normaliseCoord(canvas.width, 0, details.x, constellation.x_max, constellation.x_min, adjust);
   		details.cvs_z = normaliseCoord(canvas.height, 0, details.z, constellation.z_max, constellation.z_min, adjust);
   		addSystem(canvas, details.cvs_x, details.cvs_z, name);
   	});

   	$.each(constellation.jumps, function (index, jump) {
   	  	var sys_from = constellation.systems[jump.from.name];
   	  	var sys_to = constellation.systems[jump.to.name];
   	  	if(sys_to){ // don't jump into the unknown
   	  		linkSystems(canvas, sys_from.cvs_x, sys_from.cvs_z, sys_to.cvs_x, sys_to.cvs_z, '#DE2C04');
   	  	}else{
   	  		// Jumping out of constellation (and maybe region)
   	  		var to_x = normaliseCoord(canvas.width, 0, jump.to.x, constellation.x_max, constellation.x_min, adjust);
   	  		var to_z = normaliseCoord(canvas.height, 0, jump.to.z, constellation.z_max, constellation.z_min, adjust);
   	  		linkSystems(canvas, sys_from.cvs_x, sys_from.cvs_z, to_x, to_z, 'blue');
   	  	}
   	});

};

// Adds a single system to the canvas with its label
// System event binds are located here
var addSystem = function(canvas, x, y, name){
	var system = canvas.display.ellipse({
		x: x, y: y,
		radius: 4,
		fill: "#02AB18",
		shadow: "0 0 5px #000"
	});
	var label = canvas.display.text({
		x: x + 20,
		y: y + 8,
		origin: { x: "center", y: "top" },
		font: "12px sans-serif",
		text: name,
		fill: "#fff"
	});
	label.system = system; // for event binding

	canvas.addChild(system);
	canvas.addChild(label);

	// Event binding examples
	label.zIndex = "front"; // don't need to redraw here
	label.bind("mouseenter", function (e){
		this.font = "bold 12px sans-serif";
		label.system.radius = 5;
		label.system.fill = "#DEE602"
		canvas.redraw();
	});
	label.bind("mouseleave", function (e){
		this.font = "12px sans-serif";
		label.system.radius = 4;
		label.system.fill = "#02AB18"
		canvas.redraw();
	});
	label.bind("click", function (e){
		alert("You clicked on " + this.text);
	});
};

// Links two systems together to generate a jump-line
var linkSystems = function(canvas, x1, y1, x2, y2, colour){
	var link = canvas.display.line({
		start: { x: x1, y: y1 },
		end: { x: x2, y: y2 },
		stroke: "2px " + colour,
		cap: "round",
		shadow: "0 0 5px #000"
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

// Normalises the constellation min/max values so we scale to the canvas (otherwise you get a wee little constellation in a big canvas)
var normaliseConstellation = function(constellation){
	// these transformations take place on the constellation object inside this function
	// But we may have use for this scale at some point (mebbe?!)
	scale = Math.max(constellation.x_min > 0 ? constellation.x_max - constellation.x_min : constellation.x_max + constellation.x_min, constellation.z_min > 0 ? constellation.z_max - constellation.z_min : constellation.z_max + constellation.z_min);
	return constellation;
};
