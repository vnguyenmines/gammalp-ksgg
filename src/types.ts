export type meal = "lunch" | "dinner";
export type dayoftheweek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

export type RecurringRequest = {
    day: dayoftheweek
    meal: meal
}[]

export interface IRecurringForm {
    monday_lunch: boolean,
    monday_dinner: boolean,
    tuesday_lunch: boolean,
    tuesday_dinner: boolean,
    wednesday_lunch: boolean,
    wednesday_dinner: boolean,
    thursday_lunch: boolean,
    thursday_dinner: boolean,
    friday_lunch: boolean,
    friday_dinner: boolean,
}

export interface OneTimeRequest {
    date: Date
    meal: meal
}

// Simple list of requests for the selected day
export type IListSimple = {
    user: { name: string }
    meal: meal,
}[];

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/**
 * Resolves day of the week as an index to respective string
 * @param val Index of the date of the week from Date.getDay();
 */
export function getDayOfWeek(val: number) {
    return weekday[val];
}

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/**
 * Resolves month as an index to respective string
 * @param val Index of the month from Date.getMonth();
 */
export function getMonth(val: number) {
    return month[val];
}