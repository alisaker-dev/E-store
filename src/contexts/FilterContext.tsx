import { createContext, useContext } from "react";
import type { FilterContextType } from "../types/Product";

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
