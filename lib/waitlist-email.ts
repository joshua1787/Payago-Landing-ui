export const WAITLIST_EMAIL_ERROR = "Enter a full email address, for example name@payago.in."
export const WAITLIST_EMAIL_INPUT_PATTERN = "[^@\\s]+@[^@\\s]+\\.[^@\\s]+"

const WAITLIST_EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export function isValidWaitlistEmail(email: string) {
  return WAITLIST_EMAIL_PATTERN.test(email.trim())
}
