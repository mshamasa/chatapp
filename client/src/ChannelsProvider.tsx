import { PropsWithChildren } from "react";

import {
  useChannelsContext,
  ChannelsContext,
  useData,
} from "./ChannelsContext";

const ChannelsProvider = ({ children }: PropsWithChildren) => {
  const value = useData();

  return (
    <ChannelsContext.Provider value={value}>
      {children}
    </ChannelsContext.Provider>
  );
};

export { useChannelsContext, ChannelsProvider };
