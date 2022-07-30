import { FunctionComponent } from "react";
import { useTabs } from "./Tabs";

export interface PanelProps {
  label: string;
  children?: React.ReactNode;
}

export const Panel: FunctionComponent<PanelProps> = ({ children, label }) => {
  const context = useTabs();

  return <>{context.activeTab === label ? <div>{children}</div> : undefined}</>;
};
