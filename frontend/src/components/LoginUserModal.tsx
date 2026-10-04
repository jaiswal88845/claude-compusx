import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { loginUser, type LoggedInUser } from '../services/expenseService';
import '../styles/LoginUserModal.css';

interface LoginUserModalProps {
  visible: boolean;
  onHide: () => void;
  onLoggedIn: (user: LoggedInUser) => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginUserModal({ visible, onHide, onLoggedIn }: LoginUserModalProps) {
  const [form, setForm] = useState<LoginFormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    const username = form.username.trim();
    if (!username) {
      newErrors.username = 'Username is required';
    }

    const password = form.password.trim();
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const user = await loginUser(form.username.trim(), form.password.trim());

      // Success
      setForm({ username: '', password: '' });
      setErrors({});
      onLoggedIn(user);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleHide = () => {
    setForm({ username: '', password: '' });
    setErrors({});
    setServerError(null);
    onHide();
  };

  return (
    <Dialog
      header="User Login"
      visible={visible}
      onHide={handleHide}
      modal
      style={{ width: '30vw' }}
      className="login-modal"
    >
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={form.username}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
              setErrors({ ...errors, username: undefined });
            }}
            placeholder="Enter your username"
            className={errors.username ? 'ng-invalid' : ''}
            disabled={submitting}
          />
          {errors.username && <small className="p-error">{errors.username}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Password
            inputId="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              setErrors({ ...errors, password: undefined });
            }}
            placeholder="Enter your password"
            toggleMask
            className={errors.password ? 'ng-invalid' : ''}
            disabled={submitting}
          />
          {errors.password && <small className="p-error">{errors.password}</small>}
        </div>

        {serverError && <div className="p-error server-error">{serverError}</div>}

        <div className="form-actions">
          <Button
            type="button"
            label="Cancel"
            icon="pi pi-times"
            onClick={handleHide}
            className="p-button-text"
            disabled={submitting}
          />
          <Button
            type="submit"
            label={submitting ? 'Logging in...' : 'Login'}
            icon="pi pi-check"
            loading={submitting}
            disabled={submitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
