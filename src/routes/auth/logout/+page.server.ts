import type { PageServerLoad } from "./$types";

// return user data to logout page
export const load: PageServerLoad = async ({ locals }) => {
  return locals;
};
