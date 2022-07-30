import { FunctionComponent } from "react";
import { useTabs } from "./Tabs";

export interface IPanelProps {
  label: string;
}

export const Panel: FunctionComponent<React.PropsWithChildren<IPanelProps>> = ({
  children,
  label,
}) => {
  const { activeTab } = useTabs();

  return <>{activeTab === label ? <div>{children}</div> : undefined}</>;
};
