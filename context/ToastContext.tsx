import React from 'react';

export const ToastContext = React.createContext<any>(null);

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastContext.Provider value={{notify: ''}}>
      {children}
    </ToastContext.Provider>
  );
}
