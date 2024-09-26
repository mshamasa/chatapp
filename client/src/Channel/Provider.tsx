import { PropsWithChildren } from "react";

import { Context, useData } from "./Context";

const ChannelProvider = ({ children }: PropsWithChildren) => {
  const value = useData();

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ChannelProvider;
