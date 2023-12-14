import { PluginAPI } from "tailwindcss/types/config";

export const spotlight = ({ matchUtilities, theme }: PluginAPI) => {
  matchUtilities(
    {
      backgroundPosition: (value) => ({
        backgroundPosition: `${value}`,
      }),
    },
    // { values: theme("backgroundImage") },
  );
};
