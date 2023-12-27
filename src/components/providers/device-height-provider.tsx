"use client";

import { useEffect } from "react";

export const DeviceHeightProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const resize = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };
    resize();
    window.addEventListener("resize", resize);
  }, []);

  return <div className="grid h-device">{children}</div>;
};
