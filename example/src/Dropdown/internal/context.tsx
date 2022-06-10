import React from "react";
import { id } from "./utils";

type Context = {
  triggerSize: { height: number, width: number },
  onRequestClose: () => void
}

const ModalDropdownContext = React.createContext<Context>({
    triggerSize: { height: 0, width: 0 },
    onRequestClose: id
  },
);

export const ModalDropdownProvider = ModalDropdownContext.Provider;

export const useModalDropdownContext = () => {
  const context = React.useContext(ModalDropdownContext);

  return context;
};
