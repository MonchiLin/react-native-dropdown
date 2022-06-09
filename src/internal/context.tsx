import React from "react";
import { id } from "./utils";

type Context = {
  overlaySize: { height: number, width: number },
  onItemPress: (info?: { item: any, index: number }) => void
}

const ModalDropdownContext = React.createContext<Context>({
  overlaySize: { height: 0, width: 0 },
  onItemPress: id
});

export const ModalDropdownProvider = ModalDropdownContext.Provider;

export const useModalDropdownContext = () => {
  const context = React.useContext(ModalDropdownContext);

  return context;
};
