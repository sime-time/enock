import { tool } from "ai";
import { google } from "googleapis";
import { z } from "zod";
import { err, ok } from "$lib/result";

// Schemas
export const CreateEventSchema = z.object({
  calendarId: z.string().default("primary").describe("Calendar ID Label"),
  summary: z.string().describe("Event title"),
  startDateTime: z.string().describe("Start time in ISO 8601"),
  endDateTime: z.string().describe("End time in ISO 8601"),
  timeZone: z.string().default("UTC").describe("User's timezone"),
});

// Types
export type CreateEventType = z.infer<typeof CreateEventSchema>;

export interface CalendarEvent {
  id?: string | null;
  htmlLink?: string | null;
  summary?: string | null;
  start?: { dateTime?: string | null; timeZone?: string | null };
  end?: { dateTime?: string | null; timeZone?: string | null };
}

// Calendar API Service
export function createCalendarService(accessToken: string) {
  // Google Calendar API Client
  const auth = new google.auth.OAuth2();
  try {
    auth.setCredentials({ access_token: accessToken });
  } catch {
    return err({ reason: "Failed to set Google auth credentials" });
  }
  const calendar = google.calendar({ version: "v3", auth });

  async function createEvent(input: CreateEventType): Promise<CalendarEvent> {
    const response = await calendar.events.insert({
      calendarId: input.calendarId ?? "primary",
      requestBody: {
        summary: input.summary,
        start: {
          dateTime: input.startDateTime,
          timeZone: input.timeZone ?? "UTC",
        },
        end: {
          dateTime: input.endDateTime,
          timeZone: input.timeZone ?? "UTC",
        },
      },
    });

    return {
      id: response.data.id,
      htmlLink: response.data.htmlLink,
      summary: response.data.summary,
      start: response.data.start,
      end: response.data.end,
    };
  }

  return ok({
    // Methods (usable anywhere)
    createEvent,
    // Tools (usable by AI only)
    tools: {
      createEvent: tool({
        description:
          "Create Google Calendar event for the user. Use ISO 8601 format for date times (e.g. 2026-12-01T10:00:00).",
        inputSchema: CreateEventSchema,
        execute: createEvent,
      }),
    },
  });
}

// listEvents
// updateEvent
// deleteEvent
// getFreeBusy
// createCalendar
// getCalendarList
