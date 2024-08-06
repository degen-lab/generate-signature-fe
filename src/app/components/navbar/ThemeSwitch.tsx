import { Switch } from "@nextui-org/react";
import { SunIcon } from "../Images/SunIcon";
import { MoonIcon } from "../Images/MoonIcon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: "50px", height: "30px" }} />;
  }

  const isDarkMode = theme === "dark" || resolvedTheme === "dark";
  return (
    <Switch
      checked={isDarkMode}
      size="lg"
      color="success"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      <div className="hidden md:inline">Dark Mode</div>
    </Switch>
  );
};
