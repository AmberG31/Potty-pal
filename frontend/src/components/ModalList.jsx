import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from './Modal';

function ModalList() {
  const { modals, removeModal } = useContext(ModalContext);

  return (
    <div className="fixed left-0 top-8 flex w-full flex-col gap-2 px-4">
      {modals.map(({ message, type, id }) => (
        <Modal
          message={message}
          type={type}
          key={id}
          remove={() => {
            removeModal(id);
          }}
        />
      ))}
    </div>
  );
}

export default ModalList;
