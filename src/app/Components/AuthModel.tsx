"use client";

import { useState } from "react";
import { X, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type AuthMode = "login" | "register" | "forgot";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (mode === "login") {
        setMessage("Login successful!");
        setTimeout(onClose, 1000);
      } else if (mode === "register") {
        setMessage("Registration successful! Please check your email.");
        setTimeout(() => setMode("login"), 1500);
      } else {
        setMessage("Password reset link sent to your email.");
        setTimeout(() => setMode("login"), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {mode === "login" && "Sign in to your account"}
                {mode === "register" && "Create your account"}
                {mode === "forgot" && "Reset your password"}
              </h3>

              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {mode === "login" &&
                    "Welcome back! Please enter your details."}
                  {mode === "register" &&
                    "Join us today! It only takes a minute."}
                  {mode === "forgot" &&
                    "Enter your email to receive a reset link."}
                </p>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">{message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ color: "#374151" }} // Fallback inline style
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ color: "#374151" }} // Fallback inline style
                    />
                  </div>
                </div>

                {(mode === "login" || mode === "register") && (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
                        placeholder={
                          mode === "login"
                            ? "Your password"
                            : "Create a password"
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ color: "#374151" }} // Fallback inline style
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    {mode === "register" && (
                      <p className="mt-1 text-xs text-gray-500">
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols
                      </p>
                    )}
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-[#FFD814] hover:bg-[#F7CA00] border-[#FCD200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        {mode === "login" && "Sign in"}
                        {mode === "register" && "Create account"}
                        {mode === "forgot" && "Send reset link"}
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {mode === "login" && "New customer?"}
                      {mode === "register" && "Already have an account?"}
                      {mode === "forgot" && "Remember your password?"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setMode(
                        mode === "login"
                          ? "register"
                          : mode === "register"
                          ? "login"
                          : "login"
                      )
                    }
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {mode === "login" && "Create your account"}
                    {mode === "register" && "Sign in to your account"}
                    {mode === "forgot" && "Back to sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
