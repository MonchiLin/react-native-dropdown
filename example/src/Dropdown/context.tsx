import React from "react";
import { id } from "./internal/utils";
import { Context } from "./type";

const ModalDropdownContext = React.createContext<Context>({
    triggerSize: { height: 0, width: 0 },
    onRequestClose: id,
    show: id,
    hide: id,
    visible: false,
    triggerPosition: { left: 0, right: 0, bottom: 0, top: 0 },
    safeArea: undefined,
  },
);

export const ModalDropdownProvider = ModalDropdownContext.Provider;

export const useModalDropdownContext = () => {
  const context = React.useContext(ModalDropdownContext);

  return context;
};
