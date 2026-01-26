import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  // return user data to logout page
  // to check if user is already logged out
  return locals;
};
