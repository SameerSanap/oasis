"use client";
import { createContext, useContext, useState } from "react";

const ResarvationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ResarvationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ResarvationContext.Provider value={{ range, setRange,resetRange }}>
      {children}
    </ResarvationContext.Provider>
  );
}

function useResarvation() {
  const context = useContext(ResarvationContext);

  if (context === undefined) throw new Error("Context outside provider");
  return context;
}

export { ResarvationProvider, useResarvation };
