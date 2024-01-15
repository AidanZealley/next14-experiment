import { PluginAPI } from "tailwindcss/types/config";

export const deviceHeight = ({ addUtilities }: PluginAPI) => {
  addUtilities({
    ".h-device": {
      height: "var(--device-height)",
    },
  });
};
