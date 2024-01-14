import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import * as apiClient from "../api.client";

import { useAppContext } from "../contexts/app-context";

export const SignOut = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        type: "SUCCESS",
        message: "You have been successfully logged out",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
    },
  });

  const onClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={onClick}
      className="bg-blue-600 px-2.5 py-1.5 text-sm font-bold text-white hover:bg-blue-500"
    >
      Sign Out
    </button>
  );
};
