import { useState, createContext, useContext } from "react";

const ReloadContext = createContext();

export function ReloadContextProvider({ children }) {
  const [now, setNow] = useState(Date.now());

  function reload() {
    setNow(Date.now());
  };

  const value = {
    now,
    reload,
  }
  return (
    <ReloadContext.Provider value={value}>
      {children}
    </ReloadContext.Provider>
  );
}

export const useReloadContext = () => useContext(ReloadContext)

export default ReloadContext;
