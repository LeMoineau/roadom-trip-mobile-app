import React, { useState } from "react";
import Toaster from "../components/common/misc/toaster";
import { ToastMessage } from "../types/ToastMessage";
import { ToastContext } from "./contexts";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentToast, setCurrentToast] = useState<ToastMessage>({
    message: "",
  });
  const [_showToast, setShowToast] = useState(false);

  const showToast = (t: ToastMessage) => {
    setCurrentToast(t);
    setShowToast(true);
  };

  return (
    <ToastContext.Provider
      value={{
        currentToast,
        showToast,
      }}
    >
      {children}
      <Toaster
        show={_showToast}
        message={currentToast.message}
        duration={currentToast.duration ?? 5000}
        onHiding={() => {
          currentToast.onHiding && currentToast.onHiding();
          setShowToast(false);
        }}
        topOffset={30}
        textColor={currentToast.textColor}
        bg={currentToast.bgColor}
      ></Toaster>
    </ToastContext.Provider>
  );
}
