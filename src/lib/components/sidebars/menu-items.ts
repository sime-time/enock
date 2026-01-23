import CalendarIcon from "@lucide/svelte/icons/calendar-days";
import LogoutIcon from "@lucide/svelte/icons/log-out";
import MessageIcon from "@lucide/svelte/icons/message-circle-more";
import NotebookIcon from "@lucide/svelte/icons/notebook-pen";
import SettingsIcon from "@lucide/svelte/icons/settings";
import SunIcon from "@lucide/svelte/icons/sun";

export const menuItems = [
  {
    title: "Chat",
    url: "/dashboard",
    icon: MessageIcon,
  },
  {
    title: "Google Calendar",
    url: "/dashboard/calendar",
    icon: CalendarIcon,
  },
  {
    title: "Edit Vision",
    url: "/dashboard/vision",
    icon: NotebookIcon,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export const footerItems = [
  {
    title: "Dark Mode",
    url: "#",
    icon: SunIcon,
  },
  {
    title: "Logout",
    url: "/login",
    icon: LogoutIcon,
  },
];
