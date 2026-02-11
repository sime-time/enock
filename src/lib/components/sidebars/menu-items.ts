import CalendarIcon from "@lucide/svelte/icons/calendar-days";
import LogoutIcon from "@lucide/svelte/icons/log-out";
import MessageIcon from "@lucide/svelte/icons/message-circle-more";
import SettingsIcon from "@lucide/svelte/icons/settings";
import SunIcon from "@lucide/svelte/icons/sun";

export const menuItems = [
  {
    title: "Chat",
    url: "/dashboard/chat",
    icon: MessageIcon,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: CalendarIcon,
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
    url: "/auth/logout",
    icon: LogoutIcon,
  },
];
