# Calendar Page Implementation Plan

A Google Calendar wrapper with week/day views, drag-and-drop event rescheduling, and resize functionality.

## Tech Stack

- **Framework:** SvelteKit with Svelte 5 runes
- **Drag & Drop:** `@dnd-kit/svelte` (official adapter, v0.3.0)
- **Date Handling:** `dayjs` (already installed)
- **Styling:** Tailwind CSS + shadcn-svelte components
- **API:** Google Calendar API via `googleapis` (already configured)

---

## Phase 1: Foundation (Data Layer)

### 1.1 Add Google Calendar `listEvents` tool
- [ ] Extend `src/lib/server/ai/tools.ts` with `listEvents` function
- [ ] Parameters: `calendarId`, `timeMin`, `timeMax`, `maxResults`
- [ ] Returns: Array of events with id, summary, start, end, colorId, attendees

### 1.2 Add Google Calendar `updateEvent` tool
- [ ] Add `updateEvent` function for rescheduling
- [ ] Parameters: `calendarId`, `eventId`, `start`, `end`
- [ ] Used when drag-and-drop completes

### 1.3 Create calendar API route
- [ ] `src/routes/api/calendar/events/+server.ts`
- [ ] `GET` - Fetch events for date range (week/day view)
- [ ] `PATCH` - Update event time (drag-and-drop reschedule)

### 1.4 Define TypeScript types
- [ ] `src/lib/types/calendar.ts`
- [ ] `CalendarEvent` interface matching Google Calendar API
- [ ] `CalendarView` type (`'week' | 'day'`)
- [ ] `TimeSlot`, `DayColumn` types for grid rendering

---

## Phase 2: Core Calendar Components

### 2.1 Calendar state management
- [ ] `src/lib/stores/calendar.svelte.ts`
- [ ] `currentDate` - Selected date (rune)
- [ ] `view` - Current view mode ('week' | 'day')
- [ ] `events` - Fetched events array
- [ ] `visibleRange` - Computed start/end dates for current view
- [ ] `isLoading`, `error` states

### 2.2 Week view grid component
- [ ] `src/lib/components/calendar/week-view.svelte`
- [ ] 7 day columns (Mon-Sun or Sun-Sat)
- [ ] Time rows (configurable: 6 AM - 10 PM default)
- [ ] Grid lines for visual structure
- [ ] Current time indicator (red line)

### 2.3 Day view component
- [ ] `src/lib/components/calendar/day-view.svelte`
- [ ] Single column layout
- [ ] More detailed time slots (15-min increments)
- [ ] Same event rendering as week view

### 2.4 Event block component
- [ ] `src/lib/components/calendar/event-block.svelte`
- [ ] Props: event data, position (top, height based on time)
- [ ] Color-coded by calendar/category
- [ ] Shows: title, time range, attendee avatars
- [ ] Handles overlapping events (side-by-side layout)

### 2.5 Time grid component
- [ ] `src/lib/components/calendar/time-grid.svelte`
- [ ] Left column showing time labels (6 AM, 7 AM, etc.)
- [ ] Timezone indicator at top (e.g., "GMT +1")

### 2.6 Calendar header component
- [ ] `src/lib/components/calendar/calendar-header.svelte`
- [ ] Month/Year + Week number display ("March 2025 / W4")
- [ ] Team member avatars (if applicable)
- [ ] Navigation arrows (prev/next week)
- [ ] Today button
- [ ] View switcher (Week/Day)

---

## Phase 3: Mini Calendar & Sidebar

### 3.1 Mini month picker
- [ ] `src/lib/components/calendar/mini-calendar.svelte`
- [ ] Small month grid for quick date navigation
- [ ] Highlights current day
- [ ] Highlights days with events (dots)
- [ ] Click to jump to that week/day

### 3.2 Calendar sidebar
- [ ] `src/lib/components/calendar/calendar-sidebar.svelte`
- [ ] Mini calendar at top
- [ ] "Calendars" section with toggleable list
- [ ] Each calendar shows: checkbox, name, color dot
- [ ] Integrates with existing sidebar system

