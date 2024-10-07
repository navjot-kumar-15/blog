import React from "react";
import { Modal } from "flowbite-react";
const ModalC = ({ openModal, setOpenModal, children }) => {
  return (
    <div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create your blog</Modal.Header>
        {children}
      </Modal>
    </div>
  );
};

export default ModalC;
