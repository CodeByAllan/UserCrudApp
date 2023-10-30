export function isSecurePassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  if (!/[^a-zA-Z 0-9]+/g.test(password)) {
    return false;
  }
  return true;
}
