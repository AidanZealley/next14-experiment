import { PluginAPI } from "tailwindcss/types/config";

export const deviceHeight = ({ addUtilities }: PluginAPI) => {
  addUtilities({
    ".h-device": {
      minHeight: "var(--device-height)",
    },
  });
};
