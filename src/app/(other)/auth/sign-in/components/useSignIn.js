'use client';

import api from "../../../../../services/api"; // Your API service
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '@/redux/slices/authSlice';

const useSignIn = () => {

  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { showNotification } = useNotificationContext();
  const dispatch = useDispatch()
  const pathname = usePathname()
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    if (token && pathname === '/auth/sign-in') {
      push('/dashboard')
    }
  }, [pathname, token])

  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string()
      .required('Please enter your password')
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password cannot be more than 15 characters'),
  });

  const { control, handleSubmit } = useForm({ resolver: yupResolver(loginFormSchema), defaultValues: { email: '', password: '' } });

  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/api/Account/AuthenticateAdmin", {
        email: values.email,
        password: values.password,
      });

      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        // Store auth data in Redux (which persists using redux-persist)
        dispatch(
          loginSuccess({
            token: response?.data.token,
            user: response?.data.data,
          })
        );

        push("/dashboard"); // Redirect user after login
        showNotification({
          message: response.data.message,
          variant: "success",
        });
      } else {
        showNotification({
          message: response.data.message || "Login failed!",
          variant: "danger",
        });

      }
    } catch (error) {
      showNotification({
        message: error?.message || "An error occurred during login.",
        variant: "danger",
      });
    }
    setLoading(false);
  });

  return {
    loading,
    login,
    control
  };
};
export default useSignIn;