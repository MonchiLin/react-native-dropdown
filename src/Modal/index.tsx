import React from 'react';
import { ModalProps } from 'react-native';

// @ts-ignore
import ReactNativeModal from './Modal';

export default function Modal({
  children,
  ...props
}: ModalProps & { children: JSX.Element }) {
  return <ReactNativeModal {...props} children={children} />;
}
