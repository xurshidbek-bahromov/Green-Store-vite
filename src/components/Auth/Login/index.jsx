import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;
const apikey = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN;

function Login({ setIsModalOpen, setIsLogged }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleLoginCheck = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!user.email.trim()) newErrors.email = 'Email is required';
    if (!user.password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${api}user/sign-in?access_token=${apikey}`,
        user
      );
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      localStorage.setItem(
        'wishlist',
        JSON.stringify(response?.data?.data?.user?.wishlist)
      );
      setUser({ email: '', password: '' });
      setIsLogged(true);
      setIsModalOpen(false);
      setErrors({});
      setIsLoading(false);
      toast.success(`Welcome back, ${response?.data?.data?.user?.name}!`);
      navigate('/profile/account');
    } catch (err) {
      setErrors({
        apiError:
          err?.response?.data?.extraMessage ||
          'Login failed. Please check your credentials.',
      });
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-green-100 via-white to-green-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Welcome Back
      </h2>

      <form onSubmit={handleLoginCheck} className="space-y-5">
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleSetValue}
            className={`peer w-full px-5 py-3 text-sm rounded-lg focus:outline-none focus:ring ${
              errors.email
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-green-300'
            }`}
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={user.password}
            onChange={handleSetValue}
            className={`peer w-full px-5 py-3 text-sm rounded-lg focus:outline-none focus:ring ${
              errors.password
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-green-300'
            }`}
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {errors.apiError && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {errors.apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            isLoading
              ? 'bg-green-500/80'
              : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300'
          } transition-all flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Logging In...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <div className="flex items-center my-8">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GoogleLoginButton
          onClick={() => {}}
          className="!rounded-lg !py-2 !text-sm"
        />
        <FacebookLoginButton
          onClick={() => {}}
          className="!rounded-lg !py-2 !text-sm"
        />
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          className="font-semibold text-green-500 hover:underline"
          onClick={() => {}}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

export default Login;