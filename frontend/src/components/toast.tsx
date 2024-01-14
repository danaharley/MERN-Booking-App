import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export const Toast = ({ type, message, onClose }: ToastProps) => {
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-500 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-500 text-white max-w-md";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles}>
      <div className="flex items-center justify-center transition">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};
