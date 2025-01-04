export type RecurringRequest = {
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
    meal: "lunch" | "dinner"
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