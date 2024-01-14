import { ReactNode, createContext, useContext, useState } from "react";
import { Toast } from "../components/toast";
import { useQuery } from "react-query";
import { validateToken } from "../api.client";

type ToastMessageProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextProps = {
  showToast: (toastMessage: ToastMessageProps) => void;
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessageProps | undefined>(undefined);

  const { isError } = useQuery("validateToken", validateToken);

  return (
    <AppContext.Provider
      value={{
        showToast: (message) => {
          setToast(message);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as AppContextProps;
};
