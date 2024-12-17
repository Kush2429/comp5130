'use client';

import { type AdminUser } from '@/types/admin-user';

import { getAuthToken, makeRequest, removeAuthToken, setAuthToken } from '../services/base-api';

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = '';
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request
    const response = await makeRequest('admin-users/login', {}, 'POST', false, {
      email,
      password,
    });

    // check if error
    if ('code' in (response as { code: string })) {
      return { error: (response as { message: string }).message };
    }

    const token: string = (response as { token: string }).token;
    setAuthToken(token);
    localStorage.setItem('admin-user', JSON.stringify((response as { user: AdminUser }).user));

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async updateUserInfo(object: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ error?: string }> {
    const response = await makeRequest(`admin-users/${object._id}`, {}, 'PUT', true, object);

    if ('code' in (response as { code: string })) {
      return { error: (response as { message: string }).message };
    }

    setAuthToken((response as { token: string }).token);
    localStorage.setItem('admin-user', JSON.stringify((response as { user: AdminUser }).user));

    return {};
  }

  async getUser(): Promise<{ data?: AdminUser | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = getAuthToken();

    if (!token) {
      return { data: null };
    }

    return { data: JSON.parse(localStorage.getItem('admin-user')!) as AdminUser };
  }

  async signOut(): Promise<{ error?: string }> {
    removeAuthToken();

    return {};
  }
}

export const authClient = new AuthClient();
