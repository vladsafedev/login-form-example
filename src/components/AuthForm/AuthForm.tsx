import { ChangeEvent, useCallback } from 'react';

import { useAuthForm } from './hooks/useAuthForm';
import { useFormFocus } from './hooks/useFormFocus';

import FormStatusDisplay from './components/FormStatusDisplay';
import PasswordResetButton from './components/PasswordResetButton';
import SubmitButton from './components/SubmitButton';

import './AuthForm.css';

interface AuthFormProps {
  initialEmail?: string;
  initialPassword?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  onSuccess?: (data: any) => void;
}

const AuthForm = ({
  initialEmail = '',
  initialPassword = '',
  emailPlaceholder = 'Enter your email',
  passwordPlaceholder = 'Enter your password',
  onSuccess,
}: AuthFormProps = {}) => {
  const {
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
  } = useAuthForm({ initialEmail, initialPassword, onSuccess });

  const {
    emailInputRef,
    passwordInputRef,
    focusPasswordInput
  } = useFormFocus({ autoFocusFirstField: true });

  const handleTogglePasswordVisibility = useCallback(() => {
    togglePasswordVisibility(focusPasswordInput);
  }, [togglePasswordVisibility, focusPasswordInput]);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [setPassword]);

  const handleRememberMeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }, [setRememberMe]);

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h1 className="auth-title">Sign In</h1>

        <FormStatusDisplay state={formState} />

        <form
          action={handleFormSubmit}
          name="loginForm"
          acceptCharset="UTF-8"
          autoComplete="on"
          className="auth-form"
        >
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              inputMode="email"
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
              required
              placeholder={emailPlaceholder}
              enterKeyHint="next"
              maxLength={64}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                ref={passwordInputRef}
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                required
                minLength={8}
                maxLength={24}
                placeholder={passwordPlaceholder}
                spellCheck={false}
                enterKeyHint="done"
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={handleTogglePasswordVisibility}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {passwordVisible ? '🐵' : '🙈'}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember-me" className="checkbox-label">
                Remember me
              </label>
            </div>
            <PasswordResetButton email={email} />
          </div>

          <SubmitButton />
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <a href="#signup" className="signup-link">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
