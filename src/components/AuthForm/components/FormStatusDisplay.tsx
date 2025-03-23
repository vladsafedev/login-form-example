import type { LoginState } from '../actions/login';

/**
 * Displays the status of the form submission
 *
 * @param state - The state of the form submission
 * @returns A React component that displays the status of the form submission
 */
export default function FormStatusDisplay({ state }: { state: LoginState | null }) {
  if (!state) return null;

  if (state.ok) {
    return (
      <div className="alert alert-success" role="alert">
        <span>Login successful! Redirecting...</span>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="alert alert-error" role="alert">
        <span>{state.error}</span>
      </div>
    );
  }

  return null;
}
