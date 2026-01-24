// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user:
        | typeof import("$lib/auth-client").authClient.$Infer.Session.user
        | undefined;
    }
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

import "unplugin-icons/types/svelte";
