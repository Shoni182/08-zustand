"use client";

import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    toast.error("Щось пішло не так!");
  }, [error]);
  return (
    <div>
      <h2>Помилка при завантаженні</h2>
      <p>Could not fetch the list of notes. {error.message}</p>

      <button onClick={reset}>Спробувати знову</button>
      <Toaster />
    </div>
  );
};

export default Error;
