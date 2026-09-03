import { createContext } from "react";

type LanguageContextType = {
    language: string;
    setlanguage: (language: string) => void;
    translations: {
      [key: string]: string;
    };
  };
  const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setlanguage: () => {},
    translations: {},
  });

export default LanguageContext;