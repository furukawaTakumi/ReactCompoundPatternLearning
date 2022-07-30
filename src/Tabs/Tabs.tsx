import React, { useContext, useMemo } from "react";
import { FunctionComponent } from "react";
import { Panel, PanelProps } from "./Panel";
import { Tab, TabProps } from "./Tab";

interface TabsComposition {
  Panel: FunctionComponent<PanelProps>;
  Tab: FunctionComponent<TabProps>;
}

interface TabsProps {
  children?: React.ReactNode;
}

interface ITabsContext {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabsContext = React.createContext<ITabsContext | null>(null);

const Tabs: FunctionComponent<TabsProps> & TabsComposition = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState<string>("a");

  const memolizedContext = useMemo<ITabsContext | null>(() => {
    return {
      activeTab,
      setActiveTab,
    };
  }, [activeTab, setActiveTab]);

  return (
    <TabsContext.Provider value={memolizedContext}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("context must not be null");
  }

  return context;
};

Tabs.Panel = Panel;
Tabs.Tab = Tab;

export { Tabs };
