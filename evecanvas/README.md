EveCanvas
========

Recreation of the Eve in-game constellation viewer. Based upon the coordinate data from the Eve DB Dump. There is no license on this work.

Notes:

 * All dependencies included
 * Y coordinate is dropped, constellations are projecting onto the 2D canvas using X & Z
 * JSON data is custom derived from the Eve DB. Tools not included to regenerate this!

Bugs:

 * Some constellations display outside of the constellation bounds (known issue it seems). Requires correction against the universe bounds (todo)

This is no longer maintained in favour of a GeoJSON implementation.
