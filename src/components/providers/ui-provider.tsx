"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type UI = {
  [key: string]: any;
};

type Props = {
  children: React.ReactNode;
};

type UIValuesContext = {
  sidePanelOpen: boolean;
};

type UIActionsContext = {
  toggleSidePanelOpen: (value?: boolean) => void;
};

const UIValuesContext = createContext<UIValuesContext | undefined>(undefined);
const UIActionsContext = createContext<UIActionsContext | undefined>(undefined);

export const useUIValuesContext = () => {
  const context = useContext(UIValuesContext);

  if (!context) {
    throw Error("Using component outside of UIValuesContext.");
  }

  return context;
};

export const useUIActionsContext = () => {
  const context = useContext(UIActionsContext);

  if (!context) {
    throw Error("Using component outside of UIActionsContext.");
  }

  return context;
};

export const UIProvider = ({ children }: Props) => {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);

  const toggleSidePanelOpen = useCallback((value?: boolean) => {
    setSidePanelOpen((sidePanelOpen) => value ?? !sidePanelOpen);
  }, []);

  const valuesContextValue = useMemo(
    () => ({
      sidePanelOpen,
    }),
    [sidePanelOpen],
  );

  const actionsContextValue = useMemo(
    () => ({
      toggleSidePanelOpen,
    }),
    [toggleSidePanelOpen],
  );

  return (
    <UIValuesContext.Provider value={valuesContextValue}>
      <UIActionsContext.Provider value={actionsContextValue}>
        {children}
      </UIActionsContext.Provider>
    </UIValuesContext.Provider>
  );
};
