import '../styles/globals.css'
import React, { createContext, useState } from "react";

export const BootCodeContext = createContext();

const BootCodeProvider = ({ children }) => {
  const [bootCodePreview, setBootCodePreview] = useState("");
  return (
    <BootCodeContext.Provider value={{ bootCodePreview, setBootCodePreview}}>
      {children}
    </BootCodeContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <BootCodeProvider>
      <Component {...pageProps} />
    </BootCodeProvider>
  )
}

export default MyApp
