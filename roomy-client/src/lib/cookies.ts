import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const AUTH_TOKEN = "token";

export function setAuthToken(token: string) {
  setCookie(AUTH_TOKEN, token);
}

export function getAuthToken(): string | undefined {
  const token = getCookie(AUTH_TOKEN);
  if (!token) {
    return undefined;
  }
  return token;
}

export function deleteAuthToken() {
  deleteCookie(AUTH_TOKEN);
}

export function isLoggedIn(): boolean {
  return !!getAuthToken();
}
