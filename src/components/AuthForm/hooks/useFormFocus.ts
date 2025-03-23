import { useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for handling form focus
 *
 * @param options - Configuration options for the form
 * @returns An object containing form state and actions
 */
export function useFormFocus({ autoFocusFirstField = true }: { autoFocusFirstField?: boolean }) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(function focusFirstInput() {
    if (autoFocusFirstField) {
      emailInputRef.current?.focus();
    }
  }, [autoFocusFirstField]);

  const focusEmailInput = useCallback(function focusEmailInput() {
    emailInputRef.current?.focus();
  }, [emailInputRef]);

  const focusPasswordInput = useCallback(function focusPasswordInput() {
    passwordInputRef.current?.focus();
  }, [passwordInputRef]);

  return {
    emailInputRef,
    passwordInputRef,
    focusEmailInput,
    focusPasswordInput
  };
}
