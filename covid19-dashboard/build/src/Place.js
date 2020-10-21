"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that represents a given place in the World.
 * This place holds metadata and timeSeries data.
 */
class Place {
    constructor(geoId, placeInfo, keyToTimeSeries) {
        /**
         * Returns a boolean representing whether the place holds any subregions.
         */
        this.hasSubregions = () => {
            return this.placeType === 'State' || this.geoId === 'country/USA';
        };
        /**
         * Returns what placeType this place holds as a subregion.
         * For example: Country has State as a subregion.
         * If this place doesn't have any subregions, return "".
         * Example: if Place is a County, return "".
         */
        this.getSubregionType = () => {
            const hasSubregions = this.hasSubregions();
            const subregions = {
                "World": "Country",
                "Country": "State",
                "State": "County"
            };
            // If the place has subregions, then return the type of subregion.
            // Example: "Country" has "State" subregion.
            // Example: "State" has "County" subregion.
            if (hasSubregions) {
                return subregions[this.placeType];
            }
            else {
                return "";
            }
        };
        /**
         * Sets the pointer to the object of the parent place.
         * A parent place is a Place in which this place belongs to.
         * Example: The parent place of San Francisco is California.
         * @param parentPlace
         */
        this.setParentPlace = (parentPlace) => {
            this.parentPlace = parentPlace;
        };
        this.geoId = geoId;
        this.name = placeInfo.name;
        this.containedIn = placeInfo.containedIn;
        this.parentPlace = null;
        this.placeType = placeInfo.placeType;
        this.keyToTimeSeries = keyToTimeSeries;
    }
}
exports.default = Place;
//# sourceMappingURL=Place.js.map