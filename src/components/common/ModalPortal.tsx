import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
};
const ModalPortal: React.FC<Props> = ({ children }) => {
  const modalRoot = document.getElementById('modal');
  return modalRoot ? ReactDOM.createPortal(
    children,
    modalRoot
  ) : <></>;
};

export default ModalPortal;
