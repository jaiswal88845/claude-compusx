import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import type { NewUser } from '../services/expenseService';
import { registerUser } from '../services/expenseService';
import '../styles/RegisterUserModal.css';

interface RegisterUserModalProps {
  visible: boolean;
  onHide: () => void;
  onRegistered: () => void;
}

export default function RegisterUserModal({ visible, onHide, onRegistered }: RegisterUserModalProps) {
  const [form, setForm] = useState<NewUser>({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof NewUser, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewUser, string>> = {};

    const username = form.username.trim();
    if (!username || username.length < 3 || username.length > 30) {
      newErrors.username = 'Username must be 3-30 characters';
    }

    const email = form.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    const password = form.password.trim();
    if (!password || password.length < 8 || password.length > 72) {
      newErrors.password = 'Password must be 8-72 characters';
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
      const userData: NewUser = {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      };

      await registerUser(userData);

      // Success
      setForm({ username: '', email: '', password: '' });
      setErrors({});
      onRegistered();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleHide = () => {
    setForm({ username: '', email: '', password: '' });
    setErrors({});
    setServerError(null);
    onHide();
  };

  return (
    <Dialog
      header="Register New User"
      visible={visible}
      onHide={handleHide}
      modal
      style={{ width: '30vw' }}
      className="register-modal"
    >
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={form.username}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
              setErrors({ ...errors, username: undefined });
            }}
            placeholder="3-30 characters"
            className={errors.username ? 'ng-invalid' : ''}
            disabled={submitting}
          />
          {errors.username && <small className="p-error">{errors.username}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setErrors({ ...errors, email: undefined });
            }}
            placeholder="user@example.com"
            className={errors.email ? 'ng-invalid' : ''}
            disabled={submitting}
          />
          {errors.email && <small className="p-error">{errors.email}</small>}
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
            placeholder="Minimum 8 characters"
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
            label={submitting ? 'Registering...' : 'Register'}
            icon="pi pi-check"
            loading={submitting}
            disabled={submitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
