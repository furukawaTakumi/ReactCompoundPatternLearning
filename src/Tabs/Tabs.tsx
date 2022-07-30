import React, { useContext, useMemo } from "react";
import { Panel, IPanelProps } from "./Panel";
import { Tab, ITabProps } from "./Tab";

interface TabsComposition {
  Panel: React.FC<React.PropsWithChildren<IPanelProps>>;
  Tab: React.FC<React.PropsWithChildren<ITabProps>>;
}

interface ITabsContext {
  activeTab: string;
  setActiveTab: (label: string) => void; // React.Dispatchで表現しなくても良い
}

const TabsContext = React.createContext<ITabsContext | null>(null);

const Tabs: React.FC<React.PropsWithChildren> & TabsComposition = (props) => {
  const [activeTab, setActiveTab] = React.useState<string>("a");

  const memolizedContextValue = useMemo<ITabsContext | null>(() => {
    return {
      activeTab,
      setActiveTab,
    };
  }, [activeTab, setActiveTab]);

  return (
    <TabsContext.Provider value={memolizedContextValue}>
      {props.children}
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
