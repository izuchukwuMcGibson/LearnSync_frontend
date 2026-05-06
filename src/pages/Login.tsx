import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Redirect to dashboard on success
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f8fafc] font-inter py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-[#112240]'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-500'>
            Or{" "}
            <Link
              to='/signup'
              className='font-medium text-[#2b4c7e] hover:text-[#1f385c]'
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleLogin}>
          {error && (
            <div className='bg-red-50 text-red-500 p-3 rounded-md text-sm text-center'>
              {error}
            </div>
          )}

          <div className='rounded-md shadow-sm -space-y-px'>
            <div className='mb-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b4c7e] focus:border-[#2b4c7e] focus:z-10 sm:text-sm'
                placeholder='Email address'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b4c7e] focus:border-[#2b4c7e] focus:z-10 sm:text-sm pr-10'
                  placeholder='Password'
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 z-20'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className='h-5 w-5' aria-hidden='true' />
                  ) : (
                    <FiEye className='h-5 w-5' aria-hidden='true' />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded text-white ${
                isLoading
                  ? "bg-[#2b4c7e]/70 cursor-not-allowed"
                  : "bg-[#2b4c7e] hover:bg-[#1f385c]"
              } focus:outline-none transition-colors font-inter`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
