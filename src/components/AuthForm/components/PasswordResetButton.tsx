import { useCallback } from "react";

/**
 * Password reset button component
 *
 * @param email - The email address of the user
 * @returns A React component that displays a password reset button
 */
export default function PasswordResetButton({ email }: { email: string }) {
  const handlePasswordReset = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    alert(`Password reset link sent to ${email || 'your email'}`);
  }, [email]);

  return (
    <button
      type="button"
      className="text-button forgot-password-button"
      onClick={handlePasswordReset}
    >
      Forgot password?
    </button>
  );
}
