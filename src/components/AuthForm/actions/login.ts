export type LoginState = {
  ok?: boolean;
  error?: string;
  user?: { email: string };
};

/**
 * Form action that handles login submission server-side
 *
 * @param prevState - The previous state from the form
 * @param formData - The form data submitted by the user
 * @returns An object containing login result information
 * - `ok`: Boolean indicating success status
 * - `error`: Error message if login failed
 * - `user`: User object if login succeeded
 */
export default async function loginAction(_prevState: LoginState | null, formData: FormData) {
  // In a real app, this would send a request to a server.
  // For demo purposes, simulate a network request and response.

  const email = formData.get('email') as string;
  // const password = formData.get('password') as string;
  // const rememberMe = formData.get('remember-me') === 'on';

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate 75% success rate
  const success = Math.random() > 0.25;

  if (!success) {
    return { ok: false, error: 'Invalid credentials. Please check your email and password.' };
  }

  return { ok: true, user: { email } };
}
