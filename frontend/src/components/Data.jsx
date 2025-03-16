import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [responseData, setCoupons] = useState({
    success: false,
    availableCoupons: [],
    claimedCoupons: [],
  }); // Store API response

  return (
    <DataContext.Provider value={{ responseData, setCoupons }}>
      {children}
    </DataContext.Provider>
  );
}
