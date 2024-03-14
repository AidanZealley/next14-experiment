"use client";

import { DoubleSlider } from "@/components/ui/double-slider";

export const TestSlider = () => {
  return (
    <DoubleSlider defaultValue={[25, 75]} inverted minStepsBetweenThumbs={10} />
  );
};
