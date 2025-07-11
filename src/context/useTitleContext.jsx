import React, { createContext, use, useState } from 'react';
const TitleContext = createContext(undefined);
export const TitleProvider = ({
  children
}) => {
  const [title, setTitle] = useState('');
  return <TitleContext.Provider value={{
    title,
    setTitle
  }}>{children}</TitleContext.Provider>;
};
export const useTitle = () => {
  const context = use(TitleContext);
  if (context === undefined) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context;
};