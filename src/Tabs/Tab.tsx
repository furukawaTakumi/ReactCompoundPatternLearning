import { FunctionComponent } from "react";
import { useTabs } from "./Tabs";

export type TabProps = {
  label: string;
  children?: React.ReactNode;
};

export const Tab: FunctionComponent<TabProps> = (props) => {
  const context = useTabs();

  return (
    <>
      <button
        onClick={() => {
          context.setActiveTab(props.label);
        }}
      >
        {props.label}
      </button>
    </>
  );
};
