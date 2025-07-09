'use client';

import { client } from '@/lib/apolloClient';
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations/authMutations';

export const registerUser = async (formData) => {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER_USER,
      variables: {
        username: formData.username,
        password: formData.password,
      },
    });

    if (data.register) {
      return { success: true };
    } else {
      return { success: false, error: 'Registration failed' };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export const loginUser = async (formData) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: {
        username: formData.username,
        password: formData.password,
      },
    });

    const token = data.login.token;
    const user = data.login.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, token, user };
  } catch (error) {
    return { success: false, error };
  }
};
