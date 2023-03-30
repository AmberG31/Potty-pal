import React, { useState, useMemo } from "react";

export const ModalContext = React.createContext();

const ModalContextProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const pushModal = (modal) => {
    const id = new Date().getTime().toString();
    const newModal = { ...modal, id };
    setModals((prevState) => prevState.concat(newModal));
  };

  const removeModal = (id) => {
    setModals((prevState) => prevState.filter((modal) => modal.id !== id));
  };

  const context = useMemo(() => ({ modals, pushModal, removeModal }), [modals]);

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
