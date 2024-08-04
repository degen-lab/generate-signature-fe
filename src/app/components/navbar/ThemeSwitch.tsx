import { Switch } from "@nextui-org/react";
import { SunIcon } from "../Images/SunIcon";
import { MoonIcon } from "../Images/MoonIcon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent rendering until client-side mounted

  return (
    <Switch
      checked={theme === "dark"}
      size="md"
      color="success"
      startContent={<SunIcon />}
      endContent={theme === "dark" ? <MoonIcon /> : <SunIcon />}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <span className="hidden lg:inline">Dark mode</span>
    </Switch>
  );
};
