import { createContext } from "react";

type ThemeContextType = {
    Theme: string;
    setTheme: (theme: string) => void;
};
const ThemeContext = createContext<ThemeContextType>({
    Theme: "light",
    setTheme: () => {},
});

export default ThemeContext;