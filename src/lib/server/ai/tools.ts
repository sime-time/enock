import { tool } from "ai";
import { google } from "googleapis";
import { z } from "zod";

// Google Calendar API Tools
function getCalendarClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.calendar({ version: "v3", auth });
}

export function calendarToolFactory(accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error("Access token is not found");
  }
  const calendar = getCalendarClient(accessToken);

  const createEvent = tool({
    description:
      "Create Google Calendar event for the user. Use ISO 8601 format for dates (e.g. 2026-12-01T10:00:00). For all-day events, use date-only format (e.g. 2026-12-01).",
    inputSchema: z.object({
      calendarId: z
        .string()
        .default("primary")
        .describe("Calendar ID - use 'primary' for the user's main calendar"),
      summary: z.string().describe("Event title").optional(),
      description: z.string().describe("Event description").optional(),
      location: z
        .string()
        .describe("Event location or video call link")
        .optional(),
      startDateTime: z.string().describe("Start time in ISO 8601"),
      endDateTime: z.string().describe("End time in ISO 8601"),
      timeZone: z.string().default("UTC").describe("User's timezone"),
    }),
    execute: async ({
      calendarId,
      summary,
      description,
      location,
      startDateTime,
      endDateTime,
      timeZone,
    }) => {
      const event = {
        summary,
        description,
        location,
        start: {
          dateTime: startDateTime,
          timeZone,
        },
        end: {
          dateTime: endDateTime,
          timeZone,
        },
      };

      try {
        const response = await calendar.events.insert({
          calendarId,
          requestBody: event,
        });

        console.log("calendar response", response);

        return {
          success: true,
          id: response.data.id,
          htmlLink: response.data.htmlLink,
          summary: response.data.summary,
          start: response.data.start,
          end: response.data.end,
        };
      } catch (err) {
        console.log("Error creating calendar event", err);
        return {
          success: false,
          error: "Failed to create calendar event",
        };
      }
    },
  });

  return { createEvent };
}

// listEvents
// updateEvent
// deleteEvent
// getFreeBusy
// updateTimezone
// createCalendar
// getCalendarList
