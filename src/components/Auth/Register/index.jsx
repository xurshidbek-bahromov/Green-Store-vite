import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;
const apikey = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN;

function Register({ setIsModalOpen, setIsLogged }) {
  const [user, setUser] = useState({ name: '', surname: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRegisterCheck = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!user.name.trim()) newErrors.name = 'Please enter your name';
    if (!user.surname.trim()) newErrors.surname = 'Please enter your surname';
    if (!user.email.trim()) newErrors.email = 'Please enter your email';
    if (!user.password.trim()) newErrors.password = 'Please enter your password';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    if (user.password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${api}user/sign-up?access_token=${apikey}`, user);
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      setUser({ name: '', surname: '', email: '', password: '' });
      setConfirmPassword('');
      setIsLogged(true);
      setIsModalOpen(false);
      setErrors({});
      setIsLoading(false);
      toast.success(`${response?.data?.data?.user?.name} Registration successfully completed!`);
      navigate('/profile/account');
    } catch (err) {
      setErrors({ apiError: err.response?.data?.extraMessage || 'Registration failed.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-green-100 via-white to-green-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Create Account</h2>
      <p className="text-center text-sm text-gray-600 mb-6">Join us for a greener shopping experience!</p>

      <form onSubmit={handleRegisterCheck} className="space-y-5">
        {['name', 'surname', 'email', 'password'].map((field) => (
          <div key={field} className="relative">
            <input
              type={field === 'password' ? 'password' : 'text'}
              id={field}
              name={field}
              value={user[field]}
              onChange={handleSetValue}
              className={`peer w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring ${
                errors[field]
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-green-300'
              }`}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
            {errors[field] && (
              <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`peer w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring ${
              errors.confirmPassword
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-green-300'
            }`}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
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
          className={`w-full py-3 rounded-lg text-white font-medium ${
            isLoading
              ? 'bg-green-500/80'
              : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300'
          } transition-all`}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;