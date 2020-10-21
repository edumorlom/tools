import { KeyToTimeSeriesType, PlaceInfoType } from "./Types";
/**
 * Class that represents a given place in the World.
 * This place holds metadata and timeSeries data.
 */
export default class Place {
    geoId: string;
    name: string;
    containedIn: string;
    parentPlace: Place | null;
    placeType: string;
    keyToTimeSeries: KeyToTimeSeriesType;
    constructor(geoId: string, placeInfo: PlaceInfoType, keyToTimeSeries: KeyToTimeSeriesType);
    /**
     * Returns a boolean representing whether the place holds any subregions.
     */
    private hasSubregions;
    /**
     * Returns what placeType this place holds as a subregion.
     * For example: Country has State as a subregion.
     * If this place doesn't have any subregions, return "".
     * Example: if Place is a County, return "".
     */
    getSubregionType: () => string;
    /**
     * Sets the pointer to the object of the parent place.
     * A parent place is a Place in which this place belongs to.
     * Example: The parent place of San Francisco is California.
     * @param parentPlace
     */
    setParentPlace: (parentPlace: Place) => void;
}
