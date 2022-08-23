import React from "react";

export const ToastContext = React.createContext<any>(null);

export function ToastContextProvider({ children }) {
  return (
    <ToastContext.Provider value={{ notify: "" }}>
      {children}
    </ToastContext.Provider>
  );
}
