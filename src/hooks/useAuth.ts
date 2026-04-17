'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/wp-json/wc/v3/customers/me`, {
          params: {
            consumer_key: process.env.WOOCOMMERCE_CONSUMER_KEY,
            consumer_secret: process.env.WOOCOMMERCE_CONSUMER_SECRET
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/wp-json/jwt-auth/v1/token`, credentials);
      setUser(response.data);
      router.push('/'); // Redirect to home after login
    } catch (err) {
      setError('Login failed');
    }
  };

  const logout = async () => {
    setUser(null);
    await axios.post(`${API_URL}/wp-json/jwt-auth/v1/token/revoke`);
    router.push('/login'); // Redirect to login after logout
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
};

export default useAuth;