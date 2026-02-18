import { z } from "zod";

export const GetEventListSchema = z.object({
  calendarId: z
    .string()
    .default("primary")
    .describe(
      "Calendar ID Label. If you want to access the primary calendar of the currently logged in user, use the 'primary' keyword",
    ),
  timeMin: z
    .string()
    .describe(
      "Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00",
    ),
  maxResults: z.number().describe("Max number of events to fetch").default(20),
  singleEvents: z
    .boolean()
    .describe(
      "Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is True.",
    )
    .optional()
    .default(true),
  orderBy: z
    .string()
    .describe(`The order of the events returned in the result. Optional. The default is 'startTime'. Acceptable values are:
    'startTime': Order by the start date/time (ascending). This is only available when querying single events (i.e. the parameter singleEvents is True)
    'updated': Order by last modification time (ascending).`)
    .default("startTime"),
});

export const CreateEventSchema = z.object({
  calendarId: z.string().default("primary").describe("Calendar ID Label"),
  summary: z.string().describe("Event title"),
  startDateTime: z.string().describe("Start time in ISO 8601"),
  endDateTime: z.string().describe("End time in ISO 8601"),
  timeZone: z.string().default("UTC").describe("User's timezone"),
});
