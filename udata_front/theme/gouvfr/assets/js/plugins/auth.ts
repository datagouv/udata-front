/*
 * Handle authentication and permissions
 */
import type { App } from "vue";
import { auth_url, user } from "../config";

/**
 * Build the authentication URL given the current page.
 */
export function get_auth_url() {
  const params = { login_required: true, next: window.location.href };

  return (
    auth_url +
    "?" +
    (Object.keys(params) as Array<keyof typeof params>)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&")
  );
}

export function auth() {
  if (!user) {
    window.location.href = get_auth_url();
    throw new Error('Auth required'); // This avoid calling function to continue its execution
  }
  return user;
}

export default function install(app: App) {
  /**
   * Checks if the current user is authenticated
   * and triggers a login if it's not the case.
   *
   * The current function execution is stopped by
   * raising a AuthenticationRequired error.
   *
   * @throws {Error} When the user is not authenticated
   */
  app.config.globalProperties.$auth = auth;
}
