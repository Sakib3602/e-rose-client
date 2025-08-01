// DbContext.tsx

import { createContext, useContext} from "react";


// 1. Create the context
const DbContext = createContext<any>(null);

// 2. Create the provider
export const DbProvider = ({ children }: { children: React.ReactNode }) => {

    const s : string = "hell"
   
    const infor = {
       s,
    }

  return (
    <DbContext.Provider value={infor}>
      {children}
    </DbContext.Provider>
  );
};

// 3. Custom hook
export const useDb = () => useContext(DbContext);
