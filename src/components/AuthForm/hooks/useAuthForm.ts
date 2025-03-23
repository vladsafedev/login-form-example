import { useActionState, useCallback, useEffect, useState } from 'react';

import loginAction, { LoginState } from '../actions/login';

/**
 * Custom hook for handling authentication form state and actions
 *
 * @param options - Configuration options for the form
 * @returns An object containing form state and actions
 */
export function useAuthForm(options: {
  initialEmail?: string;
  initialPassword?: string;
  onSuccess?: (data: any) => void;
}) {
  const { initialEmail = '', initialPassword = '', onSuccess } = options;

  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>(initialPassword);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [formState, formAction] = useActionState<LoginState | null, FormData>(loginAction, null);

  useEffect(function handleSuccess() {
    if (formState?.ok && onSuccess) {
      onSuccess(formState);
    }
  }, [formState, onSuccess]);

  const handleFormSubmit = useCallback((formData: FormData) => {
    formData.set('email', email);
    formData.set('password', password);
    formData.set('remember-me', rememberMe ? 'on' : 'off');

    return formAction(formData);
  }, [email, password, rememberMe, formAction]);

  const togglePasswordVisibility = useCallback(function togglePasswordVisibility(focusPasswordInput?: () => void): void {
    setPasswordVisible(prev => !prev);

    // Refocus the password input after toggling visibility if function is provided
    if (focusPasswordInput) {
      setTimeout(focusPasswordInput, 0);
    }
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    passwordVisible,
    formState,
    handleFormSubmit,
    togglePasswordVisibility
  };
}
