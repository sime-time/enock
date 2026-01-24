import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  // redirect to dashboard if user is already signed in
  if (locals.user?.id) {
    throw redirect(302, "/dashboard");
  }
}
