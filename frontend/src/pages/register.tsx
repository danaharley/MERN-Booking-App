import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import * as apiClient from "../api.client";

import { useAppContext } from "../contexts/app-context";

export type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ type: "SUCCESS", message: "Your account has been created." });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <label
          htmlFor="firstname"
          className="flex-1 text-sm font-bold text-gray-700"
        >
          First Name
          <input
            id="firstname"
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("firstName", { required: "This field is required." })}
          />
          {errors.firstName && (
            <span className="text-xs text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label
          htmlFor="lastname"
          className="flex-1 text-sm font-bold text-gray-700"
        >
          Last Name
          <input
            id="lastname"
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("lastName", { required: "This field is required." })}
          />
          {errors.lastName && (
            <span className="text-xs text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
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
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 3,
              message: "Password must be at least 3 charactes",
            },
          })}
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>
      <label
        htmlFor="confirmPassword"
        className="flex-1 text-sm font-bold text-gray-700"
      >
        Password
        <input
          id="confirmPassword"
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required.";
              } else if (watch("password") !== value) {
                return "Your password do not match.";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="text-blue-700 hover:underline hover:underline-offset-4"
        >
          Login here
        </Link>
      </span>
      <button
        type="submit"
        className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
      >
        Create Account
      </button>
    </form>
  );
};

export default Register;
