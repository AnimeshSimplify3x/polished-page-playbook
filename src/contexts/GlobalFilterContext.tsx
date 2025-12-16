import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalFilters {
  month: string | null;
  states: string[];
}

interface GlobalFilterContextType {
  filters: GlobalFilters;
  setMonth: (month: string | null) => void;
  setStates: (states: string[]) => void;
  removeState: (state: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const GlobalFilterContext = createContext<GlobalFilterContextType | undefined>(undefined);

export const GlobalFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<GlobalFilters>({
    month: null,
    states: [],
  });

  const setMonth = (month: string | null) => {
    setFilters((prev) => ({ ...prev, month }));
  };

  const setStates = (states: string[]) => {
    setFilters((prev) => ({ ...prev, states }));
  };

  const removeState = (state: string) => {
    setFilters((prev) => ({
      ...prev,
      states: prev.states.filter((s) => s !== state),
    }));
  };

  const clearFilters = () => {
    setFilters({ month: null, states: [] });
  };

  const hasActiveFilters = filters.month !== null || filters.states.length > 0;

  return (
    <GlobalFilterContext.Provider
      value={{ filters, setMonth, setStates, removeState, clearFilters, hasActiveFilters }}
    >
      {children}
    </GlobalFilterContext.Provider>
  );
};

export const useGlobalFilters = () => {
  const context = useContext(GlobalFilterContext);
  if (!context) {
    throw new Error("useGlobalFilters must be used within a GlobalFilterProvider");
  }
  return context;
};
