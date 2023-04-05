import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import Modal from '../modal/Modal';

function ModalList() {
  const { modals, removeModal } = useContext(ModalContext);

  return (
    <div className="pointer-events-none fixed left-0 top-10 z-30 flex w-full flex-col gap-2 px-4">
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
