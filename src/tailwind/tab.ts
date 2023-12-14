import { PluginAPI } from "tailwindcss/types/config";

export const tab = ({ matchUtilities, theme }: PluginAPI) => {
  matchUtilities(
    {
      tab: (value) => ({
        tabSize: value,
      }),
    },
    { values: theme("tabSize") },
  );
};
