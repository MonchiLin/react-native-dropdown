import React from 'react';
import { id } from './internal/utils';
import type { ModalDropdownContextType, Size } from './type';

const defaultValue: ModalDropdownContextType = {
  onRequestClose: id,
  show: id,
  hide: id,
  visible: false,
  overlayBounds: { x: 0, y: 0, w: 0, h: 0 },
  triggerBounds: { x: 0, y: 0, w: 0, h: 0 },
  windowSize: { height: 0, width: 0 },
  safeArea: undefined,
};

const ModalDropdownContext =
  React.createContext<ModalDropdownContextType>(defaultValue);

export const ModalDropdownProvider = ModalDropdownContext.Provider;

export const useModalDropdownContext = () => {
  const context = React.useContext(ModalDropdownContext);

  return context;
};
