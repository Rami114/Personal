EveCanvas
========

Recreation of the Eve in-game constellation viewer. Based upon the coordinate data from the Eve DB Dump. 

Notes:

 * All dependencies included
 * Y coordinate is dropped, constellations are projecting onto the 2D canvas using X & Z

Bugs:

 * Some constellations display outside of the constellation bounds (known issue it seems). Requires correction against the universe bounds (todo)

This is no longer maintained in favour of a GeoJSON implementation.
