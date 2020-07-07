import React, { useContext } from "react";

const PrefixContext = React.createContext("");

export const usePrefix = (): string => {
  let prefix = useContext(PrefixContext);
  if (prefix.length > 0) {
    prefix += ".";
  }
  return prefix;
};

export const AutoPrefix: React.FC<{ name: string }> = ({ name, children }) => {
  const prefixedName = (usePrefix() + name).replace(".[", "[");
  return (
    <PrefixContext.Provider value={prefixedName}>
      {children}
    </PrefixContext.Provider>
  );
};

export default PrefixContext;
