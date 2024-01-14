import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import * as apiClient from "../api.client";

import { useAppContext } from "../contexts/app-context";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { showToast } = useAppContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ type: "SUCCESS", message: "Login Successfully." });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
    },
  });

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Login</h2>
      <label htmlFor="email" className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          id="email"
          type="email"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("email", { required: "This field is required." })}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label
        htmlFor="password"
        className="flex-1 text-sm font-bold text-gray-700"
      >
        Password
        <input
          id="password"
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("password", { required: "This field is required." })}
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="text-sm text-slate-600">
        Don't have any account yet?{" "}
        <Link
          to="/register"
          className="text-blue-700 hover:underline hover:underline-offset-4"
        >
          Create an account here
        </Link>
      </span>
      <button
        type="submit"
        className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
      >
        Login
      </button>
    </form>
  );
};

export default SignIn;
