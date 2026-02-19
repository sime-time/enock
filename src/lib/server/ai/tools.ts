import { tool } from "ai";
import { google } from "googleapis";
import type { z } from "zod";
import { err, ok } from "$lib/result";
import {
  CreateEventSchema,
  DeleteEventSchema,
  GetEventListSchema,
  UpdateEventSchema,
} from "$lib/server/ai/schema";

export type GetEventListParams = z.infer<typeof GetEventListSchema>;
export type DeleteEventParams = z.infer<typeof DeleteEventSchema>;
export type UpdateEventParams = z.infer<typeof UpdateEventSchema>;
export type CreateEventParams = z.infer<typeof CreateEventSchema>;

export type CalendarEvent = {
  id?: string | null;
  htmlLink?: string | null;
  summary?: string | null;
  start?: { dateTime?: string | null; timeZone?: string | null };
  end?: { dateTime?: string | null; timeZone?: string | null };
};

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

  async function getEventList(params: GetEventListParams) {
    const response = await calendar.events.list({
      calendarId: params.calendarId ?? "primary",
      timeMin: params.timeMin,
      maxResults: params.maxResults,
      singleEvents: params.singleEvents,
      orderBy: params.orderBy,
    });

    const events = response.data.items || [];

    return events.map((event) => ({
      id: event.id,
      htmlLink: event.htmlLink,
      summary: event.summary,
      start: event.start,
      end: event.end,
    }));
  }

  async function deleteEvent(params: DeleteEventParams) {
    try {
      await calendar.events.delete({
        calendarId: params.calendarId ?? "primary",
        eventId: params.eventId,
      });
    } catch {
      return { success: false };
    }

    return { success: true };
  }

  async function updateEvent(
    params: UpdateEventParams,
  ): Promise<CalendarEvent> {
    const response = await calendar.events.update({
      calendarId: params.calendarId ?? "primary",
      eventId: params.eventId,
      requestBody: {
        summary: params.summary,
        start: {
          dateTime: params.startDateTime,
          timeZone: params.timeZone ?? "UTC",
        },
        end: {
          dateTime: params.endDateTime,
          timeZone: params.timeZone ?? "UTC",
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

  async function createEvent(
    params: CreateEventParams,
  ): Promise<CalendarEvent> {
    const response = await calendar.events.insert({
      calendarId: params.calendarId ?? "primary",
      requestBody: {
        summary: params.summary,
        start: {
          dateTime: params.startDateTime,
          timeZone: params.timeZone ?? "UTC",
        },
        end: {
          dateTime: params.endDateTime,
          timeZone: params.timeZone ?? "UTC",
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
    getEventList,
    updateEvent,
    createEvent,
    // Tools (usable by AI only)
    tools: {
      getEventList: tool({
        description: "Return a list of the user's next Google Calendar events.",
        inputSchema: GetEventListSchema,
        execute: getEventList,
      }),
      updateEvent: tool({
        description:
          "Update a Google Calendar event for the user. Use ISO 8601 format for date times (e.g. 2026-12-01T10:00:00).",
        inputSchema: UpdateEventSchema,
        execute: updateEvent,
      }),
      deleteEvent: tool({
        description: "Delete a Google Calendar event for the user.",
        inputSchema: DeleteEventSchema,
        execute: deleteEvent,
      }),
      createEvent: tool({
        description:
          "Create Google Calendar event for the user. Use ISO 8601 format for date times (e.g. 2026-12-01T10:00:00).",
        inputSchema: CreateEventSchema,
        execute: createEvent,
      }),
    },
  });
}

// getFreeBusy
// createCalendar
// getCalendarList
