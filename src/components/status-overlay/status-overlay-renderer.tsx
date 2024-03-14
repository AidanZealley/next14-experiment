type StatusOverlayRendererProps = {
  isLoading?: boolean;
  children: React.ReactNode;
};

export const StatusOverlayRenderer = ({
  isLoading,
  children,
}: StatusOverlayRendererProps) => {
  return !isLoading ? children : null;
};
