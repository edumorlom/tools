import moment from "moment";

/**
 * Converts an ISO date to English date.
 * For example, 2020-01-01 is converted to January 1st, 2020.
 * @param date
 */
export default function prettifyDate(date: string) {
    if (date.toLowerCase() === "latest") return "     "
    else return moment(date).format('MMMM Do');
}