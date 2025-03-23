import { useFormStatus } from "react-dom";

/**
 * Submit button component that displays a loading spinner when the form is submitting
 *
 * @returns A React component that displays a submit button
 */
export default function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button
      type="submit"
      className="submit-button"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  );
}
