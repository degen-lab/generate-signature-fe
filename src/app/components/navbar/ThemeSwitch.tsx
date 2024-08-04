import { Switch } from "@nextui-org/react";
import { SunIcon } from "../Images/SunIcon";
import { MoonIcon } from "../Images/MoonIcon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !theme && resolvedTheme) {
      setTheme(resolvedTheme);
    }
  }, [mounted, theme, resolvedTheme, setTheme]);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === "dark" || resolvedTheme === "dark";

  return (
    <Switch
      checked={isDarkMode}
      size="lg"
      color="success"
      startContent={<SunIcon />}
      endContent={isDarkMode ? <MoonIcon /> : <SunIcon />}
      onChange={() => setTheme(isDarkMode ? "light" : "dark")}
    ></Switch>
  );
};
