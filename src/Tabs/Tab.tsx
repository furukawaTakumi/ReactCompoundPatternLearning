import { FunctionComponent } from "react";
import { useTabs } from "./Tabs";

export type ITabProps = {
  label: string;
};

export const Tab: FunctionComponent<React.PropsWithChildren<ITabProps>> = (
  props
) => {
  const { setActiveTab } = useTabs();

  return (
    <div className="tab">
      <button onClick={() => setActiveTab(props.label)}>{props.label}</button>
    </div>
  );
};