---

## Phase 4: Drag & Drop

### 4.1 Install & configure `@dnd-kit/svelte`
- [ ] `bun add @dnd-kit/svelte @dnd-kit/dom`
- [ ] Set up DndContext provider in calendar layout
- [ ] Configure sensors (pointer, touch)

### 4.2 Make events draggable
- [ ] Wrap event blocks with Draggable
- [ ] Define drag constraints (within calendar grid)
- [ ] Visual feedback during drag (opacity, shadow)
- [ ] Snap to time slot grid

### 4.3 Make time slots droppable
- [ ] Each time slot cell is a drop target
- [ ] Highlight valid drop zones on drag
- [ ] Calculate new start/end time from drop position

### 4.4 Add resize handles
- [ ] Top edge handle - adjust start time
- [ ] Bottom edge handle - adjust end time
- [ ] Minimum event duration (15 min)
- [ ] Visual resize preview

### 4.5 Optimistic updates
- [ ] Update local state immediately on drop/resize
- [ ] Show loading indicator on event
- [ ] Sync to Google Calendar API
- [ ] Rollback on error with toast notification

---

## Phase 5: Main Page & Routes

### 5.1 Calendar page server load
- [ ] `src/routes/dashboard/calendar/+page.server.ts`
- [ ] Check user authentication
- [ ] Verify Google Calendar OAuth scope
- [ ] Redirect to scope request if needed
- [ ] Pre-fetch current week's events (SSR)

### 5.2 Calendar page component
- [ ] `src/routes/dashboard/calendar/+page.svelte`
- [ ] Layout: Sidebar + Main calendar area
- [ ] Initialize calendar state from server data
- [ ] Handle view switching
- [ ] Keyboard navigation (arrow keys for days)

---

## Phase 6: Polish & UX

### 6.1 Event creation
- [ ] Click empty time slot to create event
- [ ] Quick-add popover with title input
- [ ] Full event modal for details
- [ ] Drag to select time range for new event

### 6.2 Event details popover
- [ ] Click event to see full details
- [ ] Edit title, time, description
- [ ] Delete event option
- [ ] Open in Google Calendar link

### 6.3 Current time indicator
- [ ] Red horizontal line at current time
- [ ] Auto-scroll to current time on load
- [ ] Updates every minute

### 6.4 Loading & error states
- [ ] Skeleton loading for initial fetch
- [ ] Loading spinner on event operations
- [ ] Error toast for failed operations
- [ ] Retry mechanism for transient failures

### 6.5 Responsive design
- [ ] Mobile: Single day view default
- [ ] Tablet: 3-day view option
- [ ] Desktop: Full week view
- [ ] Collapsible sidebar on smaller screens

---

## File Structure

```
src/routes/dashboard/calendar/
├── +page.svelte              # Main calendar page
├── +page.server.ts           # Auth check, prefetch events

src/lib/components/calendar/
├── week-view.svelte          # 7-day grid with time slots
├── day-view.svelte           # Single day detailed view  
├── event-block.svelte        # Draggable event card
├── time-grid.svelte          # Time slot labels column
├── mini-calendar.svelte      # Month picker widget
├── calendar-sidebar.svelte   # Sidebar with filters
├── calendar-header.svelte    # Navigation, view switcher
├── event-popover.svelte      # Event details/edit popover
└── create-event-modal.svelte # New event form

src/lib/stores/
└── calendar.svelte.ts        # Svelte 5 runes state

src/lib/types/
└── calendar.ts               # TypeScript interfaces

src/routes/api/calendar/
└── events/+server.ts         # REST API for events
```

---

## Dependencies to Install

```bash
bun add @dnd-kit/svelte @dnd-kit/dom
```

---

## Open Questions

1. **Sidebar integration:** Dedicated calendar sidebar or extend existing icon sidebar?
2. **Time range:** What hours to display? (Default: 6 AM - 10 PM)
3. **Multi-calendar:** Support multiple calendars with filters, or primary only?
4. **Week start:** Sunday or Monday?
