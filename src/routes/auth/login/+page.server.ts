import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  // redirect to dashboard if user is already signed in
  if (locals.user?.id) {
    throw redirect(302, "/dashboard/chat");
  }
};
