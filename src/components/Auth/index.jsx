import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import '../../index.css';

function Auth({ setIsModalOpen, setIsLogged }) {
  const [activeTab, setActiveTab] = useState('login'); 
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center text-lg font-medium ${
              activeTab === 'login'
                ? 'border-b-2 border-[#46A358] text-[#46A358]'
                : 'text-gray-500 hover:text-[#46A358]'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-center text-lg font-medium ${
              activeTab === 'register'
                ? 'border-b-2 border-[#46A358] text-[#46A358]'
                : 'text-gray-500 hover:text-[#46A358]'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'login' && (
            <Login setIsModalOpen={setIsModalOpen} setIsLogged={setIsLogged} />
          )}
          {activeTab === 'register' && (
            <Register setIsModalOpen={setIsModalOpen} setIsLogged={setIsLogged} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;