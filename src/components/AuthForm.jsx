import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm({
  formType,
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  error,
}) {
  const isLogin = formType === 'Login';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{formType}</h2>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                }
              }
                
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {formType}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link to={isLogin ? '/register' : '/login'} className="font-bold text-blue-500 hover:text-blue-800">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;