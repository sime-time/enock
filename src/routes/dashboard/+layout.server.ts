import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  // go to login page if user is not signed in
  if (!locals.user?.id) {
    throw redirect(302, "/auth/login");
  }
}
