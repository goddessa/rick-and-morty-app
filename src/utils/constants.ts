import copy from '../copy';

export const AUTH_PAGES = {
  LOGIN: 'login',
  SIGN_UP: 'sign-up',
} as const;

export type AuthLinks = (typeof AUTH_PAGES)[keyof typeof AUTH_PAGES];

export const NAVIGATION_COPY: Record<AuthLinks, keyof typeof copy> = {
  [AUTH_PAGES.LOGIN]: 'login',
  [AUTH_PAGES.SIGN_UP]: 'signUp',
};
