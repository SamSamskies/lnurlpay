/** Hard shutoff date for invoice generation (phase 2). */
export const RETIREMENT_DATE = new Date("2026-09-01T00:00:00Z");

export const RETIREMENT_DATE_LABEL = "September 1, 2026";

export const isRetired = () => Date.now() >= RETIREMENT_DATE.getTime();
