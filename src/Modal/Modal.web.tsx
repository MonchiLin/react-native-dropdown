// @ts-ignore
import Modal from 'modal-react-native-web';
import React from 'react';
import { ModalProps } from 'react-native';

// Modal.setAppElement(document.body)

export default function ({ visible, ...props }: ModalProps) {
  return <Modal visible={visible} {...props} />;
}
