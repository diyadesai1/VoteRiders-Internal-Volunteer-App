export function signInWithGoogleAndAllowlist(): Promise<any>;
export function isEmailAllowed(email: string): Promise<boolean>;
export function isEmailAdmin(email: string): Promise<boolean>;
export function trackEvent(name: string, params?: any): void;
export const auth: import('firebase/auth').Auth;